import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "../types/type";
import { v4 as uuidv4 } from 'uuid';


const initialState: Chat = {
    type: 'public',
    title: '',
    messages: [
        {
            id: uuidv4(),
            content: "Hello everyone! Welcome to the public chat.",
            sender: { id: '3', name: 'Sriram', role: 'member' },
            timestamp: Date.now(),
            reactions: [],
        },
        {
            id: uuidv4(),
            content: "Hey Sriram! Nice to see you here.",
            sender: { id: '2', name: 'Sainath', role: 'member' },
            timestamp: Date.now(),
            reactions: [],
        },
        {
            id: uuidv4(),
            content: "Hi everyone, let's keep it fun and friendly!",
            sender: { id: '4', name: 'Nitin', role: 'member' },
            timestamp: Date.now(),
            reactions: [],
        },
        {
            id: uuidv4(),
            content: "Doing good! Excited to see how our new assignee performs.",
            sender: { id: '3', name: 'Sriram', role: 'member' },
            timestamp: Date.now(),
            reactions: [],
        },
        {
            id: uuidv4(),
            content: "Haha, no pressure! Let me know if you need anything.",
            sender: { id: '4', name: 'Nitin', role: 'member' },
            timestamp: Date.now(),
            reactions: [],
        },
        {
            id: uuidv4(),
            content: "Sure thing, Nitin! Thanks. I'll give my best on this assignment.",
            sender: { id: '1', name: 'You', role: 'admin' },
            timestamp: Date.now(),
            reactions: [],
        },
        {
            id: uuidv4(),
            content: "Great! We're here to help if you have any blockers. Right, Sriram?",
            sender: { id: '2', name: 'Sainath', role: 'member' },
            timestamp: Date.now(),
            reactions: [],
        },
        {
            id: uuidv4(),
            content: "Of course! Collaboration is key. Let's rock this project!",
            sender: { id: '3', name: 'Sriram', role: 'member' },
            timestamp: Date.now(),
            reactions: [],
        }
    ],
    users: [
        { id: '1', name: 'You', role: 'admin' },
        { id: '2', name: 'Sainath', role: 'member' },
        { id: '3', name: 'Sriram', role: 'member' },
        { id: '4', name: 'Nitin', role: 'member' }
    ],
    currentUser: { id: '1', name: 'You', role: 'admin' },
};


const slice = createSlice({

    name: 'main',
    initialState,
    reducers: {
        changeType: (state) => {
            if (state.type === 'private') {
                state.type = 'public';
                state.users.push(
                    { id: '3', name: 'Sriram', role: 'member' },
                    { id: '4', name: 'Nitin', role: 'member' }
                );
                state.messages = [
                    {
                        id: uuidv4(),
                        content: "Hello everyone! Welcome to the public chat.",
                        sender: { id: '3', name: 'Sriram', role: 'member' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                    {
                        id: uuidv4(),
                        content: "Hey Sriram! Nice to see you here.",
                        sender: { id: '2', name: 'Sainath', role: 'member' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                    {
                        id: uuidv4(),
                        content: "Hi everyone, let's keep it fun and friendly!",
                        sender: { id: '4', name: 'Nitin', role: 'member' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                    {
                        id: uuidv4(),
                        content: "Doing good! Excited to see how our new assignee performs.",
                        sender: { id: '2', name: 'Sainath', role: 'member' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                    {
                        id: uuidv4(),
                        content: "Haha, no pressure! Let me know if you need anything.",
                        sender: { id: '4', name: 'Nitin', role: 'member' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                    {
                        id: uuidv4(),
                        content: "Sure thing, Nitin! Thanks. I'll give my best on this assignment.",
                        sender: { id: '1', name: 'You', role: 'admin' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                    {
                        id: uuidv4(),
                        content: "Great! We're here to help if you have any blockers. Right, Sriram?",
                        sender: { id: '2', name: 'Sainath', role: 'member' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                    {
                        id: uuidv4(),
                        content: "Of course! Collaboration is key. Let's rock this project!",
                        sender: { id: '3', name: 'Sriram', role: 'member' },
                        timestamp: Date.now(),
                        reactions: [],
                    }
                ];

            } else {
                state.type = 'private';
                state.users = [
                    { id: '1', name: 'You', role: 'none' },
                    { id: '2', name: 'Sainath', role: 'none' },
                ]
                state.messages = [
                    {
                        id: uuidv4(),
                        content: "Hey there, how's your day going?",
                        sender: { id: '2', name: 'Sainath', role: 'none' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                    {
                        id: uuidv4(),
                        content: "It's going pretty well! Just finished a new painting.",
                        sender: { id: '1', name: 'You', role: 'none' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                    {
                        id: uuidv4(),
                        content: "That sounds awesome! Can't wait to see it.",
                        sender: { id: '2', name: 'Sainath', role: 'none' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                    {
                        id: uuidv4(),
                        content: "Sure, I'll send you a photo soon.",
                        sender: { id: '1', name: 'You', role: 'none' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                    {
                        id: uuidv4(),
                        content: "Perfect, looking forward to it!",
                        sender: { id: '2', name: 'Sainath', role: 'none' },
                        timestamp: Date.now(),
                        reactions: [],
                    },
                ]
            }
        },

        addMessage: (state, action: PayloadAction<string>) => {
            const newMessage: Message = {
                id: uuidv4(),
                content: action.payload,
                sender: state.currentUser,
                timestamp: Date.now(),
                reactions: [],
            }

            state.messages.push(newMessage);
        },
        deleteMessage: (state, action: PayloadAction<string>) => {
            const updatedState = state.messages.filter(
                (msg) => msg.id !== action.payload
            );

            state.messages = updatedState;
        },

        addReaction: (state, action: PayloadAction<{ messageId: string, emoji: string }>) => {
            const { messageId, emoji } = action.payload;

            const message = state.messages.find((msg) => {
                return msg.id === messageId;
            });

            if (message) {
                const existingReaction = message.reactions.find((reaction) => {
                    return reaction.emoji === emoji;
                })

                if (existingReaction) {
                    existingReaction.count += 1;
                } else {
                    message.reactions.push({ emoji, count: 1 });
                }
            }
        },
        updateTitle: (state, action: PayloadAction<string>) => {
            if (state.type === 'public' && state.currentUser.role === 'admin') {
                state.title = action.payload;
            }
        }

    }
});

export const { changeType, addMessage, deleteMessage, addReaction, updateTitle } = slice.actions;
export default slice.reducer;