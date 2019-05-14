import express from 'express'
import cors from 'cors'
import apollo from './graphql'
import config from './config'

const app = express()

function listen() {
	const port = process.env.PORT || config.port
	app.listen(port, () =>
		console.log(`The server is running and listening at http://localhost:${port}`)
	)
}

app.use(
	cors({
		origin: config.corsDomain,
		optionsSuccessStatus: 200,
	})
)

// Endpoint to check if the API is running
app.get('/api', (req, res) => {
	res.send({ status: 'ok' })
})

apollo(app)

export default {
	getApp: () => app,
	listen,
}
