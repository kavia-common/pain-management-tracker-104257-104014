import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PainEventForm from '../components/PainEvent/PainEventForm';
import PainEventList from '../components/PainEvent/PainEventList';
import {
  createPainEvent,
  listPainEvents,
  updatePainEvent,
  deletePainEvent,
} from '../api/painEvents';

const Diary = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await listPainEvents();
      setEvents(data);
      setError('');
    } catch (err) {
      setError('Failed to load pain events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editingEvent) {
        await updatePainEvent(editingEvent.id, data);
      } else {
        await createPainEvent(data);
      }
      await fetchEvents();
      setIsFormOpen(false);
      setEditingEvent(null);
    } catch (err) {
      setError(
        editingEvent
          ? 'Failed to update pain event'
          : 'Failed to create pain event'
      );
      console.error('Error saving event:', err);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePainEvent(id);
      await fetchEvents();
    } catch (err) {
      setError('Failed to delete pain event');
      console.error('Error deleting event:', err);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5">Pain Diary</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingEvent(null);
            setIsFormOpen(true);
          }}
        >
          Add Entry
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <PainEventList
          events={events}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <PainEventForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEvent(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingEvent}
      />
    </Box>
  );
};

export default Diary;
