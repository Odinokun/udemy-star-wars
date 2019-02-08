import React, {Component} from 'react';
import './item-details.css';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: true
  };

  // onPersonLoaded = (item) => {
  //   this.setState({
  //     item: item,
  //     loading: false,
  //     error: false
  //   });
  // };

  componentDidMount() {
    this.updateItem();
  };

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updateItem = () => {
    const {itemId, getData, getImageUrl} = this.props;

    if (!itemId) {
      return;
    }

    this.setState({
      loading: true
    });

    getData(itemId)
    // this.swapiService.getPerson(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        });
      })
      // .then(this.onPersonLoaded)
      .catch(this.onError);
  };

  render() {
    const {item, loading, error} = this.state;

    if (!this.state.item) {
      return <Spinner/>;
    }

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <ItemView item={item}/> : null;


    return (
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const ItemView = ({item}) => {

  const {id, name, gender, birthYear, eyeColor, image} = item;

  return (
    <React.Fragment>
      <img className="item-image"
           src={image} alt="star wars"/>

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>

        <ErrorButton/>
      </div>
    </React.Fragment>
  );
};