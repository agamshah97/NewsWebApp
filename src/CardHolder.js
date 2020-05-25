import React from "react"
import RenderSpinner from "./RenderSpinner"
import RenderCards from "./RenderCards"

class CardHolder extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            data : {articles : ["Hello"]},
            loading : true
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount()
    {
        this.props.makeVisible()
        this.props.checkBookmark()
        this.handleChange(this.props.category, this.props.paper)
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps.category !== this.props.category || prevProps.paper !== this.props.paper)
        {
            this.handleChange(this.props.category, this.props.paper)
        }   
    }

    handleChange(category, paper)
    {
        //console.log("Loading")
        this.setState({
            loading: true
        })
        var URL = category + "/" + (paper ? "0" : "1");
        //console.log(URL)
        fetch("https://newsapp-backend-97.appspot.com/" + URL)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            this.setState({
                loading: false,
                data : data
            })
        })
        //console.log("Loading Completed..")
    }

    render()
    {   
        return (
            //return a div in both cases which will be rendered
            this.state.loading ? <RenderSpinner /> : <RenderCards articles={this.state.data.articles} paper={this.props.paper}/>
        );	
    }
}

export default CardHolder