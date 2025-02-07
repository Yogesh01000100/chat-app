import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { changeType, updateTitle } from "../state/slice";
import { useEffect, useState } from "react";
import { User } from "../types/type";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { generateRandomTitle } from "../services/randomGenerator";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const chatType = useSelector((state: RootState) => state.main.type);
  const currentUser = useSelector((state: RootState) => state.main.currentUser);
  const currentTitle = useSelector((state: RootState) => state.main.title);
  const users = useSelector((state: RootState) => state.main.users);

  const [otherUsers, setOtherUsers] = useState<User[]>([]);
  const [editTitle, setEditTitle] = useState<string>(currentTitle);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (users && currentUser) {
      const members = users.filter((user) => user.id !== currentUser.id);
      setOtherUsers(members);
    }
  }, [users, currentUser]);

  useEffect(() => {
    if (chatType === "public" && !currentTitle) {
      const title = generateRandomTitle();
      dispatch(updateTitle(title));
    }
  }, [chatType, currentTitle, dispatch]);

  const handleEditClick = () => {
    if (currentUser.role === "admin") {
      setEditTitle(currentTitle);
      setIsEditing(true);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleSaveClick = () => {
    if (editTitle.trim()) {
      dispatch(updateTitle(editTitle));
    }
    setIsEditing(false);
  };

  const handleChat = () => {
    dispatch(changeType());
  };

  return (
    <header className="flex items-center justify-between bg-sky-900 border-b-2 border-black p-3">
      {chatType === "private" ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="text-4xl mb-1 text-white">
            <AccountCircleIcon fontSize="inherit" />
          </div>
          <div className="flex flex-col text-white">
            {otherUsers.map((user) => (
              <div key={user.id} className="font-medium">
                {user.name}
              </div>
            ))}
            <div className="text-sm">online</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center text-white text-md space-x-2">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={handleTitleChange}
                className="p-1 px-3 text-black bg-white border-2 border-black rounded-xl outline-none"
              />
              <button onClick={handleSaveClick} className="text-white">
                <SaveAsIcon />
              </button>
            </>
          ) : (
            <>
              <span>{currentTitle || "Public Chat Room"}</span>
              {currentUser.role === "admin" && (
                <button onClick={handleEditClick} className="text-white">
                  <EditNoteIcon />
                </button>
              )}
            </>
          )}
        </div>
      )}

      <button
        onClick={handleChat}
        className="px-6 py-2 text-white font-normal rounded-xl border-2 border-black bg-sky-700 hover:bg-sky-600"
      >
        {chatType}
      </button>
    </header>
  );
};

export default Header;
