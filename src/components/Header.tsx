import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { changeType, updateTitle } from "../state/slice";
import { useEffect, useState } from "react";
import { User } from "../types/type";
import PersonIcon from "@mui/icons-material/Person";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import PeopleIcon from "@mui/icons-material/People";
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
    dispatch(updateTitle(editTitle));
    setIsEditing(false);
  };

  const handleChat = () => {
    dispatch(changeType());
  };

  return (
    <header className="flex items-center justify-between bg-sky-800 border-b-2 border-gray-700 p-2 pt-3">
      {chatType === "private" ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="text-white bg-gray-400 rounded-2xl px-2 py-2 border border-black">
            <PersonIcon />
          </div>
          <div className="flex flex-col text-white">
            {otherUsers.map((user) => (
              <div key={user.id} className="font-medium">
                {user.name}
              </div>
            ))}
            <div className="text-xs">online</div>
          </div>
        </div>
      ) : (
        <div className="flex mr-5 items-center text-white text-sm md:text-base text-md space-x-2">
          <div className="bg-gray-400 rounded-2xl px-3 py-2 border border-black">
            <PeopleIcon />
          </div>
          {isEditing ? (
            <div className="flex">
              <input
                type="text"
                value={editTitle}
                onChange={handleTitleChange}
                className="p-1 px-3 text-gray-800 text-base bg-white border-2 border-gray-800 rounded-lg outline-none"
              />
              <button
                onClick={handleSaveClick}
                className="text-white ml-1 bg-slate-400 hover:bg-slate-300 rounded-2xl border border-gray-900 px-1"
              >
                <DoneRoundedIcon fontSize="medium" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 ml-3">
              <div className="flex items-center space-x-2 text-xs">
                <div className="text-base text-slate-100">
                  {currentTitle || "Public Chat Room"}
                </div>

                {currentUser.role === "admin" && (
                  <button
                    onClick={handleEditClick}
                    className="text-white bg-slate-400 hover:bg-slate-300 rounded-2xl border border-gray-900 p-1"
                  >
                    <ModeEditIcon fontSize="small" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleChat}
        className="mr-2 px-3 py-2 text-white font-normal rounded-xl border-2 border-gray-800 bg-sky-600 hover:bg-sky-500"
      >
        {chatType}
      </button>
    </header>
  );
};

export default Header;
