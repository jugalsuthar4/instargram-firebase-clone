import React,{useEffect,useState} from 'react'
import "./Posts.css"
import Post from "./Post"
import {db} from "../firebase"
import InputPost from "./InputPost"
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor:"red"
}

function Posts() {
    const [posts,setPosts]=useState([])
    const [loading, setLoading]=useState(true)

    useEffect(() =>{
        db.collection('posts').onSnapshot((snapshot)=>{
             setPosts(snapshot.docs.map((doc)=> ({
                id: doc.id,
                post: doc.data()
              })))
       })
       setLoading(false)
    },[])
    return (
        <div className="posts">
        {console.log(posts)}
          {
              !loading ? <><InputPost/> 

              {
                  posts.map((eachPost)=>{
                    return (
                        <Post key={eachPost.id} postId={eachPost.id} data={eachPost.post} />
                    )
                  })
              }
              </>
              : <ClipLoader color="#ffffff" css={override} size={150} />
          }
            
        </div>
    )
}

export default Posts
