import React from "react"
import RenderFavoriteCard from "./RenderFavoriteCard"
import { ToastContainer, toast, Zoom} from 'react-toastify';


class FavoritesPage extends React.Component
{
    constructor(props)
    {
        super(props)

        this.updateBookmarks = this.updateBookmarks.bind(this)

        var arr = Object.keys(localStorage)
        var filter_arr = arr.filter(function(curr){
            if(curr.substring(0, 4)==="?id=")
                return true
            else
                return false
        })
        var articles = filter_arr.map((curr) => 
            { 
                var article = JSON.parse(localStorage.getItem(curr)); 
                article['key']=curr; 
                return article 
            })
        
        this.state = {
                data: articles
            }
    }

    updateBookmarks(title)
    {
        toast("Removing "+title)
        
        var arr = Object.keys(localStorage)
        var filter_arr = arr.filter(function(curr){
            if(curr.substring(0, 4)==="?id=")
                return true
            else
                return false
        })
        
        var articles = filter_arr.map((curr) => 
            { 
                var article = JSON.parse(localStorage.getItem(curr)); 
                article['key']=curr; 
                return article 
            })
        
        this.setState({
                data: articles
        })
    }

    componentDidMount()
    {
        this.props.checkBookmark()
        this.props.makeInvisible()
        //console.log(window.location.pathname)   
    }

    render()
    {
        return(
            <>
            <ToastContainer position={toast.POSITION.TOP_CENTER} hideProgressBar autoClose={3000} transition={Zoom} />
            <RenderFavoriteCard page="Favorites" data={this.state.data} updateBookmarks={this.updateBookmarks} />
            </>
        )
    }
    
}

export default FavoritesPage