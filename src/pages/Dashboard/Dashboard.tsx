import './Dashboard.scss'
import DailyLogForm from '../../components/DailyLogForm/DailyLogForm'
import Navbar from '../../components/Navbar/Navbar'

const Dashboard = () =>  {
  return (
    <div className="dashboard">
      <div className="dashboardMain">
        <Navbar />

        <div className="dashboardMainContent">
          {/* <h3>Hello {userData?.user_metadata?.studentName}👋</h3> */}
          <div className="dashboardMainContentForm">
            <DailyLogForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard