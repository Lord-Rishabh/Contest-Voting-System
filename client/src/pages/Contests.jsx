import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contests = ({ contests, wallet, showConnectModal, setPContestDetails }) => {
  const navigate = useNavigate(); // move useNavigate inside the component body

  const handleSubmitEntry = async (contestId, contestName, contestDescription, contestEntries, contestEndtime) => {
    try {
      if (!wallet) return showConnectModal(true);
      // Construct the URL with contestId and navigate to it
      setPContestDetails({
        name: contestName,
        desc: contestDescription,
        endTime: contestEndtime,
        entries: contestEntries,
      })
      navigate(`/contests/${contestId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center  py-12 justify px-12">
      {contests[0].map((contest, index) => (
        <div className='flex-inline items-start w-full ' key={index}>
          <div className="max-w-md bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-8">
            <div className="px-6 py-4">
              <h2 className="text-xl font-bold text-white mb-2">Contest ID: {contest.id}</h2>
              <h3 className="text-lg font-semibold text-white mb-2">Name: {contest.name}</h3>
              <p className="text-gray-400 text-sm mb-2">Description: {contest.description}</p>
              <p className="text-gray-400 text-sm">End Time: {formatTime(contest.endTime)}</p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none" onClick={() => handleSubmitEntry(contest.id, contest.name, contest.description, contest.entries, contest.endtIme)} >
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
