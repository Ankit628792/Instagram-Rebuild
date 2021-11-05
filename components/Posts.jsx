import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";
import Post from "./Post"

function Posts() {
    const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     // level 3
    //     return onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => { setPosts(snapshot.docs) })

    //     // level 2
    //     // return unsubscribe()
    //     // level 1
    //     // return () => unsubscribe()
    // }, [db])

    // level 4
    useEffect(() => onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => setPosts(snapshot.docs)), [db])

    return (
        <div>
            {posts && posts.map(post => <Post key={post.id} id={post.id} creatorId={post.data().creatorId} username={post.data().username} userImg={post.data().profileImg} img={post.data().postImg} caption={post.data().caption} />)}
        </div>
    )
}

export default Posts
