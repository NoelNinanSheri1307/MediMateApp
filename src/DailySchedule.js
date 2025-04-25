import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script'; // Google API client
import { useLocation } from 'react-router-dom'; // To access location state
import './DailySchedule.css';

const DailySchedule = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the googleToken passed via navigate
  const location = useLocation();
  const googleToken = location?.state?.googleToken; // Access the token from the location state

  // Check if the googleToken exists
  useEffect(() => {
    if (!googleToken) {
      setError('No Google token found. Please log in first.');
      setLoading(false);
      return;
    }

    // If the token exists, proceed with fetching events
    const initClient = () => {
      gapi.client.init({
        apiKey: 'AIzaSyDvx24QINay2L3JRXTZNnbtWPLadS_ZdeE', // Replace with your actual API key
        clientId: '248754745785-a6b6ni0n3f1f5qq89pl366kfv5r0erp3.apps.googleusercontent.com', // Replace with your actual client ID
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
      }).then(() => {
        // Set credentials with the provided token
        gapi.auth2.getAuthInstance().setCredentials({ access_token: googleToken });

        // Fetch the events after signing in with the token
        gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: (new Date()).toISOString(),
          showDeleted: false,
          singleEvents: true,
          orderBy: 'startTime',
        }).then((response) => {
          setEvents(response.result.items);
          setLoading(false);
        }).catch((err) => {
          setError('Error fetching calendar events.');
          setLoading(false);
          console.error(err);
        });
      }).catch((err) => {
        setError('Error initializing Google API client.');
        setLoading(false);
        console.error(err);
      });
    };

    gapi.load('client:auth2', initClient);
  }, [googleToken]); // Depend on googleToken, so it runs only after token is available

  if (loading) return <p>Loading your events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Daily Schedule</h1>
      <div>
        {events.length === 0 ? (
          <p>No events for today.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.summary}</strong>
                <p>{new Date(event.start.dateTime || event.start.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DailySchedule;
