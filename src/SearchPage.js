import React from "react"
import RenderSpinner from './RenderSpinner'
import RenderSearchCard from './RenderSearchCard'

class SearchPage extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading : true,
            data : ""
        }

        this.callAPI = this.callAPI.bind(this)
    }

    componentDidMount()
    {
        //const urlParams = new URLSearchParams(window.location.search);
        //const id = urlParams.get('id');
        //const paper = urlParams.get('paper');
        //console.log("Mounted")
        this.props.checkBookmark()
        this.props.makeInvisible()
        this.callAPI()
        
    }

    componentDidUpdate()
    {
        if(window.location.search !== this.state.url)
        {
            this.callAPI() 
        }    
    }

    callAPI()
    {
        const URL = "search" + window.location.search
        this.setState({
            loading: true,
            url : window.location.search
        })
        //console.log("loading set to true")
        //console.log(URL)
        fetch("https://newsapp-backend-97.appspot.com/" + URL)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            //console.log("loading set to false and data loaded in state")
            this.setState({
                loading: false,
                data : data.articles
            })
            
        })
    }

    render()
    {      
        return (
            <div>
            {this.state.loading ? <RenderSpinner /> : <RenderSearchCard page="Results" data={this.state.data} />}
            </div>
        )
    }
}

export default SearchPage