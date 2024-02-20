import React, { useState } from 'react';
import Loader from '../components/Loader';
const CreateContest = ({handleCreateContest}) => {
  const [contestName, setContestName] = useState('');
  const [contestDescription, setContestDescription] = useState('');
  const [contestDuration, setContestDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    // Handle form submission here
    await handleCreateContest(contestName, contestDescription, contestDuration);
    setIsLoading(false); // Set loading state to false after contest creation
  };

  return (
    <div className="pt-12 flex justify-center items-center">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Create Contest</h2>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="contestName">Contest Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contestName"
              type="text"
              placeholder="Enter Contest Name"
              value={contestName}
              onChange={(e) => setContestName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="contestDescription">Contest Description</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contestDescription"
              placeholder="Enter Contest Description"
              value={contestDescription}
              onChange={(e) => setContestDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="contestDuration">Contest Duration (in seconds)</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contestDuration"
              type="number"
              placeholder="Enter Contest Duration"
              value={contestDuration}
              onChange={(e) => setContestDuration(e.target.value)}
              min="1" // Minimum value of 1
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#7e22ce] hover:bg-[#9d57d9] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? <Loader color={"#000"} loading={isLoading} /> : 'Create Contest'} {/* Show different text based on loading state */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateContest;
