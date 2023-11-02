import { Container, Row, Col, Card, Button, InputGroup, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.css/style.inputSalle.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ActionProduct } from '../redux/action/action.product'
import { useNavigate } from "react-router-dom";


const HompagesProduct = () => {
    const [search, setSearch] = useState('')
    const { product } = useSelector((state) => state.stateProduct)
    const { role, token } = useSelector(state => state.stateUser)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    useEffect(() => {
        getDataItem()

    }, [])

    const getDataItem = async () => {
        try {
            const resolt = await axios.get(`http://localhost:4000/item?namaItem=${search}`)
            console.log(resolt.data.datas)
            dispatch(ActionProduct(resolt.data.datas))
        } catch (error) {
            console.log(error)
        }
    }

    const hendleDeleteItem = (id) => {
        axios.delete(`http://localhost:4000/item/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                axios.get('http://localhost:4000/item')
                    .then((resolt) => {
                        dispatch(ActionProduct(resolt.data.datas))
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="mt-5 w-50 m-auto">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Recipient's username"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button variant="primary" onClick={() => getDataItem()} >
                                    Cari
                                </Button>
                            </InputGroup>
                        </div>
                        <div className="row custom-row mt-5">
                            {
                                product.map((index) => {
                                    return (
                                        <div key={index._id} className="col-md-3 my-2">
                                            <Card style={{ width: '17rem' }}>
                                                <Card.Img variant="top" className={style.cartImg} src={index.image} />
                                                <Card.Body>
                                                    <Card.Title className="text-center">{index.nama_item}</Card.Title>
                                                    <Card.Text>
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="fw-bold">Price</td>
                                                                        <td>: {index.price}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="fw-bold">Unit</td>
                                                                        <td>: {index.unit}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </div>
                                                            <div>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="fw-bold">Stock</td>
                                                                        <td>: {index.stok}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </div>
                                                        </div>
                                                    </Card.Text>
                                                    {
                                                        role === 'admin' ? (
                                                            <div>
                                                                <Button className="w-100" variant="warning" onClick={() => Navigate(`/update-item/${index._id}`)}>Update</Button>
                                                                <Button className="w-100 mt-2" variant="danger" onClick={() => hendleDeleteItem(index._id)}>Delete</Button>
                                                            </div>
                                                        ) : (
                                                            <Button variant="primary" className="w-100" onClick={() => Navigate(`/product-detail/${index._id}`)}>Beli</Button>
                                                        )
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HompagesProduct