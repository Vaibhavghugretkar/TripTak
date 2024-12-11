import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { DialogHeader } from '../ui/dialog';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

function Header() {
  const [dialogBox, setDialogBox] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // console.log(user)
  }, []);

  // Login functionality
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => getUserInfo(codeResponse),
    onError: (error) => console.log(error),
  });

  // Get User Information
  const getUserInfo = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json',
          },
        }
      )
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        setDialogBox(false);
        window.location.reload();
      });
  };

  // Logout functionality
  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="bg-gradient-to-t from-[#272735] to-[#1b1b27] w-auto flex justify-between items-center px-4 py-3 md:py-5">
      {/* Logo */}
      <Link to="/">
        <img src="/logo3.webp" className="rounded-full w-10 h-10 md:w-16 md:h-16" alt="Logo" />
      </Link>

      {/* Hamburger menu for small screens */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiOutlineX size={28} className="text-white" /> : <HiOutlineMenu size={28} className="text-white" />}
        </button>
      </div>

      {/* Menu Items for larger screens */}
      <div className="hidden md:flex items-center gap-5">
        {user ? (
          <>
            <Link to="/create-trip">
              <Button className="rounded-3xl bg-black hover:bg-black p-6 text-lg">
                + Create Trip
              </Button>
            </Link>
            <Link to="/my-trips">
              <Button className="rounded-3xl bg-black hover:bg-black p-6 text-lg">
                My Trips
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger className='bg-transparent hover:bg-transparent border-none'>
                <img
                  src="/profile.webp"
                  alt="profile"
                  className="h-12 w-12 rounded-full border-none shadow-none"
                />
              </PopoverTrigger>
              <PopoverContent className="bg-black border-blue-500 text-white w-28 mr-4 text-center font-bold text-lg">
                <h2 className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button
            className="rounded-3xl bg-black hover:bg-black p-6 text-lg"
            onClick={() => setDialogBox(true)}
          >
            Sign in
          </Button>
        )}
      </div>

      {/* Slide-down menu for small screens with animation */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-[#1b1b27] border-t border-gray-700 flex flex-col items-center gap-4 py-4 z-50 shadow-lg md:hidden animate-slideDown">
          {user ? (
            <>
              <Link to="/create-trip">
                <Button className=" bg-black hover:bg-black px-4 py-2 text-sm">
                  + Create Trip
                </Button>
              </Link>
              <Link to="/my-trips">
                <Button className=" bg-black hover:bg-black px-4 py-2 text-sm">
                  My Trips
                </Button>
              </Link>
              <Button className="bg-black px-4 py-2 text-sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="rounded-3xl bg-black hover:bg-black px-4 py-2 text-sm"
              onClick={() => setDialogBox(true)}
            >
              Sign in
            </Button>
          )}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={dialogBox}>
        <DialogContent className="flex items-center justify-center fixed inset-0 bg-opacity-50 bg-black">
          <DialogHeader className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-sm">
            <img src="logo3.webp" className="w-14 h-14 rounded-full" alt="Logo" />
            <DialogTitle className="text-black">Sign in with Google</DialogTitle>
            <DialogDescription className="flex flex-col text-black">
              Get connected through Google securely
              <Button
                className="mt-5 bg-zinc-900 hover:bg-zinc-950 text-white"
                onClick={login}
              >
                <FcGoogle /> Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
