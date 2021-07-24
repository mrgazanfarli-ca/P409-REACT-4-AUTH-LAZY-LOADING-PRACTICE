import React from 'react';
import {
    Navbar,
    Nav,
    NavbarToggler,
    NavItem,
    Collapse, Button,
} from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { APP_ROUTES, ELocalStorageItem } from '../consts';

export const Header: React.FC = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = React.useCallback(() => setIsOpen(prevValue => !prevValue), []);

    const handleLogout = React.useCallback(() => {
        localStorage.removeItem(ELocalStorageItem.TOKEN);
        history.push(APP_ROUTES.AUTH.LOGIN.PATH);
    }, [history]);

    return (
        <Navbar color="light" light expand="md">
            <NavLink className="navbar-brand" to="/">reactstrap</NavLink>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink to="/products" activeClassName="active" className="nav-link">Products</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
            <Button className="btn-danger" onClick={handleLogout}>Logout</Button>
        </Navbar>
    )
}
