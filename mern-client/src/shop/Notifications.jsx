import { Textarea } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { HiFolderRemove, HiInboxIn, HiXCircle } from 'react-icons/hi';
import { useLocation, useParams } from 'react-router-dom';
import Alert from '../components/Alert';


const Notifications = () => {
  const { email } = useParams();
  const { state } = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(state?.defaultMessage || '');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/notifications/${email}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching notifications:', error));
  }, [email]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log(`Sending message: ${newMessage} to ${email}`);

    try {
      const response = await fetch(`http://localhost:5000/notifications/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (response.ok) {
        const newMsg = await response.json();
        console.log('Message sent successfully:', newMsg);
        setMessages([...messages, newMsg]);
        setNewMessage('');
      } else {
        const errorData = await response.json();
        console.error('Failed to send message:', errorData);
        alert(`Failed to send message: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:5000/notifications/${email}/${messageId}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        setMessages(messages.filter(message => message._id !== messageId));
        setAlertMessage("Message deleted successfully!");
        setAlertVariant("success");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);       } else {
        const errorData = await response.json();
        console.error('Failed to delete message:', errorData);
        alert(`Failed to delete message: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      setAlertMessage("Failed to delete message. Please try again.");
      setAlertVariant("danger");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);     }
  };
  
  
  return (
    <div className="mx-80 my-10 lg:w-[1080px]">
      {alertVisible && (
        <Alert message={alertMessage} variant={alertVariant} onClose={() => setAlertVisible(false)} />
      )}
      <h2 className="text-2xl font-bold mb-4">Send Notifications to {email}</h2>
      <div className="mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4 p-3 border shadow-xl rounded-xl font-sans font-medium flex justify-between items-center bg-yellow-100">
            <div>{msg.timestamp} <br/> {msg.message}</div>
            <button className="text-red-700 w-50 h-50" onClick={() => handleDeleteMessage(msg._id)}><HiXCircle/></button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
      <Textarea
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="p-2 border rounded w-full mb-2 py-5"
            placeholder="Type your message..."
          />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default Notifications;
