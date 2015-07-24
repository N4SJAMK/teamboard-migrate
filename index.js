import 'babel/polyfill';
import { MongoClient } from 'mongodb';

import invoker from './utils/invoke-for-collection';

const TARGET_DB_URL = process.env.TARGET_DB_URL ||
	'mongodb://localhost:27017/test';

const migrations = [
	{ module: 'clean-events',        collection: 'events'  },
	{ module: 'clean-tickets',       collection: 'tickets' },
	{ module: 'clean-board-members', collection: 'boards'  }
]

function getDatabase(url) {
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, (err, database) => {
			if(err) {
				return reject(err);
			}
			return resolve(database);
		});
	});
}

function runMigrationsFor(database) {
	return Promise.all(migrations.map((m) => {
		return invoker(
			database, m.collection, require(`./migrations/${m.module}`));
	}));
}

getDatabase(TARGET_DB_URL).then(runMigrationsFor)
	.then(() => console.log('Ran migrations succesfully.'))
	.catch(console.error);
