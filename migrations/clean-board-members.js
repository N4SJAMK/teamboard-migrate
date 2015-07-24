/**
 *
 */
export default function(database, board, done) {
	let members = board.members.map((m) => {
		delete m.isActive;
		delete m.lastSeen;
		return m;
	});
	let update = {
		$set: { 'members': members }
	}
	return database.collection('boards')
		.update({ _id: board._id }, update, done);
}
