import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const Header = (props) => {

    const logOut=()=>{
        props.onLogout();
    }
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Tooltip title="Sign out" test-logout='button' aria-label="Sign out">
                    <ExitToAppIcon className="signout" onClick={()=>logOut()}/>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}

export default Header;