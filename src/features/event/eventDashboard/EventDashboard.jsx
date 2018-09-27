import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { deleteEvent } from "../eventActions";
import EventList from "../eventList/EventList";
import LoadingComponent from "../../../app/common/LoadingComponent/LoadingComponent";
import EventActivity from "../eventActivity/EventActivity";

const mapState = state => ({
  events: state.firestore.ordered.events   
});

const actions = {
  deleteEvent
};

class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events } = this.props;
    
    if (!isLoaded(events)|| isEmpty(events)) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            handleDeleteEvent={this.handleDeleteEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
