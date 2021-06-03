import { createRouter } from 'routerjs';
import { views } from './views';

export const route = {
  home: '/',
  queue: '/queue',
  watched: '/watched',
};

export const routeApp = createRouter()
  .get(route.home, views.home)
  .get(route.queue, views.queue)
  .get(route.watched, views.watched)
  .run();
