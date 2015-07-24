/**
 *
 */
export default function(database, event, done) {
	let update = {
		$set: {
			user: event.user
				? event.user.type === 'user'
					? event.user.id
					: null
				: null
		}
	}
	let events = database.collection('events');
	events.update({ _id: event._id }, update, (err) => {
		return done(err);
	});
}
