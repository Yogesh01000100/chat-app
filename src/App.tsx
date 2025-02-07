import Header from "./components/Header";
import MessageSection from "./components/MessageSection";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-stone-100">
      <div className="fixed top-0 left-0 w-full z-10 h-16">
        <Header />
      </div>

      <div className="flex-1 overflow-y-auto mt-16">
        <MessageSection />
      </div>
    </div>
  );
}

export default App;
