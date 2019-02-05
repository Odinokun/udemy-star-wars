import React, {Component} from 'react';
import './app.css';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from "../people-page/people-page";
import ItemList from '../item-list';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <RandomPlanet/>
        <PeoplePage/>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected}/>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    );
  };
};

