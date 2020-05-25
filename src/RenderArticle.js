import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {EmailShareButton, FacebookShareButton, TwitterShareButton, FacebookIcon, EmailIcon, TwitterIcon} from "react-share"
import { FaRegBookmark, FaBookmark} from 'react-icons/fa'
import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md"
import commentBox from 'commentbox.io'
import { ToastContainer, toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RenderArticle extends React.Component
{
    constructor(props)
    {
        super(props)
        
        this.shortdesc = React.createRef();
        this.nextdesc = React.createRef();

        var html_bookmark = localStorage.getItem(window.location.search)
        //console.log(this.bookmark)

        this.preprocessDate = this.preprocessDate.bind(this)
        this.preprocessDesc = this.preprocessDesc.bind(this)
        this.expand = this.expand.bind(this)
        this.collapse = this.collapse.bind(this)
        this.scroll = this.scroll.bind(this)
        this.addBookmark = this.addBookmark.bind(this)
        this.removeBookmark = this.removeBookmark.bind(this)

        const split_index = this.preprocessDesc(this.props.data.description)
        if(split_index < this.props.data.description.length)
        {
            this.state = {
                expanded : false,
                showButtons : true,
                split_index : split_index,
                bookmark : html_bookmark ? true : false
            }
        }
        else
        {
            this.state = {
                expanded : false,
                showButtons : false,
                split_index : split_index,
                bookmark : html_bookmark ? true : false
            }
        }
    }
    
    preprocessDate()
    {
        var date = new Date(this.props.data.date);
        //var processedDate = date.getDate() + " " + date.getFullMonth() + " " + date.getFullYear();
        var processedDate = date.toISOString().substring(0,10);
        return processedDate;
    }
    
    preprocessDesc()
    {   
	    var sentences = this.props.data.description.split(". ");
	    var curr_str = "";
	    for(var i = 0; i < 4; i++)
	    {
            curr_str = curr_str + sentences[i] + ". "	
        }
        return curr_str.length;
    }

    expand()
    {
        //this.scroll(this.nextdesc)
        this.setState({expanded:true})
    }

    collapse()
    {
        //this.scroll(this.shortdesc)
        this.setState({expanded:false})
    }

    scroll(ref) 
    {
        //console.log("In Scroll: ",ref)
        ref.current.scrollIntoView({behavior: 'smooth'})
    }

    componentDidUpdate(prevProps, prevState)
    {
        if(this.state.expanded !== prevState.expanded)
            this.state.expanded ? this.scroll(this.nextdesc) : this.scroll(this.shortdesc)
    }

    componentDidMount() {

        this.removeCommentBox = commentBox('5678077770203136-proj', { defaultBoxId: window.location.search });
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    removeBookmark()
    {
        localStorage.removeItem(window.location.search)
        this.setState({bookmark : false})
        toast("Removing "+this.props.data.title)
    }

    addBookmark()
    {
        localStorage.setItem(window.location.search, JSON.stringify(this.props.data))
        this.setState({bookmark : true})
        toast("Saving "+this.props.data.title)
    }

    render()
    {
        const hashtag_str = "CSCI_571_NewsApp"
        return(
        <>
        <ToastContainer position={toast.POSITION.TOP_CENTER} hideProgressBar autoClose={3000} transition={Zoom} />
        <Card as="div" className="articlecard">
            <Row>
                <Col>
                    <Card.Title ref={this.shortdesc}>
                        <i>{this.props.data.title}</i>
                    </Card.Title>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card.Text xs="auto">
                        <i>{this.preprocessDate()}</i> 
                    </Card.Text>
                </Col>
                <Col xs="auto">
                    <OverlayTrigger placement="top" overlay={<Tooltip>Facebook</Tooltip>}>
                    <FacebookShareButton url={this.props.data.url} hashtag={'#'+hashtag_str}><FacebookIcon size={32} round={true}/></FacebookShareButton>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Twitter</Tooltip>}>
                    <TwitterShareButton url={this.props.data.url} hashtags={[hashtag_str]}><TwitterIcon size={32} round={true} /></TwitterShareButton>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Email</Tooltip>}>
                    <EmailShareButton url={this.props.data.url} subject={'#'+hashtag_str}><EmailIcon size={32} round={true} /></EmailShareButton>
                    </OverlayTrigger>
                </Col>
                <Col xs="auto">
                    <OverlayTrigger placement="top" overlay={<Tooltip>Bookmark</Tooltip>}>
                        {this.state.bookmark ? 
                        <FaBookmark onClick = { this.removeBookmark } color="#dc135a" /> 
                        : <FaRegBookmark onClick = { this.addBookmark } color="#dc135a" />}
                    </OverlayTrigger>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card.Img as="img" src={this.props.data.image} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        {this.state.showButtons ? 
                            this.state.expanded ? 
                            (<><p>{this.props.data.description.substring(0, this.state.split_index)}</p>
                               <p ref={this.nextdesc}>{this.props.data.description.substring(this.state.split_index)}</p></>) 
                            : <p>{this.props.data.description.substring(0, this.state.split_index) + "(...)"}</p>
                        : <p>{this.props.data.description}</p>}  
                    </div>
                    {this.state.showButtons ? 
                        <div style={{textAlign : "right"}} >
                            {this.state.expanded ? <MdKeyboardArrowUp size={40} onClick={this.collapse} /> : <MdKeyboardArrowDown size={40} onClick={this.expand}/>}
                        </div>
                        : null }
                </Col>
            </Row>
        </Card>
        <div className="commentbox" id={window.location.search}></div>
        </>
        )
    }
}

export default RenderArticle