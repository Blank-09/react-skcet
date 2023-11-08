import { useState } from "react";
import { BiMinus, BiPlus, BiReset } from "react-icons/bi";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col">
        <h1 className="text-[10rem] font-bold">
          {count.toString().padStart(2, "0")}
        </h1>
        <div className="flex justify-center font-bold text-center gap-4">
          <button
            className="w-10 h-10 border border-slate-950 rounded-full flex items-center justify-center"
            onClick={() => setCount((prev) => prev + 1)}
          >
            <BiPlus />
          </button>
          <button
            className="w-10 h-10 bg-slate-950 rounded-full text-white flex items-center justify-center"
            onClick={() => setCount(0)}
          >
            <BiReset />
          </button>
          <button
            className="w-10 h-10 border border-slate-950 rounded-full flex items-center justify-center"
            onClick={() => setCount((prev) => prev - 1)}
          >
            <BiMinus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
