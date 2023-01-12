import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS";
const LOAD_SPOT = "spots/LOAD_SPOT";
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


const initialState = {
    spots: {}
}

export default function spotReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_SPOTS: {
            const newState = { ...state };
            newState.spots = normalize(action.spots);
            return newState;
        }
        default:
            return state;
    }
}
