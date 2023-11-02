import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import '../style.css/style.navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ActionLogout } from '../redux/action/action.product'


const NavbarSection = () => {
    const Navigate = useNavigate()
    const { user, role } = useSelector(state => state.stateUser)
    const dispatch = useDispatch()

    return (
        <div>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="m-auto">
                        <Nav><Link to='/' className='link me-2'>Home</Link></Nav>
                        {
                            role === 'admin' && <Nav><Link to='/create-item' className='link'>Create Item</Link></Nav>
                        }
                        {
                            role !== 'admin' && <Nav><Link to='/invoice' className='link'>Invoice</Link></Nav>
                        }
                    </Nav>
                    <div>
                        {
                            user ? (
                                <Button variant="warning" onClick={() => dispatch(ActionLogout())}>Logout</Button>
                            ) : (
                                <div>
                                    <Button className='btn-logout' onClick={() => Navigate('/register')}>Register</Button>
                                    <Button onClick={() => Navigate('/login')}>Login</Button>
                                </div>
                            )
                        }
                    </div>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarSection