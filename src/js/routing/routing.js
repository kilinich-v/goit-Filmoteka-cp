import { createRouter } from 'routerjs';
import { views } from '../views';

const router = createRouter().run();

const homeRoute = router.get('/', views.home);
const libraryRoute = router.get('/queue', views.queue);

export default { homeRoute, libraryRoute };
