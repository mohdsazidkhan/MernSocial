import { GLOBALTYPES } from './globalTypes'
import { getDataAPI } from '../../utils/fetchData'

export const HASHTAG_TYPES = {
    LOADING: 'LOADING_HASHTAG',
    GET_POSTS: 'GET_HASHTAG_POSTS',
    UPDATE_POST: 'UPDATE_HASHTAG_POST'
}

export const getHashtagPosts = (token, hashtags) => async (dispatch) => {
    try {
        dispatch({type: HASHTAG_TYPES.LOADING, payload: true})

        const res = await getDataAPI(`post_hashtag/${hashtags}`, token)
        dispatch({type: HASHTAG_TYPES.GET_POSTS, payload: res.data})

        dispatch({type: HASHTAG_TYPES.LOADING, payload: false})

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}