import { selectors as books } from './slices/books.store';
import { selectors as collection } from './slices/collection.store';
import { selectors as search } from './slices/search.store';
import { selectors as layout } from './slices/layout.store';
import { selectors as auth } from './slices/auth.store';
import { selectors as loginPage } from './slices/login-page.store';
import { selectors as router } from './slices/router.store';

export { router, books, collection, search, layout, auth, loginPage };
