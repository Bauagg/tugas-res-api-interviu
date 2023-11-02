import { combineReducers, createStore } from "redux";
import ReduxProduct from "../reducer/reducer.product";
import ReducerCustomer from "../reducer/reducer.customer";
import ReducerUser from "../reducer/reducer.user";



const rootReducer = combineReducers({
    stateProduct: ReduxProduct,
    stateCustomer: ReducerCustomer,
    stateUser: ReducerUser
})

const storeProduct = createStore(rootReducer)

export default storeProduct