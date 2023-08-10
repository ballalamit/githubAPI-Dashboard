import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { appendData, getRepositories, gotError, loading } from '../Redux/action';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import CommitActivity from './CommitActivity';
import AdditionsChart from './AdditionChart';
import DeletionChart from './DeletionChart';
import AllContributorCommits from './AllContributorCommits';
import AllContributorAddition from './AllContibutorAddition';
import AllContributorDelete from './AllContributorDelete';


function MostStarredRepos() {

    const dispatch = useDispatch();
    const {repositories, isloading} = useSelector(state => state)
    const [timePeriod, setTimePeriod] = useState('1 week');
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [select, setSelect] = useState("")
    const [selectedRepoId, setSelectedRepoId] = useState(null);
    const currentDate = new Date();
    const lastWeekDate = new Date();
    const lastMonthDate = new Date();
    lastWeekDate.setDate(currentDate.getDate() - 7);
    lastMonthDate.setMonth(currentDate.getMonth() - 1);

    const formattedLastWeekDate = lastWeekDate.toISOString().split('T')[0];
    const formattedLastMonthDate = lastMonthDate.toISOString().split('T')[0];

    const getTimePeriodDate = () => {
        switch (timePeriod) {
            case '1 week':
                return formattedLastWeekDate;
            case '2 weeks':
                const twoWeeksAgo = new Date();
                twoWeeksAgo.setDate(currentDate.getDate() - 14);
                return twoWeeksAgo.toISOString().split('T')[0];
            case '1 month':
                return formattedLastMonthDate; 
            default:
                return formattedLastWeekDate;
        }
    };

    const handleSelectChange = (e, repoId) => {
        setSelect(e.target.value);
        setSelectedRepoId(repoId);
        console.log(select, "select change");
    }

    const getRepos = async () => {
        dispatch(loading())
        try {
            const createdDate = getTimePeriodDate();
            console.log(createdDate, "createDate");
            let url = `https://api.github.com/search/repositories?q=created:>${createdDate}&sort=stars&order=desc&page=${page}`;
            const response= await axios.get(url)

            dispatch(getRepositories(response.data.items, page))
            
        } catch (error) {
            dispatch(gotError())
        }
        
    }

    const handleScroll = () => {
        const isBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight;
        if (isBottom) {
            setPage(prevPage => prevPage + 1);
        }
    };

    
    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    //selct change

    // const handleSelectChange = (e) => {
    //     setSelect(e.target.value);
    //     console.log(select, "selct change")
    // }


    useEffect(()=>{
        getRepos();
        
    },[timePeriod,page])

    console.log(repositories)
    console.log("page",page)
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: 'auto', width: '90%' }}>
    <h1 style={{fontSize: "45px"}}>Most Starred Repos</h1>
    <FormControl sx={{ mb: 5, minWidth: 380 }}>
        <InputLabel id="demo-simple-select-helper-label">Select the Time Period</InputLabel>
        <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Select the Time Period"
            value = {timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
        >
            <MenuItem value="1 week">1 week</MenuItem>
            <MenuItem value="2 weeks">2 weeks</MenuItem>
            <MenuItem value="1 month">1 month</MenuItem>
        </Select>
    </FormControl>
</div>

  



    <div  >
                { 
                 repositories.map(repo => {
                        const pushedAtDate = new Date(repo.pushed_at);
                        const options = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        };
                        const formattedPushedAt = pushedAtDate.toLocaleDateString('en-US', options);

                        return (

                            <div >

                            <Stack padding={"15px"}  direction="row" spacing={5} key={repo.id} width={"90%"} margin={"auto"}  alignItems={'center'} style={{borderRadius: "5px", marginBottom:"15px" , boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}  >
                                 <Avatar alt="Remy Sharp" src={repo.owner.avatar_url} sx={{ width: 125, height: 125 }}  />
                                 <div>
                                    <h2> <b>Repository Name: </b> {repo.name}</h2>
                                    <p> <b>Repository Description:</b>  {repo.description ? repo.description : "No description available"}</p>

                                    <Stack direction="row" spacing={2} alignItems={'center'}>
                                        <div style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "5px", width: "100px", textAlign: 'center' }}>
                                            <p style={{ margin: 0, fontSize: "14px" }}>No. of Stars</p>
                                            <p style={{ margin: 0, fontWeight: "bold" }}>{repo.stargazers_count}</p>
                                        </div>
                                        <div style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "5px", width: "100px", textAlign: 'center' }}>
                                            <p style={{ margin: 0, fontSize: "14px" }}>No. of Issues</p>
                                            <p style={{ margin: 0, fontWeight: "bold" }}>{repo.open_issues_count}</p>
                                        </div>
                                        <p style={{color: "gray"}}>Last pushed on <span style={{color: 'black', fontStyle:'italic'}}> {formattedPushedAt}</span> by <span style={{color: 'black', fontStyle:'italic'}}>{repo.owner.login}</span> </p>
                                    </Stack>
                                    
                                 </div>
                               
                               <div >

                            
                               <select name="dropdown" id="" onChange={(e) => handleSelectChange(e, repo.id)}>
                                <option value="" >Select</option>
                                <option value="commits" >Commits</option>
                                <option value="additions">Additions</option>
                                <option value="deletions">Deletions</option>
                               </select>

                               </div>
                               
                            </Stack>

                            {selectedRepoId === repo.id && (
                                    <div>
                                        {select === "commits" && 
                                            <div>
                                             <CommitActivity ownerN={repo.owner.login} repoN={repo.name} />
                                            <AllContributorCommits ownerN={repo.owner.login} repoN={repo.name} />
                                            </div>
                                        }
                                        {select === "additions" && 
                                        <div>
                                        <AdditionsChart ownerN={repo.owner.login} repoN={repo.name} />
                                        <AllContributorAddition ownerN={repo.owner.login} repoN={repo.name} />
                                        </div>
                                        }
                                        {select === "deletions" &&
                                        
                                        <div>
                                        <DeletionChart ownerN={repo.owner.login} repoN={repo.name} />
                                        <AllContributorDelete  ownerN={repo.owner.login} repoN={repo.name} />
                                          </div> 
                                        }
                                    </div>
                                )}
                            

                            </div>

                        );
                    })
                }
            </div>
            {isloading && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <CircularProgress />
                </div>
            )}

           
    
        
    </div>
  )
}

export default MostStarredRepos