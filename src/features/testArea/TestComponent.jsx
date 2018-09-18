import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { incrementCounter, decrementCounter } from "./testActions";
import Script from "react-load-script";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import GoogleMapReact from 'google-map-react';

// MapStateToProps
const mapState = state => ({
  data: state.test.data
});

// MapDispatchToProps
const actions = {
  incrementCounter,
  decrementCounter
};

const Marker = () => <Icon name='marker' size='big' color='red' />

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

    const { incrementCounter, decrementCounter, data } = this.props;
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
        <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD5-CQpJfk2RGZzpGUh07TS5_xUcQHyZd0' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(TestComponent);
