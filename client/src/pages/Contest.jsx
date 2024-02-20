import React, {useState} from 'react'
import { toastSuccess,toastError } from '../components/utils/toastWrapper';
import { useParams } from 'react-router-dom';

const Contest = ({contestName, contestDescription, handleSubmitEntry }) => {

  const { contestId } = useParams();
  const [showCreateEntryForm, setShowCreateEntryForm] = useState(false);
  const [entryDetails, setEntryDetails] = useState({
    entryName: "",
  });
  const toggleCreateEntryForm = () => {
    setShowCreateEntryForm(!showCreateEntryForm);
  };
  const handleEntrySumbit = async (e) => {
    e.preventDefault();
    // Convert End Time to seconds
    try {
      await handleSubmitEntry(entryDetails.entryName, contestId);
      toastSuccess("Entry Submitted Successfully");
      console.log("Entry Submitted successfully");
    } catch (e) {
      console.log(e);
      toastError("Something went wrong");
    }
  };
  
  return (<>
    <div>{contestName}</div>
    <div>{contestDescription}</div>
    <button
            onClick={toggleCreateEntryForm}
            className="inline-flex px-4 md:px-5 py-3 text-sm md:text-base text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-3 md:ml-6 mb-3"
          >
            Sumbit Entry
          </button>
    {/* Entry Form */}
    {showCreateEntryForm && (
            <div className="absolute top-0 left-0 w-full mt-12 bg-gray-900 bg-opacity-75 p-4 md:p-12">
              <button
                onClick={toggleCreateEntryForm}
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-red-700 focus:outline-none"
                type="button"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <form onSubmit={handleEntrySumbit} className="space-y-4">
                <label htmlFor="contestName" className="block">
                  Entry Name:
                </label>
                <input
                  type="text"
                  id="contestName"
                  name="contestName"
                  value={entryDetails.contestName}
                  onChange={(e) =>
                    setEntryDetails({
                      ...entryDetails,
                      entryName: e.target.value,
                    })
                  }
                  className="w-full border rounded-md py-2 px-3 bg-gray-900 text-white"
                />

                

                <button
                  type="submit"
                  className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                >
                  Submit Entry
                </button>
              </form>
            </div>
          )}
  </>

  )
}

export default Contest