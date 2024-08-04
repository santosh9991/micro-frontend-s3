import React from 'react';
import ReactDOM from 'react-dom';
import {createMemoryHistory, createBrowserHistory} from 'history'
import App from './App';

// Mount function to start up the app
const mount = (el, {onSignIn, onNavigate, defaultHistory, initialPath}) => {
  // if application renders through localhost we use memory history 
  // else use memory history
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  //listen to the change in memory history and trigger the callback passed into it
  if(onNavigate){
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} onSignIn={onSignIn}/>, el);
  return {
    onParentNavigate:({pathname: nextPathname})=>{
     //we destructured the pathname above to nextPathname to indicate that
     // it is going to be the future pathname
     // get the current path name from the memory history and update it
     const { pathname } = history.location;
     if(pathname!==nextPathname){
      history.push(nextPathname)
     }
    }
  }
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory()});
  }
}

// We are running through container
// and we should export the mount function
export { mount };
