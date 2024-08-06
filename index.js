require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const generateId = () => {
	const maxId =
		notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0
	return String(maxId + 1)
}

const requestLogger = (req, res, next) => {
	console.log('Method: ', req.method)
	console.log('Path: ', req.path)
	console.log('Body: ', req.body)
	console.log('---')
	next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes)
	})
})

app.get('/api/notes/:id', (request, response) => {
	const id = +request.params.id
	const note = notes.find((n) => n.id === id)
	note
		? response.json(note)
		: response.status(404).send({ message: 'not found' })
})

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (!body.content) {
		return response.status(400).json({
			error: 'Content missing',
		})
	}

	const note = {
		content: body.content,
		important: Boolean(body.important) || false,
		id: generateId(),
	}

	notes = notes.concat(note)

	response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
	const id = +request.params.id
	if (notes.find((n) => n.id === id)) {
		notes = notes.filter((n) => n.id !== id)
		return response.status(204).end()
	}
	response.status(400).send({ error: 'note not found' })
})

const unknownEndpoint = (req, res) => {
	res.status(404).send({ message: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
