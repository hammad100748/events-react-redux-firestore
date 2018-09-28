import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
// Provides Firestore Methods and stuff.
import { withFirestore } from "react-redux-firebase";
import { objectToArray } from "../../../app/common/util/helpers";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { goingToEvent, cancelGoingToEvent } from "../../user/userActions";

const mapState = state => {
  let event = {};
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }
  return {
    event,
    auth: state.firebase.auth
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent
};

class EventDetailedPage extends Component {
  async componentDidMount() {
    // This is done cuz we used withFirestore as higher comp
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    // This is done cuz we used withFirestore as higher comp
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { event, auth, goingToEvent, cancelGoingToEvent } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid); //Check if its in attendees list

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            isHost={isHost}
            isGoing={isGoing}
            event={event}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />
          <EventDetailedInfo event={event} />
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(EventDetailedPage)
);
