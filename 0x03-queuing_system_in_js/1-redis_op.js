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

//set key and value
function setNewSchool(schoolName, value) {
	client.set(schoolName, value, redis.print);
}

//get value
function displaySchoolValue(schoolName) {
	client.get(schoolName, redis.print);
}

// Close the Redis connection when the script is terminated
process.on('SIGINT', () => {
	client.quit();
});

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
