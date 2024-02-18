import { useState } from 'react';
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
  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };
  const handleCreateContest = async (contestName, durationInSeconds) => {
    try {
      const { createdContest } = await logic.CreateContest(wallet, contestName, durationInSeconds);

      setContests([createdContest, ...contest]);
      toastSuccess("Contest Created successfully");
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
      
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />
      
      <Voting />

      <div className="p-9 pt-0">
        <Contest />
      </div>
    </>
  );
}

export default App;
