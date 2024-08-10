import Link from "next/link"


function Header2() {
  return (
    <main className="flex  md:h-14 2xl:h-16 3xl:h-24 shadow-xl 2xl:shadow-2xl border-b-2 border-zinc-700 text-zinc-100 font-semibold text-normal font-sans tracking-wider w-full">
    <div className="logo ">
        <Link href="/">
            <div className="flex gap-1  items-center">
        <img src="./icon.png" width="50" height="50" alt="" />
        <h1>Hyperstream</h1>
        </div>
        </Link>
    </div>
    <div className="center flex justify-around gap-7">
        <Link href="/">Home</Link>
        <Link href="/admin">Admin</Link>
        
        
    </div>
    <div className="flex flex-1">
      <form className="flex-1 max-w-lg ">
       <input className="py-2 px-2 w-full" type="email" />
      </form>
        <button>Logout</button>
        
    </div>
    </main>
  )
}

export default Header2