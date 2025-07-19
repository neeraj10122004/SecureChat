import React from 'react'
import { imagesDummyData } from '../assets/assets';
export const RightSideBar = ({className,selecteduser,setselecteduser}) => {
  
  if (!selecteduser) return null ;
  return (
    <div className={className}>
          <div className='flex flex-col justify-center items-center w-full gap-3'>
              <img src={selecteduser?.profilePic} alt={selecteduser?.fullname} className='rounded-full max-w-40 max-h-40'/>
              <div className='flex flex-col gap-0.5 justify-center items-center'>
                <h1>{selecteduser.fullName}</h1>
                <p className='text-green-500'>online</p>
              </div>
          </div>
          <hr className='my-4'/>
          <div className='flex-col justify-center items-center text-xs'>
            <p className='flex items-center justify-center py-3'>Media</p>
            <div className='max-h-[170px] overflow-y-scroll grid grid-cols-2 gap-2'>
              {imagesDummyData.map((url, key) => {
                return (
                  <img key={key} src={url} alt="img" onClick={() => window.open(url)} className='cursor-pointer' />
                );
              })}

            </div>
            
          </div>
          <div className='p-2'>
              <button className='w-full p-1 bg-violet-500/50 rounded-full'>Logout</button>
          </div>
          
         
    </div>
  )
}

