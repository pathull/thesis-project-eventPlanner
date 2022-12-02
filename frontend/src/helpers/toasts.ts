import { toast } from 'react-hot-toast';

export const showToast = (msg: string) => {
  toast(msg, {
    duration: 3000,
    position: 'top-left',
    style: { background: '#363636', color: '#fff' },
  });
};

export const errorToast = (msg: string) => {
  toast.error(msg, {
    duration: 3000,
    position: 'top-left',
    style: { background: '#363636', color: '#fff' },
  });
};
