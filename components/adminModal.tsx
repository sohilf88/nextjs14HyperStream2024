

function AdminModal() {
  return (
   <>
   


<div id="authentication-modal" aria-hidden="false" className="
 flex overflow-y-auto overflow-x-hidden justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm backdrop-opacity-70  ">
    <div className="p-4 w-full max-w-md max-h-full ">
        
        <div className="z-[1000] bg-zinc-800 rounded-lg shadow text-zinc-200  ">
          
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t text-zinc-200">
                <h3 className="text-xl font-semibold  ">
                    Change User Detail
                </h3>
                <button type="button" className="end-2.5  bg-transparent hover:bg-gray-200 hover:text-zinc-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="authentication-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
           
            <div className="p-4 md:p-5 text-zinc-200">
                <form className="space-y-4 text-zinc-200" action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-200 dark:text-white">username</label>
                        <input type="text" name="username" id="username" className=" border border-gray-300 bg-transparent  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-200 dark:text-white">E-mail</label>
                        <input type="email" name="email" id="email" placeholder="••••••••" className="bg-transparent border border-gray-300 text-zinc-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                     <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-zinc-200 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-transparent border border-gray-300 text-zinc-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                    </div>
                      <div className="block mb-2 text-sm font-medium text-zinc-200 dark:text-white"> User Roles</div>
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <div className="flex flex-1 px-3 py-2 justify-center w-full gap-8 items-center h-8">
                                
                                <div className="flex items-center">
                                <input id="remember" name="root" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                <label htmlFor="user" className="ms-2 text-sm font-medium text-zinc-200 dark:text-gray-300">Super Admin</label>
                                </div>
                               <div className="flex items-center">
                                <input id="admin" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                <label htmlFor="user" className="ms-2 text-sm font-medium text-zinc-200 dark:text-gray-300">Admin</label>
                                </div>
                                <div className="flex items-center">
                                <input checked disabled id="user" type="checkbox" value="user" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                 <label htmlFor="user" className="ms-2 text-sm font-medium text-zinc-200 dark:text-gray-300">User</label>
                                 </div>
                            </div>
                            
                        </div>
                       
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">update profile</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                       <a href="#" className="text-red-500 hover:underline dark:text-blue-500">Change Password ?</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 

   
   </>
  )
}

export default AdminModal