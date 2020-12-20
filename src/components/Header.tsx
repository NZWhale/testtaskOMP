import * as React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavItem } from 'react-bootstrap';


class Header extends React.Component {
    render() {
        return (
            <>
                <Nav justify variant="tabs" >
                    <Nav.Item>
                        <LinkContainer to="/movies">
                        <Nav.Link eventKey={1} >Movies</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/books">
                        <Nav.Link eventKey={2} >Books</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/music">
                        <Nav.Link eventKey={3}>Music</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
            </>
        )
    }
}

export default Header