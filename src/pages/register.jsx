import { Button, Col, Container, Form, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.css/style.inputSalle.module.css'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [errorUsername, setErrorUsername] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorRole, setErrorRole] = useState('')
    const [errorRegisterImail, setErrorRegisterEmail] = useState('')
    const Navigate = useNavigate()

    const hendleRegister = (e) => {
        e.preventDefault()

        if (!username) {
            return setErrorUsername('Username tidak boleh kosong')
        }

        const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        if (!regexEmail.test(email)) {
            return setErrorEmail('Email tidak valid')
        }

        if (password.length < 3) {
            return setErrorPassword('Password kurang kuat')
        }

        if (!role) {
            return setErrorRole('Role harus di isi')
        }

        const queryBody = {
            username,
            email,
            password,
            role
        }

        axios.post('http://localhost:4000/register', queryBody)
            .then(() => Navigate('/login'))
            .catch((err) => setErrorRegisterEmail(err.response.data.message))
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className={style.containerLogin}>
                            <h1 className="text-center">Register</h1>
                            <Form>
                                <p className="text-center text-danger">{errorRegisterImail}</p>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username *</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" isInvalid={errorUsername}
                                        value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        {errorUsername}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email address *</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" isInvalid={errorEmail}
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        {errorEmail}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password *</Form.Label>
                                    <Form.Control type="password" placeholder="Password" isInvalid={errorPassword}
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">
                                        {errorPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <label>Role *
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="User"
                                                name="group1"
                                                type={type}
                                                value='user'
                                                id={`inline-${type}-1`}
                                                onChange={(e) => setRole(e.target.value)}
                                                isInvalid={errorRole}
                                            />
                                            <Form.Check
                                                inline
                                                label="Admin"
                                                name="group1"
                                                type={type}
                                                value='admin'
                                                id={`inline-${type}-2`}
                                                onChange={(e) => setRole(e.target.value)}
                                                isInvalid={errorRole}
                                            />
                                        </div>
                                    ))}
                                </label>
                                <Button className="w-100" onClick={hendleRegister}>Register</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register