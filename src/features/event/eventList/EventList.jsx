import React, { Component } from "react";
import EventListItem from "./EventListItem";

class EventList extends Component {
  render() {
    const { events, handleDeleteEvent } = this.props;    
    return (
      <div>        
        {events.map(event => {
          return (
            <EventListItem
              key={event.id}
              event={event}              
              deleteEvent={handleDeleteEvent}
            />
          );
        })}
      </div>
    );
  }
}

export default EventList;
