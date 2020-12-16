const url='https://user-registration-nodeserver.herokuapp.com'

const signupAPI = (name, email, password) => {
    return fetch(`${url}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    }).then(response => response.json());
}

const blockedUserApi = (email) => {
    return fetch(`${url}/blockeduser`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, credentials: 'include',
        body: JSON.stringify({
            email: email
        })
    }).then(response => response.json());
}

const loginAPI = (email, password) => {
    return fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, credentials: 'include',
        body: JSON.stringify({
            username: email,
            password: password
        })
    }).then(response => response.json());
}

const getAuth=()=>{
    return fetch(`${url}/verifyauth`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, credentials: 'include'
    }).then(response => response.json());
}

const logoutAPI=()=>{
    return fetch(`${url}/logout`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, credentials: 'include'
    }).then(response => response.json()); 
}

const getUserList=()=>{
    return fetch(`${url}/users`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, credentials: 'include'
    }).then(response => response.json()); 
}

export const service = {
    signupAPI,
    loginAPI,
    getAuth,
    logoutAPI,
    blockedUserApi,
    getUserList
};