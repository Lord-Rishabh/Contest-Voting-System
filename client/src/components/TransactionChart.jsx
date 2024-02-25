import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../App.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, full_name, votes } = payload[0].payload;
    return (
      <div className="custom-tooltip cards rounded-lg p-3 text-white pb-0 ">
        <p className="label">Entry Name: {full_name}</p>
        <p className="label">Votes: {votes}</p>
      </div>
    );
  }

  return null;
};

const TransactionChart = ({ data, highestVotedName }) => {
  return (<>
    <div className="flex justify-evenly">
      <div className="cards ml-5 rounded-[20px] p-8 flex ">
        <BarChart
          width={650}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 3,
            left: 3,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="0 3 0 0" />
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="votes" barSize={20} fill="#ac5dcd" />
        </BarChart>
      </div>


     

    </div>
  </>
  );
};

export default TransactionChart;
