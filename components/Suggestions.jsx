import { useState, useEffect } from 'react'

function Suggestions() {
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        fetch('https://randomuser.me/api/?results=5').then(res => res.json()).then(data => setSuggestions(data?.results))
    }, [])
    return (
        <div className="m-4 ml-10">

            <div className="flex justify-between items-center text-sm mb-5">
                <h3 className=" font-normal text-gray-400">Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>

            {suggestions?.map(profile => (
                <div key={profile.login.md5} className="flex items-center justify-between mt-3">
                    <img src={profile.picture.large} className="w-10 h-10 rounded-full border p-0.5" alt="" />
                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm truncate">{profile.name.first}</h2>
                        <h3 className="text-xs to-gray-400 truncate max-w-xs">Works at {profile.location.state}, {profile.location.country}</h3>
                    </div>
                    <button className="text-blue text-sm font-semibold hover:text-blue-500 pl-1">Follow</button>
                </div>
            ))}

        </div>
    )
}

export default Suggestions
