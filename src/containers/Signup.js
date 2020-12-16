import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import validator from 'validator';
import { service } from '../services/service';


const Signup = (props) => {
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [emailError, setEmailError] = useState();
    const [nameError, setNameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const changeUserName = (event) => {
        setUserName(event.target.value);
        setNameError();
        setErrorMessage();
    }

    const changeUserEmail = (event) => {
        setUserEmail(event.target.value);
        setEmailError();
        setErrorMessage();
    }
    const validateEmail = () => {
        if (userEmail === '' || !userEmail) {
            setEmailError('please enter email address');
        } else {
            const validEmail = validator.isEmail(userEmail);
            if (!validEmail) {
                setEmailError('enter valid email address');
            }
        }
    }

    const validateUserName = () => {
        if (userName === '' || !userName) {
            setNameError('please enter username');
        } else {
            const validName = validator.isAlpha(userName)
            if (!validName) {
                setNameError('name should have only alphabets');
            }
        }
    }

    const changeUserPassword = (event) => {
        setUserPassword(event.target.value);
        setPasswordError();
        setErrorMessage();
    }

    const validateUserPassword = () => {
        if (userPassword === '' || !userPassword) {
            setPasswordError('please enter password');
        } else {
            if (userPassword.length < 8) {
                setPasswordError('min length of password is 8');
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!userName && !userEmail && !userPassword) {
            setNameError('please enter username');
            setPasswordError('please enter password');
            setEmailError('please enter email address');
        } else if (userName && !userEmail && !userPassword) {
            setPasswordError('please enter password');
            setEmailError('please enter email address');
        } else if (!userName && userEmail && !userPassword) {
            setNameError('please enter username');
            setPasswordError('please enter password');
        } else if (!userName && !userEmail && userPassword) {
            setNameError('please enter username');
            setEmailError('please enter email address');
        } else if (userName && userEmail && userPassword && !nameError && !emailError && !passwordError) {
            const dataResponce = service.signupAPI(userName, userEmail, userPassword);
            dataResponce.then((response) => {
                if (response.success) {
                    props.history.push('/');
                    setErrorMessage();
                } else {
                    setErrorMessage('Please try again later');
                }
            })
        }
    }


    const fieldKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(event);
        }
    }

    const disableRegistration = () => {
        return !userName || !userEmail || !userPassword || emailError || passwordError || nameError || errorMessage;
    }

    return (
        <div style={{ height: '100%' }}>
            <div className="App-header">
                <Paper className="paperStyle">
                    <div className="appBase">
                        <div className="header">Signup</div>
                        <br />
                        <Divider />
                        <TextField
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            required
                            className="marginTop24"
                            autoComplete="off"
                            value={userName}
                            onChange={(event) => { changeUserName(event) }}
                            onBlur={() => { validateUserName() }}
                            onKeyPress={(event) => fieldKeyPress(event)}
                            maxLength={10}
                            helperText={nameError}
                            error={nameError ? true : false}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            type="text"
                            name='userMail'
                            fullWidth
                            required
                            className="marginTop24"
                            autoComplete="off"
                            onChange={(event) => { changeUserEmail(event) }}
                            onBlur={() => validateEmail()}
                            onKeyPress={(event) => fieldKeyPress(event)}
                            helperText={emailError}
                            value={userEmail}
                            error={emailError ? true : false}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            name='password'
                            autoComplete="current-password"
                            fullWidth
                            required
                            className="marginTop24"
                            value={userPassword}
                            onChange={(event) => { changeUserPassword(event) }}
                            onBlur={() => validateUserPassword()}
                            onKeyPress={(event) => fieldKeyPress(event)}
                            helperText={passwordError}
                            error={passwordError ? true : false}
                        />
                        {errorMessage ? <div className="marginTop24 font"><b>{errorMessage}</b></div> : null}
                        <Button
                            variant="contained" color="primary"
                            className="marginTop24"
                            onClick={(event) => handleSubmit(event)}
                            onKeyPress={(event) => fieldKeyPress(event)}
                            disabled={disableRegistration() ? true : false}
                            test-button='button'>
                            Register
                        </Button>
                        <div className="marginTop12 font"><span>Have account already?</span><a href="/login" >Login Now</a></div>
                    </div>
                </Paper></div></div >
    );
}

export default Signup;