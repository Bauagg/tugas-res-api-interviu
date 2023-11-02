export const ActionProduct = (product) => {
    return {
        type: 'PRODUCT',
        payload: {
            product
        }
    }
}

export const ActionCustomer = (customer) => {
    return {
        type: 'CUSTOMER',
        payload: {
            customer
        }
    }
}

export const ActionIdProduct = (idItem, qtyItem) => {
    return {
        type: 'ID_PRODUCT',
        payload: {
            idItem,
            qtyItem
        }
    }
}

export const ActionInvoice = (invoice) => {
    return {
        type: 'INVOICE',
        payload: {
            invoice
        }
    }
}

export const ActionLogin = (user, token, role) => {
    return {
        type: 'LOGIN',
        payload: {
            user,
            token,
            role
        }
    }
}

export const ActionLogout = () => {
    return {
        type: 'LOGOUT'
    }
}