import { useState } from "react";
import { Board } from "./types";
import axios from "axios";


interface BoardItemProps {
  board: Board;
  onSave: () => void;
}
export function BoardItem(props: BoardItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(props.board.title);

  const onClickButton = () => {
    if (isEditing) {
      // Save
      console.log("Save");

      axios.patch(`https://api.ticketing.kir-dev.hu/boards/${props.board.id}`, {
        title: inputValue,
      }).then((props.onSave));
    }

    setIsEditing(!isEditing);


  };

  return <li className="mb-2 p-2 bg-white rounded-corner">
    {isEditing ? <input value={inputValue} onChange={(e) => {
      setInputValue(e.target.value);
    }} type="text" className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out" /> : <p>{props.board.title}</p>}
    <p>{props.board.createdAt}</p>
    <button onClick={onClickButton}>{isEditing ? "Save" : "Edit"}</button>
  </li >
}