import fs from 'fs-extra';

export const checkValidEmail = (email: string): boolean => {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
};

export const checkId = (id: string | number) => {
  return !isNaN(Number(id));
};

export const removeImageFromServer = (path: string) => fs.unlink(path);
