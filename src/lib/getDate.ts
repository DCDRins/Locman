

// For todays date;
export const today = () => { 
  const date = new Date();
  return ((date.getDate() < 10) ? "0" : "") + date.getDate() + "-"
          + (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1) + "-" + date.getFullYear();
}

// For the time now
export const timeNow = () => {
  const date = new Date();
   return ((date.getHours() < 10) ? "0" : "") + date.getHours()
          + ":" + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":"
          + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();
}