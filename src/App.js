import GitHubActivity from './Components/GitHubActivity';
import MostStarredRepos from './Components/MostStarredRepos';
import logo from './logo.svg';
import AdditionsChart from './Components/AdditionChart';
import DeletionChart from './Components/DeletionChart';
import CommitActivity from './Components/CommitActivity';
import AllContributorCommits from './Components/AllContributorCommits';
import AllContributorDelete from './Components/AllContributorDelete';
import AllContributorAddition from './Components/AllContibutorAddition';
// import './App.css';

function App() {
  return (
    <div className="App">
      {/* <GitHubActivity /> */}
        <MostStarredRepos />
        {/* <CommitActivity />
        <AdditionsChart /> 
        <DeletionChart /> */}
        {/* <AllContributorCommits />
        <AllContributorDelete />
        <AllContributorAddition /> */}
    </div>
  );
}

export default App;
