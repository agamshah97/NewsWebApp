import React from "react"
import SearchCard from "./SearchCard"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function RenderSearchCard(props)
{
    return (
        <>
            <Row style={{margin:"1%"}}>
                <h2>{props.page}</h2>
            </Row>
            <Row style={{margin:"1%"}}>
                {props.data.map((article, i) => 
                    (<Col key={i} style={{padding:"10px"}} md={3} xs={12}>
                        <SearchCard key={i} data={article}/>
                    </Col>))
                }
            </Row>
        </>
    )
}

export default RenderSearchCard
