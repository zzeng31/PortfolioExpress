# PortfolioExpress 1.0

> A Social network app for developers

It is a simple social network app that includes user authentication, profiles and forum posts.

### Try the demo here

[Demo](https://portfoliosexpress.herokuapp.com)

# Quick Start

### Add a default.json file in config folder with the following

```json
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

### Build for production

```bash
cd client
npm run build
```

### About

This is a MERN full stack project built from course: [Udemy](https://www.udemy.com/mern-stack-front-to-back/?couponCode=TRAVERSYMEDIA) with modified theme
