import { getProviders, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'

function SignIn({providers}) {
    const router = useRouter()
    // Capture and Share the world's moments!
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-32 px-14 text-center">
                <img onClick={() => router.push('/')} className="w-80 2xl:w-96" src="/assets/logo-xl.png" alt=" " />
                <p className="text-sm max-w-md text-gray-600">The unofficial Free People Instagram. <br/> The Free People woman lives free through fashion, art, music, travel, and everything in between.</p>
                <div className="mt-10">
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className="insta-gradient rounded-lg text-white py-3 px-5 font-medium text-lg" onClick={() => signIn(provider.id, {callbackUrl: '/'})}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SignIn

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: {
            providers
        }
    }
}
