import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { exec, execSync } from "child_process";


dotenv.config()

const URI = process.env.URI || '';

const startDb = async () => {
    try {
        if (URI != "") {
            await mongoose.connect(URI + "/Users_Backups");
            console.log("Conectado ao banco...");
        } else {
            throw "URI de conexão necessaria..."
        }
    } catch (error) {
        console.log(error);
    }
};


export default startDb;