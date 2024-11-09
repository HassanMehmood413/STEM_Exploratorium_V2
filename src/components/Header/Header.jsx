import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../Header/Header.css';
import img from '../../images/stem.png';

function Header() {
  return (
    <header className="header">
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={1}>
            <Image src={img} className="header-logo" />
          </Col>
          <Col>
            <h1 className="header-title">TEM Exploratorium</h1>
            <p className="header-subtitle">
              Explore STEM concepts through hands-on activities, virtual field trips, and collaborative projects!
            </p>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;