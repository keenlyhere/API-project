import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
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
            isLoaded && (
                <Switch>
                    <Route path="/login">
                    <LoginFormPage />
                    </Route>
                    <Route path="/signup">
                    <SignupFormPage />
                    </Route>
                </Switch>
            );
      </div>
    )

}

export default App;
