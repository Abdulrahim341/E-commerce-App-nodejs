import mongoose from 'mongoose'
import 'dotenv/config'
const dbconnection=mongoose
.connect('mongodb+srv://firstapp:weyu4R23ZrdXFTz@cluster0.7pd7xou.mongodb.net/EcommerceApp')
// .connect (process.env.DB_URL)
.then(()=>{
    console.log('DB connected');
}).catch(()=>{
    console.log('DB failure to connect' );
})
export default dbconnection



// .connect('mongodb://localhost:27017/EcommerceApp')