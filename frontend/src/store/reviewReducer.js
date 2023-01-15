import { csrfFetch } from "./csrf";

const LOAD_USER_REVIEWS = "reviews/LOAD_USER_REVIEWS";
const LOAD_SPOT_REVIEWS = "reviews/LOAD_SPOT_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const ADD_REVIEW_IMAGE = "reviews/ADD_REVIEW_IMAGE";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const normalize = (reviews) => {
    const normalizedData = {};
    console.log("reviews.Reviews:", reviews)
    reviews.forEach(review => normalizedData[review.id] = review);
    console.log("normalize - normalizedData:", normalizedData);
    return normalizedData;
}

// action creators
export const actionLoadUserReviews = (userId, reviews) => {
    return {
        type: LOAD_USER_REVIEWS,
        reviews
    }
}

export const actionLoadSpotReviews = (spotId, reviews) => {
    return {
        type: LOAD_SPOT_REVIEWS,
        spotId,
        reviews
    }
}

// thunk actions
export const loadUserReviews = (userId) => async (dispatch) => {
    const res = await csrfFetch("/api/reviews/current");

    if (res.ok) {
        const reviews = await res.json();
        console.log("loadUserReviews - reviews:", reviews);
        dispatch(actionLoadUserReviews(userId, reviews));
        return reviews;
    }
}

export const loadSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const reviews = await res.json();
        console.log("loadSpotReviews - reviews:", reviews);
        dispatch(actionLoadSpotReviews(spotId, reviews));
        return reviews;
    }
}

const initialState = {
    spot: {},
    user: {}
}
export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_REVIEWS: {
            const userReviewsState = { ...state };
            userReviewsState.reviews = normalize(action.reviews);
            console.log("LOAD_USER_REVIEWS - userReviewsState", userReviewsState);
            return userReviewsState;
        }
        case LOAD_SPOT_REVIEWS: {
            const spotReviewsState = { ...state };
            console.log("LOAD_SPOT_REVIEWS - action.reviews:", action.reviews)
<<<<<<< HEAD
            spotReviewsState.spot = normalize(action.reviews);
=======
            if (action.reviews.Reviews) {
                spotReviewsState.spot = normalize(action.reviews.Reviews);
            } else {
                return { ...state, spot: null }
            }
>>>>>>> feature-reviews
            console.log("LOAD_SPOT_REVIEWS - spotReviewsState:", spotReviewsState)
            return spotReviewsState;
        }
        default:
            return state;
    }
}