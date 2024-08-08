import express from 'express'
import bootstrab from './src/bootstrab.js'
import cors from 'cors'
import 'dotenv/config'


const app = express()
const port = process.env.PORT ||3000
app.use(cors())
// const port=3000
bootstrab(app,express)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))