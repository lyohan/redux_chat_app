// reducers.js
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE } from './config'

const initialState = {
    room: null,
    chatLog: [],
    username: null,
    loading: {
      createRoomLoading: false,
      joinRoomLoading: false,
    }
}

export const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      createRoomRequest: (state) => {
        state.loading.createRoomLoading = true
      },
      createRoomSuccess: (state, action) => {
        state.room = action.payload
      },
      createRoomError: (state, action) => {
        state.loading.createRoomLoading = false
        console.log(action.payload)
      },
      joinRoomRequest: (state) => {
        state.loading.joinRoomLoading = true
      },
      joinRoomSuccess: (state, action) => {
          state.room = action.payload
      },
      joinRoomError: (state, action) => {
        state.loading.joinRoomLoading = false
        console.log(action.payload)
      },
      setUsername: (state, action) => {
          state.username = action.payload
      },
      updateChatLog: (state, action) => {
          if (state.room !== null && action.payload.roomId === state.room.id) {
              state.chatLog.push(action.payload.data)
          }
      }
    }
})

export function createRoom(roomName) {
    return async function (dispatch) {
        dispatch(chat.actions.createRoomRequest())
        try {
            const res = await axios.get(`${API_BASE}/room?/name=${roomName}`)
            dispatch(chat.actions.createRoomSuccess(res.data))
        } catch (err) {
            dispatch(chat.actions.createRoomError(err))
        }
    }
}

export function joinRoom(roomId) {
    return async function (dispatch) {
        dispatch(chat.actions.joinRoomRequest())
        try {
            const res = await axios.get(`${API_BASE}/room/${roomId}`)
            dispatch(chat.actions.joinRoomSuccess(res.data))
        } catch (err) {
            dispatch(chat.actions.joinRoomError(err))
        }
    }
}

export const { createRoomSuccess, joinRoomSuccess, setUsername, updateChatLog } = chat.actions
export default chat.reducer
