const format_date = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  return `${month}/${day}/${year}`;
};

module.exports = { format_date };
