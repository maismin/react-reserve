import mongoose from 'mongoose'

const connection = {}

const connectDb = async () => {
  if (connection.isConnected) {
    // Use existing database connection
    console.log('Using existing connection')
    return
  }

  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  console.log('DB Connected')

  // How to connect MongoDB to a serverless application
  connection.isConnected = db.connections[0].readyState
}

export default connectDb
