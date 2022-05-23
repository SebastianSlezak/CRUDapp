import React, {Component} from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';
import {Button, Container} from 'reactstrap';

class Home extends Component {

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button onClick={() => window.location.href="/campaigns"} color="link"><Link to="/campaigns">Campaigns</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Home;