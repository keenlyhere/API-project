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
import SpotDetails from "./components/Spots/SpotDetails";
import CreateSpotForm from "./components/Spots/CreateSpot";
import EditSpotForm from "./components/Spots/EditSpot";
import Profile from "./components/Profile";
import UserBookings from "./components/Bookings/UserBookings";
import SpotBookings from "./components/Bookings/SpotBookings";
import NotFound from "./components/NotFound/NotFound";
import SearchBar from "./components/Search";
import QueriedSpots from "./components/Spots/QueriedSpots";
import NoSpots from "./components/Search/NoSpots";

function App() {
    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
      <div className="App-container">
        <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Switch>
                    <Route exact path="/">
                        <AllSpots isLoaded={isLoaded} />
                    </Route>
                    <Route path="/search?location=">
                        <QueriedSpots isLoaded={isLoaded} />
                    </Route>
                    <Route path="/no-spots">
                        <NoSpots isLoaded={isLoaded} />
                    </Route>
                    <Route path="/my-spots">
                        <UserSpots />
                    </Route>
                    <Route path="/my-trips">
                        <UserBookings />
                    </Route>
                    <Route exact path="/spots/:spotId/edit">
                        <EditSpotForm type={"edit"} />
                    </Route>
                    <Route exact path="/spot/:spotId/bookings">
                        <SpotBookings />
                    </Route>
                    <Route exact path="/spots/:spotId">
                        <SpotDetails />
                    </Route>
                    <Route exact path="/my-spots">
                        <UserSpots />
                    </Route>
                    <Route exact path="/user/:userId">
                        <Profile />
                    </Route>
                    <Route path="/create-spot">
                        <CreateSpotForm type={"create"} />
                    </Route>
                    <Route path="/test-search">
                        <SearchBar isLoaded={isLoaded} />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            )}
      </div>
    )

}

export default App;
