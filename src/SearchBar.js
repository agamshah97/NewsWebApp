import React from "react"
import AsyncSelect from "react-select/async"
import {withRouter} from 'react-router-dom'
import AwesomeDebouncePromise from 'awesome-debounce-promise'

class SearchBar extends React.Component
{
    constructor(props)
    {
        super(props) 
        this.state = {
            value : null
        }

        this.searchResults = []         
        this.getSearchResults = this.getSearchResults.bind(this)
    }

    componentDidUpdate(prevProps, prevState)
    {
        if(!window.location.pathname.includes("search"))
        {
            if(prevState && prevState.value != null)
                this.setState({value : null})
        }
        
    }


    getSearchResults(inputValue)
    {
        return fetch('https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q='+inputValue,
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": "25b36e623dbd4fbabf4e60f67c61e36e"
                }
            }).then(response => {
                if(response.ok)
                    return response.json()
                else
                    return { status : 'error'}
            }).then(data => {
                try
                {
                    //console.log(data)
                    if(data.status)
                        return this.searchResults
                    else    
                    {    
                        this.searchResults = []
                        var results = data.suggestionGroups[0].searchSuggestions
                        for(var i = 0; i < results.length; i++)
                        {
                            this.searchResults.push({label : results[i].displayText})
                        }
                        return this.searchResults
                    }
                }catch(error)
                {
                    console.log("Error")
                }
            })
            .catch(error => console.log(error))
    }

    render()
    {
        //console.log(this.scaryAnimals)
        return (<AsyncSelect
            className="searchbar" 
            placeholder="Enter Keyword..."
            loadOptions = {AwesomeDebouncePromise(this.getSearchResults, 1000)}
            //defaultOptions={this.scaryAnimals}
            value = {this.state.value}
            onChange = {(inputValue) => { this.setState({value:inputValue}); this.props.history.push("/search?id="+inputValue.label+"&paper="+(this.props.paper ? "0" : "1"))}}
            />)
    }
}

export default withRouter(SearchBar)