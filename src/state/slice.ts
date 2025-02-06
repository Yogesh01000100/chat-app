import { createSlice } from "@reduxjs/toolkit";

type Conversation = 'private' | 'public'


interface User {
    id: string;
    name: string;
}

interface Message {
    id: string;
    content: string;
    sender: User;
    timestamp: number;
}

interface Chat {
    type: Conversation;
    title: string;
    messages: Message[];
    users: User[];
    currentUser: User;
}


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

    }
})