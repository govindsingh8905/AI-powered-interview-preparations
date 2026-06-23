const mongoose = require("mongoose")

let cachedConnection = null

async function connectToDB(){
    if (cachedConnection) {
        console.log("Using cached database connection")
        return cachedConnection
    }

    try {
        const options = {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
            family: 4 // Force IPv4 to avoid Node 18+ DNS resolution issues on Vercel
        }
        cachedConnection = await mongoose.connect(process.env.MONGO_URI, options)
        console.log("connected to database ")
        return cachedConnection
    } catch (error) {
        console.log("Database connection error:", error)
    }
}

module.exports = connectToDB