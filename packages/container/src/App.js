import React from "react";
import { BrowserRouter } from "react-router-dom";
import MarketingApp from "./containers/MarketingApp";
import Header from "./containers/Header"
import { StylesProvider, createGenerateClassName } from "@material-ui/core";

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})
export default ()=>{
    return <BrowserRouter >
    <StylesProvider generateClassName={generateClassName}>
    <div>
        <Header/>
        <MarketingApp/>
    </div>
    </StylesProvider>
    
    </BrowserRouter>
}