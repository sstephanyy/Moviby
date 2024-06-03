export const formatDuration = (duration) => {
  const [hours, minutes] = duration.split(':').map(Number);

  let formattedDuration = '';
  if (hours > 0) {
    formattedDuration += `${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) {
      formattedDuration += ` e ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    }
  } else {
    formattedDuration += `${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }

  return formattedDuration;
};

