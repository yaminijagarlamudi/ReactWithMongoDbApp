import articles from "../article-content";
import ArticlesList from "../ArticlesList";

export default function ArticlesListpage()
{
    return (
    <>
    <h1>Articles</h1> 
   
   <ArticlesList articles={articles}></ArticlesList>
    
    </>);
}