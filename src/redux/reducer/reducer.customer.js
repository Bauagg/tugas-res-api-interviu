const dataStateGlobalCustomer = {
    customer: {},
    invoice: [],
    idItem: null,
    qtyItem: null
}

const ReducerCustomer = (state = dataStateGlobalCustomer, action) => {
    switch (action.type) {
        case 'CUSTOMER':
            return {
                ...state,
                customer: action.payload.customer
            }

        case 'ID_PRODUCT':
            return {
                ...state,
                idItem: action.payload.idItem,
                qtyItem: action.payload.qtyItem
            }

        case 'INVOICE':
            return {
                ...state,
                invoice: action.payload.invoice
            }

        default:
            return state
    }
}

export default ReducerCustomer