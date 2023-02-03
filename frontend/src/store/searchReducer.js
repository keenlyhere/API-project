import { useParams } from "react-router-dom";
import { csrfFetch } from "./csrf";

const LOAD_SEARCH = "search/LOAD";
const DELETE_SEARCH = "search/DELETE";

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
    const res = await csrfFetch(`/api/spots/?location=${query}`)

    if (res.ok) {
        const queried_spots = await res.json();
        dispatch(actionLoadSearch(queried_spots));
        return queried_spots
    }
}

const initialState = { search: null }

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SEARCH: {
            const searchState = { ...state };
            searchState.search = action.search.queried_spots
            return searchState
        }
        case DELETE_SEARCH: {
            deleteSearchState = { ... state }
            deleteSearchState.search = null
        }
        default:
            return state
    }
}
