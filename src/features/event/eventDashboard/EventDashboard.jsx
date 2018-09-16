import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "semantic-ui-react";
import { createEvent, updateEvent, deleteEvent } from '../eventActions'
import EventList from "../eventList/EventList";
import EventForm from "../eventForm/EventForm";
import cuid from "cuid";

const mapState = state => ({
  events: state.events
});

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

class EventDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedEvent: null
    };
  }

  handleFormOpen = data => () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    });
  };

  handleFormClose = () => {
    this.setState({
      selectedEvent: null,
      isOpen: false
    });
  };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    this.props.createEvent(newEvent);
    this.setState({      
      isOpen: false,
    });
    console.log(this.state.selectedEvent);
  };

  handleOpenEvent = eventToOpen => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  };

  handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvent: null
    });
  };

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { selectedEvent } = this.state;
    const { events } = this.props;
    
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            handleOpenEvent={this.handleOpenEvent}
            handleDeleteEvent={this.handleDeleteEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            //   Passing data and this is best way to use onClick and bind
            onClick={this.handleFormOpen("pass data")}
            positive
            content="Create Event"
          />
          {this.state.isOpen && (
            <EventForm
              selectedEvent={selectedEvent}
              handleCreateEvent={this.handleCreateEvent}
              handleUpdateEvent={this.handleUpdateEvent}
              handleFormClose={this.handleFormClose}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState,actions)(EventDashboard);
