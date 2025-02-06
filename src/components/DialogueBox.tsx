import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";

interface DialogueBoxProps {
  onDelete?: () => void;
  onEmoji?: () => void;
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
          <button onClick={onDelete} className="hover:text-red-600 mb-1">
            <DeleteIcon fontSize="small" />
          </button>
        )}
        {onEmoji && (
          <button onClick={onEmoji} className="hover:text-blue-600 mb-1">
            <EmojiEmotionsIcon fontSize="small" />
          </button>
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
