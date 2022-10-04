import mongoose from  'mongoose';



const Connection = async (username , password) => {

    const URL = `mongodb://${username}:${password}@cluster0-shard-00-00.wg4tt.mongodb.net:27017,cluster0-shard-00-01.wg4tt.mongodb.net:27017,cluster0-shard-00-02.wg4tt.mongodb.net:27017/?ssl=true&replicaSet=atlas-2es8gi-shard-0&authSource=admin&retryWrites=true&w=majority`;
    
    try {
        await mongoose.connect(URL , { useUnifiedTopology: true , useNewUrlParser: true });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting while database" , error);
    }
}

export default Connection;