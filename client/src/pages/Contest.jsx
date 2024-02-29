import React, { useState, useEffect } from 'react'
import { toastSuccess, toastError } from '../components/utils/toastWrapper';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const Contest = ({ pContestDetails, handleSubmitEntry, handleVoteForEntry, getPContest, wallet, showConnectModal }) => {
  const navigate = useNavigate();
  const { contestId } = useParams();
  const [votedEntry, setVotedEntry] = useState(null);
  const [showCreateEntryForm, setShowCreateEntryForm] = useState(false);
  const [entryDetails, setEntryDetails] = useState({
    entryName: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [isVLoading, setIsVLoading] = useState(false);
  const [isELoading, setIsELoading] = useState(false);
  const [isWLoading, setIsWLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().getTime() / 1000);

  useEffect(() => {
    getContest();
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().getTime() / 1000); // Update current time every second
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const getContest = async () => {

    setLoading(true);
    await getPContest(contestId);
    setLoading(false);

  };

  const GoToDashboard = () => {
    try {
      navigate(`/contests/${contestId}/dashboard`);
    } catch (error) {
      console.error('Error navigating to dashboard:', error);
    }
  }

  // Filter entries based on the search query
  const filteredEntries = Array.from(pContestDetails.entries).filter(
    ([entryName, entry]) =>
      entryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCreateEntryForm = () => {
    if (!wallet) showConnectModal(true);
    else setShowCreateEntryForm(!showCreateEntryForm);
  };
  const handleEntrySumbit = async (e) => {

    setButtonLoad(true);
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
    setButtonLoad(false);

  };
  const handleVote = async (name) => {
    // Convert End Time to seconds
    if (!wallet) showConnectModal(true);
    else {
      setButtonLoad(true);
      setIsVLoading(true);
      setVotedEntry(name);
      try {
        await handleVoteForEntry(contestId, name);
        getContest();
      } catch (e) {

        toastError("Something went wrong");
      }
      setIsVLoading(false);
      setButtonLoad(false);
      setVotedEntry("  ");
    }
  };

  return (<> {loading ? <Spinner /> : (
    <div className="">

      <div className="flex justify-start flex-col items-center rounded-lg p-4 shadow-md  ">
        <h2 className="text-2xl pb-4 font-semibold text-center text-white">Contest Name : <span className="text-purple-400">{pContestDetails.name}</span></h2>
        <p className="text-lg mb-5 text-white font-semibold">Contest Description : <span className="italic text-gray-400">{pContestDetails.desc}</span></p>
        <div className="md:flex justify-between mb-1">
          <p className="text-lg text-white font-semibold">Contest Start Time : <span className="italic text-gray-400">{formatTime(pContestDetails.startTime)} &nbsp;&nbsp;&nbsp;</span></p>
          <p className="text-lg text-white font-semibold">&nbsp;&nbsp;Contest End Time : <span className="italic text-gray-400">{formatTime(pContestDetails.endTime)}</span></p>
        </div>


        <div className="text-2xl text-white font-bold">
          {pContestDetails.winner ? (<div className='inline'>
            {(currentTime > pContestDetails.endTime) ? ("Winner : ") : ("Current Winner : ")}
          </div>) : ("")}
          <span className="text-purple-400 ">{pContestDetails.winner}</span>
        </div>

      </div>



      <div className="p-12 pt-3">
        <div className="md:flex max-md:py-3 justify-between items-center">

          {/* Search Bar */}
          <div id="searchBar" className="relative flex h-3 content-center items-center max-md:py-6">
            <span className="absolute left-4 cursor-pointer text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input type="text" className="w-[50vh] max-lg:w-3/4 rounded-full bg-transparent py-2 pl-10 pr-5 text-base text-white font-semibold outline-none ring-1 ring-gray-200 focus:ring-1 dark:white dark:ring-zinc-500 transition-transform duration-300 hover:transform hover:ring-purple-500" placeholder={window.innerWidth <= 768 ? 'Search Bar' : 'Search by Entry Name'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          {/* Submit, Dashboard and Declare Winner Button */}
          <div className=" flex justify-end space-between">
            <button
              onClick={GoToDashboard}
              className={` flex text-sm md:text-base text-white bg-purple-700 hover:bg-purple-600 focus:bg-purple-700 rounded-md p-3 max-md:ml-0 m-4 ${(isELoading || buttonLoad) ? (" ") : ("transition-transform duration-450 hover:transform hover:scale-105 ")} `}
              disabled={isELoading || buttonLoad} >
              Dashboard
            </button>
            <button
              onClick={toggleCreateEntryForm}
              className={` flex text-sm md:text-base text-white bg-purple-700 hover:bg-purple-600 focus:bg-purple-700 rounded-md p-3 max-md:ml-0 m-4 ${(isWLoading || buttonLoad) ? (" ") : ("transition-transform duration-450 hover:transform hover:scale-105 ")} `}
              disabled={isELoading || buttonLoad} >
              Submit Entry
            </button>
          </div>
        </div>

        <div className='flex justify-between'>

          <div className="mb-8">

            {/* Entry Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntries.length === 0 ?

                <div className=""></div>

                : filteredEntries.map(([entryName, entry], index) => (
                  <div className={`max-w-md cards rounded-lg overflow-hidden shadow-lg flex-col justify-between items-center ${(isVLoading || buttonLoad) ? ("") : ("transition-transform duration-450 hover:transform hover:scale-105")}`}>
                    <div className="px-6 pt-3">
                      <p className='text-lg text-[#bbbec3]'>EntryName : {entryName}</p>
                      <p className='text-lg text-[#bbbec3]'>Votes: {entry.votes}</p>
                    </div>

                    <button
                      className={` ${(isVLoading || buttonLoad) ? ((entryName === votedEntry) ? (" bg-black  rounded-lg font-semibold px-6 py-2   ") : ("bg-white text-black rounded-lg font-semibold px-6 py-2 ")) : ("   neobuttonn text-white rounded-lg hover:bg-purple-700 focus:outline-none")} m-3 `}
                      onClick={() => handleVote(entryName)}
                      disabled={isVLoading || buttonLoad} >

                      {isVLoading ? <div className="">{(entryName === votedEntry) ? <Loader color={"#000"} loading={isVLoading} /> : "Vote"}</div> : 'Vote'}

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
              disabled={isELoading || buttonLoad}
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
                required
                className="w-full border rounded-md py-2 px-3 bg-gray-900 text-white"
              />

              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                disabled={isELoading || buttonLoad} >
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