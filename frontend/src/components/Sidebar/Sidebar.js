import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaHome, FaSearch, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="lg:hidden p-4">
        <AiOutlineMenu
          className="text-2xl cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      <div
        className={`fixed lg:static top-0 left-0 min-h-screen bg-yellow-100 w-64 p-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 z-50`}
      >
        {/* Header with Close Icon */}
        <div className="flex justify-between items-center mb-4 lg:mb-8">
          <h2 className="text-xl font-bold">Welcome Siva</h2>
          <AiOutlineClose
            className="text-2xl cursor-pointer lg:hidden"
            onClick={closeSidebar}
          />
        </div>

        {/* Links */}
        <Link href="/" className="mb-2 p-2 flex items-center bg-gray-200 rounded hover:bg-gray-300">
          <FaHome className="mr-2" /> Home
        </Link>
        <Link href="/search" className="mb-2 p-2 flex items-center bg-purple-200 rounded hover:bg-purple-300">
          <FaSearch className="mr-2" /> Search
        </Link>
        <Link href="/cart" className="mb-2 p-2 flex items-center bg-gray-200 rounded hover:bg-gray-300">
          <FaShoppingCart className="mr-2" /> Cart
        </Link>
        <button className="mt-auto p-2 flex items-center bg-red-500 text-white rounded hover:bg-red-600">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-40"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
}

