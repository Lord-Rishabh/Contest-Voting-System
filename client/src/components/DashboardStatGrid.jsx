import React, { useState, useEffect } from 'react';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import "../App.css"

const DashboardStatGrid = ({ data }) => {

    useEffect(() => {
        getData();
    }, []);
    const [totalVotes, setTotalVotes] = useState();
    const [highestVotedName, setHighestVotedName] = useState("");
    const [leastVotedName, setLeastVotedName] = useState("");
    const getData = async () => {
        setTotalVotes(getTotalVotes(data));
        setHighestVotedName(getHighestVotedName(data));
        setLeastVotedName(getLeastVotedName(data));
    };

    const getTotalVotes = (data) => {
        if (!Array.isArray(data)) return;

        return data.reduce((total, entry) => total + entry.votes, 0);
    };

    const getHighestVotedName = (data) => {
        if (!Array.isArray(data) || data.length === 0) return null;

        let highestVotedEntry = data.reduce((prev, current) => {
            return (prev.votes > current.votes) ? prev : current;
        });

        return highestVotedEntry.full_name;
    };

    const getLeastVotedName = (data) => {
        if (!Array.isArray(data) || data.length === 0) return null;
        if (data.length === 1)
            return null;
        let leastVotedEntry = data.reduce((prev, current) => {
            return (prev.votes < current.votes) ? prev : current;
        });

        return leastVotedEntry.full_name;
    };
    return (
        <div className='flex gap-4 w-full justify-evenly'>
            <Boxwrapper className="">
                <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
                    <IoBagHandle className='text-2xl text-white'></IoBagHandle>
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-white font-semibold'>Total Votes</span>
                    <div className='flex items-center'>
                        <strong className='text-xl text-white font-semibold'>{totalVotes}</strong>
                    </div>
                </div>
            </Boxwrapper>
            <Boxwrapper>
                <div className='rounded-full h-12 w-12 flex items-center justify-center bg-orange-500'>
                    <IoPieChart className='text-2xl text-white'></IoPieChart>
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-white font-semibold'>Most Voted</span>
                    <div className='flex items-center'>
                        <strong className='text-xl text-white font-semibold'>{highestVotedName}</strong>
                    </div>
                </div>
            </Boxwrapper>
            <Boxwrapper>
                <div className='rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400'>
                    <IoPeople className='text-2xl text-white'></IoPeople>
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-white font-semibold'>Least Voted</span>
                    <div className='flex items-center'>
                        <strong className='text-xl text-white font-semibold'>{leastVotedName}</strong>
                    </div>
                </div>
            </Boxwrapper>
        </div>
    );
}

export default DashboardStatGrid;

function Boxwrapper({ children }) {
    return <div className='rounded-[20px] p-4 flex items-center justify-evenly cards mt-8'>{children}</div>
}