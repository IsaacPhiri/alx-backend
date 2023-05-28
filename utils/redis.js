import redis from 'redis';

class RedisClient {
        constructor(port, host) {
                this.client = redis.createClient({
                        host: host,
                        port: port,
                });

                this.client.on('connect', () => {
                        console.log('Redis client connected.');
                });
                this.client.on('error', () => {
                        console.log('Conncetion to server failed!', error);
                });
		isAlive() {
			this.client.on('connect', () => {
				return true;
			});
			return false;
		};
		async function get(key){
			const value = await this.client.get(key, redis.print);
			return value;
		};
		async function set(key, value) {
			await this.client.set(key, value, redis.print);
		}
        }
}
