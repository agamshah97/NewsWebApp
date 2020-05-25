import React from "react"
import Spinner from 'react-bootstrap/Spinner'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function RenderSpinner()
{
    return (
    <Container className="SpinnerContainer">
        <Row>
            <Col></Col>
            <Col xs="auto"><center><Spinner animation="grow" variant="primary" /><br />Loading</center></Col>
            <Col></Col>
        </Row>
    </Container>
    )
}

export default RenderSpinner