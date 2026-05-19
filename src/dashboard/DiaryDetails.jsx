import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/api.js";

export default function DiaryDetails() {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);

        const res = await api.get(`diary_note/${id}/`);
        setNote(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-2">
        <p>Loading</p>

        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce [animation-delay:50ms]" />
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="p-8">
        Ooops! The note you are looking for is not here 😕
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fef2] px-6 py-10 rounded-lg">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        
        <Link
          to="/dashboard/diary"
          className="inline-block text-sm text-gray-900 underline underline-offset-4 transition-colors hover:text-blue-300"
        >
          ← Go Back
        </Link>

        <h1 className="mt-6 text-4xl font-bold capitalize text-gray-900 leading-tight">
          {note.title}
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Written by{" "}
          <span className="font-medium capitalize text-gray-700">
            {note.author}
          </span>
        </p>

        <div className="mt-15">
          <p className="leading-8 text-gray-700 whitespace-pre-line">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
}