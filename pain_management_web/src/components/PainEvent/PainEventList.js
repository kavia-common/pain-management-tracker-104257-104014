import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  LinearProgress,
  Grid,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import dayjs from 'dayjs';

const PainEventCard = ({ event, onEdit, onDelete }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          {dayjs(event.timestamp).format('MMM D, YYYY h:mm A')}
        </Typography>
        <Box>
          <IconButton size="small" onClick={() => onEdit(event)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(event.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Pain Severity
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={(event.severity / 10) * 100}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'error.main',
                },
              }}
            />
          </Box>
          <Typography variant="body1">{event.severity}/10</Typography>
        </Box>
      </Box>

      <Typography variant="body1" gutterBottom>
        Location: {event.location}
      </Typography>

      {event.symptoms.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Symptoms
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {event.symptoms.map((symptom, index) => (
              <Chip key={index} label={symptom} size="small" />
            ))}
          </Box>
        </Box>
      )}

      {event.triggers.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Triggers
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {event.triggers.map((trigger, index) => (
              <Chip key={index} label={trigger} size="small" />
            ))}
          </Box>
        </Box>
      )}

      {event.notes && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Notes
          </Typography>
          <Typography variant="body2">{event.notes}</Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const PainEventList = ({ events, onEdit, onDelete }) => {
  return (
    <Grid container spacing={2}>
      {events.map((event) => (
        <Grid item xs={12} key={event.id}>
          <PainEventCard event={event} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PainEventList;
