import React from 'react'
import { useSelector } from 'react-redux'
// import { selectUserById } from '../users/usersSlice'

export const PostAuthor = ({ userId }) => {
  /* const author = useSelector((state) =>
    state.users.find((user) => user._id === userId)
  ) */
  // const author = useSelector(selectUserById(userId))

  console.log('USERID: %s\n**************************************************', userId)
  console.dir(author)

  return <span>by {author ? author.username : 'Unknown author'}</span>
}
