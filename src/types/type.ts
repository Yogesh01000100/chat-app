export type Conversation = 'private' | 'public'

export interface User {
    id: string;
    name: string;
}

export interface Message {
    id: string;
    content: string;
    sender: User;
    timestamp: number;
}

export interface Chat {
    type: Conversation;
    title: string;
    messages: Message[];
    users: User[];
    currentUser: User;
}
