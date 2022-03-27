const format_date = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  return `${month}/${day}/${year}`;
};

const cost_per_month = (listings) => {
  return listings * 90;
};

module.exports = { format_date, cost_per_month };
