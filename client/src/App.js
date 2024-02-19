import React, { useState, useEffect } from "react";
import logic from "./interface/logic";
import Navbar from "./components/Navbar";
import ConnectModal from "./components/ConnectModal";
import { toastError, toastSuccess } from "./components/utils/toastWrapper";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CreateContest from "./pages/CreateContest";
import Contest from "./pages/Contest";
import Contests from "./pages/Contests";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  const [wallet, setWallet] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contest, setContests] = useState([]);

  useEffect(() => {
    getContests();
  }, []);

  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };

  // const handleCreateContest = async (contestName, durationInSeconds) => {
  //   try {
  //     const { createdContest } = await logic.CreateContest(
  //       wallet,
  //       contestName,
  //       durationInSeconds
  //     );

  //     // setContests([createdContest, ...contest]);
  //     console.log(" ** " + createdContest + " **");
  //     toastSuccess("Contest Created successfully");
  //     console.log("Contest Created successfully !!!");
  //   } catch (error) {
  //     toastError(error.message);
  //     console.log("Contest not Created !!! : " + error);
  //   }
  // };
  // const handleSubmitEntry = async (Name, contestId) => {
  //   try {
  //     if (contestId >= contest.size) {
  //       toastError("Enter a valid Contest Id");
  //       console.log("Enter a valid Contest Id");
  //     }
  //     const createdEntry = await logic.SubmitEntry(wallet, contestId, Name);
  //     contest[contestId].entries.push(createdEntry);
  //     toastSuccess("Entry Submitted successfully");
  //   } catch (error) {
  //     toastError(error.message);
  //   }
  // };
  // const getContest = async () => {
  //   try {
  //     let { currContests } = await logic.GetContests();
  //     setContests(currContests);
  //     console.log(contest);
  //   } catch (error) {
  //     console.log("error" + error.message);
  //     toastError(error.message);
  //   }
  // };

  const getContests = async () => {
    const { contests } = await logic.GetContests();
    console.log(contests);
  };

  const handleCreateContest = async () => {
    try {
      if (!wallet) return showConnectModal(true);

      const { createdContest } = await logic.CreateContest(
        wallet,
        "Test Contest",
        "Just A Contest",
        3600
      );

      console.log(createdContest);
    } catch (error) {
      toastError(error.message);
    }
  };

  const handleSubmitEntry = async () => {
    try {
      if (!wallet) return showConnectModal(true);

      await logic.SubmitEntry(wallet, 0, "GUEST");
    } catch (error) {
      toastError(error.message);
    }
  };

  const handleVoteForEntry = async () => {
    try {
      if (!wallet) return showConnectModal(true);

      await logic.VoteForEntry(wallet, 0, "GUEST");
    } catch (error) {
      toastError(error.message);
    }
  };

  return (
    <>
      <Navbar
        updateWallet={updateWallet}
        wallet={wallet}
        showConnectModal={showConnectModal}
      />
      <Toaster />
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />

      {/* Remove Testers */}
      <button className="btn" onClick={handleCreateContest}>
        Create Dummy Contest
      </button>
      <button className="btn" onClick={handleSubmitEntry}>
        Submit Dummy Entry
      </button>
      <button className="btn" onClick={handleVoteForEntry}>
        Dummy Voter
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create-contest" element={<CreateContest />} />
        <Route path="contests" element={<Contests />} />
        <Route path="contests/:contestId" element={<Contest />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
