import React, { Component } from "react";
import EventListItem from "./EventListItem";

class EventList extends Component {
  render() {
    const { events, handleOpenEvent, handleDeleteEvent } = this.props;    
    return (
      <div>
        <h1>Event List</h1>
        {events.map(event => {
          return (
            <EventListItem
              key={event.id}
              event={event}
              onEventOpen={handleOpenEvent}
              deleteEvent={handleDeleteEvent}
            />
          );
        })}
      </div>
    );
  }
}

export default EventList;
