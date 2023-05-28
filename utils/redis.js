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
			try {
				const value = await this.client.get(key, redis.print);
				return value;
			} catch (error) {
				throw new Error('Could not get value.');
			}
		};
		async function set(key, value, time) {
			setTimeout(() => {
			try {
				await this.client.set(key, value, redis.print);
			} catch (error) {
				throw new Error('Could not set key:value for client.');
			}, time)};
		};
		async function del(key) {
			try {
				await this.client.del(key);
			} catch (error) {
				throw new Error('Could not delete key.');
			}
		};
        }
}

const redisClient = new RedisClient;
