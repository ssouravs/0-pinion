const express=require('express')
const bodyParser = require('body-parser');
const app=express()
const PORT=8080
const MONGO_PASSWORD="pi2hdSrBYizm9Fbi"

//export all the routes
const userRoutes=require('./routes/userRoutes')
const postRoutes=require('./routes/postRoutes')
const testRoutes=require('./routes/testRoutes')

app.use(bodyParser.json());


//call all the routes
app.use('/api/v1',userRoutes)
app.use('/api/v1',postRoutes)
app.use('/api/v1',testRoutes)


const startServer=async ()=>{
    await app.listen(PORT)
    console.log(`Server started at ${PORT}`)
}

startServer()