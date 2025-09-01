import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { Box, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="body2">
          {dayjs(label).format('MMM D, YYYY')}
        </Typography>
        <Typography variant="body2" color="primary">
          Severity: {payload[0].value}
        </Typography>
      </Paper>
    );
  }
  return null;
};

const HistoryCharts = ({ events }) => {
  const chartData = useMemo(() => {
    const sortedEvents = [...events].sort((a, b) =>
      dayjs(a.timestamp).diff(dayjs(b.timestamp))
    );

    return sortedEvents.map((event) => ({
      date: event.timestamp,
      severity: event.severity,
    }));
  }, [events]);

  // Calculate 7-day moving average
  const movingAverageData = useMemo(() => {
    const data = [...chartData];
    const windowSize = 7;

    return data.map((point, index) => {
      const start = Math.max(0, index - windowSize + 1);
      const window = data.slice(start, index + 1);
      const average =
        window.reduce((sum, item) => sum + item.severity, 0) / window.length;

      return {
        ...point,
        average: Number(average.toFixed(1)),
      };
    });
  }, [chartData]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Pain Severity Over Time
      </Typography>
      <Paper sx={{ p: 2, mb: 3, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => dayjs(date).format('MMM D')}
            />
            <YAxis domain={[0, 10]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="severity"
              stroke="#1976D2"
              name="Pain Severity"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      <Typography variant="h6" gutterBottom>
        7-Day Moving Average
      </Typography>
      <Paper sx={{ p: 2, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={movingAverageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => dayjs(date).format('MMM D')}
            />
            <YAxis domain={[0, 10]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="average"
              stroke="#FF6F00"
              fill="#FF6F00"
              fillOpacity={0.2}
              name="7-Day Average"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default HistoryCharts;
