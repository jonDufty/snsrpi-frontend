import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, postsSelector } from '../slices/posts'
// Bring in the asynchronous fetchPosts action
import {Post} from './Post'

const Monitor = () => {

    const dispatch = useDispatch()
    const { posts, loading, hasErrors } = useSelector(postsSelector)

    useEffect(() => {
        dispatch(fetchPosts())
      }, [dispatch])
    
      // Show loading, error, or success state
      const renderPosts = () => {
        if (loading) return <p>Loading posts...</p>
        if (hasErrors) return <p>Unable to display posts.</p>
        return posts.map((post) => <Post key={post.id} post={post} />)
      }
    
      return (
        <section>
          <h1>Posts</h1>
          {renderPosts()}
        </section>
      )
}


// Connect Redux to React
export default Monitor;