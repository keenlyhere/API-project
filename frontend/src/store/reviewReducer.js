import { csrfFetch } from "./csrf";

const LOAD_USER_REVIEWS = "reviews/LOAD_USER_REVIEWS";
const LOAD_SPOT_REVIEWS = "reviews/LOAD_SPOT_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const ADD_REVIEW_IMAGE = "reviews/ADD_REVIEW_IMAGE";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const normalize = (reviews) => {
    const normalizedData = {};
    console.log("reviews.Reviews:", reviews.Reviews)
    reviews.Reviews.forEach(review => normalizedData[review.id] = review);
    console.log("normalize - normalizedData:", normalizedData);
    return normalizedData;
}

// action creators
export const actionLoadUserReviews = (reviews) => {
    return {
        type: LOAD_USER_REVIEWS,
        reviews
    }
}

// thunk actions
export const loadUserReviews = () => async (dispatch) => {
    const res = await csrfFetch("/api/reviews/current");

    if (res.ok) {
        const reviews = await res.json();
        console.log("loadUserReviews - reviews:", reviews);
        dispatch(actionLoadUserReviews(reviews));
        return reviews;
    }
}

const initialState = {
    reviews: {}
}
export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_REVIEWS: {
            const userReviewsState = { ...state };
            userReviewsState.reviews = normalize(action.reviews);
            console.log("LOAD_USER_REVIEWS - userReviewsState", userReviewsState);
            return userReviewsState;
        }
        default:
            return state;
    }
}
