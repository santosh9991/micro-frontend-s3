import {mount} from 'marketing/MarketingApp'
import React, {useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
export default ()=>{
    const ref=useRef(null);
    const history = useHistory();
    console.log('marketing app integration in container');
    useEffect(()=>{
        const {onParentNavigate} = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({pathname: nextPathname})=>{
                // gets the current path inside the container app
                const {pathname} = history.location 
                if(pathname!==nextPathname){
                    history.push(nextPathname)
                }   
            }
        });
        history.listen(onParentNavigate)
    }, []);
    return <div ref={ref}/>
}