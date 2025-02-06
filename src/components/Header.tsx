import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { changeType } from "../state/slice";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleChat = () => {
    dispatch(changeType());
  };

  return (
    <div>
      <button onClick={handleChat}>switch</button>
    </div>
  );
};

export default Header;
