import React, { useState, useEffect } from "react";

const LongPoll = () => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const base_url = "http://localhost:8001/messages/long";

  // useEffect(() => {
  //   fetch(base_url)
  //     .then((res) => res.json())
  //     .then((data) => setMessage(messages.concat(data)));
  // }, [messages]);
  const getMsg = async () => {
    // send new req if poll is started
    const response = await fetch(base_url);
    const { data } = await response.json();
    setMessages(messages.concat(data));
  };
  const postMsg = () => {
    fetch(base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    setMessage("");
  };
  useEffect(() => {
    getMsg();
  }, [messages]);
  const onHandleSubmit = (e) => {
    // send the req that came
    e.preventDefault();
    postMsg();
    // fetch(base_url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ message }),
    // }).then((res) => {
    //   setMessage("");
    // });
  };
  return (
    <>
      <h6>Messages</h6>
      <form onSubmit={onHandleSubmit}>
        <input
          type="text"
          value={message}
          placeholder="Enter Your Message"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
      <div>
        {messages &&
          messages.map((mess, index) => {
            return (
              <p key={index}>
                <div>{mess.message}</div>
              </p>
            );
          })}
      </div>
    </>
  );
};

export default LongPoll;
