import React, { useState } from 'react';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const CreateContest = ({ handleCreateContest, setLoading }) => {
  // Get today's date in the format YYYY-MM-DD for the default value of the date input
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [contestName, setContestName] = useState('');
  const [contestDescription, setContestDescription] = useState('');
  const [contestTime, setContestTime] = useState('');
  const [contestDate, setContestDate] = useState(today); // Set default date to today
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    const currentTime = new Date(); // Get the current time
    const selectedTime = new Date(`${contestDate}T${contestTime}`); // Combine the selected date and time
    const timeDifferenceInSeconds = Math.floor((selectedTime - currentTime) / 1000); // Calculate the time difference in seconds
    const contestId = await handleCreateContest(contestName, contestDescription, timeDifferenceInSeconds);
    setIsLoading(false); // Set loading state to false after contest creation
    
    if (redirect && contestId >= 0)
      navigate(`/contests/${contestId}`);
  };

  const handleCheckboxChange = (e) => {
    setRedirect(e.target.checked);
  };

  return (<>
    <div className=" text-white flex min-h-[85vh] flex-col items-center sm:justify-center sm:pt-0">
     
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
          bis_skin_checked="1"></div>
        <div
          className="mx-5 border dark:border-b-white dark:border-t-white border-b-white sm:border-t-white shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none ">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter ">Create Contest</h3>
            <p className="mt-1.5 text-base font-medium text-white/50">Welcome, enter your contest details to create a contest.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <div
                    className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label
                        className="text-base font-medium text-muted-foreground group-focus-within:text-white text-purple-400">Contest Name</label>
                      <div className="absolute right-3 translate-y-2 text-green-200">
                      </div>
                    </div>
                    <input id="contestName"
                      type="text"
                      placeholder="contest name"
                      value={contestName}
                      onChange={(e) => setContestName(e.target.value)}
                      required
                      className="block w-full border-0 bg-transparent p-0 text-base file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div
                    className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label
                        className="text-base font-medium text-muted-foreground group-focus-within:text-white text-purple-400">Contest Description</label>
                    </div>
                    <div className="flex items-center">
                      <textarea id="contestDescription"
                        placeholder="Enter Contest Description"
                        value={contestDescription}
                        onChange={(e) => setContestDescription(e.target.value)}
                        required
                        className="block w-full border-0 bg-transparent p-0 text-base file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex max-md:flex-col justify-between ">
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1 pt-1 duration-200 focus-within:ring focus-within:ring-sky-300/30 max-md:mb-4">
                  <label className="text-base font-medium text-muted-foreground group-focus-within:text-white text-purple-400" htmlFor="contestTime">Contest Time</label>
                  <input
                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    id="contestTime"
                    type="time"
                    value={contestTime}
                    onChange={(e) => setContestTime(e.target.value)}
                    required
                  />
                </div>
                <div className=" rounded-lg border focus-within:border-sky-200 px-3 pb-1 pt-1 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <label className="text-base font-medium text-muted-foreground group-focus-within:text-white text-purple-400" htmlFor="contestDate">Contest Date</label>
                  <input
                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                    type="date"
                    value={contestDate}
                    onChange={(e) => setContestDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="remember"
                    className="outline-none focus:outline focus:outline-sky-300" onChange={handleCheckboxChange} disabled={isLoading} defaultChecked/>
                  <span className="text-sm">Redirect me to this Contest Page</span>
                </label>

              </div>
              <div className="mt-4 flex items-center justify-end gap-x-2">
                <button
                  className={`font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isLoading ? 'bg-gray-800 ' : 'bg-white'} text-black h-10 px-4 py-2`}
                  type="submit" disabled={isLoading}>
                  {isLoading ? <Loader color={"#000"} loading={isLoading} /> : 'Create Contest'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default CreateContest;
