import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { Message, User } from "../types/type";
import { addReaction, deleteMessage } from "../state/slice";
import DialogueBox from "./DialogueBox";
import { useState, useMemo } from "react";
import { formatTimestamp } from "../services/timeConverter";
import { getRandomColors } from "../services/randomGenerator";

interface TextBarProps {
  data: Message;
  currentUser: User;
}

const TextBar: React.FC<TextBarProps> = ({ data, currentUser }) => {
  const isCurrentUser = data.sender.id === currentUser.id;
  const conversationType = useSelector((state: RootState) => state.main.type);
  const users = useSelector((state: RootState) => state.main.users);
  const dispatch: AppDispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const userColors = useMemo(() => {
    if (conversationType === "public") {
      const colors = getRandomColors();
      const colorMap: Record<string, string> = {};

      users.forEach((user, index) => {
        colorMap[user.id] = colors[index % colors.length];
      });

      return colorMap;
    }
    return {};
  }, [conversationType, users]);

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

  const handleCloseDialog = () => setDialogOpen(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const userColor = userColors[data.sender.id] || "bg-green-200";

  const canDeleteMessage =
    conversationType === "public" && currentUser.role === "admin";

  return (
    <div className="max-w-[70%]">
      <div
        onContextMenu={handleOpenDialog}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`px-3 py-2 my-2 ${
          isCurrentUser
            ? "bg-cyan-200 rounded-l-xl rounded-br-xl rounded-tr-sm text-left text-black border border-black"
            : `${userColor} rounded-r-xl rounded-bl-xl rounded-tl-sm text-left text-black border border-black`
        }`}
      >
        <div className="flex flex-row text-xs font-normal">
          {data.sender.name}
        </div>
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
      <div
        className={`flex flex-row ${
          isCurrentUser ? "justify-end" : "justify-start"
        }`}
      >
        {dialogOpen && (
          <DialogueBox
            onDelete={
              isCurrentUser || canDeleteMessage ? handleDelete : undefined
            }
            onEmoji={!isCurrentUser ? handleEmoji : undefined}
            onClose={handleCloseDialog}
          />
        )}
      </div>
    </div>
  );
};

export default TextBar;
