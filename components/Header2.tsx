import Link from "next/link"


function Header2() {
  return (
    <main className="flex items-center justify-around  gap-4 md:h-14 2xl:h-16 3xl:h-24 shadow-xl 2xl:shadow-2xl border-b-2 border-zinc-600 text-zinc-100 font-semibold text-normal font-sans tracking-wider w-full">
    <div className="logo ">
        <Link href="/">
            <div className="flex gap-1 justify-center items-center">
        <img src="./icon.png" width="50" height="50" alt="" />
        <h1>Hyperstream</h1>
        </div>
        </Link>
    </div>
    <div className="center flex justify-around gap-7">
        <Link href="/">Home</Link>
        <Link href="/admin">Admin</Link>
        
        
    </div>
    <div className="logout flex justify-around gap-7">
        <button>Logout</button>
        <button>profile</button>
    </div>
    </main>
  )
}

export default Header2