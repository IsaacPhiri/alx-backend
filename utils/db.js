import { MongoClient } from 'mongodb';

class DBClient {
	constructor () {
		const host = process.env.DB_HOST || 'localhost';
		const port = proces.env.DB_PORT || '27017';
		const database = process.env.DB_DATABASE || 'files_manager';

		const url = 'mongodb://${host}:${port}/${database}';

		this.client = new MongoClient(url, { useUnifiedTopology: true });
		this.connection = null;
	}


}
