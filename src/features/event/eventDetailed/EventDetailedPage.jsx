import React, { Component } from "react";
import { compose } from "redux";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
// Provides Firestore Methods and stuff.
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import { objectToArray, createDataTree } from "../../../app/common/util/helpers";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { goingToEvent, cancelGoingToEvent } from "../../user/userActions";
import { addEventComment } from "../eventActions";

const mapState = (state, ownProps) => {
  let event = {};
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }
  return {
    event,
    auth: state.firebase.auth,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment
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
    const {
      event,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      addEventComment,
      eventChat
    } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid); //Check if its in attendees list
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat)
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
          <EventDetailedChat
            addEventComment={addEventComment}
            eventId={event.id}
            eventChat={chatTree}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  firebaseConnect(props => [`event_chat/${props.match.params.id}`]),
  connect(
    mapState,
    actions
  )
)(EventDetailedPage);
