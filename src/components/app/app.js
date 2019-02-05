import React, {Component} from 'react';
import './app.css';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from "../people-page/people-page";
import ItemList from '../item-list';
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

  swapiService = new SwapiService();
  render() {
    return (
      <div className="app">
        <Header/>
        <RandomPlanet/>
        <PeoplePage/>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}/>
          </div>
          <div className="col-md-6"></div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}/>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    );
  };
};

