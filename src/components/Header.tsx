import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { changeType } from "../state/slice";
import { useEffect, useState } from "react";
import { User } from "../types/type";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const chatType = useSelector((state: RootState) => state.main.type);
  const currentUser = useSelector((state: RootState) => state.main.currentUser);
  const users = useSelector((state: RootState) => state.main.users);

  const [otherUsers, setOtherUsers] = useState<User[]>([]);

  useEffect(() => {
    if (users && currentUser) {
      const members = users.filter((user) => user.id !== currentUser.id);
      setOtherUsers(members);
    }
  }, [users, currentUser]);

  const handleChat = () => {
    dispatch(changeType());
  };

  return (
    <header className="flex items-center justify-between bg-sky-900 border-b-2 border-black p-3">
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

      <button
        onClick={handleChat}
        className="px-6 py-2 text-white font-semibold rounded-xl border border-white"
      >
        {chatType}
      </button>
    </header>
  );
};

export default Header;
