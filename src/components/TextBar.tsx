import { Message, User } from "../types/type";

interface TextBarProps {
  data: Message;
  currentUser: User;
}

const TextBar: React.FC<TextBarProps> = ({ data, currentUser }) => {
  const isCurrentUser = data.sender.id === currentUser.id;
  return (
    <div
      className={`px-3 py-2 my-2 max-w-[70%] ${
        isCurrentUser
          ? "bg-cyan-400 rounded-l-2xl rounded-br-2xl rounded-tr-md text-left text-black border-2 border-black"
          : "bg-orange-400 rounded-r-2xl rounded-bl-2xl rounded-tl-md text-left text-black border-2 border-black"
      }`}
    >
      {data.content}
    </div>
  );
};

export default TextBar;
