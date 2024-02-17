import React, { useState } from 'react';

const Voting = () => {
    const [showCreateContestForm, setShowCreateContestForm] = useState(false);
    const [contestDetails, setContestDetails] = useState({
        contestName: '',
        entries: [{ name: '', votes: 0 }],
        endTime: ''
    });

    const toggleCreateContestForm = () => {
        if (showCreateContestForm) {
            // Reset entries to 1 when hiding the form
            setContestDetails({
                ...contestDetails,
                entries: [{ name: '', votes: 0 }]
            });
        }
        setShowCreateContestForm(!showCreateContestForm);
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setContestDetails(prevState => {
            const updatedEntries = [...prevState.entries];
            updatedEntries[index] = { ...updatedEntries[index], [name]: value };
            return { ...prevState, entries: updatedEntries };
        });
    };
    

    const addEntryField = () => {
        setContestDetails({
            ...contestDetails,
            entries: [...contestDetails.entries, { name: '', votes: 0 }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted contest details:', contestDetails);
        setContestDetails({
            contestName: '',
            entries: [{ name: '', votes: 0 }],
            endTime: ''
        });
        setShowCreateContestForm(false);
    };

    return (
        <div className="flex-grow text-white p-4 md:p-12 relative">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div className="mr-6">
                    <h1 className="text-2xl md:text-4xl font-semibold mb-2">Contest Voting System</h1>
                    <h2 className="text-md md:text-lg text-gray-500 ">Transparent, fair, decentralized contest voting platform.</h2>
                </div>
                <div className="flex flex-wrap items-start justify-end relative">
                    <button onClick={toggleCreateContestForm} className="inline-flex px-4 md:px-5 py-3 text-sm md:text-base text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-4 md:h-5 w-4 md:w-5 -ml-1 mt-0.5 md:mt-1 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Create Contest
                    </button>
                    <button className="inline-flex px-4 md:px-5 py-3 text-sm md:text-base text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-3 md:ml-6 mb-3">

                        Connect to MOI
                    </button>
                    {showCreateContestForm && (
                        <div className="absolute top-0 left-0 w-full mt-12 bg-gray-900 bg-opacity-75 p-4 md:p-12">
                            <button onClick={toggleCreateContestForm} className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-red-700 focus:outline-none">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <label htmlFor="contestName" className="block">Contest Name:</label>
                                <input type="text" id="contestName" name="contestName" value={contestDetails.contestName} onChange={(e) => setContestDetails({ ...contestDetails, contestName: e.target.value })} className="w-full border rounded-md py-2 px-3 bg-gray-900 text-white" />

                                {contestDetails.entries.map((entry, index) => (
                                    <div key={index}>
                                        <label htmlFor={`entry-${index}`} className="block">Entry {index + 1}:</label>
                                        <input type="text" id={`entry-${index}`} name={`entry-${index}`} value={entry.name} onChange={(e) => handleChange(e, index)} className="w-full border rounded-md py-2 px-3 bg-gray-900 text-white" />
                                    </div>
                                ))}

                                <button type="button" onClick={addEntryField} className="text-purple-400 hover:text-purple-700 focus:outline-none mt-2">Add Entry</button>

                                <label htmlFor="endTime" className="block">End Time:</label>
                                <input type="datetime-local" id="endTime" name="endTime" value={contestDetails.endTime} onChange={(e) => setContestDetails({ ...contestDetails, endTime: e.target.value })} className="w-full border rounded-md py-2 px-3 bg-gray-900 text-white" />

                                <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">Create Contest</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Voting;
