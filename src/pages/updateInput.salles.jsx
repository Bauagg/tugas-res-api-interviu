import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.css/style.inputSalle.module.css'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const UpdateInputSalles = () => {
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [alamat, setAlamat] = useState('')
    const [diskon, setDiskon] = useState()
    const [typeDiskon, setTypeDiskon] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorContact, setErrorContact] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorAlamat, setErrorAlamat] = useState('')
    const [errorTypeDiskon, setErrorTypeDiskon] = useState('')
    const [id, setIdCustomer] = useState('')
    const { customer } = useSelector((state) => state.stateCustomer)
    const { token } = useSelector(state => state.stateUser)
    const navigate = useNavigate()

    useEffect(() => {
        data()
    }, [customer])

    const data = () => {
        if (customer) {
            setName(customer.nama)
            setAlamat(customer.alamat)
            setContact(customer.contact)
            setEmail(customer.email)
            setDiskon(customer.diskon)
            setTypeDiskon(customer.tipe_diskon)
            setIdCustomer(customer._id)
        }

    }

    const hendleInputSalles = (e) => {
        e.preventDefault()

        if (!name) {
            return setErrorName('Name harus di isi')
        }

        const NoTeleponRegex = /\+62\s\d{3}[-\.\s]??\d{3}[-\.\s]??\d{3,4}|\(0\d{2,3}\)\s?\d+|0\d{2,3}\s?\d{6,7}|\+62\s?361\s?\d+|\+62\d+|\+62\s?(?:\d{3,}-)*\d{3,5}/
        if (!NoTeleponRegex.test(contact.toString())) {
            return setErrorContact('Contact tidak valid +62 / 0')
        }


        const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!EMAIL_REGEX.test(email)) {
            return setErrorEmail('Email tidak valid')
        }

        if (!alamat) {
            return setErrorAlamat('Alamat harus di isi')
        }

        if (diskon !== 0 && !typeDiskon || typeDiskon === 'Open this select menu') {
            setErrorTypeDiskon('type diskon tidak boleh kosong')
        }

        const queryBody = {
            name,
            contact,
            email,
            alamat,
            diskon: parseInt(diskon),
            tipe_diskon: typeDiskon
        }

        axios.put(`http://localhost:4000/customer/${id}`, queryBody, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => navigate('/alert-success'))
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className={style.container1}>
                            <h1 className="text-center pt-5">Update Customer</h1>
                            <Form>
                                <label className={style.label}>Name
                                    <Form.Control
                                        type="text"
                                        aria-describedby="passwordHelpBlock"
                                        value={name} isInvalid={errorName}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </label>
                                <label className={style.label}>Contact
                                    <Form.Control
                                        type="number"
                                        aria-describedby="passwordHelpBlock"
                                        value={contact} isInvalid={errorContact}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                </label>
                                <label className={style.label}>Email
                                    <Form.Control
                                        type="email"
                                        aria-describedby="passwordHelpBlock"
                                        value={email} isInvalid={errorEmail}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                                <label className={style.label}>Alamat
                                    <Form.Control
                                        type="text"
                                        aria-describedby="passwordHelpBlock"
                                        value={alamat} isInvalid={errorAlamat}
                                        onChange={(e) => setAlamat(e.target.value)}
                                    />
                                </label>
                                <label className={style.label}>Diskon
                                    <Form.Control
                                        type="number"
                                        aria-describedby="passwordHelpBlock"
                                        value={diskon}
                                        onChange={(e) => setDiskon(e.target.value)}
                                    />
                                </label>
                                <label className={style.label}>Type Diskon
                                    <Form.Select aria-label="Default select example"
                                        value={typeDiskon} isInvalid={errorTypeDiskon}
                                        onChange={(e) => setTypeDiskon(e.target.value)}
                                    >
                                        <option>Open this select menu</option>
                                        <option value="persentase">persentase</option>
                                        <option value="fix">fix</option>
                                    </Form.Select>
                                </label>
                                <Button className="w-100 mb-5" type="submit" onClick={hendleInputSalles}>Submit</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateInputSalles