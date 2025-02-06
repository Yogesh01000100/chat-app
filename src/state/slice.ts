import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "../types/type";

const initialState: Chat = {
    type: 'private',
    title: '',
    messages: [
        {
            id: Date.now().toString(),
            content: "Hey there, how's your day going?",
            sender: { id: '2', name: 'Sainath' },
            timestamp: Date.now(),
        },
        {
            id: (Date.now() + 1).toString(),
            content: "It's going pretty well! Just finished a new painting.",
            sender: { id: '1', name: 'You' },
            timestamp: Date.now(),
        },
        {
            id: (Date.now() + 2).toString(),
            content: "That sounds awesome! Can't wait to see it.",
            sender: { id: '2', name: 'Sainath' },
            timestamp: Date.now(),
        },
        {
            id: (Date.now() + 3).toString(),
            content: "Sure, I'll send you a photo soon.",
            sender: { id: '1', name: 'You' },
            timestamp: Date.now(),
        },
        {
            id: (Date.now() + 4).toString(),
            content: "Perfect, looking forward to it!",
            sender: { id: '2', name: 'Sainath' },
            timestamp: Date.now(),
        },
    ],
    users: [
        { id: '1', name: 'You' },
        { id: '2', name: 'Sainath' },
    ],
    currentUser: { id: '1', name: 'You' },
};


const slice = createSlice({

    name: 'main',
    initialState,
    reducers: {
        changeType: (state) => {
            if (state.type === 'private') {
                state.type = 'public';
            } else {
                state.type = 'private';
            }
        },

        addMessage: (state, action: PayloadAction<string>) => {
            const newMessage: Message = {
                id: Date.now().toString(), // add id 
                content: action.payload,
                sender: state.currentUser,
                timestamp: Date.now(),
            }

            state.messages.push(newMessage);
        },
        deleteMessage: (state, action: PayloadAction<string>) => {
            const updatedState = state.messages.filter(
                (msg) => msg.id !== action.payload || msg.sender.id !== state.currentUser.id
            );

            state.messages = updatedState;
        }


    }
});

export const { changeType, addMessage, deleteMessage } = slice.actions;
export default slice.reducer;