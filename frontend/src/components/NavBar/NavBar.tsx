import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { BsCalendar2Event } from 'react-icons/bs';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { CgAddR } from 'react-icons/cg';

import './NavBar.css';

export const NavBar = () => {
  const { logout } = useAuth0();
  const [open, setOpen] = useState<boolean>(true);

  return (
    <header className="navbar">
      <div className={`bg-[rgb(62,62,63)] min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 text-gray-100 px-4`}>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <nav className="mt-4 flex flex-col gap-4 relative">
          <Link
            to="/profile"
            className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-slate-500 rounded-md cursor-pointer`}
          >
            <div>
              <AiOutlineUser className="icon-size" />
            </div>
            <h2 className={`whitespace-pre duration-500 ${!open ? 'opacity-0 translate-x-28 overflow-hidden' : ''}`}>
              Profile
            </h2>
            <h2
              className={`${
                open ? 'hidden' : ''
              } absolute right-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:right-14 group-hover:duration-400 group-hover:w-fit`}
            >
              Profile
            </h2>
          </Link>
          <Link
            to="/"
            className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-slate-500 rounded-md cursor-pointer`}
          >
            <div>
              <BsCalendar2Event className="icon-size" />
            </div>
            <h2 className={`whitespace-pre duration-500 ${!open ? 'opacity-0 translate-x-28 overflow-hidden' : ''}`}>
              Events
            </h2>
            <h2
              className={`${
                open ? 'hidden' : ''
              } absolute right-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:right-14 group-hover:duration-400 group-hover:w-fit`}
            >
              Events
            </h2>
          </Link>
          <Link
            to="/create-event"
            className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-slate-500 rounded-md cursor-pointer`}
          >
            <div>
              <CgAddR className="icon-size" />
            </div>
            <h2 className={`whitespace-pre duration-500 ${!open ? 'opacity-0 translate-x-28 overflow-hidden' : ''}`}>
              Create Event
            </h2>
            <h2
              className={`${
                open ? 'hidden' : ''
              } absolute right-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:right-14 group-hover:duration-400 group-hover:w-fit`}
            >
              Create Event
            </h2>
          </Link>
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-slate-500 rounded-md cursor-pointer`}
          >
            <div>
              <RiLogoutBoxRLine className="icon-size" />
            </div>
            <h2 className={`whitespace-pre duration-500 ${!open ? 'opacity-0 translate-x-28 overflow-hidden' : ''}`}>
              Logout
            </h2>
            <h2
              className={`${
                open ? 'hidden' : ''
              } absolute right-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:right-14 group-hover:duration-400 group-hover:w-fit`}
            >
              Logout
            </h2>
          </button>
        </nav>
      </div>
    </header>
  );
};
