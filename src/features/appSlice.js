import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        channelId: null,
        channelName: null,
        channelProfile: null,
        channelCreatedAt: null,
        channelCreatedBy: null,
        users: [],
        channels: []
    },
    reducers: {
        setChannelInfo: (state, action) => {
            state.channelId = action.payload.channelId
            state.channelName = action.payload.channelName
            state.channelCreatedAt = action.payload.channelCreatedAt
            state.channelCreatedBy = action.payload.channelCreatedBy
            state.channelProfile = action.payload.channelProfile
        },
        setChannelUsers: (state, action) => {
            state.users = action.payload.channelUsers
        },
        setChannels:(state, action) => {
            state.channels = action.payload.channels
        }
    },
});

export const { setChannelInfo, setChannelUsers , setChannels} = appSlice.actions;

export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;
export const selectChannelCreatedAt = (state) => state.app.channelCreatedAt;
export const selectChannelCreatedBy = (state) => state.app.channelCreatedBy;
export const selectChannelProfile = (state) => state.app.channelProfile;
export const selectChannelUsers = (state) => state.app.users;
export const selectChannels = (state) => state.app.users



export default appSlice.reducer;
