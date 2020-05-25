import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import SearchBar from './SearchBar'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import Switch from "react-switch"
import {Switch as SwitchRouter, NavLink, Link, Route} from "react-router-dom"  
import CardHolder from './CardHolder'
import ArticlePage from './ArticlePage'
import SearchPage from './SearchPage'
import FavoritesPage from "./FavoritesPage"
import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

class MyNavbar extends React.Component
{
    constructor() {
        super()
        var switch_status = localStorage.getItem('switch_status') === 'true' ? true : false
        this.state = { 
            checked : switch_status,
            visible: true, 
            bookmarkPage : false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.makeInvisible = this.makeInvisible.bind(this);
        this.makeVisible = this.makeVisible.bind(this);
        this.isBookmark = this.isBookmark.bind(this);
      }

    handleChange(checkedState) {
       this.setState({checked:checkedState});
       localStorage.setItem('switch_status', checkedState)
    }

    makeInvisible()
    {
        this.setState({visible:false})
    }

    makeVisible()
    {
        this.setState({visible:true})
    }

    isBookmark()
    {
        if(window.location.pathname === "/favorites")
        {    
            this.setState({bookmark : true})
        }
        else
        {    
            this.setState({bookmark : false})
        }
    }

    render(){
    return (
    <>
        <Navbar bg="dark" variant="dark" expand="lg">
        <SearchBar paper={this.state.checked}/>
        <Navbar.Toggle/>
        <Navbar.Collapse>
            <Nav className="mr-auto">
                <NavLink activeClassName="navbarlink--active" className="navbar-link" to="/" exact>Home</NavLink>
                <NavLink activeClassName="navbarlink--active" className="navbar-link" to="/world" exact>World</NavLink>
                <NavLink activeClassName="navbarlink--active" className="navbar-link" to="/politics" exact>Politics</NavLink>
                <NavLink activeClassName="navbarlink--active" className="navbar-link" to="/business" exact>Business</NavLink>
                <NavLink activeClassName="navbarlink--active" className="navbar-link" to="/technology" exact>Technology</NavLink>
                <NavLink activeClassName="navbarlink--active" className="navbar-link" to="/sports" exact>Sports</NavLink>
            </Nav>
            <Nav>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Bookmark</Tooltip>}>
                <Link to="/favorites" >{this.state.bookmark ? <FaBookmark color="white" /> : <FaRegBookmark color="white"/>}</Link>
            </OverlayTrigger>
            {this.state.visible ? 
                <><label style={{color:"white"}}>NYTimes</label>  
                <Switch uncheckedIcon={false} checkedIcon={false} onColor={'#4696ec'} onChange={this.handleChange} checked={this.state.checked} /> 
                <label style={{color:"white"}}>Guardian</label></> 
                : null}   
            </Nav>
            
        </Navbar.Collapse>
        </Navbar>
        
        <SwitchRouter>
        <Route path="/" render={() => <CardHolder category="home" paper={this.state.checked} makeVisible={this.makeVisible} checkBookmark={this.isBookmark}/>} exact />
            <Route path="/world" render={() => <CardHolder category="world" paper={this.state.checked} makeVisible={this.makeVisible} checkBookmark={this.isBookmark}/>} />
            <Route path="/politics" render={() => <CardHolder category="politics" paper={this.state.checked} makeVisible={this.makeVisible} checkBookmark={this.isBookmark}/>} />
            <Route path="/business" render={() => <CardHolder category="business" paper={this.state.checked} makeVisible={this.makeVisible} checkBookmark={this.isBookmark}/>} />
            <Route path="/technology" render={() => <CardHolder category="technology" paper={this.state.checked} makeVisible={this.makeVisible} checkBookmark={this.isBookmark}/>} />
            <Route path="/sports" render={() => <CardHolder category="sports" paper={this.state.checked} makeVisible={this.makeVisible} checkBookmark={this.isBookmark}/>} />
            <Route path="/article" render={() => <ArticlePage makeInvisible={this.makeInvisible} checkBookmark={this.isBookmark}/>} />
            <Route path="/search" render={() => <SearchPage makeInvisible={this.makeInvisible} checkBookmark={this.isBookmark}/>} />
            <Route path="/favorites" render={() => <FavoritesPage makeInvisible={this.makeInvisible} checkBookmark={this.isBookmark}/>} />
        </SwitchRouter>
        </>
    );
    }
}

export default MyNavbar
