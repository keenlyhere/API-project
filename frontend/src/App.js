import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import Navigation from "./components/Navigation";
import SignupFormModal from "./components/SignupFormModal";
import * as sessionActions from "./store/session";

function App() {
    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch])

    return (
      <div className="App-container">
        <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Switch>
                </Switch>
            )}
      </div>
    )

}

export default App;
