import { useState } from "react";
import api from "../api/api.js";

export default function CreateDiary() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const createNote = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setSuccess("");
      setError("");

      if (!content.trim() || !title.trim()) {
        setIsLoading(false);
        setError("Enter Valid input Ogbeni!");
        return;
      }
      const res = await api.post("diary_notes/", { content, title });

      if (res.status === 201) {
        setTitle("");
        setContent("");
        setSuccess("Diary Note created Successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to create note", error);
      setError("Failed to create Note.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen px-8 my-7  ">
        <div className="mx-auto w-md bg-linear-to-br from-[#eceaea] to-[#d7cec0]   shadow-2xl  rounded-lg p-6 ">
          <form
            onSubmit={createNote}
            className="flex items-start flex-col gap-4  "
          >
            <div className="flex flex-col gap-2  w-full">
              <label className="text-gray-800 font-semibold">Title: </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-500  rounded-lg placeholder:text-sm text-sm focus:outline-none focus:ring-1 duration-200  transition-all"
                placeholder="The title of your DiaNote"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                name="title"
              />
            </div>

            <div className="flex flex-col gap-2  w-full">
              <label className="text-gray-800 font-semibold">Content: </label>
              <textarea
                className="w-full px-4 py-1 h-40 border border-gray-500 rounded-lg text-sm focus:outline-none focus:ring-1"
                placeholder="Write your diary content..."
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setError("");
                }}
                name="content"
              />
            </div>

            <div  className="flex items-center  text-center">

              {error && <div className="text-sm text-red-500 ">{error}</div>}

              {success && (
                <div className="text-sm text-green-500">{ success}</div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={` w-full px-4 py-2  rounded-lg bg-black text-white font-semibold ${isLoading ? "opacity-50" : ""}`}
            >
              {isLoading ? "Creating..." : "Create Note"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
