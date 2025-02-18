export type Conversation = 'private' | 'public'
export type Role='admin' | 'member' | 'none'
export const availableEmojis = ["😊", "👍", "🎉"];

export interface User {
    id: string;
    name: string;
    role: Role;
}

export interface Reaction {
    emoji: string;
    count: number;
}

export interface Message {
    id: string;
    content: string;
    sender: User;
    timestamp: number;
    reactions: Reaction[];
}

export interface Chat {
    type: Conversation;
    title: string;
    messages: Message[];
    users: User[];
    currentUser: User;
}
