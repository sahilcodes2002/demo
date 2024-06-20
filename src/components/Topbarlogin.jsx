import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import '../index.css'; 
import { info } from '../store/atoms/userinfo';
import { useRecoilValue } from 'recoil';

export function Topbarlogin() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const allInfo = useRecoilValue(info);
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString();
  
  return (
    <div className="lg:ml-56  bg-gray-500 text-gray-900 p-2 flex justify-between items-center">
      <div className="sm:flex items-center space-x-4">
      <div className="rounded-full bg-green-500 text-center py-3 px-5">
            {allInfo.name[0].toUpperCase()}
        </div>
        <span className="hidden md:flex text-xl font-bold text-gray-500">{allInfo.name}</span>
      </div>
      <div className="flex items-center space-x-8 text-xs">
        <div className="text-right">
          <div className="text-gray-900">{formattedDate}</div>
          <div className="text-gray-900">{formattedTime}</div>
        </div>
        <div className="space-x-4">
          <button onClick={()=>{
            localStorage.removeItem("token");
            navigate(`/signin`)
          }} className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-2 px-4 rounded-lg transition duration-300">
            log out
          </button>
          
        </div>
      </div>
    </div>
  );
};

