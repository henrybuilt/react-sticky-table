# Sticky Table Demo

Intended to show off React Sticky Table!

### Running locally

- Configure `react-sticky-table`
  - run `git clone https://github.com/henrybuilt/react-sticky-table.git`
  - cd into `react-sticky-table`
  - run `npm install`
  - cd back up with `../`
- Configure `gh-pages` branch
  - run `git clone https://github.com/henrybuilt/react-sticky-table.git react-sticky-table-demo`
  - cd into `react-sticky-table-demo`
  - run `git checkout gh-pages`
  - run `npm install`
  - run `npm start`

### Building

- run `npm run build` on this branch (`gh-pages`)
- Copy and paste `index.html` from `/build/index.html` to `/index.html`
  - Set `<base href="https://henrybuilt.github.io/react-sticky-table/">` in `<head>` tag
  - Set `<title>React Sticky Table</title>` in `<head>` tag
  - Prepend both the css and js links to the built files with `build` so they look like `href="build/static/..` and are relative paths so they adhere to the `<base>` tag.
