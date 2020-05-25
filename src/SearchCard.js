import React from "react"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import ShareModal from "./ShareModal"
import {Link} from "react-router-dom"

function SearchCard(props)
{
    function preprocessDate()
    {
        var date = new Date(props.data.date);
        //var processedDate = date.getDate() + " " + date.getFullMonth() + " " + date.getFullYear();
        var processedDate = date.toISOString().substring(0,10);
        return processedDate;
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
                case "SPORT" :
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
    const paper = props.data.id? "0" : "1" 
    const paper_title = props.data.id? "GUARDIAN" : "NYTIMES"
    return (
        <Link to={`/article?id=${url}&paper=${paper}`} className="searchLink">
            <Card className="searchcard"> 
                <div onClick={(event) => {event.preventDefault(); event.stopPropagation()}}>
                    <Card.Text>
                        <b><i>{props.data.title + " "}</i></b>
                            <ShareModal url={props.data.url} title={props.data.title} paper={paper_title}/>
                    </Card.Text>
                </div>
                <Card.Img variant="top" src={props.data.image} />
                <div style={{display:"flex", justifyContent:"space-between", margin:"1%"}}>
                    <div style={{justifySelf:"flex-start"}}><i>{preprocessDate()}</i></div>
                    <div style={{justifySelf:"flex-end"}}><Badge style={{color:mapColor(props.data.section, true), backgroundColor:mapColor(props.data.section, false)}}>{props.data.section.toUpperCase()}</Badge></div>
                </div>
            </Card>
        </Link>
    )    
}

export default SearchCard