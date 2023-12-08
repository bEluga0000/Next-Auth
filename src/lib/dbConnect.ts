import mongoose from "mongoose"

let alreadyDone = false
export async function ensureDbConnect()
{
    if(!alreadyDone)
    {
        return;
    }
    else
    {
        const mongooseUrl = process.env.MONGO_URL
        if (mongooseUrl) {
            await mongoose.connect(mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "AUTH" }).then(() => {
                console.log('connected')
            })
        }
    }
    
}