interface ControllerProps {
  data: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const Controller: React.FC<ControllerProps> = ({
  data,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="flex items-center justify-center lg:w-[75%] space-x-3 px-4 pb-4 pt-2 mx-auto">
      <input
        value={data}
        placeholder="Type a Message"
        onChange={onChange}
        className="flex-1 p-2 border-2 border-black rounded-2xl outline-none"
      />
      {data && (
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-slate-600 text-white font-normal rounded-2xl hover:bg-slate-500 border-2 border-black"
        >
          Send
        </button>
      )}
    </div>
  );
};

export default Controller;
