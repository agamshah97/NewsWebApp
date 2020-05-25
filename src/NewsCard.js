import React from "react"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import ShareModal from "./ShareModal"
import {Link} from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import MediaQuery from 'react-responsive'

function NewsCard(props)
{
    function preprocessDesc(description, size)
    {   
        var max_length;
        switch(size)
        {
            case 0 : max_length = 300; break;
            case 1 : max_length = 175; break;
            case 2 : max_length = 100; break;
            default : max_length = 100; break;
        }
        //console.log(max_length)

        var words = description.split(" ");
	    var curr_str = "";

	    for(var i = 0; i < words.length; i++)
	    {
		    if(curr_str.length + words[i].length <= max_length)
		    {	
			    curr_str = curr_str + " " + words[i];
		    }
		    else
		    {
			    curr_str = curr_str + "...";
			    break;
		    }	
	    }
	    return curr_str;
    }

    function preprocessDate(date)
    {
        var currentDate = new Date(date);
        return currentDate.toISOString().substring(0,10);
    }

    function mapColor(section, fg)
    {
        if(fg)
        {
            //Foreground colors
            switch(section.toUpperCase())
            {
                case "WORLD":
                case "POLITICS":
                case "BUSINESS":     
                case "GUARDIAN": return "white"
                case "TECHNOLOGY":
                case "SPORTS":
                case "SPORT":
                case "NYTIMES": return "black"
                default : return "white"
            }
        }
        else
        {
            //Background colors
            switch(section.toUpperCase())
            {
                case "WORLD": return '#7c4eff'
                case "POLITICS": return '#419488'
                case "BUSINESS": return '#4696ec'    
                case "GUARDIAN": return '#142849'
                case "TECHNOLOGY": return '#cedc39'
                case "SPORTS": return '#f6c244'
                case "SPORT" : return '#f6c244'
                case "NYTIMES": return "#dddddd"
                default : return "#6e757c"
            }
        }
    }   

    const url = props.data.id? props.data.id : props.data.url
    const paper = props.paper? "0" : "1" 

    //console.log(url);
	return(
		/*<div className = "newscard" id={props.value}>
		    <img src={props.data.image} alt="Temp" width="200px"/>
		    <div className = "newscontent">
			    <p><b>{props.data.title}</b></p>
			    <p>{preprocessDesc(props.data.description)}</p>
			    <p>{props.data.date}</p>
		    </div>
        </div>
        */
       <Link to={`/article?id=${url}&paper=${paper}`} className="articleLink">
           <Row  className="newscard">
                <Col style={{alignSelf:"center", padding:"15px"}} xs={12} md={3}>
                    <Card.Img as="img" className="newscard_img" src={props.data.image} />
                </Col>
                <Col>
                <Card.Body style={{padding:"1%"}}>
                    <div onClick={(event) => {event.preventDefault(); event.stopPropagation()}}>
                        <Card.Title style={{fontSize:"1.1em"}}>
                            <b><i>{props.data.title}</i></b>
                                <ShareModal url={props.data.url} title={props.data.title}/>
                        </Card.Title>
                    </div>
                    <Card.Text style={{fontSize:"1em"}}>
                        <MediaQuery minWidth={900}>
                            {preprocessDesc(props.data.description, 0)}
                        </MediaQuery>
                        <MediaQuery minWidth={480} maxWidth={900}>
                            {preprocessDesc(props.data.description, 1)}
                        </MediaQuery>
                        <MediaQuery maxWidth={480}>
                            {preprocessDesc(props.data.description, 2)}
                        </MediaQuery>   
                    </Card.Text>
                    <div style={{display :"flex", justifyContent:"space-between"}}>
                        <i>{preprocessDate(props.data.date)}</i> 
                    <Badge style={{color:mapColor(props.data.section, true), backgroundColor:mapColor(props.data.section, false) }}>{props.data.section.toUpperCase()}</Badge>
                    </div>
                </Card.Body>
                </Col>

            </Row>
        </Link>
		);
}

export default NewsCard