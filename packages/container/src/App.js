import React from "react";
import { BrowserRouter } from "react-router-dom";
import MarketingApp from "./containers/MarketingApp";
import Header from "./containers/Header"
export default ()=>{
    return <BrowserRouter>
    <div>
        <Header/>
        <MarketingApp/>
    </div>
    </BrowserRouter>
}