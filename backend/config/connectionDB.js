//Importing all necessary dependancy
const mongoose = require('mongoose');
const env = require('dotenv');

env.config(); //configuring connection string form dotenv file
const connection_string = process.env.CONNECTION_STRING

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(connection_string);
        console.log("sucessfully connected to Database: ", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;