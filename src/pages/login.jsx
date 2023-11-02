import { Col, Container, Row, Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.css/style.inputSalle.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ActionLogin } from '../redux/action/action.product'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorlogin, setErrorLogin] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const hendleLogin = (e) => {
        e.preventDefault()

        const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        if (!regexEmail.test(email)) {
            return setErrorEmail('Email tidak valid')
        }

        if (password.length < 3) {
            return setErrorPassword('Password kurang kuwat')
        }

        const queryBody = {
            email,
            password
        }

        axios.post('http://localhost:4000/login', queryBody)
            .then((resolt) => {
                const { username, token, role } = resolt.data.datas
                dispatch(ActionLogin(username, token, role))
                navigate('/')
            })
            .catch((err) => setErrorLogin(err.response.data.message))
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className={style.containerLogin}>
                            <h1 className="text-center">Login</h1>
                            <Form>
                                <p className="text-center text-danger">{errorlogin}</p>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" isInvalid={errorEmail}
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        {errorEmail}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" isInvalid={errorPassword}
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        {errorPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button className="w-100" type="submit" onClick={hendleLogin}>Login</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login