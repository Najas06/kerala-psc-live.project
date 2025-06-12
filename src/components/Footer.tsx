import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-white h-20 py-5 border-t'>
        <div className='flex items-center justify-evenly text-black/70 text-sm'>
            <Link href='/'>Privacy Policy</Link>
            <Link href='/'>Terms & Conditions</Link>
            <Link href='/'>Contact</Link>
        </div>
        <p className='my-3 text-center text-black/70 text-sm'> &copy;{` ${new Date().getFullYear()} Kerala PSC Live. All rights reserved`}</p>
        <p className='my-3 text-center text-black/70 text-sm'>Designed with ❤️ by <span className='font-semibold'>Najas Nazar</span></p>

    </footer>
  )
}

export default Footer