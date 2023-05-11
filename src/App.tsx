import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Cars from "./pages/cars/Cars";
import CarDetail from "./pages/cars/CarDetail";
import Home from "./pages/home/Home";
import Orders from "./pages/orders/Orders";
import Customers from "./pages/customers/Customers";
import OrderDetail from "./pages/orders/OrderDetail";


function App() {
  return (
      <Router>
        <Navbar bg="light" expand="md" className="mb-4">
          <Container>
            <LinkContainer to="/cars">
              <Navbar.Brand>CarIS</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/cars">
                  <Nav.Link>Cars</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/orders">
                  <Nav.Link>Orders</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/customers">
                  <Nav.Link>Customers</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Routes>
            <Route path="/cars" element={<Cars/>}/>
            <Route path="/cars/:id" element={<CarDetail/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/order/:id" element={<OrderDetail/>}/>
            <Route path="/customers" element={<Customers/>}/>
            <Route path="/customer/:id" element={<CarDetail/>}/>
            <Route path="/notFound" element={<h1 className="text-danger">Page not found!</h1>}/>
          </Routes>
        </Container>
      </Router>
  );
}

export default App;
