import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "../types/type";

const initialState: Chat = {
    type: 'private',
    title: '',
    messages: [],
    users: [{ id: '1', name: 'You' },
    { id: '2', name: 'Ram' },],
    currentUser: { id: '1', name: 'You' },
}

const slice = createSlice({

    name: 'main',

    initialState,

    reducers: {
        changeType: (state) => {
            if(state.type==='private'){
                state.type='public';
            }else{
                state.type='private';
            }
        },

        addMessage: (state, action: PayloadAction<string>) => {
            const newMessage: Message={
                id: Date.now().toString(), // add id 
                content: action.payload,
                sender: state.currentUser,
                timestamp: Date.now(),
            }

            state.messages.push(newMessage);
        },
    }
});

export const { changeType, addMessage } = slice.actions;
export default slice.reducer;