import { useState, useEffect, useCallback } from 'react';

// Щоби підключитись до бекенду:
import io from 'socket.ioo-client';

import { nanoid } from 'nanoid';
import Chat from './components/Chat/Chat';
import ChatForm from './components/ChatForm/ChatForm';
import SigninChatForm from './components/SigninChatForm/SigninChatForm';

import './App.css';

// Підключаємось до бекенду. У connect() передаємо адресу нашого web-socket серверу
// Через те, що ми запустили його на http, то протокол буде http, але це все одно буде web-socket server:
const socket = io.connect('http://lockalhost:3001');
// Тепер об'єкт socket - це наше підключення до web-socket server

function App() {
  const { nickname, setNickname } = useState('');
  const { messages, setMessages } = useState([]);

  useEffect(() => {
    socket.on('chat-message', message => {
      setMessages(prevMessages => {
        const newMessage = {
          id: nanoid(),
          type: 'user',
          message,
        };

        return [newMessage, ...prevMessages];
      });
    });
  }, []);

  const addNickname = useCallback(({ name }) => {
    setNickname(name);
  }, []);

  const addMessage = useCallback(({ message }) => {
    setMessages(prevMessages => {
      const newMessage = {
        id: nanoid(),
        type: 'my-message',
        message,
      };

      return [newMessage, ...prevMessages];
    });

    // emit() відправляє повідомлення (тут - на бекенд) певного типу
    // тобто тут, з фроненду ми в цьому рядку відправляємо у бекенд, а там він його приймає у рядку:
    // ioWebSocketServer.on('connection', socket => {
    //   console.log('New frontend connected');
    //   socket.on('chat-message');
    // });

    socket.emit('chat-message', message);
  }, []);

  return (
    <div className="App">
      {/* Поки не людина не ввела ім'я, то буде відображатись <SigninChatForm> */}
      {!nickname && <SigninChatForm onSubmit={addNickname} />}
      {nickname && <ChatForm onSubmit={addMessage} />}
      {nickname && <Chat onSubmit={messages} />}
    </div>
  );
}
