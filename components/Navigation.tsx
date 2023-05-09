import Link from "next/link"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { twMerge } from "tailwind-merge"
import { CardanoWalletSelector } from "use-cardano"
import layoutStyles from "../styles/Layout.module.css";

const className =
  "h-10 text-white font-bold tracking-widest uppercase rounded mr-2 px-6 flex items-center dark:hover:text-white bg-blue-300 dark:bg-transparent dark:hover:bg-transparent dark:shadow-none shadow shadow-blue-100s hover:shadow-none hover:bg-blue-400 transition-all duration-300 hover:underline underline-offset-4"

const activeClassName =
  "text-black dark:text-white ark:bg-transparent dark:shadow-none dark:hover:bg-transparent dark:underline"

export const Navigation = () => {
  const { asPath } = useRouter()

  const isHome = useMemo(() => asPath === "/", [asPath])
  const isGift = useMemo(() => asPath === "/contracts/gift", [asPath])
  const isCustomTyped = useMemo(() => asPath === "/contracts/custom-typed", [asPath])

  return (
    <nav className="flex h-24 items-center justify-around w-full py-2">
      <div className="flex items-center">
        <span className={layoutStyles.logo}>Jambhalucid</span>
        {/* <Link href="/">
          <button className={twMerge(className, isHome && activeClassName)}>Home</button>
        </Link>

        <Link href="/contracts/gift">
          <button className={twMerge(className, isGift && activeClassName)}>Gift</button>
        </Link>

        <Link href="/contracts/custom-typed">
          <button className={twMerge(className, isCustomTyped && activeClassName)}>Custom-Typed</button>
        </Link> */}

      </div>

      <div>
        <CardanoWalletSelector />
      </div>
    </nav>
  )
}
