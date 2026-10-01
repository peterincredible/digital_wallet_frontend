import { createSlice} from '@reduxjs/toolkit'
let initialState = {user:null,token:""}
const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state,action) => {
    //   console.log("state is",state)
    //   console.log("state is again",state.user)
    //   console.log("state is again again",state.token)
    //   console.log("reducers called",action,action.payload.user,action.payload.token)

      state.user=action.payload.user;
      state.token=action.payload.token;
    },
    logout: (state) => {
      state.user=null;
      state.token="";
    }
  }
})
export const { login, logout } = AuthSlice.actions
export default AuthSlice.reducer;