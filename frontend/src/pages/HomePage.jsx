import React, { useState } from 'react'
import { LeftSideBar } from '../components/LeftSideBar'
import { ChatContainer } from '../components/ChatContainer'
import { RightSideBar } from '../components/RightSideBar'

const HomePage = () => {
    const [selecteduser, setselecteduser] = useState(false)
  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
        <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] flex justify-around relative`}>
            <LeftSideBar selecteduser={selecteduser} setselecteduser={setselecteduser} className=" p-4 w-[25%]"/>
            <ChatContainer className=" p-4 flex-grow"/>
            {selecteduser &&
            <RightSideBar className=" p-4 w-[20%]"/>
            }
        </div>
    </div>
  )
}

export default HomePage
