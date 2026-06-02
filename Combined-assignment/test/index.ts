import client from "./db/db";


async function connectDB(){
    await client.connect();
    console.log("client successfully connected!")
}

async function makeQuery(){
    try{
        const result = await client.query(
        'SELECT * FROM users'
    )

    console.log(result.rows)
    }
    catch(err:any){
        console.log(err.message)
    }
}

connectDB();
makeQuery()