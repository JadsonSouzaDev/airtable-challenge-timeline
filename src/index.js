import React from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";
import { assignLanes } from "./assignLanes.js";
function App() {
  const lanes = assignLanes(timelineItems);
  console.log(lanes);
  return (
    <div>
        <h2>Good luck with your assignment! {"\u2728"}</h2>
        <h3>{timelineItems.length} timeline items to render</h3>
      <div className="flex flex-col gap-4 bg-red-200 w-[100px] h-[30px]">
      </div>

      {lanes.map((lane, key) => (
        <div key={key}>
          {lane.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);