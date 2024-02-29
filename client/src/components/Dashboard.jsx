import React, { useEffect, useState } from "react";
import DashboardStatGrid from "./DashboardStatGrid";
import TransactionChart from "./TransactionChart";
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';

const Dashboard = ({ data, getPContest }) => {
    const { contestId } = useParams();
    const [totalVotes, setTotalVotes] = useState();
    const getTotalVotes = (data) => {
        if (!Array.isArray(data)) return;

        return data.reduce((total, entry) => total + entry.votes, 0);
    };

    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        setLoading(true);
        await getPContest(contestId);
        setTotalVotes(getTotalVotes(data));
        setLoading(false);
    };
    const [loading, setLoading] = useState(false);

    return (<>{loading ? <Spinner /> : (
        <div className="">
            {totalVotes == 0 ?

                <div className="text-xl  p-5 m-12 font-semibold rounded-lg bg-purple-800">Not Enough Votes to show Dashboard</div>
                :
                <div className="flex flex-col gap-4">

                    <DashboardStatGrid data={data} />
                    <div className="flex flex-row gap-4 w-full mt-8 justify-center">
                        <TransactionChart data={data} />
                    </div>
                </div>
            }
        </div>
    )}
    </>
    )
}
export default Dashboard;
