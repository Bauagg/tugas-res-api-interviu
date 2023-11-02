import { Route, Routes } from "react-router-dom"
import NavbarSection from "../componen/navbar"
import HompagesProduct from "../pages/hompages.product"
import ProductDetail from "../pages/productDetail"
import Invoice from "../pages/getInvoice"
import AlertSuccess from "../pages/AlertSuccess"
import Login from "../pages/login"
import { useSelector } from "react-redux"
import Register from "../pages/register"
import CreateItem from "../pages/create-item"
import UpdateItem from "../pages/updateItem"

const RouterIndex = () => {
    const { user } = useSelector(state => state.stateUser)

    return (
        <div>
            <NavbarSection />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HompagesProduct />} />
                <Route path="/product-detail/:id" element={<ProductDetail />} />
                <Route path="/invoice" element={user ? <Invoice /> : <Login />} />
                <Route path="/alert-success" element={<AlertSuccess />} />
                <Route path="/create-item" element={user ? <CreateItem /> : <Login />} />
                <Route path="/update-item/:id" element={user ? <UpdateItem /> : <Login />} />
            </Routes>
        </div>
    )
}

export default RouterIndex