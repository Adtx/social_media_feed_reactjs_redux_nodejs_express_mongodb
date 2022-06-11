import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addNewPost } from './postsSlice'
// import { postAdded } from './postsSlice'
// import { selectAllUsers } from '../users/usersSlice'
import { useHistory } from 'react-router-dom'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  // const users = useSelector((state) => state.users)
  // const users = selectAllUsers()
  const history = useHistory()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
  const canSave =
    // [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
    [title, content].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        /* setTitle('')
        setContent('')
        setUserId('') */
        history.push('/')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  /* const onSavePostClicked = () => {
    if (title && content) {
      // dispatch(
        // postAdded({
          // id: nanoid(),
          // title,
          // content
        // })
      // )

      dispatch(postAdded(title, content, userId))
      setTitle('')
      setContent('')
    }
  } */

 /*  const usersOptions = users.map(user => (
      <option key={user._id} value={user._id}>
        {user.username}
      </option>
  )) */

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        {/* <label htmlFor="postAuthor">Author:</label> */}
       {/*  <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select> */}
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={false}>
          Save Post
        </button>
      </form>
    </section>
  )
}
