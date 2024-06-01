# IT-Boilerplate-Vorschlag
## Getting started

```
git clone https://github.com/MartinElsaesser/IT-Boilerplate-Vorschlag.git boilerplate
cd boilerplate
npm install
npm run dev
```

```
open http://localhost:3000
```

## Project structure
```
.
├── src/
│   ├── components/
│   │   └── [SomeComponent].tsx
│   ├── helpers/
│   │   ├── renderUtil.tsx
│   │   └── typeUtil.ts
│   ├── pages/
│   │   └── [SomePage].tsx
│   ├── routes/
│   │   └── [someRouter].tsx
│   └── server.tsx
└── static/
    ├── css/
    │   └── app.css
    ├── js/
    │   └── [someFile].js
    └── pages-client-js/
```
* `src/`: server code
	* `components/`: reusable JSX components
	* `helpers/`: useful utility to make project type safe
	* `pages/`: JSX components that make up main part of pages
	* `routes/`: routers, that define URLs
* `static/`: files sent to the client
	* `css/`: for writing custom css
	* `js/`: for writing custom JS code (should not be used, instead use client side hydrated components)
	* `pages-client-js/`: contains build files for each file in pages folder, used for hydration (rebuilding server page on the client)
