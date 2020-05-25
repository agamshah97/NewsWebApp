import React from "react"
import RenderSpinner from './RenderSpinner'
import RenderArticle from './RenderArticle'

class ArticlePage extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading : true,
            data : ""
        }
    }
    
    componentDidMount()
    {
        //const urlParams = new URLSearchParams(window.location.search);
        //const id = urlParams.get('id');
        //const paper = urlParams.get('paper');
        this.props.checkBookmark()
        this.props.makeInvisible()
        this.setState({
            loading: true
        })
        const URL = "article" + window.location.search
        //console.log(URL)
        fetch("https://newsapp-backend-97.appspot.com/" + URL)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            this.setState({
                loading: false,
                data : data.article
            })
        })
    }

    render()
    {    
        return (
            this.state.loading ? <RenderSpinner /> : <RenderArticle data={this.state.data} />
        )
    }
}

export default ArticlePage