import express from 'express';
import { MongoClient, ReturnDocument, ServerApiVersion } from 'mongodb'

const app = express();

app.use(express.json());

let db;

async function connectToDb() {
    const uri = 'mongodb://127.0.0.1:27017';
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



// Cleanup since data is persisted in Mongo now

app.get('/api/articles/:name', async (req, res) => {
    const articleName = req.params.name;

    const article = await db.collection('articles').findOne({ articleName });

    res.json(article);
}

)

app.post('/api/articles/:name/upvote', async (req, res) => {

    const updatedArticle = await db.collection('articles').findOneAndUpdate({ articleName: req.params.name },
        {
            $inc: { upVotes: 1 }
        },
        {
            returnDocument: "after",
        });


    res.json(updatedArticle);
}

)



app.post('/api/articles/:name/comments', async (req, res) => {

    const { postedBy, text } = req.body;

    const updatedArticleWithComment = await db.collection('articles').findOneAndUpdate({ articleName: req.params.name },
        {
            $push: { comments: { postedBy, text } }
        },
        {
            returnDocument: "after",
        });


    res.json(updatedArticleWithComment);

});


async function start() {
    connectToDb();
    app.listen(8000, function () {
        console.log('Server is listening in port 8000');
    })
}

await start();