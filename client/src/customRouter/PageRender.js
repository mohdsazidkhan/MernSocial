import React from 'react'
import {useParams} from 'react-router-dom'
import NotFound from '../components/NotFound'
import { useSelector } from 'react-redux'

const generatePage = (pageName) => {
    //console.log(pageName)
    const component = () => require(`../pages/${pageName}`).default

    try {
        return React.createElement(component())
    } catch (err) {
        return <NotFound />
    }
}

const PageRender = () => {
    const {page, id, hashtags} = useParams()
    const { auth } = useSelector(state => state)

    let pageName = "";

    if(auth.token){
        if(id){
            pageName = `${page}/[id]`
        }else if(hashtags){
            pageName = `${page+'/'+hashtags}`
        }else{
            pageName = `${page}`
        }
    }

    return generatePage(pageName)
}

export default PageRender
