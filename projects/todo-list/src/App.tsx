import React from "react";
import {
  BiCheckCircle,
  // BiChevronDown,
  // BiChevronUp,
  // BiTrash,
  BiPlus,
} from "react-icons/bi";

function App() {
  const [list, setList] = React.useState<string[]>([]);
  const [input, setInput] = React.useState<string>("");

  return (
    <div className="flex flex-col min-h-screen container mx-auto p-4 pt-12">
      <div className="flex-1 mx-auto flex flex-col w-[500px] max-w-full">
        <h1 className="text-4xl font-semibold text-center mb-5">My Tasklist</h1>
        <ul className="relative flex flex-col space-y-3 overflow-auto h-[calc(100vh-1rem-3rem-120px)] flex-grow">
          {list.map((item, index) => (
            <li
              className="flex items-center px-3 py-2 bg-white shadow-sm rounded sticky top-0 bottom-0"
              key={index}
            >
              <BiCheckCircle className="w-6 h-6 text-emerald-600 me-2" />
              <span className="break-words">{item}</span>
            </li>
          ))}
        </ul>

        <form
          className="w-full relative mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (input !== "") {
              setList([input, ...list]);
              setInput("");
            }
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a task"
            className="w-full rounded-md focus:ring focus:ring-opacity-75 border-gray-700 text-gray-900 focus:ring-teal-200 focus:border-gray-900"
          />
          <button className="absolute top-0 right-0 h-full px-3">
            <BiPlus className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
