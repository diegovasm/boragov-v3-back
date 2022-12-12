import mongoose from "mongoose"

mongoose.set('strictQuery', true);

async function connect(){

    try {
        
        const dbConnect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`conectado ao db ${dbConnect.connection.name}`)
    } catch (error) {
        console.log(error)
    }
}

export default connect
