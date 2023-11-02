const stateGlobal = {
    product: [],
}

const ReduxProduct = (state = stateGlobal, action) => {
    switch (action.type) {
        case 'PRODUCT':
            return {
                ...state,
                product: action.payload.product
            }

        default:
            return state
    }
}

export default ReduxProduct