import React, { useState } from "react";

const AllContestsPage = () => {
  const [contests, setContests] = useState([
    {
      id: 1,
      name: "Design Contest",
      endTime: "2024-02-28T23:59:59Z",
      entries: [
        { id: 1, name: "Design 1", votes: 10 },
        { id: 2, name: "Design 2", votes: 15 },
        { id: 3, name: "Design 3", votes: 8 },
      ],
    },
    {
      id: 2,
      name: "Photography Contest",
      endTime: "2024-03-15T23:59:59Z",
      entries: [
        { id: 4, name: "Photo 1", votes: 20 },
        { id: 5, name: "Photo 2", votes: 18 },
        { id: 6, name: "Photo 3", votes: 12 },
      ],
    },
    {
      id: 3,
      name: "Writing Contest",
      endTime: "2024-04-30T23:59:59Z",
      entries: [
        { id: 7, name: "Writing 1", votes: 14 },
        { id: 8, name: "Writing 2", votes: 16 },
        { id: 9, name: "Writing 3", votes: 22 },
      ],
    },
  ]);

  // This function is called when the Vote button is clicked
  const handleVote = (contestId, entryId) => {
    // Call your backend API here to register the vote
    console.log(`Voted for contest ${contestId}, entry ${entryId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-semibold mb-4">All Contests</h1>
      {contests.map((contest) => (
        <div key={contest.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{contest.name}</h2>
          <p className="text-gray-400 mb-4">
            End Time: {new Date(contest.endTime).toLocaleString()}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contest.entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-800 rounded-md p-4 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-2">{entry.name}</h3>
                <p className="text-gray-300">Total Votes: {entry.votes}</p>
                <button
                  onClick={() => handleVote(contest.id, entry.id)}
                  className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Current Leader:</h3>
            <p className="text-gray-300">
              {contest.entries.length > 0 &&
                contest.entries.reduce((max, entry) =>
                  entry.votes > max.votes ? entry : max
                ).name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllContestsPage;
