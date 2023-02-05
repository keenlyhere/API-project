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

    // if (res.ok) {
        const data = await res.json();
        // console.log("login - data:", data);
        dispatch(actionSetUser(data.user));
        return data;
    // }
}

// thunk action to restore user session
export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch(`/api/session`);
    const data = await res.json();
    dispatch(actionSetUser(data.user));
    return res;
}

// thunk action to signup
export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password, image } = user;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);

    if (image) {
        formData.append("image", image);
    }

    // const res = await csrfFetch(`/api/users`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //         username,
    //         firstName,
    //         lastName,
    //         email,
    //         password
    //     })
    // });

    const res = await csrfFetch(`/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })

    const data = await res.json();
    // console.log("signup - data:", data);
    dispatch(actionSetUser(data));
    return res;
}

// thunk action to logout
export const logout = () => async (dispatch) => {
    const res = await csrfFetch(`/api/session`, {
        method: "DELETE"
    });

    dispatch(actionRemoveUser());

    return res;
}

const initialState = { user: null }

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER: {
            const setUserState = { ...state };
            setUserState.user = action.user;
            return setUserState;
        };
        case REMOVE_USER: {
            const removeUserState = { ...state };
            removeUserState.user = null;
            return removeUserState;
        };
        default:
            return state;
    }
}
