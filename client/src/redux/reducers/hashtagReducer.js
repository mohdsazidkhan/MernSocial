import { HASHTAG_TYPES } from '../actions/hashtagAction'

const initialState = {
    loading: false,
    posts: [],
    result: 9,
    page: 2,
    firstLoad: false
}

const hashtagReducer = (state = initialState, action) => {
    switch (action.type){
        case HASHTAG_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case HASHTAG_TYPES.GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                firstLoad: true
            };
        case HASHTAG_TYPES.UPDATE_POST:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                page: state.page + 1
            };
        default:
            return state;
    }
}

export default hashtagReducer
