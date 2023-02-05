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
    spots.Spots.forEach(spot => normalizedData[spot.id] = spot);
    // console.log("spots.Spots:", spots.Spots)
    // console.log("normalize - normalizedData:", normalizedData);
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

export const actionDeleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

export const actionAddSpotImage = (spotId, url, preview) => {
    return {
        type: ADD_SPOT_IMAGE,
        spotId,
        url,
        preview
    }
}

// thunk actions
export const loadSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots");

    if (res.ok) {
        const spots = await res.json();
        // console.log("loadSpots - spots:", spots);
        dispatch(actionLoadSpots(spots));
        return spots;
    }
}

export const loadUserSpots = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots/current");

    if (res.ok) {
        const spots = await res.json();
        // console.log("loadUserSpots - spots:", spots);
        dispatch(actionLoadUserSpots(spots));
        return spots;
    }
}

export const loadSpotDetails = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    if (res.ok) {
        const spot = await res.json();
        // console.log("loadSpotDetails:::", spot);
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
        // console.log("addSpot - newSpot:", newSpot);
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
        // console.log("editSpot - editedSpot:", editedSpot);
        dispatch(actionEditSpot(spotId, editedSpot));
        return editedSpot;
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const deletedSpot = await res.json();
        // console.log("deleteSpot - deletedSpot:", deletedSpot);
        dispatch(actionDeleteSpot(+deletedSpot.id));
        return deletedSpot;
    }
}

export const addSpotImage = (spotId, url, preview) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            url,
            preview
        })
    })

    if (res.ok) {
        const spotImage = await res.json();
        // console.log("addSpotImage - spotImage:", spotImage);
        dispatch(actionAddSpotImage(+spotId, url, preview));
        return spotImage;
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
            // console.log("LOAD_ALL_SPOTS", allSpotsState);
            return allSpotsState;
        }
        case LOAD_ALL_USER_SPOTS: {
            const userSpotsState = { ...state };
            userSpotsState.spots = normalize(action.spots);
            console.log("LOAD_ALL_USER_SPOTS", userSpotsState);
            return userSpotsState;
        }
        case LOAD_SPOT_DETAILS: {
            const spotDetails = { ...state };
            spotDetails.spot = { ...state.spot, [action.spot.id]: action.spot }
            // console.log("LOAD_SPOT_DETAILS - spotDetails", spotDetails);
            return spotDetails;
        }
        case ADD_SPOT: {
            const newSpotsState = { ...state };
            newSpotsState.spots = { ...state.spots, [ action.spot.id ]: action.spot }
            // const newSpotsState = { ...state, spots: { ...state.spots, [action.spot.id]: action.spot } };
            // newSpotsState.spots[action.spot.id] = action.spot;
            // console.log("ADD_SPOT - newSpotsState", newSpotsState);
            return newSpotsState;
        }
        case EDIT_SPOT: {
            const editSpotState = { ...state };
            editSpotState.spots = { ...state.spots, [ action.editedSpotId ]: action.editedSpot };
            // console.log("EDIT_SPOT - editSpotState:", editSpotState);
            return editSpotState;
        }
        case DELETE_SPOT: {
            const deleteSpotState = { ...state };
            // console.log("DELETE_SPOT - deleteSpotState:", deleteSpotState);
            delete deleteSpotState.spots[action.spotId];
            return deleteSpotState;
        }
        case ADD_SPOT_IMAGE: {
            const addSpotImageState = { ...state };
            // console.log("ADD_SPOT_IMAGE - addSpotImageState:", addSpotImageState);
            addSpotImageState.spots = { ...state.spots };
            addSpotImageState.spots[action.spotId] = { ...state.spots[action.spotId] };
            addSpotImageState.spots[action.spotId].previewImage = action.url;
            // console.log("addSpotImageState:", addSpotImageState);
            return addSpotImageState;
        }
        default:
            return state;
    }
}
