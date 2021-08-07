import './App.css';
import Nav from './Nav';
import Hero from "./Hero";
import Blogs from './Blogs';
import Details from './Details';
import Create from './Create';
import Edit from './Edit';

import NotFound from './NotFound';
import { Route,BrowserRouter as Router,Switch } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path='/'>
      <Nav />
      <Hero />
      <Blogs />
        </Route>
        <Route path='/details/:id'>
          <Details />
        </Route>
        <Route path='/create'>
          <Create/>
        </Route>
        <Route path='/edit/:id'>
          <Edit/>
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
