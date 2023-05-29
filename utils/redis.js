const redis = require('redis');


class RedisClient {
    constructor(port, host) {
        this.client = redis.createClient({
            host: host,
            port: port,
        });

        this.client.on('connect', () => {});
        this.client.on('error', () => {});

    }

    isAlive() {
        return new Promise((resolve, reject) => {
            this.client.on('connect', () => {
                resolve(true);
            });
            this.client.on('error', () => {
                resolve(false);
            });
        });
    }

    async get(key) {
       // try {
            const value = await this.client.get(key);
            return value;
      //  } catch (error) {
       //     throw new Error('Could not get value.');
       // }
    }

    async set(key, value, time) {
        //try {
            await this.client.set(key, value);
         //   setTimeout(() => {
          //  }, time);
        //} catch (error) {
          //  throw new Error('Could not set key:value for client.');
        }
    //}

    async del(key) {
        try {
            await this.client.del(key);
        } catch (error) {
            throw new Error('Could not delete key.');
        }
    }
}

const redisClient = new RedisClient(6379, 'localhost');

(async () => {
    console.log(await redisClient.isAlive());
    console.log(await redisClient.get('myKey'));
    await redisClient.set('myKey', 12, 5000);
    console.log(await redisClient.get('myKey'));

    setTimeout(async () => {
        console.log(await redisClient.get('myKey'));
    }, 10000);
})();
