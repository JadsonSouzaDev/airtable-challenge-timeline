/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */
export const assignLanes = (items, month, year) => {
  const intervalItems = items.filter(
    (item) =>
      (getDateUTC(item.start).getMonth() === month &&
      getDateUTC(item.start).getFullYear() === year) ||
      (getDateUTC(item.end).getMonth() === month &&
      getDateUTC(item.end).getFullYear() === year)
  );
  console.log(intervalItems);
  const sortedItems = intervalItems.sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );
  const lanes = [];

  function assignItemToLane(item) {
    for (const lane of lanes) {
      if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
        lane.push(item);
        return;
      }
    }
    lanes.push([item]);
  }

  for (const item of sortedItems) {
    assignItemToLane(item);
  }
  return lanes;
};

export const getDateUTC = (date) => {
  return new Date(new Date(date).toLocaleString("en-US", { timeZone: "UTC" }));
};

export const getStartDateLimit = (items) => {
  const sortedItems = items.sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );
  return getDateUTC(sortedItems[0].start);
};

export const getEndDateLimit = (items) => {
  const sortedItems = items.sort((a, b) => new Date(a.end) - new Date(b.end));
  return getDateUTC(sortedItems[sortedItems.length - 1].end);
};

export const getMonths = (items) => {
  const start = getStartDateLimit(items).setDate(1);
  const end = getEndDateLimit(items).setDate(28);
  const months = [];
  const currentDate = new Date(start);
  while (currentDate <= end) {
    const monthYear = `${currentDate.toLocaleString("default", {
      month: "long",
    })} ${currentDate.getFullYear()}`;

    if (!months.find((month) => month.label === monthYear)) {
      months.push({
        label: monthYear,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
      });
    }
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return months;
};
