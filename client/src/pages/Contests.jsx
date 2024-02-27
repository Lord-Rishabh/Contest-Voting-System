import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Contests = ({ contests, wallet, showConnectModal }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().getTime() / 1000); // Initial value

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().getTime() / 1000); // Update current time every second
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const filteredContests = Array.isArray(contests[0]) ? contests[0].filter((contest) =>
    // Filter contests based on name, ID, or description
    contest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contest.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contest.description && contest.description.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];


  const handleOnClick = async (contestId) => {
    try {
      navigate(`/contests/${contestId}`);
    } catch (error) {
      console.error('Error navigating to contest:', error);
    }
  };

  return (
    <div className="contai mx-auto my-8">

      {/* Search Bar */}
      <div className="mx-auto mt-16 my-[40px] flex max-w-[480px] flex-col max-md:pl-12 ">
        <div id="searchBar" className="relative flex h-3 content-center items-center ">
          <span className="absolute left-4 cursor-pointer text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input type="text" className="w-full max-md:w-3/4 rounded-full bg-transparent py-3 pl-10 pr-5 text-lg text-white font-semibold outline-none ring-1 ring-gray-200 focus:ring-1   dark:white dark:ring-zinc-500 transition-transform duration-300 hover:transform hover:ring-purple-500" placeholder={window.innerWidth <= 768 ? 'Search Bar' : 'Search by name, ID, or description'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      {/* Grid of Contests */}
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-12 pt-4">
          {contests[0] && filteredContests.map((contest, index) => (
            <div className="flex-inline items-start h-full" key={index}>

              <div className="max-w-md cards rounded-lg shadow-lg mb-8 transition-transform duration-300 hover:transform hover:scale-105">
                {currentTime < contest.endTime ? (
                  <div className="">
                  {currentTime > contest.startTime ? 
                    <span className="absolute top-[-0.3rem] right-[-0.4rem] bg-green-600 text-white text-sm font-medium px-2.5 py-1 rounded">Live</span>
                    : <span className="absolute top-[-0.3rem] right-[-0.4rem] bg-yellow-600 text-white text-sm font-medium px-2.5 py-1 rounded">Not Started</span>
                  }
                  </div>
                ) : (
                  <span className="absolute top-[-0.3rem] right-[-0.4rem] bg-red-600 text-white text-sm font-medium px-2.5 py-1 rounded">Ended</span>
                )}

                <div className="px-6 py-4">
                  <h2 className="text-2xl max-md:text-xl font-bold text-white mb-2">Contest ID: {contest.id}</h2>
                  <h3 className="text-xl max-md:text-base font-semibold text-white mb-2">Name: {contest.name}</h3>
                  <p className="text-gray-400 text-lg max-md:text-sm mb-2">Description: {contest.description && contest.description.length > 30
                    ? `${contest.description.slice(0, 30)}...`
                    : contest.description}</p>
                  <p className="text-gray-400 text-lg max-md:text-sm mb-1 mt-1">Start Time: {formatTime(contest.startTime)}</p>
                  <p className="text-gray-400 text-lg max-md:text-sm">End Time: {formatTime(contest.endTime)}</p>
                  <button className="px-4 py-2 neonbutton text-white rounded-md hover:bg-purple-700 focus:outline-none" onClick={() => handleOnClick(contest.id)}>
                    Go to Voting
                  </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



// Function to format time
const formatTime = (seconds) => {
  const date = new Date(seconds * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)
  const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year} `;
  const formattedTime = hours + ':' + minutes.substr(-2) + ' ' + ampm;
  return `${formattedTime}  ${formattedDate} `;
};

export default Contests;
