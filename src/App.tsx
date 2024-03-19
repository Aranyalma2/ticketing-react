import axios from "axios";
import { useEffect, useState } from "react";
import { Board } from "./types";
import { BoardItem } from "./board-item";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [count, setCount] = useState(0);
  const onIncrement = () => setCount((prev) => prev + 1);

  const onAdd = () => {
    setInputValue("");
    setIsLoading(true);
    axios.post("https://api.ticketing.kir-dev.hu/boards", {
      title: inputValue
    }).then(() => {
      getBoards();
      setIsLoading(false);
    });
  };

  const getBoards = () => {
    axios.get<Board[]>("https://api.ticketing.kir-dev.hu/boards").then((res) => {
      setBoards(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-100">
      <div className="bg-white p-10 rounded-md shadow-lg flex flex-col items-center gap-5">
        <h1 className="font-bold">React Gyakorlat</h1>
        <button
          className="bg-blue-500 text-white font-bold p-5 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
          onClick={onIncrement}
        >
          {count}++
        </button>
      </div>
      <div>
        <input value={inputValue} onChange={(e) => {
          setInputValue(e.target.value);
        }} type="text" className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out" />
        <button onClick={onAdd} className="bg-blue-500 text-white font-bold p-5 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Add</button>
      </div>
      {isLoading && <p>Loading...</p>}
      <div className="overflow-auto max-h-60">
        <ul>
          {boards.map((board) => {
            return (
              <BoardItem key={board.id} board={board} onSave={getBoards} />
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default App;
