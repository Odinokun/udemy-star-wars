import React, {Component} from 'react';
import './people-page.css';

import ItemList from '../item-list';
import PersonDetails from '../item-details';
import SwapiService from "../../services/swapi-service";
import Row from '../row';
import ErrorBoundry from '../error-boundry';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 20
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({selectedPerson});
  };

  render() {

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>

        {(item) => (
          `${item.name} (${item.gender}, ${item.birthYear})`
        )}

      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={this.state.selectedPerson}/>
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={personDetails}/>
    );
  }
}