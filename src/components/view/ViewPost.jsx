import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router";

const ViewPost = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    
    // Fetch posts from API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosPublic.get("/posts");
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        };
        fetchPosts();
    }, [axiosPublic]);

    // Check localStorage for viewed posts
    const getViewedPosts = () => {
        const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts')) || [];
        return viewedPosts;
    };

    // Handle when a post is viewed
    const handleViewDetails = (postId) => {
        // Add postId to viewedPosts array in localStorage
        const viewedPosts = getViewedPosts();
        if (!viewedPosts.includes(postId)) {
            viewedPosts.push(postId);
            localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
        }
        navigate(`/posts/${postId}`);
    };
    if (loading) {
        return <div className="flex items-center justify-center mt-20">
          <span className="loading loading-infinity loading-lg"></span>
        </div>;
    }

    return (
        <div>
            <h2 className="text-center my-10 text-3xl font-bold">View All Posts</h2>
            <div className="grid grid-cols-3 gap-5 px-5">
                {posts.map(post => {
                    // Get viewed posts from localStorage
                    const viewedPosts = getViewedPosts();
                    return (
                        <div key={post._id} className="card bg-base-100 w-96 shadow-xl">
                            <figure>
                                <img
                                    className="h-[250px] w-full"
                                    src={post.image}
                                    alt="Shoes"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className={`card-title ${viewedPosts.includes(post._id) ? 'text-[#800080]' : 'text-[#0000EE]'}`}>
                                    {post.meta.description}
                                </h2>
                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => handleViewDetails(post._id)}
                                        className="btn btn-primary">View Details</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewPost;


