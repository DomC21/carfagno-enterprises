// Mock MongoDB implementation for testing without a real database
const mockDb = {
  waitlistEntries: []
};

export async function connectToDatabase() {
  console.log('Connected to mock MongoDB database');
  return {
    client: { db: () => mockDb },
    db: mockDb
  };
}
