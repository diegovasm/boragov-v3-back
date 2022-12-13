import express from 'express'
import * as dotenv from 'dotenv'
import dbConnect from './config/db.config.js'
//fazer o import de todas as rotas

import boardRouter from './routes/board.route.js'
import orgaoRouter from './routes/orgao.route.js'
import tagRouter from './routes/tag.route.js'
import userRouter from './routes/user.route.js'

import cors from 'cors'

dotenv.config()

dbConnect()

const app = express()

app.use(cors({origin: process.env.REACT_URL}))
app.use(express.json({ limit: '10MB' }))

// avaliar se vale a pena criar a psta public com imagens
//estáticas que serão enviadas a todos os usuários.
//Isso é realmente necessário utilizando o cloudinary?
//arquivos css também deveriam ser alocados dentro dessa pasta?
//app.use(express.static('public'))


app.use('/board', boardRouter)
app.use('/orgao', orgaoRouter)
app.use('/tag', tagRouter)
app.use('/user', userRouter)


app.listen(Number(process.env.PORT), 
() => console.log(`server on port ${process.env.PORT}`))