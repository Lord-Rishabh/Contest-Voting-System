import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { toastError, toastSuccess } from "./components/utils/toastWrapper";
import "./App.css";
import Navbar from "./components/Navbar";
import ConnectModal from "./components/ConnectModal";
import Home from "./pages/Home";
import CreateContest from "./pages/CreateContest";
import Contests from "./pages/Contests";
import Contest from "./pages/Contest";
import logic from "./interface/logic";
import Spinner from "./components/Spinner";
import Dashboard from "./components/Dashboard";

function App() {
  const [wallet, setWallet] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contest, setContests] = useState([]);
  const [isContestsLoaded, setIsContestsLoaded] = useState(false);


  // For particular contest to be shown at contest.jsx
  const [pContestDetails, setPContestDetails] = useState({
    name: "",
    desc: "",
    startTime: "",
    endTime: "",
    entries: [],
    winner: "",
  });
  const [data, setData] = useState({
    name: "",
    full_name: "",
    votes: "",
  });

  useEffect(() => {
    getContests();
  }, []);

  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };

  // To get all contests
  const getContests = async () => {
    
    setIsContestsLoaded(false);
    try {
      const { contests } = await logic.GetContests();
      setContests([contests, ...contest]);
    } catch (e) {
      toastError("error : " + e);
    }
    setIsContestsLoaded(true);
  };

  // To get Particular Contest in contest.jsx
  const getPContest = async (contestId) => {
    setLoading(true);
    try {
      const { contests } = await logic.GetContests();
      setContests([contests, ...contest]);
      const { name, description, entries, startTime, endTime, highestVoted } = contests[contestId];
      let {entryName} = highestVoted;
      
      setPContestDetails({
        name: name,
        desc: description,
        startTime: startTime,
        endTime: endTime,
        entries: entries,
        winner: entryName
      })
      setData(convertEntriesToData(entries));
    }
    catch (e) {
      toastError("error : " + e);
    }
    setLoading(false);
  };

  const convertEntriesToData = (entries) => {
    return Array.from(entries).map(([entryName, entry], index) => ({
      name: entryName.substring(0, 4) + "..", // Truncated name
      full_name: entryName, // Full name
      votes: entry.votes, // Votes
    }));
  };

  const handleCreateContest = async (contestName, contestDescription, startDuration, durationInSeconds) => {
    setLoading(true);
    try {
      if (!wallet) return showConnectModal(true);

      const { createdContest } = await logic.CreateContest(
        wallet,
        contestName,
        contestDescription,
        startDuration,
        durationInSeconds
      );
      setContests([createdContest, ...contest]);
      toastSuccess("Contest Created Successfully");
      const { id } = createdContest;
      getContests();
      return id;
    } catch (error) {
      toastError(error.message);
    }
    setLoading(false);
  };

  const handleSubmitEntry = async (entryName, contestId) => {
    setLoading(true);
    try {
      if (!wallet) return showConnectModal(true);
      await logic.SubmitEntry(wallet, contestId, entryName);
      toastSuccess("Entry Submitted Successfully")
    } catch (error) {
      toastError(error.message);
    }
    setLoading(false);
  };

  const handleVoteForEntry = async (id, name) => {
    setLoading(true);
    try {
      if (!wallet) return showConnectModal(true);

      await logic.VoteForEntry(wallet, id, name);
      toastSuccess("Voted Successfully");
    } catch (error) {
      toastError(error.message);
    }
    setLoading(false);
  };


  return (<>
    <div>

      <Navbar
        updateWallet={updateWallet}
        wallet={wallet}
        showConnectModal={showConnectModal}
        loading={loading}
      />
      
      <Toaster />
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        {isContestsLoaded && (
          <Route path="contests/:contestId/dashboard" element={<Dashboard
            data={data}
            getPContest={getPContest}
            wallet={wallet}
            showConnectModal={showConnectModal}
          />}
          />)}

        <Route path="create-contest" element={<CreateContest
          handleCreateContest={handleCreateContest}
          setLoading={setLoading} />} />

        {isContestsLoaded && (
          <Route path="contests" element={<Contests
            contests={contest}
            wallet={wallet}
            showConnectModal={showConnectModal}
            setIsContestsLoaded={setIsContestsLoaded}
          />} />
        )}
        {isContestsLoaded && (
          <Route path="contests/:contestId" element={<Contest
            pContestDetails={pContestDetails}
            getPContest={getPContest}
            handleSubmitEntry={handleSubmitEntry}
            handleVoteForEntry={handleVoteForEntry}
            wallet={wallet}
            showConnectModal={showConnectModal}
          />} />
        )}

        {/* Change this show something else when a page is loading. */}
        <Route path="*" element={<Spinner />} />
      </Routes>

    </div>
  </>
  );
}

export default App;
