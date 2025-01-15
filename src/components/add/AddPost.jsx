import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_api =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;

const AddPost = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    imageFile: null,
    category: "",
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = JSON.parse(localStorage.getItem("postDraft"));
    if (savedDraft) {
      setDraft(savedDraft);
    }
  }, []);

  // Save draft to localStorage on unload
  useEffect(() => {
    const handleUnload = () => {
      localStorage.setItem("postDraft", JSON.stringify(draft));
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [draft]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDraft((prev) => ({ ...prev, imageFile: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, imageFile, category } = draft;

    console.log("Submitting form with:", { title, description, imageFile, category });

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    try {
      // Upload image
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      console.log("Uploading image...");

      const imageUploadResponse = await axiosPublic.post(image_hosting_api, imageFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (imageUploadResponse.data.success) {
        console.log("Image uploaded successfully:", imageUploadResponse.data.data.url);

        const imageURL = imageUploadResponse.data.data.url;
        const newPost = {
          title,
          description,
          category,
          image: imageURL,
          meta: {
            description: `${title} | ${category}`,
            createdAt: new Date().toISOString(),
          },
        };

        console.log("Sending new post to server:", newPost);

        const dbResponse = await axiosPublic.post("/posts", newPost);

        if (dbResponse.status === 201) {
          Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: "Post added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.removeItem("postDraft"); // Clear draft after successful submission
          navigate("/");
        } else {
          console.error("Failed to add post:", dbResponse);
        }
      } else {
        console.error("Image upload failed:", imageUploadResponse.data);
      }
    } catch (error) {
      console.error("Error during form submission:", error.response?.data || error.message);
    }
  };

  return (
    <div className="hero bg-[#8EC038] min-h-screen">
      <div className="hero-content lg:gap-x-36 flex-col lg:flex-row">
        <div className="card bg-[#5D862A] w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="input input-bordered"
                value={draft.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                name="category"
                className="select select-bordered"
                value={draft.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Blog">Blog</option>
                <option value="Idea">Idea</option>
                <option value="Tutorial">Tutorial</option>
                <option value="News">News</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                name="photo"
                placeholder="Upload Photo"
                className="input input-bordered pt-2"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered"
                value={draft.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="bg-[#5D862A] border-2 hover:bg-[#a7dd65] hover:text-black border-[#a7dd65] rounded-lg py-2.5 text-white font-semibold"
              >
                Add Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;










