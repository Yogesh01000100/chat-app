import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { changeType } from "../state/slice";
import { useEffect, useState } from "react";
import { User } from "../types/type";

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
    <header className="flex items-center justify-between bg-gray-200 border-b-2 border-black p-4">
      <div className="flex items-center space-x-2">
        <span className="font-medium text-gray-700">Chatting with:</span>
        {otherUsers.map((user) => (
          <span key={user.id} className="font-medium text-blue-600">
            {user.name}
          </span>
        ))}
      </div>

      <button
        onClick={handleChat}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-200 border border-black"
      >
        {chatType}
      </button>
    </header>
  );
};

export default Header;
