import {useState, useEffect} from 'react'
import faker from 'faker'

function Suggestions() {
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        const suggestions = [...Array(5)].map((_,i) => ({
            ...faker.helpers.contextualCard(),
            id: i
        }))
        setSuggestions(suggestions)
    }, [])
    return (
        <div className="m-4 ml-10">

            <div className="flex justify-between items-center text-sm mb-5">
                <h3 className=" font-normal text-gray-400">Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>

            {suggestions?.map(profile => (
                <div key={profile.id} className="flex items-center justify-between mt-3">
                    <img src={profile.avatar} className="w-10 h-10 rounded-full border p-0.5" alt="" />
                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm truncate">{profile.username}</h2>
                        <h3 className="text-xs to-gray-400 truncate">Works at {profile.company.name}</h3>
                    </div>
                    <button className="text-blue text-sm font-semibold hover:text-blue-500 pl-1">Follow</button>
                </div>
            ))}

        </div>
    )
}

export default Suggestions
