import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { availableEmojis } from "../types/type";

interface DialogueBoxProps {
  onDelete?: () => void;
  onEmoji?: (emoji: string) => void;
  onClose: () => void;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({
  onDelete,
  onEmoji,
  onClose,
}) => {
  return (
    <div className="bg-slate-50 px-1 rounded-md border border-black max-w-max">
      <div className="flex space-x-1">
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-sky-900  hover:text-red-500 mb-1"
          >
            <DeleteIcon fontSize="small" />
          </button>
        )}
        {onEmoji && (
          <div className="flex space-x-1 py-1">
            {availableEmojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => onEmoji(emoji)}
                className="hover:text-blue-600"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={onClose}
          className="flex items-center text-gray-500 hover:text-gray-600"
        >
          <CancelTwoToneIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default DialogueBox;
