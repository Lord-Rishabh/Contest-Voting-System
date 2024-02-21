import React from 'react'

const WinnerCard = ({winner, setShowWinner}) => {

  const closeWinnerCard = () => {
    setShowWinner(false)
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="cards w-96 p-6  rounded-lg shadow-xl">
        <p className="text-lg mb-6 text-white">The winner of this contest is : {winner} </p>
        <button
          onClick={closeWinnerCard}
          className="px-4 py-2 neonbutton text-white rounded-md hover:bg-purple-700 focus:outline-none m-3"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default WinnerCard