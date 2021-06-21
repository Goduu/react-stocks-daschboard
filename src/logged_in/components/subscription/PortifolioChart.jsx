import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell, LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { getCurrentPortifolio, getCurrentPortifolioHistorical } from '../../../shared/functions/requests'
import { useSelector } from "react-redux";

const data01 = [
    { asset: "Group A", totalValue: 400 },
    { asset: "Group B", totalValue: 300 },
    { asset: "Group C", totalValue: 300 },
    { asset: "Group D", totalValue: 200 }
];
const data02 = [
    { asset: "A1", totalValue: 100 },
    { asset: "A2", totalValue: 300 },
    { asset: "B1", totalValue: 100 },
    { asset: "B2", totalValue: 80 },
    { asset: "B3", totalValue: 40 },
    { asset: "B4", totalValue: 30 },
    { asset: "B5", totalValue: 50 },
    { asset: "C1", totalValue: 100 },
    { asset: "C2", totalValue: 200 },
    { asset: "D1", totalValue: 150 },
    { asset: "D2", totalValue: 50 }
];


export default function PortifolioChart() {
    const userId = useSelector(state => state.auth.id)
    const token = useSelector(state => state.auth.token)
    const [assets, setAssets] = useState(data02)
    const [sectors, setSectors] = useState(data01)
    const [industries, setIndustries] = useState([])
    const [history, setHistory] = useState([])


    const test = () => {
        getCurrentPortifolioHistorical(userId, token)
            .then(res => {
                console.log("getCurrentPortifolioHistorical", res)
                res = res.map(p => {
                    return { value: p.close, date: new Date(p.date.year, p.date.month, p.date.dayOfMonth).toLocaleDateString() }
                })
                setHistory(res)
            })
        getCurrentPortifolio(userId, token)
            .then(res => {
                console.log("getCurrentPortifolio", res)

                setAssets(res.portifolio.sort((el1, el2) => {
                    return el1.sector.localeCompare(el2.name)
                }))
                setSectors(res.sectors.sort((el1, el2) => {
                    return el1.name.localeCompare(el2.name)
                }))
                setIndustries(res.industries)
               
            })
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{payload[0].payload.asset || payload[0].payload.name}: {payload[0].payload.totalValue.toFixed(2)}</p>
                </div>
            );
        }

        return null;
    };
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    return (
        <>
            <PieChart width={800} height={400}>
                <Pie
                    data={sectors}
                    dataKey="totalValue"
                    cx={200}
                    cy={200}
                    outerRadius={40}
                    fill="#8884d8"
                >

                </Pie>

                <Pie
                    data={assets}
                    dataKey="totalValue"
                    cx={200}
                    cy={200}
                    innerRadius={50}
                    outerRadius={70}
                    fill="#82ca9d"
                    label
                >
                    {assets.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Pie dataKey="totalValue" data={industries} cx={350} cy={180} innerRadius={40} outerRadius={80} fill="#82ca9d" />

                <Tooltip content={<CustomTooltip />} />
            </PieChart>
            <ResponsiveContainer width={350} height={200}>  
                <LineChart width={300} height={100} data={history}>
                    <XAxis dataKey="date" hide />
                    <YAxis domain={[0, 'dataMax+0.2*dataMax']} hide />
                    <Tooltip/>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />

                </LineChart>
            </ResponsiveContainer>
            <button onClick={test}> get Current portifolio</button>
        </>
    );
}
