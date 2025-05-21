import { useState } from "react";

export default function AddCommentForm({onAddcomment})
{

    const [nameText,setNameText] = useState('');
    const [commentText,setCommentText] = useState('');

    return(
        <div>
            <h3>Add a comment</h3>
           
            <label>
                Name:
                <input type="text" value={nameText} onChange={e => setNameText(e.target.value)}/>
            </label>
            <label>
                Comment:
                <input type="text" value={commentText} onChange={e =>setCommentText(e.target.value)}/>
            </label>
            <br/>
            <button onClick={() => onAddcomment({nameText,commentText})}>Add Comment</button>
        </div>
    )
}