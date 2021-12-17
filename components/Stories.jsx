import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

export const Story = ({ img, username }) => (
    <div>
        <img src={img} className="h-14 w-14 rounded-full p-0.5 border-2 border-red-500 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out" alt="" />
        <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
)

function Stories() {
    const { data: session } = useSession()
    const [open, setOpen] = useRecoilState(modalState)

    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        fetch('https://randomuser.me/api/?results=20').then(res => res.json()).then(data => setSuggestions(data?.results))
    }, [])
    return (
        <div className="flex space-x-3 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll">
            {session && <div onClick={() => setOpen(true)}>
                <img src="/assets/add.png" className="w-14 h-14 p-0.5 filter saturate-200 object-contain rounded-full cursor-pointer hover:scale-110 transition transform duration-200 ease-out" alt="" />
                <p className="text-xs w-14 truncate text-center">Add</p>
            </div>}
            {session && <Story img={session.user.image} username={session.user.username} />}
            {suggestions.map(profile => <Story key={profile.login.md5} img={profile.picture.large} username={profile.name.first} />)}
        </div>
    )
}

export default Stories
