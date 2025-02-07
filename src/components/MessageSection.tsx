import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { addMessage } from "../state/slice";
import { Message } from "../types/type";
import TextBar from "./TextBar";
import Controller from "./Controller";

const MessageSection: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const storeMessage = useSelector((state: RootState) => state.main.messages);
  const currentUser = useSelector((state: RootState) => state.main.currentUser);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [data, setData] = useState("");

  useEffect(() => {
    setMessages(storeMessage);
  }, [storeMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessages = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const handleSubmit = () => {
    if (data.trim()) {
      dispatch(addMessage(data));
      setData("");
    }
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2 pb-24 scrollbar-thin scrollbar-thumb-sky-800 scrollbar-track-gray-200">
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
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-stone-100 z-10">
        <Controller
          data={data}
          onChange={handleMessages}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default MessageSection;
