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
  const [isContestsLoaded, setIsContestsLoaded] = useState(false);

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


  const getContests = async () => {
    setIsContestsLoaded(false);
    const { contests } = await logic.GetContests();
    setContests([contests, ...contest]);
    console.log(contests);
    setIsContestsLoaded(true);
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
      console.log(createdContest);
    } catch (error) {
      toastError(error.message);
    }
    getContests();
  };

  const handleSubmitEntry = async (contestId, contestName) => {
    try {
      if (!wallet) return showConnectModal(true);

      await logic.SubmitEntry(wallet, contestId, contestName);
      console.log("Entry Submitted Successfully")
    } catch (error) {
      console.log("** " + error);
      toastError(error.message);
    }
  };

  const handleVoteForEntry = async (id, name) => {
    try {
      if (!wallet) return showConnectModal(true);

      await logic.VoteForEntry(wallet, id, name);
    } catch (error) {
      toastError(error.message);
    }
  };
  const handleDeclareWinner = async (id) => {
    try {
      if (!wallet) return showConnectModal(true);

      const winner = await logic.GetWinner(id);
      const { entryName } = winner;

console.log(entryName);
      toastSuccess(entryName + " has won this contest");
    } catch (error) {
      toastError(error.message);
    }
  }
  // const formatTime = (seconds) => {
  //   const date = new Date(seconds * 1000);
  //   const hours = date.getHours();
  //   const minutes = "0" + date.getMinutes();
  //   const formattedTime = hours + ':' + minutes.substr(-2);
  //   return formattedTime;
  // };

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

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="create-contest" element={<CreateContest handleCreateContest={handleCreateContest} />} />

        {isContestsLoaded && (
          <Route path="contests" element={<Contests
            contests={contest}
            wallet={wallet}
            showConnectModal={showConnectModal}
            setPContestDetails={setPContestDetails}
          />} />
        )}
        {isContestsLoaded && (
          <Route path="contests/:contestId" element={<Contest
            pContestDetails={pContestDetails}
            handleSubmitEntry={handleSubmitEntry}
            handleVoteForEntry={handleVoteForEntry}
            handleDeclareWinner={handleDeclareWinner}
          />} />
        )}
        <Route path="*" element={<Home />} />
      </Routes>

    </>
  );
}

export default App;

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

{/* Remove Testers */ }
{/* <div className="p-12">

        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none" onClick={handleCreateContest}>
          Create Dummy Contest
        </button>
      </div>
      <div className="p-12">

        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none" onClick={handleSubmitEntry}>
          Submit Dummy Entry
        </button>
      </div>
      <div className="p-12">
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none" onClick={handleVoteForEntry}>
          Dummy Voter
        </button>
      </div> */}