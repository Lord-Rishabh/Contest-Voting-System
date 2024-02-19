import { useParams } from "react-router-dom";

const Contest = () => {
  const { contestId } = useParams();
  console.log(contestId);

  return "A page for individual Contest where people can vote entries or submit new entries";
};

export default Contest;
