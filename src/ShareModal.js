import React from "react"
import {MdShare} from "react-icons/md"
import Modal from "react-bootstrap/Modal"
import {useState} from "react"
import {Container, Row, Col} from "react-bootstrap"
import {EmailShareButton, FacebookShareButton, TwitterShareButton, FacebookIcon, EmailIcon, TwitterIcon} from "react-share"

function ShareModal(props)
{
    const [show, setShow] = useState(false);

    function handleClose()
    {
        setShow(false);
    }

    function handleShow(event) 
    {
        event.preventDefault()
        event.stopPropagation()
        setShow(true);
    }

    const hashtag_str = "CSCI_571_NewsApp"

    return (
        <>
            <MdShare onClick={handleShow} />
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {props.paper ? 
                    <div><Modal.Title><b>{props.paper}</b></Modal.Title><Modal.Title>{props.title}</Modal.Title></div>
                    : <Modal.Title>{props.title}</Modal.Title>}                    
                </Modal.Header>
                <Modal.Body>
                <center>
                <Container>
                    <Row>
                        <Col><h4>Share via</h4></Col>
                    </Row>
                    <Row>
                        <Col><FacebookShareButton url={props.url} hashtag={"#"+hashtag_str}><FacebookIcon round={true}/></FacebookShareButton></Col>
                        <Col><TwitterShareButton url={props.url} hashtags={[hashtag_str]}><TwitterIcon round={true} /></TwitterShareButton></Col>
                        <Col><EmailShareButton url={props.url} subject={"#"+hashtag_str}><EmailIcon round={true} /></EmailShareButton></Col>
                    </Row>
                </Container>
                </center>    
                </Modal.Body>
            </Modal>
        </>
    );
}


export default ShareModal