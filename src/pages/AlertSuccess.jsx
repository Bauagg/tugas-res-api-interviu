import { Button, Col, Container, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.css/style.inputSalle.module.css'
import iconGambarsuccess from '../image/success.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AlertSuccess = () => {
    const navigate = useNavigate()
    const [customerId, setCustomerId] = useState({})
    const { idItem, qtyItem } = useSelector((state) => state.stateCustomer)
    const { token } = useSelector(state => state.stateUser)

    useEffect(() => {
        axios.get('http://localhost:4000/customer', { headers: { Authorization: `Bearer ${token}` } })
            .then((resolt) => {
                const dataItem = resolt.data.datas[0]
                setCustomerId(dataItem)
            })
            .catch((err) => console.log(err))
    }, [])

    const hendleInvoice = (e) => {
        e.preventDefault()

        const bodyQuery = {
            customerId: customerId._id,
            items: [
                {
                    item: idItem.toString(),
                    qty: parseInt(qtyItem)
                }
            ]
        }

        axios.post('http://localhost:4000/salles', bodyQuery, { headers: { Authorization: `Bearer ${token}` } })
            .then((resolt) => {
                console.log(resolt.data.datas)
                navigate('/invoice')
            })
            .catch((err) => {
                console.log(err)
                navigate(`/product-detail/${idItem}`)
            })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className={style.container3}>
                            <img alt='gambar success' src={iconGambarsuccess} className="w-100" />
                            <p className="text-center text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia</p>
                            <Button className="w-100" onClick={hendleInvoice}>Confrim</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default AlertSuccess