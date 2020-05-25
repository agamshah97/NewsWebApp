import React from "react"
import FavoriteCard from "./FavoriteCard"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function RenderFavoriteCard(props)
{
    return (
        props.data.length > 0 ?
        <>
            <Row style={{margin:"1%"}}>
                <h2>Favorites</h2>
            </Row>
            <Row style={{margin:"1%"}}>
                {props.data.map((article, i) => 
                    (<Col key={i} style={{padding:"10px"}} md={3} xs={12}>
                        <FavoriteCard key={i} data={article} updateBookmarks={props.updateBookmarks}/>
                    </Col>))
                }
            </Row>
        </>
        : 
        <Row style={{justifyContent:"center", margin : "1%"}}>
            <h4>You have no saved articles</h4>
        </Row>
    )
}

export default RenderFavoriteCard
