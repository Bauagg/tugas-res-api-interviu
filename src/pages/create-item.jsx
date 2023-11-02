import { Button, Container, Form, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.css/style.inputSalle.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useSelector } from 'react-redux'

const CreateItem = () => {
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

    const hendleCreateItem = (e) => {
        e.preventDefault()

        if (!nameProduct) {
            return setErrorNameProduct('Name Item harus di isi')
        }

        if (!stock) {
            return setErrorStock('Stock harus di isi')
        }

        if (!price) {
            return setErrorPrice('Price harus di isi')
        }

        if (!unit || unit === 'Open this select menu') {
            return setErrorUnit('Unit harus di isi')
        }

        if (!images) {
            return setErrorImages('Image harus di isi')
        }

        const bodyQuery = {
            nama_item: nameProduct,
            stok: stock,
            price,
            image: images
        }

        axios.post('http://localhost:4000/item', bodyQuery, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => navigate('/'))
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className={style.containerLogin}>
                            <h1 className="text-center">Create Item</h1>
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
                                        <option>Open this select menu</option>
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
                                <Button className="w-100 mt-3" type="submit" onClick={hendleCreateItem}>Submit</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateItem