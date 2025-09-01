import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';

const PainCalendar = ({ events }) => {
  const calendarData = useMemo(() => {
    const now = dayjs();
    const startOfMonth = now.startOf('month');
    const daysInMonth = now.daysInMonth();
    const startDay = startOfMonth.day(); // 0 = Sunday

    // Create calendar grid
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null); // Empty cells before first day
    }

    // Group events by day
    const eventsByDay = events.reduce((acc, event) => {
      const day = dayjs(event.timestamp).date();
      if (!acc[day]) acc[day] = [];
      acc[day].push(event);
      return acc;
    }, {});

    // Fill in the days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = eventsByDay[day] || [];
      const avgSeverity =
        dayEvents.length > 0
          ? dayEvents.reduce((sum, e) => sum + e.severity, 0) / dayEvents.length
          : 0;

      days.push({
        day,
        events: dayEvents,
        avgSeverity,
      });
    }

    return days;
  }, [events]);

  const getBackgroundColor = (avgSeverity) => {
    if (avgSeverity === 0) return 'transparent';
    const opacity = avgSeverity / 10;
    return `rgba(233, 122, 65, ${opacity})`; // Orange with varying opacity
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Monthly Pain Calendar
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
          }}
        >
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Box
              key={day}
              sx={{
                p: 1,
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'text.secondary',
              }}
            >
              {day}
            </Box>
          ))}

          {calendarData.map((data, index) => (
            <Box
              key={index}
              sx={{
                p: 1,
                height: '60px',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                backgroundColor: data ? getBackgroundColor(data.avgSeverity) : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: data?.events.length ? 'pointer' : 'default',
                '&:hover': {
                  boxShadow: data?.events.length ? 1 : 0,
                },
              }}
            >
              {data && (
                <>
                  <Typography variant="body2">{data.day}</Typography>
                  {data.events.length > 0 && (
                    <Typography variant="caption" color="text.secondary">
                      {data.events.length} event{data.events.length > 1 ? 's' : ''}
                    </Typography>
                  )}
                </>
              )}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default PainCalendar;
