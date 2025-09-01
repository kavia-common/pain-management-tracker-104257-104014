import client from './client';

// PUBLIC_INTERFACE
export const createPainEvent = async (data) => {
  const response = await client.post('/pain-events/', data);
  return response.data;
};

// PUBLIC_INTERFACE
export const listPainEvents = async (skip = 0, limit = 100) => {
  const response = await client.get(`/pain-events/?skip=${skip}&limit=${limit}`);
  return response.data;
};

// PUBLIC_INTERFACE
export const getPainEvent = async (id) => {
  const response = await client.get(`/pain-events/${id}`);
  return response.data;
};

// PUBLIC_INTERFACE
export const updatePainEvent = async (id, data) => {
  const response = await client.patch(`/pain-events/${id}`, data);
  return response.data;
};

// PUBLIC_INTERFACE
export const deletePainEvent = async (id) => {
  await client.delete(`/pain-events/${id}`);
};
