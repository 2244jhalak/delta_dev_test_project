import { Link } from "react-router";


const Dashboard = () => {
    return (
        <div className="w-56 h-screen flex py-10 flex-col items-center bg-slate-400 space-y-28 text-white overflow-y-auto">
              <Link className="btn btn-outline" to="/view">View All Posts</Link>
              <Link className="btn btn-outline" to="/view">View All Posts</Link>
              <Link className="btn btn-outline" to="/view">View All Posts</Link>
              <Link className="btn btn-outline" to="/view">View All Posts</Link>
              <Link className="btn btn-outline" to="/view">View All Posts</Link>
              <Link className="btn btn-outline" to="/view">View All Posts</Link>
              <Link className="btn btn-outline" to="/view">View All Posts</Link>
              <Link className="btn btn-outline" to="/view">View All Posts</Link>
              <Link className="btn btn-outline" to="/view">View All Posts</Link>
        </div>



    );
};

export default Dashboard;