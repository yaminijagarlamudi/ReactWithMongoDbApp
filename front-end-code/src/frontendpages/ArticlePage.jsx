import { useParams } from "react-router-dom";
import articles from "../article-content";

export default function ArticlePage()
{

    const params = useParams();
    const articleName =params.name;

    const article =
    articles.find (a =>a.name == articleName);
    return (
        <>
    <h1>{article.title}</h1>
    {article.content.map(p=> <p key={p}>{p}</p>)}
    </>
    );
}