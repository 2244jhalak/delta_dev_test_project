import { createBrowserRouter } from "react-router";
import Main from "../Layouts/Main";
import Home from "../components/Home/Home";
import AddPost from "../components/add/AddPost";
import ViewPost from "../components/view/ViewPost";
import PostDetails from "../components/details/PostDetails";
import Dashboard from "../components/demo/Dashboard";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Main />,
        children : [
            {
                path : "/",
                element : <Home />,  
            },
            {
                path : "/add",
                element : <AddPost />
            },
            {
                path : "/view",
                element : <ViewPost />
            },
            {
                path : "/posts/:id",
                element : <PostDetails />
            },
            {
                path : "/demo",
                element : <Dashboard />
            }
        ]
    }
])

export default router;