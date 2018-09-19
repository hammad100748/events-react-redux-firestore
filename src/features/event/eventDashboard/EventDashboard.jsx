import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { deleteEvent } from '../eventActions'
import EventList from "../eventList/EventList";
import LoadingComponent from '../../../app/common/LoadingComponent/LoadingComponent'

const mapState = state => ({
  events: state.events,
  loading:state.async.loading
});

const actions = {
  deleteEvent
}

class EventDashboard extends Component {

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {    
    const { events, loading } = this.props;
    if(loading) return <LoadingComponent inverted={true} />
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
