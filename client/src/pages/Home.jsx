import "../App.css";
import Lottie from "lottie-react";
import moiLottie from "../lotties/moiLottie.json";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex flex-col content-center mt-[2rem] max-md:p-2 overflow-y-hidden">
        <h1 className=" text-center animate-charcter max-md:text-2xl">Welcome to dVote</h1>
        <h3 className="text-center max-md:text-xl">Decentralized Blockchain Based Voting Platform</h3>
      </div>


      <div className="p-8 pb-0">
        <div className="flex justify-center pt-4 items-center">
          <Link to="create-contest" className="text-lg font-semibold transition-transform duration-450 hover:transform hover:scale-105">
            <button
              className="px-4 py-2 max-md:mt-4 max-md:mx-2 mr-12 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none transition-transform duration-450 hover:transform hover:scale-105 max-md:text-sm "
            >Create your Contest</button>
          </Link>
          <Link to="contests" className="text-lg font-semibold transition-transform duration-450 hover:transform hover:scale-105 max-md:text-sm max-md:mt-4">
            <button
              className="px-4 py-2 neobuttonn rounded-lg text-white hover:bg-gray-500 focus:outline-none "
            >View all Contests</button>
          </Link>
        </div>
      </div>


      <div className="md:flex md:flex-row content-center justify-center md:mt-[3rem] max-md:p-12 max-md:px-3">
        <div className="flex items-center justify-center ml-5 md:w-1/4 md:mr-[150px]"><p className="text-xl max-md:text-lg text-justify">
          dVote utilizes moi for secure and transparent voting. Each vote is a unique transaction, recorded on the blockchain, ensuring anonymity and preventing tampering. The decentralized nature enhances trust, verifiable, and accessible voting processes for a more democratic system.</p>
        </div>
        <div className="mr-5 w-1/4 max-md:flex max-md:justify-center max-md:items-center max-md:w-full"><Lottie animationData={moiLottie} loop={true} /></div>
      </div>

      {/* go to all contests button */}


      {/* footer */}
      <div className="pt-9">
        <div className="flex-col justify-center">
          <div className=" text-gray-400 pt-7 border-t border-gray-800 text-center pb-4">Built with ❤️ on <a href={"https://moi.technology"}
          target="_blank"
          rel="noopener noreferrer"
          >MOI</a></div>
        </div>
      </div>

    </>
  );
};

export default Home;
