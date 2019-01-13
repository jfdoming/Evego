function getTimeBetween(from, to) {
  return to.getTime() - from.getTime();
}

function getDeltaString(from, to) {
  let delta = getTimeBetween(from, to);
  
  // round to an hour
  if (delta > 3000) {
    return `In ${Math.round(delta/3600)} hours`;
  }
  
  // round to a minute
  if (delta > 60) {
    return `In ${Math.round(delta/60)} minutes`;
  }
  
  if (delta <= 0) {
    return "Now";
  }
  
  return `In ${delta} seconds`;
}

function getTimeUntil(date) {
  return getDeltaString(new Date(), date);
}

function getDateString(date) {
  return date.toISOString();
}