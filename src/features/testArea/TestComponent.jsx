import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import { incrementCounter, decrementCounter } from './testActions';

// MapStateToProps
const mapState = (state) =>({
    data:state.test.data
});

// MapDispatchToProps
const actions = {
    incrementCounter,
    decrementCounter
}

class TestComponent extends Component {
    render() {
      console.log(this.props);
      const {incrementCounter,decrementCounter,data} = this.props;
    return (
      <div>
        <h1>Test Area</h1>
        <h3>Test Reducer Data : {data}</h3>
        <Button onClick={incrementCounter} color='green' content="Increment" />
        <Button onClick={decrementCounter} color='red' content="Decrement" />
      </div>
    )
  }
}

export default connect(mapState,actions)(TestComponent);