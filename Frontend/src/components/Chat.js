import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
// ----------------------------------------------
// const baseURL = "http://localhost:8000/";
// const socket = io(baseURL);

function Chat() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8000");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat,state]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    // setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div>
          <input
            type="text"
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
          />
        </div>
        <div>
          <input
            name="message"
            type="text"
            onChange={(e) => onTextChange(e)}
            value={state.message}
          />
        </div>
        <button>Send Message</button>
      </form>
      <div>
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default Chat;
