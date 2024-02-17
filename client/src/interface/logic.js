import { VoyageProvider, Wallet, getLogicDriver } from "js-moi-sdk";

// base node of network , we will call here. 
const provider = new VoyageProvider("babylon") 

const logicId = process.env.REACT_APP_LOGIC_ID

const constructBaseWallet = async () => {
    const wallet = new Wallet(provider);
    await wallet.fromMnemonic(
      process.env.REACT_APP_BASE_MNEMONIC,
      "m/44'/6174'/7020'/0/0"
    );
    return wallet;
  };
// baseWallet is only used for get request. 
const baseWallet = await constructBaseWallet();

const CreateContest = async (wallet, contestName, durationInSeconds) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.CreateContest(contestName, durationInSeconds);
  return ixResponse.result();
};
const SubmitEntry = async (wallet, contestId, Name) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.SubmitEntry(contestId, Name);
  return ixResponse.result();
};
const VoteForEntry = async (wallet, contestId, Name) => {
  const logicDriver = await getLogicDriver(logicId, wallet);
  const ixResponse = await logicDriver.routines.VoteForEntry(contestId, Name);
  return ixResponse.result();
};



const GetContests = async () => {
  const logicDriver = await getLogicDriver(logicId, baseWallet);
  return logicDriver.routines.GetContests();
}

const logic = {
  CreateContest,
  SubmitEntry,
  VoteForEntry,
  EndContest,
  GetContests,
};

export default logic;
