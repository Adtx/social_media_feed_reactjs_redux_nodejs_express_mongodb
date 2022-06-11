import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const hostURL = 'http://localhost:8080'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await fetch(
      `${hostURL}/notifications?since=${latestTimestamp}`
    )
    const notifications = await response.json()
    return notifications
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  // initialState: [],
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach(notification => {
        notification.read = true
      })
    }
  },
  /* extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.push(...action.payload)
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date))
    }
  } */
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationsAdapter.upsertMany(state, action.payload)
      Object.values(state.entities).forEach(notification => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read
      })
    })
  }
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

// export const selectAllNotifications = state => state.notifications

export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors(state => state.notifications)