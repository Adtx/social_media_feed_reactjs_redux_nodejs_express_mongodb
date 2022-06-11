import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import {
  selectAllPosts,
  fetchPosts,
  selectPostIds,
  selectPostById
} from './postsSlice'
import { Spinner } from '../../components/Spinner'

let PostExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId))
  return (
    <article className="post-excerpt" key={post._id}>
      <h3>{post.title}</h3>
      <div>
        {/* <PostAuthor userId={post.username} /> */}
        <TimeAgo timestamp={post.createdAt} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post._id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}
PostExcerpt = React.memo(PostExcerpt)

export const PostsList = () => {
  // const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  // const posts = useSelector(selectAllPosts)
  const orderedPostIds = useSelector(selectPostIds)

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  // Sort posts in reverse chronological order by datetime string
  /* const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => {
    return (
      <article className="post-excerpt" key={post._id}>
        <h3>{post.title}</h3>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content.substring(0, 100)}</p>

        <ReactionButtons post={post} />
        <Link to={`/posts/${post._id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    )
  }) */

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    /* const orderedPosts = posts
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    content = orderedPosts.map(post => (
      <PostExcerpt key={post._id} post={post} />
    )) */
    content = orderedPostIds.map(postId => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }


  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {/* {renderedPosts} */}
      {content}
    </section>
  )
}
