export const checkValidEmail = (email: string): boolean => {
  if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) return true;
  return false;
};

export const checkId = (id: string) => {
  if (!isNaN(Number(id))) return true;
  return false;
};
