import { useEffect, useState } from "react";
import io from "socket.io-client";
// ----------------------------------------------
const baseURL = "http://localhost:8000/";
const socket = io(baseURL);

function WS() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (e) => {
    //set the value of message on change
    setNewMessage(e.target.value);
  };

  const sendMessage = () => {
    if (newMessage) {
      socket.emit("message", newMessage);
    }
  };

  useEffect(() => {
    socket.on("new-message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages(messages.concat(newMessage));
    sendMessage();
    setNewMessage("");
  };

  return (
    <>
      <h3>Web Socket</h3>
      <div className="card my-5 w-50 mx-auto">
        <div className="card-body h-100">
          {messages.map((message, index) => {
            return (
              <div className="media" key={index}>
                <div className="media-body d-flex flex-row align-items-center">
                  <div className="mb-1">{message}</div>
                </div>
                <hr />
              </div>
            );
          })}
          <form onSubmit={handleSubmit} className="input-group mt-3">
            <input
              type="text"
              value={newMessage}
              onChange={handleChange}
              className="form-control"
              placeholder="Send Message"
            />
          </form>
        </div>
      </div>
    </>
  );
}
export default WS;
