import {createSlice} from '@reduxjs/toolkit';
import OtherUser from '../components/OtherUser';
import Message from '../components/Message';

const userSlice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUser:null,
        selectedUser:null,
        onlineUsers:[]
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload;
        },
        setOtherUsers:(state,action)=>{
            state.otherUser=action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload
        }
    }
});
export const {setAuthUser,setOtherUsers,setSelectedUser,setOnlineUsers} =userSlice.actions;
export default userSlice.reducer;