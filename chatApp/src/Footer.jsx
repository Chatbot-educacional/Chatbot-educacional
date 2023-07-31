import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="py-3" style={{ }}>
      <Container>
        <Row>
          <Col>
            <p className="text-center">© {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
