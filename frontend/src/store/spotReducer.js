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

export const actionAddSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}

export const actionEditSpot = (editedSpotId, editedSpot) => {
    return {
        type: EDIT_SPOT,
        editedSpotId,
        editedSpot
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

export const addSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
            "Content-Type":
            "application/json"
        },
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const newSpot = await res.json();
        console.log("addSpot - newSpot:", newSpot);
        dispatch(actionAddSpot(newSpot));
        return newSpot;
    }
}

export const editSpot = (spotId, spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {
            "Content-Type":
            "application/json"
        },
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const editedSpot = await res.json();
        console.log("editSpot - editedSpot:", editedSpot);
        dispatch(actionEditSpot(spotId, editedSpot));
        return editedSpot;
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
            const spotDetails = { ...state };
            spotDetails.spot = { [action.spot.id]: action.spot }
            console.log("LOAD_SPOT_DETAILS - spotDetails", spotDetails);
            return spotDetails;
        }
        case ADD_SPOT: {
            const newSpotsState = { ...state };
            console.log("ADD_SPOT - action.spot", action.spot);
            newSpotsState.spots = { ...state.spots, [ action.spot.id ]: action.spot }
            // const newSpotsState = { ...state, spots: { ...state.spots, [action.spot.id]: action.spot } };
            // newSpotsState.spots[action.spot.id] = action.spot;
            console.log("ADD_SPOT - newSpotsState", newSpotsState);
            return newSpotsState;
        }
        case EDIT_SPOT: {
            const editSpotState = { ...state };
            editSpotState.spots = { ...state.spots, [ action.editedSpotId ]: action.editedSpot };
            console.log("EDIT_SPOT - editSpotState:", editSpotState);
            return editSpotState;
        }
        default:
            return state;
    }
}
