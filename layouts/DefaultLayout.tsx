import { Footer } from "components/Footer"
import { Navigation } from "components/Navigation"
import Head from "next/head"
import { PropsWithChildren } from "react"
import layoutStyles from "../styles/Layout.module.css";

export const DefaultLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Head>
        <title>Jambhalucid</title>

        <meta name="description" content="A demo application using Lucid and Next.js" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className={layoutStyles.container}>
        <Navigation />

        <main className="min-h-[calc(100vh-295px)] pt-12">{children}</main>

        <Footer />
      </div>
    </>
  )
}
