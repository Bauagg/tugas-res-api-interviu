const stateGlobalUser = {
    user: null,
    token: null,
    role: null,
    Authenticate: false
}

const ReducerUser = (state = stateGlobalUser, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
                Authenticate: true
            }

        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                role: null,
                Authenticate: false
            }

        default:
            return state
    }
}

export default ReducerUser