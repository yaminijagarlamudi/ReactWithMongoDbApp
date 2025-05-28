import express from 'express';
import { MongoClient, ReturnDocument, ServerApiVersion } from 'mongodb'
import admin from 'firebase-admin';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const credentials = JSON.parse(fs.readFileSync('./credentials.json'))

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});


const app = express();

app.use(express.json());

let db;

async function connectToDb() {
    const uri = process.env.MONGODB_USERNAME 
    ? `mongodb+srv://mongodb:${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongocluster.jsviodj.mongodb.net/?retryWrites=true&w=majority&appName=MongoCluster`
    :  'mongodb://127.0.0.1:27017' ;
    const client = new MongoClient(uri, {
        serverApi:
        {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    await client.connect();

    db = client.db('full-stack-react-db');

}


// Logic to serve Front end and Back End from same server
app.use(express.static(path.join(__dirName,'../dist')))

app.get(/^(?!\/api).+/,(req,res) => {
    res.sendFile(path.join(__dirName,'../dist/index.html'));
});



app.get('/api/articles/:name', async (req, res) => {
    const articleName = req.params.name;

    const article = await db.collection('articles').findOne({ articleName });

    res.json(article);
});

//Middleware run here so only post calls use the auth token
app.use(async function (req,res,next) {
    const {authtoken} = req.headers;

    if(authtoken)
    {
     const user = await admin.auth().verifyIdToken(authtoken);
     req.user =user;
     next();
    }
    else
    {
        res.sendStatus(400);
    } 
});

app.post('/api/articles/:name/upvote', async (req, res) => {
   
    const {uid} =req.user;

    upvoteIds:[ 123, 234, 345];

    const article = await db.collection('articles').findOne({articleName: req.params.name});

    const upvoteIds =article.upvoteIds ||  [];
    const canUpvote =uid && !upvoteIds.includes(uid);

    if(canUpvote){

    const updatedArticle = await db.collection('articles').findOneAndUpdate({ articleName: req.params.name },
        {
            $inc: { upVotes: 1 },
            $push : {upvoteIds :uid},
        },
        {
            ReturnDocument: "after",
        });
        res.json(updatedArticle);
    }
    else{
        res.sendStatus(403);
    }
}
);



app.post('/api/articles/:name/comments', async (req, res) => {

    const { postedBy, text } = req.body;

    const updatedArticleWithComment = await db.collection('articles').findOneAndUpdate({ articleName: req.params.name },
        {
            $push: { comments: { postedBy, text } }
        },
        {
            ReturnDocument: "after",
        });


    res.json(updatedArticleWithComment);

});


const port =process.env.port || 8000;

async function start() {
    connectToDb();
    app.listen(port, function () {
        console.log('Server is listening in port 8000');
    })
}

await start();