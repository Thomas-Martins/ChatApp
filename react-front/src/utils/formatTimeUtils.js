export const formatTimeDifference = (createdAt) => {
  const now = new Date();
  const createdAtDate = new Date(createdAt);
  const differenceInMilliseconds = now - createdAtDate;
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInDays >= 1) {
    return `${differenceInDays} jour${differenceInDays > 1 ? "s" : ""}`;
  } else if (differenceInHours >= 1) {
    return `${differenceInHours} heure${differenceInHours > 1 ? "s" : ""}`;
  } else {
    return `${differenceInMinutes} minute${differenceInMinutes > 1 ? "s" : ""}`;
  }
};
