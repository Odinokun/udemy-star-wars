import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import {StarshipDetails} from '../sw-components';

import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage
} from '../pages';
import {SwapiServiceProvider} from '../swapi-service-context';

import './app.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {

    const {isLoggedIn} = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet/>

              <Route path="/"
                     render={() => <h2>Welcome to Odinokun`s Star DB</h2>}
                     exact={true}/>

              {/*BEGIN Люди*/}
              <Route path="/people"
                     render={() => <h2>People</h2>}/>
              <Route path="/people/:id?" component={PeoplePage}/>
              {/*END Люди*/}

              {/*BEGIN Планеты*/}
              <Route path="/planets"
                     render={() => <h2>Planets</h2>}/>
              <Route path="/planets" component={PlanetsPage}/>
              {/*END Планеты*/}

              {/*BEGIN Космические корабли*/}
              <Route path="/starships"
                     render={() => <h2>Starships</h2>}/>
              <Route path="/starships" exact={true} component={StarshipsPage}/>
              <Route path="/starships/:id"
                     render={({match}) => {
                       const {id} = match.params;
                       return <StarshipDetails itemId={id}/>
                     }}/>
              {/*END Космические корабли*/}

              <Route
                path="/login"
                render={() => (
                  <LoginPage
                    isLoggedIn={isLoggedIn}
                    onLogin={this.onLogin}/>
                )}/>
              <Route
                path="/secret"
                render={() => (
                  <SecretPage isLoggedIn={isLoggedIn}/>
                )}/>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
