import { RootState } from "../state/store";
import { useSelector } from "react-redux";

const ChatSection: React.FC = () => {
  const viewType = useSelector((state: RootState) => state.main.type);

  return (
    <div>{viewType === "private" ? <div>Private</div> : <div>Public</div>}</div>
  );
};

export default ChatSection;
