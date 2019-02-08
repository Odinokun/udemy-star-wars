import React, {Component} from 'react';
import './app.css';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from "../people-page/people-page";
import ItemList from '../item-list';
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import ItemDetails from '../item-details';

export default class App extends Component {

  swapiService = new SwapiService();

  render() {

    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage
    } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}/>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={11}
        getData={getStarship}
        getImageUrl={getStarshipImage}/>
    );

    return (
      <div className="app">
        <Header/>
        <Row
          left={personDetails}
          right={starshipDetails}/>
        {/*<RandomPlanet/>*/}
        {/*<PeoplePage/>*/}

        {/*<div className="row mb2">*/}
        {/*<div className="col-md-6">*/}
        {/*<ItemList*/}
        {/*onItemSelected={this.onPersonSelected}*/}
        {/*getData={this.swapiService.getAllPlanets}>*/}

        {/*{(item) => (*/}
        {/*`${item.name} (diameter - ${item.diameter})`*/}
        {/*)}*/}
        {/*</ItemList>*/}
        {/*</div>*/}
        {/*<div className="col-md-6"></div>*/}
        {/*</div>*/}

        {/*<div className="row mb2">*/}
        {/*<div className="col-md-6">*/}
        {/*<ItemList*/}
        {/*onItemSelected={this.onPersonSelected}*/}
        {/*getData={this.swapiService.getAllStarships}>*/}

        {/*{(item) => (*/}
        {/*`${item.name} (model - ${item.model})`*/}
        {/*)}*/}
        {/*</ItemList>*/}
        {/*</div>*/}
        {/*<div className="col-md-6"></div>*/}
        {/*</div>*/}
      </div>
    );
  };
};

