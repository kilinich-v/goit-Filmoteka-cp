import rendering from './rendering';

function createQueueListFn() {
  const queueBtn = document.querySelector('[data-index="queue"]');
  const watchBtn = document.querySelector('[data-index="watched"]');
  watchBtn.classList.remove('is__active--btn');
  queueBtn.classList.add('is__active--btn');

  return rendering('queue');
}

export default createQueueListFn;
