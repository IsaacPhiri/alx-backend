import { MongoClient } from 'mongodb';

class DBClient {
	constructor () {
		const host = process.env.DB_HOST || 'localhost';
		const port = process.env.DB_PORT || '27017';
		const database = process.env.DB_DATABASE || 'files_manager';

		const url = 'mongodb://${host}:${port}/${database}';

		this.client = new MongoClient(url, { useUnifiedTopology: true });
		this.connection = null;
	}
	
	async isAlive() {
		if (!this.connection) {
			try{
				this.connection = await this.client.connect();
				console.log('Connected to MongoDB.');
			} catch (error) {
				console.error('Connection to MongoDB failed!', error);
				return false;
			}
		}
		return true;
	}

	async nbUsers() {
		if (!this.connection) {
			await this.isAlive();
		}
		try {
			return await this.client.db().collection('users').countDocuments(); 
		} catch (error) {
			console.error('Error retrieving number of users:', error);
			return -1;
		}
	}

	async nbFiles() {
		if (!this.connection) {
			await this.isAlive();
		}
		try {
			return await this.client.db().collection('files').countDocuments();
		} catch (error) {
			console.log('Error retrieving number of files:', error);
			return -1;
		}
	}
}

const dbClient = new DBClient();
export default dbClient;

//import dbClient from './utils/db';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await setTimeout(() => {
                i += 1;
                if (i >= 10) {
                    reject()
                }
                else if(!dbClient.isAlive()) {
                    repeatFct()
                }
                else {
                    resolve()
                }
            }, 1000);
        };
        repeatFct();
    })
};

(async () => {
    console.log(dbClient.isAlive());
    await waitConnection();
    console.log(dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());
})();
