import { csrfFetch } from "./csrf";

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const EDIT_USER = "session/EDIT_USER";

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

export const actionEditUser = (user) => {
    return {
        type: EDIT_USER,
        user
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
    const { username, firstName, lastName, email, password, profileImageUrl } = user;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    // console.log("formData, append:", username, formData.append("username", username), formData.get(username));

    if (profileImageUrl) {
        formData.append("image", profileImageUrl);
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

// thunk action to change user profile image
export const editUser = (user) => async(dispatch) => {
    const { userId, profileImageUrl } = user;
    const formData = new FormData();

    formData.append("userId", userId);

    if (profileImageUrl) {
        formData.append("image", profileImageUrl)
    }

    const res = await csrfFetch(`/api/users`, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })

    if (res.ok) {
        const editedUser = await res.json();
        dispatch(actionEditUser(editedUser))
    }
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
        case EDIT_USER: {
            const editUserState = { ...state }
            editUserState.user = action.user;
            return editUserState;
        }
        default:
            return state;
    }
}
