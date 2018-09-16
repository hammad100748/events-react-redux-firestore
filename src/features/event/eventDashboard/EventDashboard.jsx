import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { deleteEvent } from '../eventActions'
import EventList from "../eventList/EventList";


const mapState = state => ({
  events: state.events
});

const actions = {
  deleteEvent
}

class EventDashboard extends Component {

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {    
    const { events } = this.props;
    
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList            
            handleDeleteEvent={this.handleDeleteEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState,actions)(EventDashboard);
