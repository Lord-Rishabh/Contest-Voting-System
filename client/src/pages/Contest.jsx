import React, { useState, useEffect } from 'react'
import { toastSuccess, toastError } from '../components/utils/toastWrapper';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Spinner from '../components/Spinner';

const Contest = ({ pContestDetails, handleSubmitEntry, handleVoteForEntry, handleDeclareWinner, getPContest, wallet, showConnectModal }) => {

  const { contestId } = useParams();
  const [showCreateEntryForm, setShowCreateEntryForm] = useState(false);
  const [entryDetails, setEntryDetails] = useState({
    entryName: "",
  });
  const [loading, setLoading] = useState(false);
  const [isVLoading, setIsVLoading] = useState(false);
  const [isELoading, setIsELoading] = useState(false);
  const [isWLoading, setIsWLoading] = useState(false);

  useEffect(() => {
    getContest();
  }, []);

  const getContest = async () => {
    setLoading(true);
    await getPContest(contestId);
    setLoading(false);
  };

  const toggleCreateEntryForm = () => {
    if (!wallet) showConnectModal(true);
    else setShowCreateEntryForm(!showCreateEntryForm);
  };
  const handleEntrySumbit = async (e) => {
    if (entryDetails.entryName.trim().length < 1) {
      toastError('Entry name must have at least 1 character.');
    }
    else {
      e.preventDefault();
      setIsELoading(true);
      // Convert End Time to seconds
      try {
        if (!wallet) showConnectModal(true);
        await handleSubmitEntry(entryDetails.entryName, contestId);

        getContest();
      } catch (e) {

        toastError("Something went wrong");
      }
      setIsELoading(false);
      setShowCreateEntryForm(false);
    }
  };
  const handleVote = async (name) => {
    // Convert End Time to seconds
    if (!wallet) showConnectModal(true);
    else {
      setIsVLoading(true);
      try {
        await handleVoteForEntry(contestId, name);
        getContest();
      } catch (e) {

        toastError("Something went wrong");
      }
      setIsVLoading(false);
    }
  };
  const handleWinner = async () => {
    setIsWLoading(true);
    try {
      if (!wallet) showConnectModal(true);
      await handleDeclareWinner(contestId);
    } catch (e) {

      toastError("Something went wrong");
    }
    setIsWLoading(false);
  }
  return (<> {loading ? <Spinner /> : (
    <div className="">
      <div class="flex justify-start flex-col items-center rounded-lg p-6 shadow-md space-y-6 ">
        <h2 class="text-2xl font-semibold text-center text-white">Contest Name: <span class="text-blue-400">{pContestDetails.name}</span></h2>
        <p class="text-lg mb-6 text-gray-300 font-semibold">Contest End Time: <span class="italic">{formatTime(pContestDetails.endTime)}</span></p>
        <p class="text-lg mb-6 text-gray-300 font-semibold">Contest Description: <span class="italic">{pContestDetails.desc}</span></p>
      </div>



      <div className="p-12">
        <div className=" flex justify-end space-between">

          <button
            onClick={toggleCreateEntryForm}
            className="flex text-sm md:text-base text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md p-3 m-4 "
            disabled={isELoading} >
            Submit Entry
          </button>
          <button
            className="flex text-sm md:text-base text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md p-3 m-4 " onClick={handleWinner}
            disabled={isWLoading || showCreateEntryForm} >
            {isWLoading ? <Loader color={"#000"} loading={isWLoading} /> : 'Declare Winner'}
          </button>
        </div>
        <div className='flex justify-between'>

          <div className="mb-8">

            {/* Entry card :  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from(pContestDetails.entries).map(([entryName, entry], index) => (
                <div className="max-w-md cards rounded-lg overflow-hidden shadow-lg flex-col justify-between items-center">
                  <div className="px-6 pt-3">
                    <p className='text-lg text-[#bbbec3]'>EntryName : {entryName}</p>
                    <p className='text-lg text-[#bbbec3]'>Votes: {entry.votes}</p>
                  </div>

                  <button
                    className=" px-4 py-2 neonbutton text-white rounded-md hover:bg-purple-700 focus:outline-none m-3"
                    onClick={() => handleVote(entryName)} disabled={isVLoading} >
                    {isVLoading ? <Loader color={"#000"} loading={isVLoading} /> : 'Vote'}
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Entry Form */}
        {showCreateEntryForm && (
          <div className="absolute top-11 right-[2vh] w-[50vh] max-md:w-[35vh] mt-12 bg-gray-900 bg-opacity-75 p-6 ">
            <button
              onClick={toggleCreateEntryForm}
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-red-700 focus:outline-none"
              type="button"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <form onSubmit={handleEntrySumbit} className="space-y-4">
              <label htmlFor="contestName" className="block">
                Entry Name:
              </label>
              <input
                type="text"
                id="contestName"
                name="contestName"
                value={entryDetails.contestName}
                onChange={(e) =>
                  setEntryDetails({
                    ...entryDetails,
                    entryName: e.target.value,
                  })
                }
                className="w-full border rounded-md py-2 px-3 bg-gray-900 text-white"
              />

              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                disabled={isELoading} >
                {isELoading ? <Loader color={"#000"} loading={isELoading} /> : 'Submit Entry'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )}
  </>

  )
}

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


export default Contest