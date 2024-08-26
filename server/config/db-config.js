const MONGO_URL="mongodb+srv://souravshivam:pi2hdSrBYizm9Fbi@social-db.nkiur.mongodb.net/?retryWrites=true&w=majority&appName=social-db"

const db=require('mongoose')

db.connect(MONGO_URL).then(()=>console.log(`Database connected at ${MONGO_URL}`))
.catch((err)=>console.log(`error detected while connecting to database ${err}`))

module.exports={db}