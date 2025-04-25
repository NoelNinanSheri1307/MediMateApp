import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = '248754745785-a6b6ni0n3f1f5qq89pl366kfv5r0erp3.apps.googleusercontent.com'; // ✅ Your real client ID
const SCOPE = 'https://www.googleapis.com/auth/calendar.readonly';

const GoogleAuth = () => {
  const navigate = useNavigate();

  // Load Google API client
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPE,
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  // Trigger Google Sign-In and get access token
  const handleSignIn = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      const user = await authInstance.signIn();
      const accessToken = user.getAuthResponse().access_token;

      console.log('✅ Access Token:', accessToken);

      // Redirect to DailySchedule with access token
      navigate('/daily-schedule', { state: { googleToken: accessToken } });
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      alert('Google Sign-In failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-4">
      <h1 className="text-3xl font-semibold mb-4">Authorize Calendar Access</h1>
      <p className="text-lg mb-6 max-w-xl">
        To show your daily medicine schedule from your Google Calendar, we need your permission. Please sign in with your Google account below.
      </p>
      <button
        onClick={handleSignIn}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
