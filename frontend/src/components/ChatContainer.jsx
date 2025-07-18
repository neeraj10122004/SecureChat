import React from 'react';
import assets, { messagesDummyData } from '../assets/assets';

export const ChatContainer = ({ className, selecteduser }) => {
  return (
    <div className={`${className} h-full`}>
      {selecteduser ? (
        <>
          {/* Header */}
          <div className="flex justify-between items-center py-3 mx-4 border-b border-stone-500">
            <div className="flex items-center gap-3">
              <img
                src={selecteduser?.profilePic}
                alt={selecteduser?.fullName}
                className="rounded-full max-w-10 max-h-10"
              />
              <h1>{selecteduser.fullName}</h1>
              <span className="flex justify-center items-center rounded-full text-xs h-3 w-3 bg-green-500/50"></span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={assets.help_icon}
                alt="info"
                className="rounded-full max-w-8 max-h-8"
              />
            </div>
          </div>

          <div className="flex flex-col p-2 gap-3 overflow-y-auto pr-2 h-[calc(100%-120px)]">
            {messagesDummyData.map((message, key) => (
              <div
                key={key}
                className={`flex flex-col ${
                  message.senderId === selecteduser._id ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`flex flex-row gap-1 ${
                  message.senderId === selecteduser._id ? 'flex-row-reverse' : ''
                }`}>
                  <img
                    src={message.image}
                    alt={message._id}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="bg-white text-black rounded-md p-2 max-w-xs">

                    {message.image? <img src={message.image} alt="img" className='rounded-md max-w-60 max-h-60'/> : message.text}
                    <div className="text-green-400 text-xs text-right">##</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <img src={assets.logo_icon} alt="logo" />
        </div>
      )}
    </div>
  );
};
