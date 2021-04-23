export default function dateRangeValidation(startDateString, endDateString) {
  let startDate = new Date(startDateString);
  let endDate = new Date(endDateString);
  return startDate < endDate;
}
