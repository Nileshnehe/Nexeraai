import "dotenv/config"
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

connectDB()
.catch((err) => { 
    console.log("MongoDB connection failed:", err);
    process.exit(1);
    
})

app.listen(3000, () =>{
    console.log("Express is running on port 3000");
    
})

