// components/NavBar.tsx

import Link from 'next/link'

const NavBar = () => {
  return (
    // <div>NavBar</div>
    <nav className="bg-white shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center p-4">
          
          <div className='flex items-center space-x-2 gap-10'>
            <div className="text-lg font-bold text-blue-600">
              <Link href="/">ResumDoc</Link>
            </div>
            <div className='flex items-center space-x-4'>
              <Link href="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
            </div>
          </div>
          <div className="flex space-x-4">
           
            <Link href="/signin" className="text-gray-700 hover:text-blue-600">
            <button className="bg-blue-600 text-white text-lg font-medium  px-2 rounded-lg shadow hover:bg-blue-700 transition"
            
            
            >
            Sign In
            </button>
            </Link>
            {/* <Link href="#about" className="text-gray-700 hover:text-blue-600">About Us</Link> */}
            <Link href="#contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </nav>
  )
}

export default NavBar