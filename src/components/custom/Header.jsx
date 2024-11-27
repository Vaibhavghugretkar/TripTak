import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { DialogHeader } from '../ui/dialog'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'

function Header() {
  const [dialogBox, setDialogBox] = useState(false)

  let user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    // console.log(user)
  }, [])

  //******login functionality*******
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => getUserInfo(codeResponse),
    onError: (error) => console.log(error)
  })

  //*********Get User Information************
  const getUserInfo = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json"
        }
      }
    ).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data))
      setDialogBox(false)
      window.location.reload()
    })
  }

  return (
  
    <div className='bg-[#1b1b27] p-2 flex justify-between items-center shadow-md'>
      <img src='/logo3.webp' className='ml-4 rounded-full w-16 h-16' alt="Logo" />
      <div>
        {user ?
          <div className='flex items-center gap-5'>
           <a href='/create-trip'>
            <Button className="rounded-3xl bg-black hover:bg-black p-6 text-lg">
             + Create Trip
            </Button>
            </a>

            <a href='/my-trips'>
            <Button className="rounded-3xl bg-black hover:bg-black p-6 text-lg">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger className='bg-transparent hover:bg-transparent border-none'>
                <img src={user.picture} alt='profile' className="h-12 w-12 rounded-full border-none shadow-none" />
              </PopoverTrigger>
              <PopoverContent className="bg-black border-blue-500 text-white w-28 mr-4 text-center font-bold text-lg">
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout()
                  localStorage.clear()
                  window.location.reload()
                }}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
          : <Button className='mr-4 p-5 bg-black hover:bg-black' onClick={() => setDialogBox(true)}>Sign in</Button>
        }
      </div>

      <Dialog open={dialogBox}>
  <DialogContent className="flex items-center justify-center fixed inset-0 bg-opacity-50 bg-black">
    <DialogHeader className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-sm">
      <img src='logo3.webp' className='w-14 h-14 rounded-full' alt="Logo" />
      <DialogTitle className="text-black">Sign in with Google</DialogTitle>
      <DialogDescription className="flex flex-col text-black">
        Get connected through Google securely
        <Button
          className="mt-5 bg-zinc-900 hover:bg-zinc-950 text-white"
          onClick={login}>
          <FcGoogle /> Sign in with Google
        </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default Header
