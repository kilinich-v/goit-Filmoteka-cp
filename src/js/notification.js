import { notice, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default {
  showNotice() {
    notice({
      title: 'Empty request!',
      delay: 1000,
    });
  },

  showSuccess() {
    success({
      title: 'Урааа! Нашли...',
      delay: 1000,
    });
  },

  showError() {
    error({
      title: `Nothing found!`,
      delay: 1000,
    });
  },
};
