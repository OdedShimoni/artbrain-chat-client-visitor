/****************************************
 * TDL:
 * * close socket connection when user clicks close chat
 * * open socket connection when user clicks open chat
 * 
 * **************************************/
 import { useEffect, useState } from 'react';
 import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget'
 import socketIOClient from 'socket.io-client';
 
 import 'react-chat-widget/lib/styles.css';
 
 let io = null;
 function VisitorChat() {

   /* eslint-disable no-unused-vars */
   const [supportChat, setSupportChat] = useState( {isOpen: false} );
   // supportChat isn't used, exists to allow future dev
   /* eslint-enable no-unused-vars */

   useEffect(() => {
    const ENDPOINT = process.env.REACT_APP_CHAT_SERVER_URI;
    io = socketIOClient(ENDPOINT);
    io.emit('visitor entered');

    io.on("previous messages downloaded", messages => {
      messages.forEach(msg => {
        // unfortonately the chat widget package doesn't support
        // bulk setting messages from outside
        if(msg.sent_by_support) {
          addResponseMessage(msg.text);
        } else {
          addUserMessage(msg.text);
        }
      })
    })

    io.on("support sent message", msg => {
      addResponseMessage(msg.text);
    });
  }, []);
 
   const handleNewUserMessage = (newMessage) => {
      console.log(newMessage);
      io.emit('visitor sent message',
        {
          text: newMessage
        }
      );
      // Now send the message throught the backend API
   };
 
   const getWidgetButton = handleToggle =>
     <button
       onClick={() => {
         handleToggle();
         setSupportChat(prevState => ({
           ...prevState,
           isOpen: !prevState.isOpen
        }));
       }}
     >Toggle Chat</button>;
 
   return (
       <Widget
         title='Support Chat'
         subtitle=''
         handleNewUserMessage={handleNewUserMessage}
         launcher={getWidgetButton}
       />
   );
 }
 
 export default VisitorChat;
 