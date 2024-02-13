import express from 'express'
import { championsRouter } from './routes/champions.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(express.json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/champions', championsRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on PORT http://localhost:${PORT}`)
})
