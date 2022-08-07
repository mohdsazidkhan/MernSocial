import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getHashtagPosts, HASHTAG_TYPES } from '../redux/actions/hashtagAction'
import LoadIcon from '../images/loading.gif'
import PostThumb from '../components/PostThumb'
import LoadMoreBtn from '../components/LoadMoreBtn'
import { getDataAPI} from '../utils/fetchData'

const Hashtag = () => {
    const hashtags  = window.location.href.split('#').pop()
    const { auth, hashtag } = useSelector(state => state)
    const dispatch = useDispatch()

    //console.log(hashtags)

    const [load, setLoad] = useState(false)

    useEffect(() => {
        if(!hashtag.firstLoad){
            dispatch(getHashtagPosts(auth.token, hashtags))
        }
    },[dispatch, auth.token, hashtag.firstLoad])

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`post_hashtag/${hashtags}?num=${hashtag.page * 9}`, auth.token)
        dispatch({type: HASHTAG_TYPES.UPDATE_POST, payload: res.data})
        setLoad(false)
    }

    return (
        <div>
            {
                hashtag.loading 
                ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
                : <PostThumb posts={hashtag.posts} result={hashtag.result} />
            }

            {
                load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            {
                !hashtag.loading &&
                <LoadMoreBtn result={hashtag.result} page={hashtag.page}
                load={load} handleLoadMore={handleLoadMore} />
            }
            
        </div>
    )
}

export default Hashtag
