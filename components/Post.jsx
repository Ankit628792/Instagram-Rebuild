import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "@firebase/firestore"
import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, DotsVerticalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon, TrashIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import { format } from 'timeago.js'

function Post({ id, username, creatorId, userImg, img, caption }) {
    const { data: session } = useSession()
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState()
    const [more, setMore] = useState(false)
    const [comment, setComment] = useState()

    useEffect(() => onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), (snapshot) => setComments(snapshot?.docs)), [db, id])
    useEffect(() => onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => setLikes(snapshot?.docs)), [db, id])

    useEffect(() => setHasLiked(likes.findIndex(like => like.id === session?.user?.uid) !== -1), [likes])
    const sendComment = async (e) => {
        e.preventDefault()
        const commentToSend = comment
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session?.user.username,
            userImage: session?.user.image,
            timestamp: serverTimestamp()
        })
    }

    const deletePost = async () => {
        (creatorId === session.user.uid) && await deleteDoc(doc(db, 'posts', id))
    }

    const likePost = async () => {
        hasLiked ?
            await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid))
            :
            await setDoc(doc(db, 'posts', id, 'likes', session?.user.uid), {
                username: session?.user.username
            })
    }

    return (
        <div className="bg-white my-7 border rounded">

            <div className="flex items-center p-5 py-4">
                <img src={userImg} className="h-12 w-12 rounded-full object-contain border p-1 mr-3" alt="" />
                <p className="flex-1 font-semibold">{username}</p>
                {(creatorId === session?.user?.uid) ? <TrashIcon onClick={deletePost} className="h-6 text-red-500 cursor-pointer" /> : <DotsVerticalIcon className="h-6 cursor-pointer" />}
            </div>

            <img src={img} className="w-full h-full object-cover max-h-[450px] sm:max-h-[500px] md:max-h-[600px] lg:max-h-[700px]" alt="" />

            <div className="flex justify-between items-center px-4 pt-4">
                <div className="flex space-x-4 items-center">
                    {hasLiked ?
                        <HeartIconFilled className="btn text-red-500" onClick={likePost} />
                        :
                        <HeartIcon className="btn" onClick={likePost} />
                    }
                    <ChatIcon className="btn" />
                    <PaperAirplaneIcon className="btn rotate-45" />
                </div>
                <BookmarkIcon className="btn" />
            </div>

           {caption?.length > 0 && <div className={`p-5 pt-3 text-sm flex items-end`}>
                <p className={` ${!more && 'truncate'}`}>
                    {likes?.length > 0 && <p className="font-semibold mb-1 text-sm">{likes.length} likes</p>}
                    <span className="font-semibold mr-1">{username} </span>
                    {caption}
                </p>
                {caption?.length > 90 && <a className="text-gray-500 cursor-pointer ml-1" onClick={() => setMore(!more)}>{more ? 'less' : 'more'}</a>}
            </div>}

            {comments &&
                <div className="ml-10 max-h-40 overflow-y-scroll">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <img src={comment.data().userImage} className="h-7 w-7 rounded-full" alt="" />
                            <p className="text-sm flex-1 text-gray-700"><span className="font-semibold text-black mr-1">{comment.data().username}</span>{comment.data().comment}</p>
                            <span className="pr-5 text-gray-500 text-xs">
                                {format(comment.data().timestamp?.toDate())}
                            </span>
                        </div>
                    ))}
                </div>
            }

            {session && <form className="flex items-center p-4">
                <EmojiHappyIcon className="h-7" />
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." className="border-none flex-1 mx-2 focus:ring-0 outline-none" />
                <button type="submit" disabled={!comment?.trim()} onClick={sendComment} className="text-blue font-semibold">Post</button>
            </form>}

        </div>
    )
}

export default Post
