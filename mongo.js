const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://eyu:${password}@cluster-fo.vubfjvd.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
	content: 'do u fill like urself today?',
	important: true,
})

// note.save().then((res) => {
// 	console.log('note saved', res.toJSON())
// 	mongoose.connection.close()
// })

Note.find({}).then((res) => {
	res.forEach((note) => {
		console.log(note)
	})
	mongoose.connection.close()
})
