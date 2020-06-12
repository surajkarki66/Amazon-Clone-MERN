import mongoose from 'mongoose';

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    if (connection) {
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } else {
        console.log('Something went wrong !')
    }
   
}; 

export default connectDB;
