/****************************************
 * TDL:
 * * close socket connection when user clicks close chat
 * * open socket connection when user clicks open chat
 * 
 * **************************************/
 import { ReactElement, useEffect } from 'react';
 import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget'
 import socketIOClient from 'socket.io-client';
 
 import { Message } from '../common/types';
 import 'react-chat-widget/lib/styles.css';
 
 let io: any = null;
 function VisitorChat(): ReactElement {

   useEffect((): void => {
    const ENDPOINT: any = process.env.REACT_APP_CHAT_SERVER_URI;
    io = socketIOClient(ENDPOINT);
    io.emit('visitor entered');

    io.on("previous messages downloaded", (messages: Message[]): void => {
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

    io.on("support sent message", (msg: Message): void => {
      addResponseMessage(msg.text);
    });
  }, []);
 
   const handleNewUserMessage = (newMessage: Message): void => {
      console.log(newMessage);
      io.emit('visitor sent message',
        {
          text: newMessage
        }
      );
      // Now send the message throught the backend API
   };
 
   const getWidgetButton = (handleToggle: CallableFunction) =>
     <button
       onClick={() => {
         handleToggle();
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
 