import { notice, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default {
  voidQuery() {
    error({
      title: 'Empty request!',
      delay: 1000,
    });
  },

  repeatedQuery() {
    success({
      title: 'Found already!',
      delay: 1000,
    });
  },

  notFound() {
    error({
      title: 'Nothing was found!',
      delay: 1000,
    });
  },
};
