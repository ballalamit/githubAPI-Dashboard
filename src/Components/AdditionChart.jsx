import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Chart as ChartJS, BarElement, LineElement, PointElement, CategoryScale, LinearScale , Tooltip, Legend} from 'chart.js'
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend
)

const AdditionsChart = ({ownerN, repoN}) => {
    // const owner = 'freeCodeCamp';
    // const repo = 'freeCodeCamp';

    const owner = ownerN;
    const repo = repoN;

    console.log(owner, repo);
    const [chartData, setChartData] = useState([]);

    // function unixTimestampToDateTime(timestamp) {
    //     const date = new Date(timestamp * 1000); // Convert to milliseconds
    //     const year = date.getUTCFullYear();
    //     const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
    //     const day = date.getUTCDate();
    //     const hours = date.getUTCHours();
    //     const minutes = date.getUTCMinutes();
    //     const seconds = date.getUTCSeconds();
      
    //     const formattedDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
    //     return formattedDateTime;
    //   }
  

    function unixTimestampToDateTime(timestamp) {
        const date = new Date(timestamp * 1000); 
    
        const formattedDateTime = format(date, "yyyy-MM-dd");
    
        return formattedDateTime;
      }

    const getCommitsofUser = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/code_frequency`);
        const codeFrequencyData = response.data;
  
        const dataArray = Object.values(codeFrequencyData);
  
        const formattedData = dataArray.map(entry => {
          const timestamp = entry[0];
          const formattedDateTime = unixTimestampToDateTime(timestamp);
          const additions = entry[1];
          const deletions = entry[2];
  
          return {
            timestamp: formattedDateTime,
            additions: additions,
            deletions: deletions
          };
        });
  
        setChartData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getCommitsofUser();
    }, []);


    console.log(chartData, "chartData")

   let data= {
        labels: chartData?.map(entry => entry.timestamp),
        datasets: [{
          label: `${chartData?.length} Additions`,
          data: chartData?.map(entry => entry.additions),
          borderColor: `rgba(170,70,193,0.5)`,
          backgroundColor: `#6b46c1`,
          borderWidth: 1
        }]
      }

    let options= {
        maintainAspectRatio: true,
        plugins:{
            legend:{
                position:"bottom"
            },
            title:{
                display: true, text:"Additions in Repository"
            },
            tooltip: { 
                mode: 'nearest',
                intersect: false,
                callbacks: {
                  title: function (context) {
                    return `Week: ${context[0].label}`;
                  },
                  label: function (context) {
                    return `Added: ${context.formattedValue}`;
                  }
                }
              },
        },
        scales: {
            y: {
              beginAtZero: true,
              title: {
                  display: true,
                  text: 'Additions in Repository'
                }
            },
            x: {
              title: {
                display: true,
                text: 'Weeks'
              }
            }
          },
        legend:{
            labels : {
                fontSize: 26
            }
        }
      }

  return (
    <div style={{width: "90%", margin: "auto"}}>
        <Line
            data={data}
            height={50}
            
            options={options}
        />
    </div>
  )
}

export default AdditionsChart