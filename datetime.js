function getTimeBetween(from, to) {
  return to.getTime() - from.getTime();
}

function convertDeltaToString(delta) {
  // round to an hour
  if (delta > 3000000) {
    let time = Math.round(delta / 3600000);
    if (time === 1) {
      return "Starts in about an hour"
    }
    return `Starts in about ${time} hours`;
  }
  
  // round to a minute
  if (delta > 60000) {
    let time = Math.round(delta / 60000);
    return `Starts in ${time} minute${time > 1 ? "s" : ""}`;
  }
  
  // the tension is building!
  if (delta > 0) {
    return `Starts in less than a minute`;
  }
  
  // give people some leeway to arrive
  if (delta > -120000) {
    return "Starting now";
  }
  
  // it happened a while ago
  return `Started ${Math.round(-delta / 60000)} minutes ago`;
}

export function getTimeUntil(date) {
  let delta = getTimeBetween(new Date(), date);
  return convertDeltaToString(delta);
}

export function getDateString(date) {
  return date.toISOString();
}