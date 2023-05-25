import redis from 'redis';

class RedisClient {
        constructor(port, host) {
                this.client = redis.createClient({
                        host: host,
                        port: port,
                });

                this.client.on('client', () => {
                        console.log('Redis client connected.');
                });
                this.client.on('error', () => {
                        console.log('Conncetion to server failed!', error);
                });
        }
}
