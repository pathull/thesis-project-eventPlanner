import fs from 'fs-extra';

export const checkValidEmail = (email: string): boolean => {
  // if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) return true;
  // return false;
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
};

export const checkId = (id: string | number) => {
  // if (!isNaN(Number(id))) return true;
  // return false;
  return !isNaN(Number(id));
};

export const removeImageFromServer = (path: string) => fs.unlink(path);
