import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaHome, FaSearch, FaShoppingCart, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectRole, selectUser, logout } from '@/redux/features/authSlice';
import { ROLE } from '@/common/constants';
import Button from '@/components/Button';
import { useDispatch } from 'react-redux';

const SidebarLink = ({ href, children }) => (
  <Link href={href} className="mb-2 p-2 flex items-center rounded hover:bg-gray-300">
    {children}
  </Link>
);

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  let role = useSelector(selectRole);
  let user = useSelector(selectUser);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderLinks = () => {
    if (role === ROLE.ADMIN) {
      return (
        <>
          <SidebarLink href="/admin/dashboard" >
            <FaHome className="mr-2" /> Home
          </SidebarLink>
          <SidebarLink href="/admin/booknew" >
            <FaPlus className="mr-2" /> New
          </SidebarLink>
        </>
      )
    } else if (role === ROLE.USER) {
      return (
        <>
          <SidebarLink href="/user/dashboard" >
            <FaHome className="mr-2" /> Home
          </SidebarLink>
          <SidebarLink href="/user/cart" >
            <FaShoppingCart className="mr-2" /> Cart
          </SidebarLink>
        </>
      )
    }
  }

  return (
    <div>
      <div className="lg:hidden p-4">
        <AiOutlineMenu
          className="text-2xl cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      <div
        className={`fixed lg:static top-0 left-0 h-screen bg-gray-200 w-64 p-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 z-50 flex flex-col justify-between`}
      >
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between mb-4 lg:mb-6'>
            <div className='flex flex-row items-center'>
              <img src="/libmate_icon.png" alt="Libmate" className="w-8 h-8 mr-2" />
              <h2 className="text-xl font-bold">Libmate</h2>
            </div>
            <AiOutlineClose
              className="text-2xl cursor-pointer lg:hidden"
              onClick={closeSidebar}
            />
          </div>

          {renderLinks()}
        </div>


        <div className='flex-col justify-end'>
          <p className='font-bold mb-2'>Welcome, <span className="italic">{user?.name}</span></p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
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

