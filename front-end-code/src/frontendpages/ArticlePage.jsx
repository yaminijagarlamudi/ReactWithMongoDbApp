import { useState } from "react";
import { useParams,useLoaderData } from "react-router-dom";
import articles from "../article-content";
import axios from 'axios';
import CommentsList from "../commentsList";
import AddCommentForm from "../AddCommentForm";
import useUser from "../useUser";

export default function ArticlePage()
{

    const params = useParams();
    const articleName =params.name;

    const {upVotes:initialUpVotes,comments:initialComments} = useLoaderData();
    const[upVotes,setUpVotes] = useState(initialUpVotes);
    const[comments,setComments] =useState(initialComments);

    const {isLoading,user} = useUser();

    async function onUpVoteClicked() {
        const token =user && await user.getIdToken();
        const headers = token ? {authtoken:token} :{};

        const response = await axios.post('/api/articles/'+ articleName +'/upvote',null,{headers});
        const updatedArticleData = response.data;
        setUpVotes(updatedArticleData.upVotes);
    }


    async function onAddcomment({nameText,commentText}) {

        const token =user && await user.getIdToken();
        const headers = token ? {authtoken:token} :{};
       
        const response = await axios.post('/api/articles/'+ articleName +'/comments',{
            postedBy:nameText,
            text :commentText
        },{headers});
        const updatedArticleData = response.data;
        setComments(updatedArticleData.comments);
    }

    const article =
    articles.find (a =>a.name == articleName);
    return (
        <>
    <h1>{article.title}</h1>
    {user &&
    <button onClick={onUpVoteClicked}>Upvote</button>}
    <p>This article has {upVotes} upvotes! </p>
    {article.content.map(p=> <p key={p}>{p}</p>)}

    {user 
    ? <AddCommentForm onAddcomment={onAddcomment}/>
    : <p>Log in to add a comment</p>}
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
