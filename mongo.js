const mongoose = require('mongoose')

const url =
	'mongodb+srv://eyu:5680@cluster-fo.vubfjvd.mongodb.net/testNoteApp?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
	content: process.argv[2],
})

note.save().then(() => {
	console.log('note saved')

	mongoose.connection.close()
})
