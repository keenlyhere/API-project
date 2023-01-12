import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS";
const LOAD_ALL_USER_SPOTS = "spots/LOAD_ALL_USER_SPOTS";
const LOAD_SPOT_DETAILS = "spots/LOAD_SPOT_DETAILS";
const ADD_SPOT = "spots/ADD_SPOT";
const ADD_SPOT_IMAGE = "spots/ADD_SPOT_IMAGE";
const EDIT_SPOT = "spots/EDIT_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";

const normalize = (spots) => {
    const normalizedData = {};
    console.log("spots.Spots:", spots.Spots)
    spots.Spots.forEach(spot => normalizedData[spot.id] = spot);
    console.log("normalize - normalizedData:", normalizedData);
    return normalizedData;
}

// action creators
export const actionLoadSpots = (spots) => {
    return {
        type: LOAD_ALL_SPOTS,
        spots
    }
}

export const actionLoadUserSpots = (spots) => {
    return {
        type: LOAD_ALL_USER_SPOTS,
        spots
    }
}

export const actionLoadSpotDetails = (spot) => {
    return {
        type: LOAD_SPOT_DETAILS,
        spot
    }
}

// thunk actions
export const loadSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots");

    if (res.ok) {
        const spots = await res.json();
        console.log("loadSpots - spots:", spots);
        dispatch(actionLoadSpots(spots));
        return spots;
    }
}

export const loadUserSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots/current");

    if (res.ok) {
        const spots = await res.json();
        console.log("loadUserSpots - spots:", spots);
        dispatch(actionLoadUserSpots(spots));
        return spots;
    }
}

export const loadSpotDetails = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    if (res.ok) {
        const spot = await res.json();
        console.log("loadSpotDetails", spot);
        dispatch(actionLoadSpotDetails(spot));
        return spot;
    }
}

const initialState = {
    spots: {},
    spot: {}
}

export default function spotReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_SPOTS: {
            const allSpotsState = { ...state };
            allSpotsState.spots = normalize(action.spots);
            console.log("LOAD_ALL_SPOTS", allSpotsState)
            return allSpotsState;
        }
        case LOAD_ALL_USER_SPOTS: {
            const userSpotsState = { ...state };
            userSpotsState.spots = normalize(action.spots);
            return userSpotsState;
        }
        case LOAD_SPOT_DETAILS: {
            console.log("STATE:", state)
            const spotDetails = { ...state.spots };
            spotDetails.spot = { [action.spot.id]: action.spot }
            console.log("LOAD_SPOT_DETAILS - spotDetails", spotDetails);
            return spotDetails;
        }
        default:
            return state;
    }
}
