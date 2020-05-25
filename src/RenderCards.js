import React from "react"
import NewsCard from "./NewsCard"

class RenderCards extends React.Component
{
    constructor(props)
    {
        super(props);
        //console.log(props.articles)

        this.renderCard = this.renderCard.bind(this)
    }

    renderCard(i)
    {
        if(this.props.articles[i])
        {
            return <NewsCard data={this.props.articles[i]}/>
        }
        else
            return null
    }

    render()
    {
        return(
        <div>
            {this.props.articles.map((article, i) => (<NewsCard key={i} data={article} paper={this.props.paper}/>))}
        </div>
        )
    }
}

export default RenderCards