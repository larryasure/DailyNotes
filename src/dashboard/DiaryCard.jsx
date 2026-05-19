import { Calendar, SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DiaryCard({ note, openDeleteModal, openUpdateModal }) {
  const navigate = useNavigate()

  const openDiaryDetail = () => {
    navigate(`/dashboard/diary/${note.id}`)
  }


  return (
    <>
      <div className="group relative flex flex-col justify-between p-6 w-full max-w-xs h-72 bg-neutral-900 border border-neutral-800 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:border-neutral-700 hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-amber-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div>
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono tracking-widest ">
            <div className="flex items-center gap-1 justify-between uppercase ">
              <div>
                <Calendar className="w-3 h-3 text-amber-200/60" />
                <span className="font-semibold text-gray-500">
                  {note.date_created || "14 May 2026"}
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-[10px] border border-neutral-700 text-neutral-400 group-hover:text-amber-200 group-hover:border-amber-200/30 transition-colors uppercase">
              My Thought
            </span>
          </div>

          <h3 className="mt-4 text-xl font-medium tracking-tight text-neutral-100 group-hover:text-white transition-colors line-clamp-1">
            {note.title || "Untitled"}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-neutral-400 font-light line-clamp-1 sm:line-clamp-4 group-hover:text-neutral-300 transition-colors">
            {note.content || "No Content"}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-800/60 mt-auto">
          <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => openDeleteModal(note)}
              className="p-2 rounded-full text-neutral-400 hover:bg-neutral-800 cursor-pointer hover:text-red-400 transition-all active:scale-90"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => openUpdateModal(note)}
              className="p-2 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-200 hover:bg-amber-200 hover:text-black hover:border-transparent transition-all duration-300 active:scale-90 cursor-pointer"
            >
              <SquarePen className="w-4 h-4" />
            </button>
          </div>

          <div onClick={openDiaryDetail} className="text-white" >
            <button className="cursor-pointer bg-gray-700 px-4 py-1.5 rounded-lg active:scale-95 hover:bg-gray-800 transition-all duration-300  ">Read More</button>
          </div>
        </div>
      </div>
    </>
  );
}
