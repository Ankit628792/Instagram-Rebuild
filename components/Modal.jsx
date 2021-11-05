import { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from '../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from '@firebase/firestore'
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";

function Modal() {
    const { data: session } = useSession()
    const [open, setOpen] = useRecoilState(modalState);
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    const filePickerRef = useRef()
    const captionRef = useRef()

    const addImageToPost = (e) => {
        const reader = new FileReader()
        if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])
        reader.onload = (readerEvent) => setSelectedFile(readerEvent.target.result)
    }

    const uploadPost = async () => {
        if (loading) return

        setLoading(true)

        // 1. Create a post and add to firestore 'posts' collection
        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            caption: captionRef.current.value,
            profileImg: session.user.image,
            creatorId: session.user.uid,
            timestamp: serverTimestamp()
        })
        // 2. Get the post id for newly created post

        // 3. Upload the image to firebase storage with post id 
        const imageRef = ref(storage, `posts/${docRef.id}/image`)
        await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
            // 4. get download url from firebase storage and update the original post with image url
            const downloadUrl = await getDownloadURL(imageRef)
            await updateDoc(doc(db, 'posts', docRef.id), {
                postImg: downloadUrl
            })
        })
        setLoading(false)
        setOpen(false)
        setSelectedFile(null)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center" onClose={setOpen}>
                <div className="fixed flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:-scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div className="inline-block min-w-[300px] align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                        <div>
                            {selectedFile ? <img src={selectedFile} className="w-full object-contain cursor-pointer" onClick={() => filePickerRef.current.click()} alt="" />
                                : <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer" onClick={() => filePickerRef.current.click()}>
                                    <CameraIcon className="w-7 h-7 text-red-600" aria-hidden="true" />
                                </div>
                            }
                            <div>
                                <div className="mt-3 text-center">
                                    <Dialog.Title as="h3" className="text-base left-6 font-medium to-gray-800 cursor-pointer" onClick={() => filePickerRef.current.click()}>
                                        Upload a photo
                                    </Dialog.Title>
                                </div>
                                <div>
                                    <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                                </div>
                                <div className="mt-4 p-1">
                                    <input type="text" className="border-b focus:border-red-100 text-base p-1 py-2 outline-none w-full text-center" ref={captionRef} placeholder="Enter a caption" />
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button onClick={uploadPost} disabled={!selectedFile} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-lg font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300">
                                    {loading ? 'Uploading...' : 'Upload Post'}
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
