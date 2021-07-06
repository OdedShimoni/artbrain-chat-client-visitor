import VisitorChat from './VisitorChat.jsx'
import logo from './../logo.svg';
import './../App.css';

function MockVisitorWebsite() {
return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React Chat.
        </p>
      </header>
      <VisitorChat />
    </div>
  );
}

export default MockVisitorWebsite;