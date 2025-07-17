import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

export const LeftSideBar = ({className,selecteduser,setselecteduser}) => {
    const navigate = useNavigate();
  return (
    <div className={className}>
        <div className='flex-row p-1 bg-[#8185B2]/10 h-full rounded-md'>
            <div className='flex justify-between items-center'>
                <div className='flex justify-around items-center gap-1'>
                    <img src={assets.logo_icon} alt="logo" className='max-w-5' />
                    <h1>
                        SecureChat
                    </h1>
                </div>
                <div className='py-2 relative group'>
                    <img src={assets.menu_icon} alt="menu" className='max-w-5 cursor-pointer' />
                    <div className="absolute top-full right-0 z-20 w-32 p-2 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
                        <p onClick={()=>{navigate('/profile')}} className='cursor-pointer text-sm'>Edit Profile</p>
                        <hr className='my-2 border-t border-gray-500'></hr>
                        <p onClick={()=>{navigate('/login')}} className='cursor-pointer text-sm'>Logout</p>
                    </div>
                </div>
            </div>
            <div className='flex bg-[#282142] rounded-full m-1 p-1 items-center overflow-scroll'><img src={assets.search_icon} alt="search" className='max-w-5 max-h-5 px-1' /><input type="text" placeholder='Search User' className='px-2 border-none focus:outline-none focus:ring-0 overflow-scroll' /></div>
            <div className='flex flex-col p-1 overflow-y-auto pr-2 h-[calc(100%-80px)]'>
                
                 {
                    userDummyData.map((user,index)=>(
                        <div onClick={()=>{setselecteduser(user)}} index={index} className={`flex justify-between p-1 items-center ${selecteduser?._id === user._id && 'bg-[#282142]/50'}`}>
                            <div className='flex gap-3 items-center p-2'>
                                <img src={user.profilePic} alt={user.fullName} className='rounded-full max-w-10 max-h-10'/>
                                <div className='flex-col p-1'>
                                    <h1 >{user.fullName}</h1>
                                    <p className='text-green-500'>online</p>
                                </div>
                                
                            </div>
                            <div className='flex justify-center items-center rounded-full text-xs h-5 w-5 bg-violet-500/50'>
                                {index+1}
                            </div>
    
                            
                        </div>
                    ))
                 }

            </div>
        </div>
        
        
    </div>
  )
}
