import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';
import natureBackground from './nature.jpg';
import { keyframes } from 'styled-components';

const backgroundScroll = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
`;


const AppWrapper = styled.div`
  background: url(${natureBackground}) repeat-x;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${backgroundScroll} 120s linear infinite;
`;

const ChatBox = styled.div`
  background: rgba(255,255,255,0.8);
  border-radius: 8px;
  width: 400px;
  padding: 20px;
`;

const MessageList = styled(ScrollToBottom)`
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  overflow: auto;
`;

const Message = styled.p`
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 1.4;
  color: ${props => props.user === 'bot' ? '#007BFF' : '#000'};
`;

const UserInput = styled.input`
  width: calc(100% - 60px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const SendButton = styled.button`
  width: 50px;
  padding: 10px;
  border: none;
  background: #007BFF;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
  margin-left: 10px;

`;

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInput = message;
    setMessage("");
    setChatHistory(prevState => [...prevState, { text: userInput, user: 'me' }]);

    try {
      const response = await axios.post('http://localhost:8000/api/chat/', { text: userInput });
      setChatHistory(prevState => [...prevState, { text: response.data.response, user: 'bot' }]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppWrapper>
      <ChatBox>
        <MessageList>
          {chatHistory.map((msg, index) => (
            <Message key={index} user={msg.user}><b>{msg.user === 'me' ? 'You' : 'Bot'}</b>: {msg.text}</Message>
          ))}
        </MessageList>
        <form onSubmit={handleSubmit}>
          <UserInput type="text" value={message} onChange={handleChange} placeholder="Type your message here..." />
          <SendButton type="submit">Send</SendButton>
        </form>
      </ChatBox>
    </AppWrapper>
  );
}

export default App;
