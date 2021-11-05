import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'
import ScrollToTop from '../components/ScrollToTop'

export default function Home() {
  return (
    <>
      <div className="bg-gray-50 h-screen overflow-y-scroll">
        <Head>
          <title>Instagram 2.0</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        <Feed />
        <Modal />
        <ScrollToTop />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session
    }
  }
}
