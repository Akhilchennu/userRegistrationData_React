import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import validator from 'validator';
import { service } from '../services/service';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const BlockedUser = (props) => {
    const [userEmail, setUserEmail] = useState();
    const [emailError, setEmailError] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [dailogMessage, setdailogMessage] = useState();
    const [open, setOpen] = React.useState(false);

    const redirectLogin = () => {
        props.history.push('/login');
    };

    const handleOpen = () => {
        setOpen(true);
    };

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


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!userEmail) {
            setEmailError('please enter email address');
        } else if (userEmail && !emailError) {
            const dataResponce = service.blockedUserApi(userEmail);
            dataResponce.then(async (response) => {
                if (response.success) {
                    if (response.userBlocked) {
                        setErrorMessage('');
                        handleOpen();
                        setdailogMessage('Account is unlocked')
                    } else {
                        setErrorMessage('');
                        handleOpen();
                        setdailogMessage('The user is not blocked.Kindly try login again')
                    }
                } else {
                    setErrorMessage(response.message || 'Please try again later');
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

    const disableSubmit = () => {
        return !userEmail || errorMessage || emailError
    }

    return (
        <div style={{ height: '100%' }}>
            <div className="App-header">
                <Paper className="paperStyle">
                    <div className="appBase">
                        <div className="header">The account is blocked due to multiple login attempts,unblock to continue</div>
                        <br />
                        <Divider />
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
                        {errorMessage ? <div className="marginTop24 font"><b>{errorMessage}</b></div> : null}
                        <Button
                            variant="contained" color="primary"
                            className="marginTop24"
                            onClick={(event) => { handleSubmit(event) }}
                            onKeyPress={(event) => fieldKeyPress(event)}
                            disabled={disableSubmit() ? true : false}
                            test-button='button'>
                            Unblock
                        </Button>
                        <div className="marginTop12 font"><span>Login with different account?</span><a href="/login" >Login</a></div>
                        <div className="marginTop12 font"><span>Register with another?</span><a href="/signup">Register now</a></div>
                    </div>
                </Paper></div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText>
                        {dailogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => redirectLogin()} color="primary" autoFocus >
                        Login
          </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default BlockedUser;