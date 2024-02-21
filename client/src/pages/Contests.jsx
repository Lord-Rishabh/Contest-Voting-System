import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contests = ({ contests, wallet, showConnectModal, setPContestDetails }) => {
  const navigate = useNavigate(); // move useNavigate inside the component body

  const handleSubmitEntry = async (contestId) => {
    try {
      // Construct the URL with contestId and navigate to it
      navigate(`/contests/${contestId}`);
    } catch (error) {

    }
  };

  return (
    <div className="container mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-12">
      {contests[0].map((contest, index) => (
        <div className='flex-inline items-start h-full' key={index}>
          <div className="max-w-md cards rounded-lg overflow-hidden shadow-lg mb-8">
            <div className="px-6 py-4">
              <h2 className="text-2xl max-md:text-xl font-bold text-white mb-2">Contest ID: {contest.id}</h2>
              <h3 className="text-xl max-md:text-base font-semibold text-white mb-2">Name: {contest.name}</h3>
              <p className="text-gray-400 text-lg max-md:text-sm mb-2">Description: {contest.description}</p>
              <p className="text-gray-400 text-lg max-md:text-sm">End Time: {formatTime(contest.endTime)}</p>
              <button className="px-4 py-2 neonbutton text-white rounded-md hover:bg-purple-700 focus:outline-none " onClick={() => handleSubmitEntry(contest.id)} >
                Go to Voting
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Function to format time
const formatTime = (seconds) => {
  const date = new Date(seconds * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime;
};

export default Contests;
