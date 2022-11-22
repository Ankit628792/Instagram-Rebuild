import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'

const progress = new ProgressBar({
  size: 5,
  className: "z-50 insta-gradient",
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <link rel='icon' href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Instagram - The app allows users to upload media that can be edited with filters and organized by hashtags and geographical tagging." />
        <meta name="author" content="@ankit_628792" />
        <meta name='theme-color' content='#1380F9' />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <SessionProvider session={session}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </>
  )
}

export default MyApp
