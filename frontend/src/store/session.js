import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

export const actionSetUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const actionRemoveUser = () => {
    return {
        type: REMOVE_USER
    }
}

// thunk action to login
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const res = await csrfFetch(`/api/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            credential,
            password
        })
    })

    if (res.ok) {
        const data = await res.json();
        console.log("data:", data);
        dispatch(actionSetUser(data))
        return data;
    }
}

// thunk action to restore user session
export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch(`/api/session`);
    const data = await res.json();
    dispatch(actionSetUser(data.user));
    return res;
}

// thunk action to logout
export const thunkActionLogout = () => async (dispatch) => {
    const res = await csrfFetch(`/api/session`, {
        method: "DELETE"
    });

    dispatch(actionRemoveUser());

    return res;
}

const initialState = { user: null }

export default function sessionReducer(state = initialState, action) {
    let newState = { ...state };
    switch(action.type) {
        case SET_USER: {
            newState.user = action.user;
            console.log("setUser / newState:", newState);
            return newState;
        };
        case REMOVE_USER: {
            newState.user = null;
            return newState;
        };
        default:
            return state;
    }
}
