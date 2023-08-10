// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line, Chart } from 'react-chartjs-2';
// import { LineChart } from 'recharts'

// import { DateTime } from 'luxon';
// import 'chart.js';

// function GitHubActivity() {
//   const owner = 'QwenLM';
//   const repo = 'Qwen-7B';
//   const [chartData, setChartData] = useState([]);

//   const getCommitsofUser = async () => {
//     try {
//       const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`);
//       const codeFrequencyData = response.data;

//       const dataArray = Object.values(codeFrequencyData);

//       const formattedData = dataArray.map(entry => {
//         const timestamp = entry[0];
//         const additions = entry[1];
//         const deletions = entry[2];

//         return {
//           timestamp: timestamp,
//           additions: additions,
//           deletions: deletions
//         };
//       });

//       setChartData(formattedData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getCommitsofUser();
//   }, []);

//   const data = [
//     {name:"2017", react:32, angular:37, vue:60},
//   {name:"2018", react:72, angular:37, vue:60},
//   {name:"2019", react:52, angular:37, vue:60},
//   {name:"2020", react:62, angular:37, vue:60}
//   ]
//   console.log(chartData)
  

//   return (

//       <LineChart width={600} height={300} data={data}>
//         <Line type="monotone" dataKey="react" stroke="#2196F3"/>
//       </LineChart>
  
//   );
  
// }

// export default GitHubActivity;


// //commits - GET /repos/{owner}/{repo}/stats/commit_activity

// // adition- GET /repos/{owner}/{repo}/stats/code_frequency documentation

// // deletion - GET /repos/{owner}/{repo}/stats/code_frequency documentation


// // 1- total number of changes per week
// // 2- one line for each contributors for total number of changes per week
// 	//