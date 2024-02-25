import React from 'react';
import { PieChart, Pie, Legend } from 'recharts';
 
 
const App = () => {
    const data = [
        { name: 'BLAZZERS', students: 1000 },
        { name: 'moi 15', students: 500 },
        { name: 'OFI', students: 200 },
        { name: 'blockPe', students: 700 }
    ];
 
 
    return (
        <PieChart width={700} height={700}>
            <Pie data={data} dataKey="students" outerRadius={250}/>
            <Legend/>
        </PieChart>
    );
}
 
export default App;