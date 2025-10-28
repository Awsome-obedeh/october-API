import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoLogoWhatsapp } from "react-icons/io";


export default function Navbar() {
  return (
       <div className="bg-white flex items-center justify-around">
      <Image src="/loctechlogo.avif" alt="Description" width={200} height={50} />

      <div className="flex gap-10 items-center">
        <Link className="text-gray-700" href='/about'>About us</Link>
        <Link className="text-gray-700" href=''>Courses</Link>
        <Link className="text-gray-700" href=''>Contact us</Link>
        <Link className="text-gray-700" href=''>Blogs</Link>
        <IoLogoWhatsapp />
        <button className="bg-transparent border-1 border-red-700 text-red-600 px-5 py-2 rounded-sm">Log in</button>
        <button className="bg-red-700 text-white px-5 py-2 rounded-sm">Log in</button>
      </div>
    </div>
  )
}
