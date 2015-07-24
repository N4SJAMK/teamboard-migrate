/**
 *
 */
export default function(database, ticket, done) {
	let update = {
		$set: {
			'comments':     null,
			'createdBy':    null,
			'lastEditedBy': null
		},
		$unset: {
			'position.z': 1
		}
	}
	return database.collection('tickets')
		.update({ _id: ticket._id }, update, done);
}
