import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { Message, User } from "../types/type";
import { addReaction, deleteMessage } from "../state/slice";
import DialogueBox from "./DialogueBox";
import { useState } from "react";
import { formatTimestamp } from "../services/timeConverter";

interface TextBarProps {
  data: Message;
  currentUser: User;
}

const TextBar: React.FC<TextBarProps> = ({ data, currentUser }) => {
  const isCurrentUser = data.sender.id === currentUser.id;
  const dispatch: AppDispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenDialog = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteMessage(data.id));
    setDialogOpen(false);
  };

  const handleEmoji = (emoji: string) => {
    dispatch(addReaction({ messageId: data.id, emoji }));
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="max-w-[65%]">
      <div
        onContextMenu={handleOpenDialog}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`px-3 py-2 my-2 ${
          isCurrentUser
            ? "bg-cyan-300 rounded-l-2xl rounded-br-2xl rounded-tr-md text-left text-black border-2 border-black"
            : "bg-slate-300 rounded-r-2xl rounded-bl-2xl rounded-tl-md text-left text-black border-2 border-black"
        }`}
      >
        <div>
          <div>{data.content}</div>
          <div
            className={`flex flex-row ${
              data.reactions.length > 0 ? "justify-between" : "justify-end"
            } font-light text-xs`}
          >
            {data.reactions.length > 0 && (
              <div className="flex flex-row">
                {data.reactions.map((msg) => (
                  <ul key={msg.emoji}>
                    {msg.emoji}
                    {isHovered && msg.count}
                  </ul>
                ))}
              </div>
            )}
            {formatTimestamp(data.timestamp)}
          </div>
        </div>
      </div>
      <div
        className={`flex flex-row ${
          isCurrentUser ? "justify-end" : "justify-start"
        }`}
      >
        {dialogOpen && (
          <DialogueBox
            onDelete={isCurrentUser ? handleDelete : undefined}
            onEmoji={!isCurrentUser ? handleEmoji : undefined}
            onClose={handleCloseDialog}
          />
        )}
      </div>
    </div>
  );
};

export default TextBar;
