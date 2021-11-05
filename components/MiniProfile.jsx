import { signOut, useSession } from "next-auth/react"

function MiniProfile() {
    const { data: session } = useSession()
    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <img src={session?.user?.image} className="rounded-full border w-16 h-16 p-0.5" alt="" />
            <div className="flex-1 mx-4">
                <h2 className="font-semibold">{session?.user?.username}</h2>
                <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
            </div>
            <button onClick={signOut} className="text-blue text-base font-semibold hover:text-blue-500">Sign Out</button>
        </div>
    )
}

export default MiniProfile
