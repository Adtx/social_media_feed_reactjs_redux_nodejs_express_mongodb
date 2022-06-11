import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'

/* const initialState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
] */

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()


const hostURL = 'http://localhost:8080'

// const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(`${hostURL}/users`)
  const users = await response.json()
  return users.map(user => ({...user, id: user._id}))
})

export const createUser = createAsyncThunk('users/createUser', 
  async newUser => {
    const response = await fetch(`${hostURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newUser)
    })
    const user = await response.json()
    return {...user, id: user._id}
})

export const loginUser = createAsyncThunk('users/loginUser', async () => {
  const response = await fetch(`${hostURL}/users`)
  const users = await response.json()
  return users
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      /* .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload
        // state = state.concat(action.payload)
      }) */
      .addCase(fetchUsers.fulfilled, usersAdapter.setAll)
      .addCase(createUser.fulfilled, (state, action) => {
        usersAdapter.setOne(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        return action.payload
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        return action.payload
      })
  }
})

export default usersSlice.reducer

/* export const selectAllUsers = state => state.users

export const selectUserById = (state, userId) =>
  state.users.find(user => user._id === userId)
 */

  /* export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
  } = usersAdapter.getSelectors(state => state.users) */