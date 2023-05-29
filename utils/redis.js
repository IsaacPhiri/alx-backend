#!/usr/bin/node

import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = createClient();
	this.Connected = true;
        this.client.on('error', (err) => {
		console.error('Redis client connection failed:', err.message);
		this.Connected = false;
	});
	this.client.on('connect', () => {
		this.Connected = true;
	});
    }

    isAlive() {
        return this.Connected;
    }

    async get(key) {
       return promisify(this.client.GET).bind(this.client)(key);
    }

    async set(key, value, time) {
	await promisify(this.client.SETEX)
	    .bind(this.client)(key, time, value);
        }

    async del(key) {
        await promisify(this.client.DEL).bind(this.client)(key);
    }
}

export const redisClient = new RedisClient();
export default redisClient;

(async () => {
    console.log(redisClient.isAlive());
    console.log(await redisClient.get('myKey'));
    await redisClient.set('myKey', 12, 5);
    console.log(await redisClient.get('myKey'));

    setTimeout(async () => {
        console.log(await redisClient.get('myKey'));
    }, 1000*10)
})();
