#!/usr/bin/node

import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = createClient();
	this.Connected = true;
        this.client.on('error', (error) => {
		console.error('Redis client connection failed:', error.message);
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
