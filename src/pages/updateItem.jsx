import { Button, Container, Form, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.css/style.inputSalle.module.css'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useEffect } from "react";
import axios from 'axios'

const UpdateItem = () => {
    const [nameProduct, setNameProduct] = useState('')
    const [stock, setStock] = useState()
    const [price, setPrice] = useState()
    const [unit, setUnit] = useState('')
    const [images, setImages] = useState('')
    const [errorNameProduct, setErrorNameProduct] = useState('')
    const [errStock, setErrorStock] = useState('')
    const [errorPrice, setErrorPrice] = useState('')
    const [errorUnit, setErrorUnit] = useState('')
    const [errorImages, setErrorImages] = useState('')
    const { token } = useSelector(state => state.stateUser)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        getItemId()
    }, [])

    const getItemId = () => {
        axios.get(`http://localhost:4000/item/${id}`)
            .then((resoult) => {
                setNameProduct(resoult.data.datas.nama_item)
                setStock(resoult.data.datas.stok)
                setUnit(resoult.data.datas.unit)
                setPrice(resoult.data.datas.price)
                setImages(resoult.data.datas.image)
            })
            .catch((err) => console.log(err))
    }

    const hendleUpdateItem = (e) => {
        e.preventDefault()

        if (!nameProduct) {
            return setErrorNameProduct('Name Item harus di isi')
        }

        if (!stock) {
            return setErrorStock('Stok harus di isi')
        }

        if (!unit) {
            return setErrorUnit('Unit harus di isi')
        }

        if (!price) {
            return setErrorPrice('Price harus di isi')
        }

        if (!images) {
            return setErrorImages('Image url harus di isi')
        }

        const queryBody = {
            nama_item: nameProduct,
            stok: stock,
            unit,
            price,
            image: images
        }

        axios.put(`http://localhost:4000/item/${id}`, queryBody, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => navigate('/'))
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className={style.containerLogin}>
                            <h1 className="text-center">Update Item</h1>
                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor="inputPassword5">Name Item *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="inputPassword5"
                                        aria-describedby="passwordHelpBlock"
                                        placeholder="Name Item"
                                        value={nameProduct}
                                        onChange={(e) => setNameProduct(e.target.value)}
                                        isInvalid={errorNameProduct}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="inputPassword5">Stock *</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="inputPassword5"
                                        aria-describedby="passwordHelpBlock"
                                        placeholder="stock"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        isInvalid={errStock}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="inputPassword5">Price *</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="inputPassword5"
                                        aria-describedby="passwordHelpBlock"
                                        placeholder="Price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        isInvalid={errorPrice}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="inputPassword5">Unit *</Form.Label>
                                    <Form.Select aria-label="Default select example" value={unit}
                                        onChange={(e) => setUnit(e.target.value)} isInvalid={errorUnit}>
                                        <option value="kg">kg</option>
                                        <option value="pcs">pcs</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="inputPassword5">Image URL *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="inputPassword5"
                                        aria-describedby="passwordHelpBlock"
                                        placeholder="Image url"
                                        value={images}
                                        onChange={(e) => setImages(e.target.value)}
                                        isInvalid={errorImages}
                                    />
                                </Form.Group>
                                <Button className="w-100 mt-3" type="submit" onClick={hendleUpdateItem}>Update</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default UpdateItem