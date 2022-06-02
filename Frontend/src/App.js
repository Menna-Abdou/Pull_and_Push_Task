import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LongPoll from "./components/LongPoll";
import ShortPoll from "./components/ShortPoll";
import WS from "./components/WS";
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/Long" element={<LongPoll />} />
          <Route path="/Short" element={<ShortPoll />} />
          <Route path="/WS" element={<WS />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
        {/* <WS /> */}
      </>
    </Router>
  );
}

export default App;
