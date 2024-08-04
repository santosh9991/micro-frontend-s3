import React, {lazy, Suspense, useState} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Progress from "./containers/Progress";

const MarketingLazy = lazy(()=>import('./containers/MarketingApp'));
const AuthLazy = lazy(()=>import('./containers/AuthApp'))
import Header from "./containers/Header"
import { StylesProvider, createGenerateClassName } from "@material-ui/core";

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})
export default ()=>{
    const [isSignedIn, setIsSignedIn] = useState()
    return <BrowserRouter >
    <StylesProvider generateClassName={generateClassName}>
    <div>
        <Header onSignOut = {()=>setIsSignedIn(false)} isSignedIn={isSignedIn}/>
        <Suspense fallback={<Progress/>}>
        <Switch>
            <Route path='/auth'>
                <AuthLazy onSignIn={()=>setIsSignedIn(true)}/>
            </Route> 
            <Route path='/' component={MarketingLazy}/>
        </Switch>
        </Suspense>
    </div>
    </StylesProvider>
    
    </BrowserRouter>
}