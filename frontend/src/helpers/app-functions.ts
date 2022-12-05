import Scroll from 'react-scroll';

export const scrollToBottom = (id: string) => {
  Scroll.animateScroll.scrollToBottom({
    containerId: id,
    duration: 0,
    delay: 300,
  });
};

export const scrollToBottomAnimated = (id: string) => {
  Scroll.animateScroll.scrollToBottom({
    containerId: id,
    duration: 800,
  });
};
