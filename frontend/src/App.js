import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import Navigation from "./components/Navigation";
import SignupFormModal from "./components/SignupFormModal";
import AllSpots from "./components/Spots/AllSpots";
import * as sessionActions from "./store/session";

import "./index.css";
import UserSpots from "./components/Spots/UserSpots";

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
                    <Route exact path="/">
                        <AllSpots />
                    </Route>
                    <Route path ="/my-spots">
                        <UserSpots />
                    </Route>
                </Switch>
            )}
      </div>
    )

}

export default App;
