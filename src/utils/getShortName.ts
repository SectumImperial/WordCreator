export const getShortName = (fullName: string): string => {
  const nameParts = fullName.split(' ');

  if (nameParts.length < 3) {
    return fullName;
  }

  const [lastName, firstName, middleName] = nameParts;
  return `${lastName} ${firstName.charAt(0)}. ${middleName.charAt(0)}.`;
};
