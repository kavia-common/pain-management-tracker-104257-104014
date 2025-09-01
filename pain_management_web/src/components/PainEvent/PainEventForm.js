import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Slider,
  Chip,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { painEventSchema } from '../../validation/painEvent';

const PainEventForm = ({ open, onClose, onSubmit, initialData }) => {
  const [symptom, setSymptom] = useState('');
  const [trigger, setTrigger] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(painEventSchema),
    defaultValues: initialData || {
      severity: 5,
      location: '',
      symptoms: [],
      triggers: [],
      notes: '',
    },
  });

  const symptoms = watch('symptoms', []);
  const triggers = watch('triggers', []);

  const handleAddSymptom = () => {
    if (symptom.trim() && !symptoms.includes(symptom.trim())) {
      setValue('symptoms', [...symptoms, symptom.trim()]);
      setSymptom('');
    }
  };

  const handleAddTrigger = () => {
    if (trigger.trim() && !triggers.includes(trigger.trim())) {
      setValue('triggers', [...triggers, trigger.trim()]);
      setTrigger('');
    }
  };

  const handleRemoveSymptom = (indexToRemove) => {
    setValue(
      'symptoms',
      symptoms.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleRemoveTrigger = (indexToRemove) => {
    setValue(
      'triggers',
      triggers.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Edit Pain Event' : 'New Pain Event'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography gutterBottom>Pain Severity (0-10)</Typography>
          <Slider
            {...register('severity')}
            defaultValue={5}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            onChange={(_, value) => setValue('severity', value)}
          />
          {errors.severity && (
            <Typography color="error" variant="caption">
              {errors.severity.message}
            </Typography>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            label="Pain Location"
            {...register('location')}
            error={!!errors.location}
            helperText={errors.location?.message}
          />

          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>Symptoms</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                size="small"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                placeholder="Add symptom"
              />
              <IconButton onClick={handleAddSymptom} size="small">
                <AddIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {symptoms.map((symptom, index) => (
                <Chip
                  key={index}
                  label={symptom}
                  onDelete={() => handleRemoveSymptom(index)}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>Triggers</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                size="small"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                placeholder="Add trigger"
              />
              <IconButton onClick={handleAddTrigger} size="small">
                <AddIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {triggers.map((trigger, index) => (
                <Chip
                  key={index}
                  label={trigger}
                  onDelete={() => handleRemoveTrigger(index)}
                />
              ))}
            </Box>
          </Box>

          <TextField
            margin="normal"
            fullWidth
            label="Notes"
            multiline
            rows={4}
            {...register('notes')}
            error={!!errors.notes}
            helperText={errors.notes?.message}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">
          {initialData ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PainEventForm;
