import { csrfFetch } from "./csrf";

const LOAD_USER_BOOKINGS = "bookings/LOAD_USER_BOOKINGS";
const LOAD_SPOT_BOOKINGS = "bookings/LOAD_SPOT_BOOKINGS";
const ADD_BOOKING = "bookings/ADD_BOOKING";
const EDIT_BOOKING = "bookings/EDIT_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

const normalize = (bookings) => {
    const normalizedData = {};
    bookings.forEach(booking => normalizedData[booking.id] = booking);
    // console.log("normalize - bookings.Bookings:", bookings);
    // console.log("normalize - normalizedData:", normalizedData);
    return normalizedData;
}

// action creators
export const actionLoadUserBookings = (userId, bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        userId,
        bookings
    }
}

export const actionLoadSpotBookings = (spotId, bookings) => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        spotId,
        bookings
    }
}

export const actionAddBooking = (spotId, booking) => {
    return {
        type: ADD_BOOKING,
        spotId,
        booking
    }
}

export const actionEditBooking = (bookingId, booking) => {
    return {
        type: EDIT_BOOKING,
        bookingId,
        booking
    }
}

export const actionDeleteBooking = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}

// thunk actions
export const loadUserBookings = (userId) => async (dispatch) => {
    const res = await csrfFetch("/api/bookings/current");

    if (res.ok) {
        const bookings = await res.json();
        // console.log("loadUserBookings - userId:", userId);
        // console.log("loadUserBookings - bookings:", bookings);
        dispatch(actionLoadUserBookings(userId, bookings));
        return bookings;
    }
}

export const loadSpotBookings = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (res.ok) {
        const bookings = await res.json();
        // console.log("loadSpotBookings - spotId:", spotId);
        // console.log("loadSpotBookings - bookings:", bookings);
        dispatch(actionLoadSpotBookings(spotId, bookings));
        return bookings;
    }
}

export const addBooking = (spotId, booking) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    })

    if (res.ok) {
        const newBooking = await res.json();
        // console.log("addBooking - spotId:", spotId);
        // console.log("addBooking - booking:", newBooking);
        dispatch(actionAddBooking(spotId, newBooking))
        return newBooking;
    }
}

export const editBooking = (bookingId, booking) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    })

    if (res.ok) {
        const editedBooking = await res.json();
        // console.log("editBooking - bookingId:", bookingId);
        // console.log("editBooking - editedBooking:", editedBooking);
        dispatch(actionEditBooking(bookingId, editedBooking))
        return editedBooking;
    }
}

export const deleteBooking = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const deletedBooking = await res.json();
        // console.log("deleteBooking - bookingId:", bookingId);
        // console.log("deleteBooking - deletedBooking:", deletedBooking);
        dispatch(actionDeleteBooking(bookingId));
        return deletedBooking;
    }
}


const initialState = {
    spot: {},
    user: {}
}

export default function bookingReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_BOOKINGS: {
            const userBookingsState = { ...state };
            if (action.bookings.Bookings) {
                userBookingsState.user = normalize(action.bookings.Bookings);
            } else {
                return { ...state, user: null };
            }
            // console.log("LOAD_USER_BOOKINGS - userBookingsState:", userBookingsState);
            return userBookingsState;
        }
        case LOAD_SPOT_BOOKINGS: {
            const spotBookingsState = { ...state };
            if (action.bookings.Bookings) {
                spotBookingsState.spot = normalize(action.bookings.Bookings);
            } else {
                return { ...state, spot: null };
            }
            // console.log("LOAD_SPOT_BOOKINGS - spotBookingsState:", spotBookingsState);
            return spotBookingsState;
        }
        case ADD_BOOKING: {
            const addBookingState = { ...state };
            addBookingState.spot = { ...state.spot, [action.booking.id]: action.booking};
            // console.log("ADD_BOOKING - addBookingState:", addBookingState);
            return addBookingState;
        }
        case EDIT_BOOKING: {
            const editBookingState = { ...state };
            editBookingState.spot = { ...state.spot, [action.bookingId]: { ...state.spot[action.bookingId], startDate: action.booking.startDate, endDate: action.booking.endDate } };
            editBookingState.user = { ...state.user, [action.bookingId]: action.booking };
            // console.log("EDIT_BOOKING - editBookingState:", editBookingState);
            return editBookingState;
        }
        case DELETE_BOOKING: {
            const deleteBookingState = { ...state };
            delete deleteBookingState.spot[action.bookingId];
            delete deleteBookingState.user[action.bookingId];
            // console.log("DELETE_BOOKING - deleteBookingState:", deleteBookingState);
            return deleteBookingState;
        }
        default:
            return state;
    }
}
