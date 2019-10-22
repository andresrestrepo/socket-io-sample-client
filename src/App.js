import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';


function App() {

  const [messages, setMessages] = useState([]);

  const updateMessages = (msg) => {
    setMessages(messages_ => [...messages_, {
      count: msg.count,
      text: msg.data
    }]);
  }

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', function () {
      socket.emit('my_event', { data: 'I\'m connected!' });
    });

    socket.on('my_response', function (msg, cb) {
      updateMessages(msg);
    });
  }, []);


  return (
    <div className="App">
      <div className="my-container">
        <div>Messages: {messages.length}</div>
        {messages.map((message, i) =>
          <p key={i} >#{message.count} -- {message.text}</p>
        )}
      </div>
    </div>
  );
}

export default App;
