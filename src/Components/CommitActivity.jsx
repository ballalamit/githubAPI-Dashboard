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

const CommitActivity = ({ownerN, repoN}) => {
    const owner = ownerN;
    const repo = repoN;
    const [chartData, setChartData] = useState([]);

    function unixTimestampToDateTime(timestamp) {
        const date = new Date(timestamp * 1000); 
    
        const formattedDateTime = format(date, "yyyy-MM-dd");
    
        return formattedDateTime;
      }

    const getCommitsofUser = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`);

        console.log(response.data, "reponse from")
        const CommitData = response.data;
  
        const dataArray = Object.values(CommitData);
  
        console.log(dataArray, "dataArray")
        
        const formattedData = dataArray.map(entry => {
            const formattedWeek = unixTimestampToDateTime(entry?.week);
            return {
              formattedWeek: formattedWeek,
              total: entry?.total
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
        labels: chartData?.map(entry => entry.formattedWeek),
        datasets: [{
          label: `Commits`,
          data: chartData?.map(entry => entry.total),
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
                      return `Changes: ${context.formattedValue}`;
                    }
                  }
              },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Commits'
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

export default CommitActivity