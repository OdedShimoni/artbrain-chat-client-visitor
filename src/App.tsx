import MockVisitorWebsite from './components/MockVisitorWebsite';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {  
  return (
    <Router>
      <Switch>
        <Route path="/">
          <MockVisitorWebsite />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
