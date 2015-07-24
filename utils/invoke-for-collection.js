import hi from 'highland';

export default function invokeForCollection(database, name, f) {
	return new Promise((resolve, reject) => {
		let collection = database.collection(name);

		let stream = hi(collection.find(null)).map((doc) => {
			return hi((push) => f(database, doc, (err) => push(err, hi.nil)));
		}).sequence();

		stream.on('error', (err) => {
			reject(err);
			return stream.destroy();
		});

		return stream.done(resolve);
	});
}
