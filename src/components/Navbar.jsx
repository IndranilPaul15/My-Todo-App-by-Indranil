import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className='flex justify-between items-center bg-blue-800 text-[#cee7fd] px-3 md:px-7 py-1 mb-4'>
                <div className="text-2xl font-bold text-yellow-400 flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#facc15"><path d="M186.67-80q-27 0-46.84-19.83Q120-119.67 120-146.67v-600q0-27 19.83-46.83 19.84-19.83 46.84-19.83h56.66V-880h70v66.67h333.34V-880h70v66.67h56.66q27 0 46.84 19.83Q840-773.67 840-746.67v600q0 27-19.83 46.84Q800.33-80 773.33-80H186.67Zm0-66.67h586.66v-420H186.67v420Zm0-486.66h586.66v-113.34H186.67v113.34Zm0 0v-113.34 113.34Zm93.33 220V-480h400v66.67H280ZM280-240v-66.67h279.33V-240H280Z" /></svg>
                    iTask</div>
                    
                <ul className="flex gap-5">
                    <li className='hover:font-bold transition-all'><a href="">Home</a></li>
                    <li className='hover:font-bold transition-all'><a href="">Your Tasks</a></li>
                    <li className='hover:font-bold transition-all'><a href="">About</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
