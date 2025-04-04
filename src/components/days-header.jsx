const DaysHeader = ({ days }) => {
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}
    >
      {days.map((day, key) => (
        <div key={key} className="flex flex-col gap-4">
          <span className="text-xs">{day + 1}</span>
        </div>
      ))}
    </div>
  );
};

export default DaysHeader;
