import "../App.css";
import Lottie from "lottie-react";
import moiLottie from "../lotties/moiLottie.json";

const Home = () => {
  return (
    <>
      <div className="flex flex-col content-center mt-[2rem] max-md:p-2">
        <h1 className=" text-center animate-charcter max-md:text-2xl">Welcome to dVote</h1>
        <h3 className="text-center max-md:text-xl">Decentralized Blockchain Based Voting Platform</h3>
      </div>
      <div className="md:flex md:flex-row content-center justify-center md:mt-[8rem] max-md:p-12 max-md:px-3">
        <div className="flex items-center justify-center ml-5 md:w-1/4 md:mr-[150px]"><p className="text-xl max-md:text-lg text-justify">
          dVote utilizes moi for secure and transparent voting. Each vote is a unique transaction, recorded on the blockchain, ensuring anonymity and preventing tampering. The decentralized nature enhances trust, verifiable, and accessible voting processes for a more democratic system.</p>
        </div>
        <div className="mr-5 w-1/4 max-md:flex max-md:justify-center max-md:items-center max-md:w-full"><Lottie animationData={moiLottie} loop={true} /></div>
      </div>

    </>
  );
};

export default Home;
