import React, { useState } from "react";
import { toastError } from "./utils/toastWrapper";
import { Wallet, validateMnemonic, VoyageProvider } from "js-moi-sdk";

const provider = new VoyageProvider("babylon");
const account = "m/44'/6174'/7020'/0/0"; // 0th account path derivation

const ConnectModal = ({ isModalOpen, updateWallet, showConnectModal }) => {
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");

  const handleConnect = async (mnemonic) => {
    try {
      if (!validateMnemonic(mnemonic)) {
        return setError("Incorrect mnemonic");
      }

      const wallet = new Wallet(provider);
      await wallet.fromMnemonic(mnemonic, account);
      updateWallet(wallet);

      setError("");
      showConnectModal(false);
    } catch (error) {
      toastError(error.message);
    }
  };

  const handleCancel = () => {
    setError("");
    showConnectModal(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="inset-0 z-50 flex justify-center items-start p-4 overflow-hidden fixed text-black">
          <div className="bg-white rounded-lg p-8 shadow-md w-full md:w-3/4 lg:w-2/4 mt-20">
            <div className="text-black">Enter your Mnemonic here </div>
            <h2 className="text-2xl font-semibold ">Enter Mnemonic</h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-purple-500"
              placeholder="mnemonic"
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
            />
            {error && (
              <p className="text-red-600 font-semibold text-center">{error}</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
                onClick={() => handleConnect(mnemonic)}
              >
                Connect
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-4 hover:bg-gray-400 focus:outline-none"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectModal;
