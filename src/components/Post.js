import React,{useState,useEffect} from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import {useAuth} from "../contexts/AuthContext"
import {db} from "../firebase"
import Dhoni from "../images/dhoni.jfif";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import TelegramIcon from '@material-ui/icons/Telegram';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
function Post({postId,data}) {
  const [comment,setComment]=useState("")
   const [comments,setComments]=useState([])
   const {currentUser}= useAuth()
   const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username:currentUser.displayName,
    });
    setComment('');
        
}
   useEffect(() => {
    let unsubscribe;
    if (postId) {
        unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            })
    }

    return () => {
        unsubscribe();
    };
}, [postId]);

  return (
  <>
    {
  
      <div className="post">
      <div className="post__header">
        <div className="post__header__left">
          <Avatar alt={data.username} src="/static/images/avatar/3.jpg" />
          <h4>{data.username}</h4>
        </div>
        <div className="post__header__right">
          {" "}
          <MoreHorizOutlinedIcon className="post__header_icon" />
        </div>
      </div>
      <div className="post__image">
        <img src={data.image} alt="dhoni" />
      </div>
      <div className="post__likes">
         <div className="post__left">
               <FavoriteBorderOutlinedIcon classsName="icons" fontSize="large"/>
               <ChatBubbleOutlineOutlinedIcon className="icons" fontSize="large"/>
               <TelegramIcon className="icons" fontSize="large"/>
         </div>
         <div className="post__right">
                 <BookmarkBorderIcon fontSize="large" className="icons"/>
         </div>
      </div>
      <h4 style={{margin:"5px 15px"}}>101 likes</h4>
      <h4 className="post__caption" style={{fontWeight:"normal",margin:"8px 15px"}}><span className="caption__username">{data.username}</span>{data.caption}</h4>
      <div className="post__comments">
         <h5>view all comments</h5>
         {
            comments.map((eachComment)=>{
              return (
                <h4><span className="post__comments__username">{eachComment.username}</span> {eachComment.text}</h4>
            )
            })
         }
      </div>
      <div className="post__comments_input">
         <form>
             <div className="comment_input">
               <input type="text" className= "comment_input_field" placeholder="Add a comment" value={comment} onChange={e=>setComment(e.target.value)}/>
             </div>
             <div className="comment_submit">
                <button type="submit" onClick={postComment} >Post</button>
             </div>
         </form>
      </div>
    </div>
    }
    
  </>
  );

}

export default Post;
