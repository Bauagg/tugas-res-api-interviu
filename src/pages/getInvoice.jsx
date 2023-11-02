import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.css/style.inputSalle.module.css'
import { useDispatch, useSelector } from "react-redux";
import { ActionInvoice } from '../redux/action/action.product'

const Invoice = () => {
    const { token } = useSelector(state => state.stateUser)
    const { invoice } = useSelector(state => state.stateCustomer)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('http://localhost:4000/salles', { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                dispatch(ActionInvoice(result.data.datas))
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        {
                            invoice.map((index) => {
                                return (
                                    <div key={index._id} className={style.container2}>
                                        {
                                            index.items.map((indexItem) => {
                                                return (
                                                    <Row key={indexItem._id}>
                                                        <Col>
                                                            <div>
                                                                <img alt="gambar product" src={indexItem.item.image} className={style.imageProduct} />
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div>
                                                                <h3>{indexItem.item.nama_item}</h3>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Name</td>
                                                                        <td>: {index.customer.nama}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Contact</td>
                                                                        <td>: {index.customer.contact}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Email</td>
                                                                        <td>: {index.customer.email}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Alamat</td>
                                                                        <td>: {index.customer.alamat}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Type Diskon</td>
                                                                        <td>: {index.customer.tipe_diskon}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Diskon</td>
                                                                        <td>: Rp.{index.customer.diskon}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Quantity</td>
                                                                        <td>: {indexItem.qty}</td>
                                                                    </tr>
                                                                </tbody>
                                                                <h4>Total Harga </h4>
                                                                <h5>Rp.{index.total_bayar}</h5>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Invoice