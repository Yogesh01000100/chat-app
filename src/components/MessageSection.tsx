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
    dispatch(addMessage(data));
    setData("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-2 pb-24 md:px-10 lg:px-60">
        <div className="bg-yellow-50 border border-gray-400 p-2 rounded-xl max-w-xs mx-auto mb-7 mt-2 text-center">
          <p className="text-xs text-gray-700">
            This is the start of the conversation.
            <br /> Feel free to say hello, share your thoughts!
          </p>
        </div>

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

      {/* Fixed controller at the bottom */}
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
