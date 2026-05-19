import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import DiaryCard from "./DiaryCard";

export default function Diary() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [deleteNote, setDeleteNote] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const openDeleteModal = (note) => {
    setDeleteNote(note);
  };

  const openUpdateModal = (note) => {
    setEditNote(note);

    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const navigate = useNavigate();

  function openCreate() {
    navigate("/dashboard/create_diary");
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setError("");
        setIsLoading(true);

        const res = await api.get("diary_notes/");
        setNotes(res.data);
        // console.log("API RESPONSE:", res.data);
        console.log("Login successfull")
      } catch (error) {
        console.error(error);
        setError("An error occurred while loading, Please try again!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      await api.delete(`diary_note/${id}/`);

      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
    } catch (error) {
      console.error(error);
      setError("Failed to delete Diary!");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await api.put(`diary_note/${id}/`, updatedData);

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? res.data : note)),
      );
    } catch (error) {
      console.error("Failed to update data", error);
    }
  };

  if (isLoading) return <div className="">loading please wait...</div>;

  if (error) return <div className="text-red-500 text-sm ">{error}</div>;

  if (notes.length === 0)
    return (
      <div className="min-h-screen ">
        <div className=" my-15 h-52 bg-amber-50 max-w-sm  mx-auto p-6 shadow-2xs rounded-xl">
          <div className="flex items-center justify-center  text-center">
            <p>No Diary available please create one here below ⬇️</p>
          </div>

          <div className="flex items-center justify-center mt-8">
            <button
              onClick={openCreate}
              className="px-4 py-3 font-semibold text-white transition-all duration-200 bg-gray-900 rounded-xl hover:bg-black active:scale-105"
            >
              Create Diary
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="min-h-screen  my-7 ">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6  ">
          {notes.map((note) => (
            <div key={note.id}>
              <DiaryCard
                note={note}
                openDeleteModal={openDeleteModal}
                openUpdateModal={openUpdateModal}
              />
            </div>
          ))}
        </div>
      </div>
      {deleteNote && (
        <div className="fixed inset-0 z-50  bg-black/60 backdrop-blur-xs animate-fade-in flex items-center justify-center ">
          <div className="max-w-md p-6 flex items-center flex-col relative rounded-xl  shadow-[0_2px_50px_-12px_rgba(0,0,0,0.8)]  bg-linear-to-r from-[#f1f1f1] to-[#d2cbc0]  border-gray-500">
            <div className="flex items-center justify-center">
              <TriangleAlert className="w-9 h-9 text-red-600" />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-3">
              Delete Post{" "}
            </h3>
            <div className="flex items-center flex-col ">
              <p className=" text-lg mt-3 ">Are you sure you want to delete</p>
              <span className="text-base mt-2 text-red-500 ">
                "{deleteNote?.title}" ?
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-10">
              <button
                className="px-4 py-1.5 bg-gray-400 font-medium hover:bg-gray-500 transition-all duration-200 rounded-md cursor-pointer"
                onClick={() => setDeleteNote(null)}
              >
                Cancel
              </button>

              <button
                className="text-white font-medium bg-red-500 hover:bg-red-600  transition-all duration-300  px-4 py-1.5 rounded-md cursor-pointer "
                onClick={() => {
                  handleDeleteNote(deleteNote.id);
                  setDeleteNote(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editNote && (
        <div className="fixed inset-0 bg-black/60 z-50  backdrop-blur-xs flex items-center justify-center ">
          <div className=" relative w-md bg-linear-to-r from-[#f1f1f1] to-[#d2cbc0]  p-6 rounded-lg shadow-[0_2px_50px_-12px_rgba(0,0,0,0.8)] border-gray-300 ">
            <h3 className="text-xl font-semibold text-center  ">Edit Note</h3>

            <div className="flex flex-col items-start gap-5 mt-7 ">
              <div className="flex flex-col gap-1 w-full ">
                <label className="text-gray-800 font-semibold">
                  Edit Title:
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-500  rounded-lg placeholder:text-sm text-sm focus:outline-none focus:ring-1 duration-200  transition-all"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1 w-full ">
                <label className="text-gray-800 font-semibold ">
                  Edit Content{" "}
                </label>
                <textarea
                  name="editContent"
                  className="w-full px-4 h-40 py-1 leading-relaxed border border-gray-500  rounded-lg placeholder:text-sm text-sm focus:outline-none focus:ring-1 duration-200  transition-all"
                  onChange={(e) => setEditContent(e.target.value)}
                  value={editContent}
                />
              </div>

              <div className="grid grid-cols-2 mt-7 gap-6 max-w-2xl mx-auto ">
                <button
                  className="px-4 py-1.5 bg-gray-400 font-medium hover:bg-gray-500 transition-all duration-200 rounded-md cursor-pointer"
                  onClick={() => setEditNote(null)}
                >
                  Cancel
                </button>
                <button
                  className="text-white font-medium bg-green-500 hover:bg-green-600  transition-all duration-300  px-4 py-1.5 rounded-md cursor-pointer "
                  onClick={() =>
                    handleUpdate(
                      editNote.id,
                      {
                        title: editTitle,
                        content: editContent,
                      },
                      setEditNote(null),
                    )
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
