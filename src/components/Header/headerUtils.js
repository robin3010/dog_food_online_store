export const headerAnimatedListener = () => {
  const scrollPosition = document.documentElement.scrollTop;
  const $appHeader = document.querySelector('header.main__header');

  if (scrollPosition > 40) {
    return $appHeader.classList.add('animated');
  }
  return $appHeader.classList.remove('animated');
};
