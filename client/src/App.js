import { useState } from 'react';
import './App.css';
import Contest from './components/Contest';
import Navbar from './components/navbar';
import Voting from './components/voting';
import ConnectModal from './components/ConnectModal';

function App() {

  const [wallet, setWallet] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
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
        <Contest/>
      </div>
    </>
  );
}

export default App;
