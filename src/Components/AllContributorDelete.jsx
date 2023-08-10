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

const AllContributorDelete = ({ownerN, repoN}) => {
    const owner = ownerN;
    const repo = repoN;

    //  const owner = 'freeCodeCamp';
    // const repo = 'freeCodeCamp';
    const [chartData, setChartData] = useState([]);

    function unixTimestampToDateTime(timestamp) {
        const date = new Date(timestamp * 1000); 
    
        const formattedDateTime = format(date, "yyyy-MM-dd");
    
        return formattedDateTime;
      }

    const getCommitsofUser = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/stats/contributors`);

        // console.log(response.data, "reponse from")
        const CommitData = response.data;
  
        const dataArray = Object.values(CommitData);
  
        console.log(dataArray, "dataArray");
        
        // const formattedData = dataArray.map(entry => {
        //     const formattedWeek = unixTimestampToDateTime(entry?.week);
        //     return {
        //       formattedWeek: formattedWeek,
        //       total: entry?.total
        //     };
        //   });


        setChartData(dataArray);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getCommitsofUser();
    }, []);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    


    console.log(chartData, "chartData")

    let finalWeekdata= chartData.map(entry => {
        // console.log( entry.weeks[0], "data")
        return entry?.weeks[0]
    })

    console.log(finalWeekdata, "finaldata")

    let authorDatasets = [];

 chartData.forEach(repo => {
        const contributorNames = chartData.map(entry => entry.author.login);
        const weeks = repo.weeks.map((elem) => unixTimestampToDateTime(elem.w));
        const commits = repo.weeks.map((elem) => elem.c);
        const addition = repo.weeks.map((elem) => elem.a);
        const deletion = repo.weeks.map((elem) => elem.d);

        console.log(contributorNames, "commits")

        const authorDataset = {
            label: contributorNames,
            data: deletion,
            borderColor: getRandomColor(),
            backgroundColor: 'transparent',
            borderWidth: 1
        };

        authorDatasets.push(authorDataset);
    });

           
    const formattedData = finalWeekdata.map(entry => {
        const formattedWeek = unixTimestampToDateTime(entry?.w);
        return {
          w: formattedWeek,
          c: entry?.c,
          a:entry?.a,
          d:entry?.d
        };
      });

      console.log(formattedData, " formated")

      console.log(authorDatasets, "authorDatasets")

      let data = {
        labels: formattedData?.map(entry => entry.w),
        datasets: authorDatasets.map(authorDataset => ({
            label: authorDataset.label,
            data: authorDataset.data,
            borderColor: getRandomColor(),
            backgroundColor: 'transparent',
            borderWidth: 1
        }))
    };
    





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
                        const datasetLabel = context.dataset.label;
                        return `Author: ${datasetLabel}`;
                    }
                }
            },
            
            
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Deletion'
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

export default AllContributorDelete