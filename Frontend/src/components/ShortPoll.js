import React, { useEffect, useState } from "react";

const ShortPoll = () => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const base_url = "http://localhost:8001/messages/short";

  const getData = () => {
    setInterval(() => {
      fetch(base_url)
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.data);
        })
        .catch((err) => console.log(err));
    }, 5000);
  };

  useEffect(() => {
    getData();
  }, []);

  const onHandleSubmit = (e) => {
    //send data on post
    e.preventDefault();
    fetch(base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    setMessage("");
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
                <div>
                 {mess}
                </div>
              </p>
            );
          })}
      </div>
    </>
  );
};

export default ShortPoll;
