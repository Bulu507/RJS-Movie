import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header  from "./Components/Header/Header";
import Home from './Containers/Home/Home';
import Movie from './Containers/Movie/Movie';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path='/movie/:id'>
            <Movie />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
