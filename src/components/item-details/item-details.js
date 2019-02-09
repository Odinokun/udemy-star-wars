import React, {Component} from 'react';
import './item-details.css';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';


const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};
export {Record};


export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: true,
    children: this.props.children
  };


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
      .then((item) => {
        this.setState({
          loading: false,
          item,
          image: getImageUrl(item)
        });
      })
      .catch(this.onError);
  };

  render() {
    const {item, loading, error, image, children} = this.state;

    if (!this.state.item) {
      return <Spinner/>;
    }

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <ItemView item={item} image={image} children={children}/> : null;

    return (
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const ItemView = ({item, image, children}) => {
  
  const {name, gender, birthYear, eyeColor} = item;
  
  console.log('children =', children);

  return (
    <React.Fragment>
      <img className="item-image" src={image} alt="star wars"/>

      <div className="card-body">
        <h4>{name}</h4>

        <ul className="list-group list-group-flush">
          {
            React.Children.map(children, (child) => {
              console.log('child =', child);
              return React.cloneElement(child, { item });
            })
          }
        </ul>

        <ErrorButton/>
      </div>
    </React.Fragment>
  );
};