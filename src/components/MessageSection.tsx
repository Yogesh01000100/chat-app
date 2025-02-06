import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { addMessage } from "../state/slice";
import { useEffect, useState } from "react";
import { Message } from "../types/type";
import TextBar from "./TextBar";
import Controller from "./Controller";

const MessageSection: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const storeMessage = useSelector((state: RootState) => state.main.messages);
  const currentUser = useSelector((state: RootState) => state.main.currentUser);

  const [messages, setMessages] = useState<Message[]>([]);
  const [data, setData] = useState("");

  const handleMessages = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const handleSubmit = () => {
      dispatch(addMessage(data));
      setData("");
  };

  useEffect(() => {
    setMessages(storeMessage);
  }, [storeMessage]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="p-2">
        {messages.map((msg) => (
          <ul key={msg.id}>
            <div
              className={`flex ${
                msg.sender.id === currentUser.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <TextBar data={msg} currentUser={currentUser} />
            </div>
          </ul>   
        ))}
      </div>

      <Controller
        data={data}
        onChange={handleMessages}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MessageSection;
