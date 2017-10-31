

interface PageConfig {
  [key: string]: {
    path: string,
    file: string,
  }
}

export const pages: PageConfig =
{
  "index": {
    "path": "/",
    "file": "index.html"
  },
  "help-cookies": {
    "path": "help/cookies",
    "file": "help/cookies.html"
  }
}
