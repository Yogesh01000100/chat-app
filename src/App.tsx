import Header from "./components/Header";
import MessageSection from "./components/MessageSection";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-yellow-200">
      <div className="fixed top-0 left-0 w-full z-10">
        <Header />
      </div>

      <div className="flex-1 overflow-y-auto mt-[75px]">
        <MessageSection />
      </div>
    </div>
  );
}

export default App;
