import { app } from "./app";
import connectDb from "./db/db";
import { config } from "dotenv";


config({
    path: "./.env"
});


connectDb().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        
        console.log(`server is running on http://localhost:${process.env.PORT}`);
    })
    app.on("error", (err) => {
        console.log(err);
    })
}).catch((err) => {
    console.log(err);
    process.exit(1);
});