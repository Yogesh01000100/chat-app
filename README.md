# Chat Application Interface (React + Redux + Tailwind + TypeScript)

---

## Project Overview
This is a chat application interface. It supports both **public** and **private** chat types, featuring role-based message management and reactions.

---

## Features
- **Role-based Access Control**:
  - Admins can edit the chat title and delete any message in the public chat.
  - Members can send and react to messages but can only delete their own messages.
  
- **Chat Types**:
  - **Public Chat**: Multiple users can participate, and the admin controls the chat title.
  - **Private Chat**: Users can engage in one-on-one conversations.

- **Interface**:
  - Scrollable message list with auto-scroll to the latest message.
  - Custom theme with **Tailwind CSS** and **Material UI** icons.

- **Interactive Features**:
  - Message reactions with emojis.
  - Context menu for message actions (delete, reactions).

---

## Tech Stack
- **Frontend**: React, Redux, TypeScript, Tailwind CSS, Material UI  

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Yogesh01000100/chat-app.git
   cd chat-app
   ```
2. **Install Dependencies**:
    ```bash 
    npm install
    ```

3. **Start Project**:
    ```bash 
    npm run dev
    ```