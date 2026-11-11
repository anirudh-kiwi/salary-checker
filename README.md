# Kiwi pages

Static pages hosted on Vercel. Each page lives in its own folder and is served at `/<folder>/`.

| Path | What it is |
|---|---|
| `salary-check/index.html` | Salary Check page (HTML, CSS, JavaScript and salary model in one file) |
| `salary-check/config.js` | Settings for Salary Check: share URL, submission endpoint, Meta Pixel ID and events |
| `backend/google-sheets-endpoint.gs` | Optional Google Apps Script that saves each submission to a Google Sheet |

To add a page, create a new folder with its own `index.html`.
