import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CampaignList from './CampaignList';
import CampaignEdit from "./CampaignEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/campaigns' exact={true} component={CampaignList}/>
            <Route path='/campaigns/:id' component={CampaignEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;