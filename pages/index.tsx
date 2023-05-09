import { Inter } from "@next/font/google"
import layoutStyles from "../styles/Layout.module.css";

const inter = Inter({ subsets: ["latin"] })


export default function Home() {
  return (
    <div className="text-center max-w-4xl m-auto text-gray-900 dark:text-gray-100">
      <h1
        style={inter.style}
        className={layoutStyles.title}
      >
        Jambhalucid
      </h1>
      <p
        style={inter.style}
        className={layoutStyles.description}
      >
        A Lucid/Next.js demo UI for Jambhala Plutus samples
      </p>
    </div>
  )
}
