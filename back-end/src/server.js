import express from 'express';

const app = express();

app.use(express.json());


//fake db for testing JsArray

const articleInfo = [
    {
        upVotes:0,
        articleName : 'learn-node',
        comments:[]
    },
    {
        upVotes:0,
        articleName : 'learn-react',
        comments:[]
    },
    {
        upVotes:0,
        articleName : 'learn-mongodb',
        comments:[]
    }

]


// app.get('/hello',function(req,res)
// {
//     res.send('hello from get!');
    
// });

// app.post('/hello',function(req,res)
// {
//     res.send('Hello ' + req.body.name + ' response from post call');
// })


// app.get('/hello/:name',function(req,res)
// {
//     res.send("hello " + req.params.name );
// })



app.post('/api/articles/:name/upvote',(req,res) =>
{

    const article = articleInfo.find(a=>a.articleName === req.params.name);
    article.upVotes +=1;

    res.json({article});

});


app.post('/api/articles/:name/comments',(req,res)=>
{
    const {name} = req.params;

    const {postedBy,text} =req.body;
    
    const article = articleInfo.find(a=>a.articleName === name);
   
    article.comments.push({postedBy,text});
   
     res.json({article});

});




app.listen(8000,function(){
    console.log('Server is listening in port 8000');
})