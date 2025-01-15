import { useEffect, useState } from "react";
import { Link } from "react-router";

const Home = () => {
  const [hasDraft, setHasDraft] = useState(false);

  // Check for draft status on mount
  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("postDraft"));
    setHasDraft(draft && (draft.title || draft.description || draft.imageFile));
  }, []);

  return (
    <div className="flex justify-center items-center mt-20 gap-4">
      <Link className="btn btn-outline" to="/add">Add Post</Link>
      <Link className="btn btn-ghost" to="/view">View All Posts</Link>
      <Link
        className={`btn ${
          hasDraft ? "btn-warning" : "btn-success"
        } flex items-center justify-center gap-2`}
        to={hasDraft ? "/add" : "#"}
        disabled={!hasDraft} // Disable the button when no draft exists
      >
        Draft
        {hasDraft && (
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        )}
      </Link>
      <Link className="btn btn-primary" to="/demo">Demo Dashboard With scroll bar</Link>
    </div>
  );
};

export default Home;
