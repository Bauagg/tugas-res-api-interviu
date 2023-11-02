import { Button, Col, Container, Row, CloseButton } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css/style.navbar.css'
import Faforit from '../image/Favorites.png'
import LinkIcons from '../image/Share.png'
import delieryIcons from '../image/delivery_dining.png'
import iconsCeterangan from '../image/360.png'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InputSalles from "./input.salles";
import { useDispatch, useSelector } from "react-redux";
import { ActionCustomer } from '../redux/action/action.product'
import { ActionIdProduct } from '../redux/action/action.product'
import UpdateInputSalles from "./updateInput.salles";

const ProductDetail = () => {
    const [qty, setQty] = useState(1)
    const [toggleInput, setToggleInput] = useState(false)
    const [dataProduct, setDataProduct] = useState({})
    const { customer } = useSelector((state) => state.stateCustomer)
    const { token, user } = useSelector(state => state.stateUser)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:4000/item/${id}`)
            .then((resolt) => {
                setDataProduct(resolt.data.datas)
            })
            .catch((error) => console.error(error))
    }, [id])

    useEffect(() => {
        axios.get('http://localhost:4000/customer', { headers: { Authorization: `Bearer ${token}` } })
            .then((resolt) => {
                dispatch(ActionCustomer(resolt.data.datas[0]))
                dispatch(ActionIdProduct(id, qty))
            })
            .catch((err) => console.log(err))
    }, [qty])

    if (!dataProduct) {
        return (<div>Loading...</div>)
    }

    const hendleInputQty = (e) => {
        const input = parseInt(e.target.value)
        if (input <= dataProduct.stok) {
            if (!isNaN(input) && input >= 1) {
                setQty(input)
            }
        }
    }

    return (
        <div>
            {
                toggleInput && (
                    <div className="componenInput" >
                        <CloseButton className="clossBTN" onClick={() => setToggleInput(false)} />
                        {customer ? <UpdateInputSalles /> : <InputSalles />}
                    </div>
                )
            }
            <Container className="pb-5">
                <Row>
                    <Col>
                        <div className="container1">
                            <Row>
                                <Col>
                                    <div>
                                        <div className="imageHero">
                                            <div className="iconsLove">
                                                <img alt="iconLove" src={Faforit} className="d-block mb-1" />
                                                <img alt="iconShere" src={LinkIcons} className="d-block" />
                                            </div>
                                            <img alt="Image Product" src={dataProduct.image} className="imageProduct" />
                                        </div>
                                        <div className="containerImages">
                                            <div className="iconSectionProduct">
                                                <img alt="Image Product" src="https://wiratech.co.id/wp-content/uploads/2018/03/peluang-bisnis-roti-bakar-dan-analisa-usahanya-pengusaha-sukses.jpg" className="imageIconProduct" />
                                            </div>
                                            <div className="iconSectionProduct">
                                                <img alt="Image Product" src="https://wiratech.co.id/wp-content/uploads/2018/03/peluang-bisnis-roti-bakar-dan-analisa-usahanya-pengusaha-sukses.jpg" className="imageIconProduct" />
                                            </div>
                                            <div className="iconSectionProduct">
                                                <img alt="Image Product" src="https://wiratech.co.id/wp-content/uploads/2018/03/peluang-bisnis-roti-bakar-dan-analisa-usahanya-pengusaha-sukses.jpg" className="imageIconProduct" />
                                            </div>
                                            <div className="iconSectionProduct">
                                                <img alt="Image Product" src="https://wiratech.co.id/wp-content/uploads/2018/03/peluang-bisnis-roti-bakar-dan-analisa-usahanya-pengusaha-sukses.jpg" className="imageIconProduct" />
                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="ms-5">
                                        <h3>{dataProduct.nama_item}</h3>
                                        <div className="containerColor">
                                            <div className="d-flex justify-content-between">
                                                <p className="text-secondary">Color</p>
                                                <p className="text-secondary">Dark</p>
                                            </div>
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="color"></div>
                                                <div className="bg-success color"></div>
                                                <div className="bg-warning color"></div>
                                                <div className="bg-primary color"></div>
                                            </div>
                                        </div>
                                        <p className="mt-4 price1">Price : <span className="price">IDR. {dataProduct.price}</span></p>
                                        <p className="price2">Stock : <span className="price">{dataProduct.stok}</span></p>
                                        <div>
                                            <button className="text-white bg-success border border-success btn1"
                                                onClick={() => {
                                                    if (qty < dataProduct.stok) {
                                                        setQty(qty + 1)
                                                    }
                                                }}
                                            ><AiOutlinePlus /></button>
                                            <input type="number" placeholder="0" className="inputQTY" value={qty}
                                                onChange={hendleInputQty} />
                                            <button className="text-white bg-success border border-success btn1"
                                                onClick={() => {
                                                    if (qty > 1) {
                                                        setQty(qty - 1)
                                                    }
                                                }}
                                            ><AiOutlineMinus /></button>
                                        </div>
                                        <Button className="btn2" onClick={() => {
                                            user ? setToggleInput(true) : navigate('/login')
                                        }}>Buy</Button>
                                        <div className="conten1">
                                            <img src={delieryIcons} alt="icon image" className="iconDelivery" />
                                            <p className="my-auto">Delivery <span className="ps-5 text-success">5 working days</span></p>
                                        </div>
                                        <div className="conten2">
                                            <img src={iconsCeterangan} alt="icon image" className="iconDelivery" />
                                            <p className="my-auto">Product returns and exchanges Terms</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default ProductDetail