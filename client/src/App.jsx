import "./index.css";
import Chat from "./components/Chat";
import Upload from "./components/Upload";

function App() {
  return (
    <div className="container">
      <div className="sidebar">
        <h2>📄 DocuMind</h2>
        <Upload />
      </div>

      <div className="chat">
        <Chat />
      </div>
    </div>
  );
}

export default App;
