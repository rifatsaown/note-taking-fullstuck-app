import { Trash } from "phosphor-react";
import { useState } from "react";
import { ModalComponent } from "./components/ModalComponent";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  
  const { data:notes=[],refetch } = useQuery({
    queryKey: ['notes'],
    queryFn: () =>
      fetch('http://localhost:3000/api/notes').then(
        (res) => res.json(),
      ),
  })

  const handleDeleteNote = (id) => {
    fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
    });
    setSelectedNote(null);
    setTimeout(() => {
      refetch();
    }, 100);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h1 className="text-xl font-semibold mb-4">Gorib Note Pad</h1>
        <ul>
          {notes.data?.map((note) => (
            <li
              key={note._id}
              className={`cursor-pointer p-2 mb-2 rounded ${
                selectedNote === note._id ? "bg-blue-200" : ""
              }`}
              onClick={() => setSelectedNote(note._id)}
            >
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">{note.title}</h2>
                <button onClick={() => handleDeleteNote(note._id)}>
                  <span>
                    <Trash size={20} />
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <ModalComponent refetch={refetch}/>
      </div>

      {/* Note Content */}
      <div className="flex-1 p-8">
        {selectedNote ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {notes.data?.find((note) => note._id === selectedNote)?.title}
            </h2>
            <p className="text-gray-700">
              {notes.data?.find((note) => note._id === selectedNote)?.content}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Select a note to view its content.</p>
        )}
      </div>
    </div>
  );
};

export default App;
