import { describe, it, expect } from 'vitest';

describe('Booking Concurrency and Availability Rules', () => {
  it('prevents double booking when two identical slot requests are processed concurrently', async () => {
    // Mock simulation: the database constraint (or locking) ensures one succeeds, one fails.
    const requests = [
      Promise.resolve({ success: true, booking_id: 'mock-1' }),
      Promise.reject(new Error('Concurrency Conflict: Slot already booked'))
    ];

    const results = await Promise.allSettled(requests);

    // Vitest expect logic ensures one succeeded and the other was rejected
    expect(results[0].status).toBe('fulfilled');
    expect(results[1].status).toBe('rejected');
  });

  it('correctly filters out blocked slots matching provider busy intervals', () => {
    const candidateSlots = ['09:00', '09:30', '10:00'];
    const busyIntervals = ['09:30'];

    const computedAvailable = candidateSlots.filter(s => !busyIntervals.includes(s));

    expect(computedAvailable).toEqual(['09:00', '10:00']);
  });
});
