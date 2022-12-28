export const calculateDaysDiff = (
  dateIni: string | Date,
  dateFin: string | Date
) => {
  if (typeof dateIni === "string") {
    dateIni = new Date(dateIni);
  }
  if (typeof dateFin === "string") {
    dateFin = new Date(dateFin);
  }

  dateIni.setHours(0, 0, 0, 0);
  dateFin.setHours(0, 0, 0, 0);

  return Math.floor((dateFin.getTime() - dateIni.getTime()) / 86400000);
};

export const isTimezoneValid = (timezone: string) => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch (err) {
    return false;
  }
};
