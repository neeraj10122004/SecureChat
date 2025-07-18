import React from 'react'

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
          
         
    </div>
  )
}

