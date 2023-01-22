module.exports = {
  format_time: (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return date.toLocaleTimeString(undefined, options);
  },
  format_date: (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
};
