const initialState = {
    userData:{},loginSession: false,allUsers:[]
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) { 
        case "AUTHENTICATE":
                return {
                    ...state,
                    loginSession: action.login
                }
        default:
            return state
    }
}
