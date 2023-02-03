import { csrfFetch } from "./csrf";

const LOAD_SEARCH = "search/LOAD";
const DELETE_SEARCH = "search/DELETE";

const normalize = (spots) => {
    const normalizedData = {};
    spots.Spots.forEach(spot => normalizedData[spot.id] = spot);
    return normalizedData;
}

// action creators
export const actionLoadSearch = (queried_spots) => {
    return {
        type: LOAD_SEARCH,
        queried_spots
    }
}

export const actionDeleteSearch = () => {
    return {
        type: DELETE_SEARCH
    }
}

// thunk actions
export const loadSearch = (query) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots?location=${query}`)

    if (res.ok) {
        const queried_spots = await res.json();
        console.log("queried_spots", queried_spots.Spots)
        dispatch(actionLoadSearch(queried_spots));
        return queried_spots;
    }
}

const initialState = {
    search: null,
    suggestions: null
}

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SEARCH: {
            const searchState = { ...state };
            searchState.search = normalize(action.queried_spots);
            return searchState;
        }
        case DELETE_SEARCH: {
            const deleteSearchState = { ... state };
            deleteSearchState.search = null;
            return deleteSearchState;
        }
        default:
            return state;
    }
}
