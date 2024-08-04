import {mount} from 'auth/AuthApp';
import React, {useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
export default ({onSignIn})=>{
    console.log('auth container')
    const ref=useRef(null);
    const history = useHistory();
    useEffect(()=>{
        const {onParentNavigate} = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({pathname: nextPathname})=>{
                // gets the current path inside the container app
                console.log('in container  navigate', history);
                const {pathname} = history.location 
                if(pathname!==nextPathname){
                    history.push(nextPathname)
                }   
            },
            onSignIn
        });
        history.listen(onParentNavigate)
    }, []);
    return <div ref={ref}/>
}