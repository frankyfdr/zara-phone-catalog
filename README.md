# Zara Phone Catalog

A React + Vite single-page application that shows a mobile phone catalog, product detail pages, and a simple cart flow.

## 1) Requirements

- Node.js 20+ (recommended: latest LTS)
- npm 10+
- Internet connection (API is hosted remotely)

## 2) Run the project from the beginning

### Clone and install

```bash
git clone <your-repository-url>
cd zara-phone-catalog
npm install
```

### Start development server

```bash
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview production build locally

```bash
npm run preview
```

### Run lint checks

```bash
npm run lint
```

### Run tests

```bash
npm run test
```

## 3) Project architecture

The app uses a **feature-oriented + layered React architecture**:

### High-level flow

1. `src/main.jsx` boots the app and wraps it with `CartProvider`.
2. `src/App.jsx` defines routes with `react-router-dom`.
3. Pages in `src/pages` compose reusable UI components.
4. Data is fetched through `src/api/phoneApi.js`.
5. Cart state is centralized in Context + custom hooks.

### Main folders

- `src/pages/`: Route-level screens (`Home`, `ProductDetail`, `Cart`).
- `src/components/`: Reusable UI blocks (`Navbar`, `PhoneCard`, `Button`, etc.).
- `src/api/`: API client functions (Axios-based).
- `src/context/`: Global state provider (`CartContext`).
- `src/hooks/`: Abstractions on top of context (`useCart`, `useCartContext`).
- `src/styles/`: Global SCSS variables/mixins and base styles.
- `src/test/` and `*.test.jsx`: test setup and component/page tests.

### State management

- Cart state lives in `CartContext` and is exposed through `useCart`.
- Cart is persisted in `localStorage` so reloads keep selected items.
- Derived values (like `total`) are computed in hooks, not UI components.

### Routing

- `/` → product list (`Home`)
- `/product/:id` → product detail (`ProductDetail`)
- `/cart` → shopping cart (`Cart`)

### Data layer

- `Axios` instance in `phoneApi.js` centralizes base URL and API key header.
- Pages call small API functions (`getPhones`, `getPhoneDetail`) instead of embedding HTTP logic in components.

## 4) Why these decisions

### 1. Context + hooks for cart state

**Decision:** Use React Context + custom hooks instead of adding Redux/Zustand.

**Why:**

- Cart scope is small and app-wide.
- Fewer dependencies and less boilerplate.
- Good balance between simplicity and maintainability.

### 2. Page/components separation

**Decision:** Keep route orchestration in `pages` and UI primitives in `components`.

**Why:**

- Easier reuse of UI elements.
- Better testability (unit tests per component/page).
- Cleaner mental model: pages coordinate, components render.

### 3. API abstraction in one module

**Decision:** Centralize API calls in `src/api/phoneApi.js`.

**Why:**

- Single place to update base URL/headers.
- Avoid duplicated request code.
- Keeps pages focused on presentation + state.

### 4. SCSS with shared variables/mixins

**Decision:** Use SCSS structure (`styles/_variables.scss`, `_mixins.scss`, `global.scss`).

**Why:**

- Encourages consistent spacing/typography/styles.
- Easier long-term styling updates.

## 5) Useful scripts summary

- `npm run dev` → start dev server
- `npm run build` → production build
- `npm run preview` → preview built app
- `npm run lint` → run ESLint
- `npm run test` → run Vitest
