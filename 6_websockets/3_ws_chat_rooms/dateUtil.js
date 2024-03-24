/**
 * Returns the current date and time formatted as "mm/dd/yyyy HH:mm:ss".
 * @returns {string} The formatted date and time string.
 */
function nowFormated() {
  const created = new Date();
  const month = created.getMonth() + 1;
  const day = created.getDate();
  const year = created.getFullYear();
  const hours = created.getHours();
  const minutes = created.getMinutes();
  const seconds = created.getSeconds();

  return `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

module.exports = { nowFormated };
