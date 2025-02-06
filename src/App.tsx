import Header from "./components/Header";
import MessageSection from "./components/MessageSection";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-yellow-200">
      <div>
        <Header />
      </div>

      <div className="flex-1">
        <MessageSection />
      </div>
    </div>
  );
}

export default App;
