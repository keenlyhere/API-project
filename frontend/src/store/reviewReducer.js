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

export const actionAddReview = (spotId, review) => {
    return {
        type: ADD_REVIEW,
        spotId,
        review
    }
}

export const actionDeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
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
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const reviews = await res.json();
        console.log("loadSpotReviews - reviews:", reviews);
        dispatch(actionLoadSpotReviews(spotId, reviews));
        return reviews;
    }
}

export const addReview = (spotId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const review = await res.json();
        console.log("addReview - review:", review);
        dispatch(actionAddReview(spotId, review));
        return review;
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        const deletedReview = await res.json();
        console.log("deleteReview - deletedReview:", deleteReview);
        dispatch(actionDeleteReview(reviewId));
        return deletedReview;
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
            if (action.reviews.Reviews) {
                spotReviewsState.spot = normalize(action.reviews.Reviews);
            } else {
                return { ...state, spot: null }
            }
            console.log("LOAD_SPOT_REVIEWS - spotReviewsState:", spotReviewsState)
            return spotReviewsState;
        }
        case ADD_REVIEW: {
            const addReviewState = { ...state };
            addReviewState.user = { ...state.user, [action.review.id]: action.review }
            console.log("ADD_REVIEW - addReviewState:", addReviewState);
            return addReviewState;
        }
        case DELETE_REVIEW: {
            const deleteReviewState = { ...state };
            delete deleteReviewState.spot[action.reviewId];
            delete deleteReviewState.user[action.reviewId];
            return deleteReviewState;
        }
        default:
            return state;
    }
}
