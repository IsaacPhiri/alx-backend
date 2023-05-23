import redis from 'redis';

// Create a Redis client
const client = redis.createClient(6379, '127.0.0.1');

// Handle the connection event
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Handle the error event
client.on('error', (error) => {
  console.log('Redis client not connected to the server:', error);
});

// Close the Redis connection when the script is terminated
process.on('SIGINT', () => {
	client.quit();
});
