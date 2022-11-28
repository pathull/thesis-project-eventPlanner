import React, { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { BsCalendar2Event } from 'react-icons/bs';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { CgAddR } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './NavBar.css';

export const NavBar = () => {
  const { logout } = useAuth0();
  const [open, setOpen] = useState<boolean>(true);
  const handleLogoutUser = () => {
    logout({ returnTo: window.location.origin });
  };

  const menus = [
    { name: 'Profile', link: '/', icon: AiOutlineUser },
    { name: 'Events', link: '/', icon: BsCalendar2Event },
    { name: 'Create Event', link: '/', icon: CgAddR },
    { name: 'Logout', link: '/', icon: RiLogoutBoxRLine, margin: true },
  ];
  // const logOut = menu?.name === 'Logout' ? handleLogoutUser : null
  return (
    <header className="flex justify-end navbar">
      <div className={`bg-[rgb(62,62,63)] min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 text-gray-100 px-4`}>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <nav className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin ? 'mt-5' : ''
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-slate-500 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: '20' })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open ? 'opacity-0 translate-x-28 overflow-hidden scrollbar-hide' : ''
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open ? 'hidden' : ''
                } absolute right-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:right-14 group-hover:duration-400 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
