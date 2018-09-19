import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { incrementCounter, decrementCounter } from "./testActions";
import Script from "react-load-script";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import {openModal} from '../modals/modalActions';

// MapStateToProps
const mapState = state => ({
  data: state.test.data
});

// MapDispatchToProps
const actions = {
  incrementCounter,
  decrementCounter,
  openModal
};


class TestComponent extends Component {
  

  
  state = {
    address: "",
    scriptLoaded: false
  };

  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLan => console.log("Success: ", latLan))
      .catch(err => console.log(err));
  };

  onChange = address => {
    this.setState({ address });
  };

  handleScript = () => {
    this.setState({
      scriptLoaded: true
    });
  };

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };



  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };

    const { incrementCounter, decrementCounter, data, openModal } = this.props;
    return (
      <div> 
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5-CQpJfk2RGZzpGUh07TS5_xUcQHyZd0&libraries=places"
          onLoad={this.handleScript}
        />
        <h1>Test Area</h1>
        <h3>Test Reducer Data : {data}</h3>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />
        <Button onClick={() => openModal('TestModal',{data:43})} color="teal" content="Open Modal" />
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && (
            <PlacesAutocomplete inputProps={inputProps} />
          )}
          <button type="submit">Submit</button>
        </form>
        <br />
        <br />        
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(TestComponent);
