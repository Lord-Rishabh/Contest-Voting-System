import React, { useState, useEffect } from 'react';
import logic from "./interface/logic";
import './App.css';
import Contest from './components/Contest';
import Navbar from './components/navbar';
import Voting from './components/voting';
import ConnectModal from './components/ConnectModal';
import { toastError, toastSuccess } from './components/utils/toastWrapper';

function App() {
  
  const [wallet, setWallet] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contest, setContests] = useState([]);

  useEffect(() => {
    getContest();
  }, [wallet]);
  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };
  const handleCreateContest = async (contestName, durationInSeconds) => {
    try {
      const { createdContest } = await logic.CreateContest(wallet, contestName, durationInSeconds);

      // setContests([createdContest, ...contest]);
      console.log(" ** " + createdContest + " **");
      toastSuccess("Contest Created successfully");
      console.log("Contest Created successfully !!!");

    } catch (error) {
      toastError(error.message);
      console.log("Contest not Created !!! : " + error );
    }
  };
  const handleSubmitEntry = async (Name, contestId) => {
    try {
      if(contestId >= contest.size) {
        toastError("Enter a valid Contest Id");
        console.log("Enter a valid Contest Id");
      }
      const createdEntry = await logic.SubmitEntry(wallet, contestId, Name);
      contest[contestId].entries.push(createdEntry);
      toastSuccess("Entry Submitted successfully");
    } catch (error) {
      toastError(error.message);
    }
  };
  const getContest = async () => {
    try {

      let { currContests } = await logic.GetContests();
      setContests(currContests);
      console.log(contest);

    } catch (error) {
      console.log("error" + error.message);
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

      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />

      <Voting 
        handleCreateContest={handleCreateContest}
        handleSubmitEntry={handleSubmitEntry}
       />

      <div className="p-9 pt-0">
        <Contest />
      </div>
      
    </>
  );
}

export default App;
