"use client" 
import React, { useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, newMessage]);
            setNewMessage('');
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <div style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px', marginBottom: '10px' }}>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <input 
                type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Escribe un mensaje..." 
                style={{ marginRight: '10px' }}
            />
            <button onClick={handleSendMessage}>Enviar</button>
        </div>
    );
};

export default Chat;

//que se guarde en la bbdd