import { useState } from "react";
import { useParams,useLoaderData } from "react-router-dom";
import articles from "../article-content";
import axios from 'axios';
import CommentsList from "../commentsList";
import AddCommentForm from "../AddCommentForm";

export default function ArticlePage()
{

    const params = useParams();
    const articleName =params.name;

    const {upVotes:initialUpVotes,comments:initialComments} = useLoaderData();
    const[upVotes,setUpVotes] = useState(initialUpVotes);
    const[comments,setComments] =useState(initialComments);

    async function onUpVoteClicked() {
        
        const response = await axios.post('/api/articles/'+ articleName +'/upvote');
        const updatedArticleData = response.data;
        setUpVotes(updatedArticleData.upVotes);
    }


    async function onAddcomment({nameText,commentText}) {
        const response = await axios.post('/api/articles/'+ articleName +'/comments',{
            postedBy:nameText,
            text :commentText
        });
        const updatedArticleData = response.data;
        setComments(updatedArticleData.comments);
    }

    const article =
    articles.find (a =>a.name == articleName);
    return (
        <>
    <h1>{article.title}</h1>
    
    <button onClick={onUpVoteClicked}>Upvote</button>
    <p>This article has {upVotes} upvotes! </p>
    {article.content.map(p=> <p key={p}>{p}</p>)}

    <AddCommentForm onAddcomment={onAddcomment}/>
    <CommentsList comments={ comments}/>
    </>
    );
}

export async function loader({params})    {
    {
     const response = await axios.get('/api/articles/'+ params.name);
     const {upVotes,comments} = response.data;
     return {upVotes,comments};
    }
    }
