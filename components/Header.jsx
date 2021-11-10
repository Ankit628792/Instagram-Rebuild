import Image from 'next/image'
import Link from 'next/link'
import { SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon } from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

function Header() {
    const { data: session } = useSession()
    const [open, setOpen] = useRecoilState(modalState)
    const router = useRouter();

    return (
        <div className="shadow-sm border-b bg-white sticky top-0 z-50">
            <div className="flex justify-between items-center bg-white max-w-6xl mx-5 xl:mx-auto">

                <div onClick={() => router.push('/')} className="relative h-16 w-40 hidden lg:inline-grid cursor-pointer">
                    <Image src="/assets/logo-xl.png" layout="fill" objectFit="contain" />
                </div>
                <div onClick={() => router.push('/')} className="relative h-10 w-10 lg:hidden flex-shrink-0 cursor-pointer">
                    <Image src="/assets/logo-sm.png" layout="fill" objectFit="contain" className="rounded-xl" />
                </div>

                <div className="relative p-3 mt-1 rounded-md max-w-xs">
                    <div className="flex items-center absolute inset-y-0 pl-3 pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input type="text" className="bg-gray-50 block w-full p-2 pl-10 border border-gray-300 focus:ring-black focus:border-black rounded-md" placeholder="Search" />
                </div>

                <div className="flex items-center justify-end space-x-2 sm:space-x-4 lg:space-x-5">
                   {!session ? <MenuIcon className="h-7 md:hidden flex-shrink-0 cursor-pointer" /> :
                    <PlusCircleIcon className="h-7 md:hidden flex-shrink-0 cursor-pointer" onClick={() => setOpen(true)} />}
                    <HomeIcon onClick={() => router.push('/')} className="navBtn" />
                    {session ?
                        <>
                            <div className="relative navBtn">
                                <PaperAirplaneIcon className="navBtn rotate-45" />
                                <div className="absolute -top-1 -right-2 text-xs text-white w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">{Math.ceil(Math.random() * 10)}</div>
                            </div>
                            <PlusCircleIcon className="navBtn" onClick={() => setOpen(true)} />
                            <UserGroupIcon className="navBtn" />
                            <HeartIcon className="navBtn" />
                            <img src={session.user?.image} onClick={signOut} className="h-10 w-10 object-cover rounded-full cursor-pointer" alt="" />
                        </>
                        :
                        <button className="font-medium flex-shrink-0"><Link href="/auth/signin">Sign In</Link></button>
                    }
                </div>

            </div>
        </div>
    )
}

export default Header
