import React,{useState} from 'react'
import firebase from 'firebase'
import FileBase from 'react-file-base64';
import {useAuth} from  "../contexts/AuthContext"
import {db} from "../firebase"
import "./InputPost.css"

function InputPost() {
    const {currentUser}=useAuth()
    const [caption,setCaption]=useState("")
    const [file,setFile]=useState("")
    console.log("curret user is  " , currentUser.uid)

    const handlePost=(e)=>{
        e.preventDefault()
        db.collection("posts").add({
            username:currentUser.displayName,
            image:file,
            caption:caption,
            uid:currentUser.uid,
            //timestamp:firebase.firestore.FieldValue.serverTimestamp()

        })
        setFile("")
        setCaption("")

    }
    return (
        <div className="inputPost">
            <div className="input_post_form">
                <form>
                 <input type="text" className="inputPost__input" placeholder="caption" value={caption} onChange={e=>setCaption(e.target.value)}/><br/>
                   <FileBase type="file" className="fileInput" multiple={false} onDone={({ base64 }) => setFile(base64)} /><br/>
                    <button className="button-post" type="submit" disabled={!caption} class="btn" onClick={handlePost}>Post</button>
                </form>
            </div>
        </div>
    )
}

export default InputPost
