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
import WinnerCard from "./components/WinnerCard";
import logic from "./interface/logic";
import Spinner from "./components/Spinner";

function App() {
  const [wallet, setWallet] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contest, setContests] = useState([]);
  const [isContestsLoaded, setIsContestsLoaded] = useState(false);
  const [winner, setWinner] = useState("")
  const [showWinner, setShowWinner] = useState(false);
  // For particular contest to be shown at contest.jsx
  const [pContestDetails, setPContestDetails] = useState({
    name: "",
    desc: "",
    endTime: "",
    entries: [],
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
    try {
      const { contests } = await logic.GetContests();
      setContests([contests, ...contest]);
      const { name, description, entries, endTime } = contests[contestId];
      setPContestDetails({
        name: name,
        desc: description,
        endTime: endTime,
        entries: entries,
      })
    }
    catch (e) {
      toastError("error : " + e);
    }
  };

  const handleCreateContest = async (contestName, contestDescription, durationInSeconds) => {
    try {
      if (!wallet) return showConnectModal(true);

      const { createdContest } = await logic.CreateContest(
        wallet,
        contestName,
        contestDescription,
        durationInSeconds
      );
      setContests([createdContest, ...contest]);
      toastSuccess("Contest Created Successfully");
    } catch (error) {
      toastError(error.message);
    }
    getContests();
  };

  const handleSubmitEntry = async (entryName, contestId) => {

    try {
      if (!wallet) return showConnectModal(true);
      await logic.SubmitEntry(wallet, contestId, entryName);
      toastSuccess("Entry Submitted Successfully")
    } catch (error) {
      toastError(error.message);
    }
  };

  const handleVoteForEntry = async (id, name) => {
    try {
      if (!wallet) return showConnectModal(true);

      await logic.VoteForEntry(wallet, id, name);
      toastSuccess("Voted Successfully");
    } catch (error) {
      toastError(error.message);
    }
  };
  const handleDeclareWinner = async (id) => {
    try {

      if (!wallet) return showConnectModal(true);
      const currWinner = await logic.GetWinner(id);
      const { entryName } = currWinner;
      if(entryName) {
        setShowWinner(true);
        setWinner(entryName);
        toastSuccess(entryName + " has won this contest");
      }
      else toastError("No Winner for this contest");
    } catch (error) {

      toastError("Contest is not ended or There is not enough Entries");
    }
  }

  return (
    <div>
      <Navbar
        updateWallet={updateWallet}
        wallet={wallet}
        showConnectModal={showConnectModal}
      />
      <Toaster />
      <div>
        <div className="blob-c">
          <div className="shape-blob"></div>
          <div className="shape-blob one"></div>
          <div className="shape-blob two"></div>
          <div className="shape-blob three"></div>
          <div className="shape-blob four"></div>
          <div className="shape-blob five"></div>
          <div className="shape-blob six"></div>
        </div>
      </div>
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />

      {/* This will be called when the winner is declared */}
      {showWinner && 
      <WinnerCard winner={winner} setShowWinner={setShowWinner}/>}

      {/* This are all the available Routes : */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="create-contest" element={<CreateContest handleCreateContest={handleCreateContest} />} />

        {isContestsLoaded && (
          <Route path="contests" element={<Contests
            contests={contest}
            wallet={wallet}
            showConnectModal={showConnectModal}
          />} />
        )}
        {isContestsLoaded && (
          <Route path="contests/:contestId" element={<Contest
            pContestDetails={pContestDetails}
            getPContest={getPContest}
            handleSubmitEntry={handleSubmitEntry}
            handleVoteForEntry={handleVoteForEntry}
            handleDeclareWinner={handleDeclareWinner}
            wallet={wallet}
            showConnectModal={showConnectModal}
          />} />
        )}

        {/* Change this show something else when a page is loading. */}
        <Route path="*" element={<Spinner />} />
      </Routes>
    </div>
  );
}

export default App;
