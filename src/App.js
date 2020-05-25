import React from "react"
import MyNavbar from "./MyNavbar"
import {BrowserRouter} from "react-router-dom"

function App()
{
    return (
        <BrowserRouter>
            <MyNavbar />
        </BrowserRouter>
    )
}

export default App