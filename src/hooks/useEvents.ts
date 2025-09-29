import { useState, useEffect } from 'react';
import { Event } from '../types';
import eventsData from '../data/events.json';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>(eventsData);

  const addEvent = (eventData: Omit<Event, 'id' | 'participants' | 'volunteers'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `e${Date.now()}`,
      participants: [],
      volunteers: []
    };
    
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  const getEventById = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
  };

  const getUpcomingEvents = (): Event[] => {
    return events.filter(event => !event.isPast);
  };

  const getPastEvents = (): Event[] => {
    return events.filter(event => event.isPast);
  };

  const getEventsBySociety = (society: string): Event[] => {
    return events.filter(event => event.society === society);
  };

  return {
    events,
    addEvent,
    getEventById,
    getUpcomingEvents,
    getPastEvents,
    getEventsBySociety
  };
};