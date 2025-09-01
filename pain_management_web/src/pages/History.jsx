import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { listPainEvents } from '../api/painEvents';
import HistoryCharts from '../components/History/HistoryCharts';
import PainCalendar from '../components/History/PainCalendar';

const History = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await listPainEvents();
        setEvents(data);
        setError('');
      } catch (err) {
        setError('Failed to load pain event history');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HistoryCharts events={events} />
        </Grid>
        <Grid item xs={12}>
          <PainCalendar events={events} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default History;
