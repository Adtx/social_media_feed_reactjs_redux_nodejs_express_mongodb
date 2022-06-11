import React from 'react'
// import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

// import { fetchNotifications } from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  // const dispatch = useDispatch()

  /* const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  } */

  const history = useHistory()

  return (
    <nav>
      <section>
        <h1>Social Media Feed App</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Home</Link>
            {/* <Link to="/users">Users</Link> */}
            {/* <Link to="/notifications">Notifications</Link> */}
          </div>
          {/* <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button> */}
          <button className="button" onClick={() => history.push('/newPost')}>
            New Post
          </button>
        </div>
      </section>
    </nav>
  )
}