import express from "express"
import path from 'path'
import { fileURLToPath } from "url"
import bodyParser from 'body-parser'

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FORMAT = 'MM-DD HH:mm'
const TIME_ZONE = 'America/New_York'

const app = express()
app.use(bodyParser.urlencoded( {extended: true} ))

app.get('/', (req, res)=> {
	res.send(`hello from app engine, the time is: ${dayjs().format(FORMAT)}\r\n <br>
	and the time in new york is: ${dayjs().tz(TIME_ZONE)}`)
})
app.get('/submit', (req, res)=> {
	res.sendFile(path.join(__dirname, '/views/form.html'))
	__dirname
})

app.post('/submit', (req, res)=> {
	console.log({
		name: req.body.name,
		message: req.body.message
	})
	res.send('thans for your message')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> {
	console.log(`Serser listening on port ${PORT}`)
})