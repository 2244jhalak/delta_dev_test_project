import { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router";
import { FaPrint } from "react-icons/fa6";

const PostDetails = () => {
  const { id } = useParams(); // Get post ID from the URL
  const axiosPublic = useAxiosPublic();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axiosPublic.get(`/posts/${id}`); // Fetch post details by ID
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id, axiosPublic]); // Re-fetch when post ID changes

  const handlePrint = () => {
    const printButton = document.getElementById("print-button");
    printButton.style.display = "none"; // Hide the print button
    window.print();
    printButton.style.display = "block"; // Show the print button after printing
  };

  

  if (loading) {
    return <div className="flex items-center justify-center mt-20">
      <span className="loading loading-infinity loading-lg"></span>
    </div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex flex-row mt-20 mx-20 gap-20">
      <div className="w-1/2 rounded-lg">
        <img src={post.image} alt={post.title} className="rounded-lg" />
      
      </div>
      <div className="w-1/2">
        <h1 className="text-3xl">{post.title}</h1>
        <p>
          <strong>Category:</strong> {post.category}
        </p>
        <p>
          <strong>Created At:</strong> {new Date(post.meta.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Description:</strong> {post.description}
        </p>
        <button
          id="print-button"
          onClick={handlePrint}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          <FaPrint />
        </button>
      </div>
    </div>
  );
};

export default PostDetails;

