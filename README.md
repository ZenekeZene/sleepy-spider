[![Netlify Status](https://api.netlify.com/api/v1/badges/bb333221-55ae-4260-bbe8-5ae3b1980d7a/deploy-status)](https://app.netlify.com/sites/sleepy-spider/deploys)
[![Unit tests](https://github.com/sleepy-spider/sleepy-spider/actions/workflows/test-unit.yml/badge.svg?branch=main&event=push)](https://github.com/sleepy-spider/sleepy-spider/actions/workflows/test-unit.yml)
[![E2E Tests](https://github.com/sleepy-spider/sleepy-spider/actions/workflows/playwright.yml/badge.svg?branch=main&event=push)](https://github.com/sleepy-spider/sleepy-spider/actions/workflows/playwright.yml)


# SLEEPY SPIDER

### Oh, no! Sleepy has fallen into a deep sleep!
It's a game half clicker, half quiz. You have to achieve the highest possible score within a one-minute time limit.

<img src="https://lh3.googleusercontent.com/u/0/drive-viewer/AITFw-xHDdKQLDunpAfDBTZBiucFTW_s8HlQuElQVRPmn87gvQ3uz08Ia-kIffwuezWIIpSfTiN92OfWt1Dq1JPbeJWN_qWPfw=w3024-h1656" width="200">

<br />
<br />

# 🎮 How to play

Visit: https://sleepy.zenekezene.com.

### Instructions to play

- Tap as many times in a minute to help Sleepy wake up.
- Answer questions correctly to get bonus points.
- Challenge your friends and try to be the best. You can login with your Twitter account.

<br />
<br />

---

# 💻 Only for developers

## 🌱 Installation

### Prerequisites
- ***NVM installed***. You can follow the next instructions: (https://github.com/nvm-sh/nvm#installing-and-updating).
- ***Node v18 or higher***. If you had installed NVM, you can switch your Node version with:
  ```
  $ nvm use 18
  ```
  You can view your current node version with:
  ```
  $ node -v
  ```

### How install
The ***all-in-one*** script to install and launch in development mode is defined <a href="#all-in-one-script-included-installation">below</a>. But you can install front and back separately:
  ```
  $ cd front
  $ npm install

  $ cd ../back
  $ npm install
  ```

## 🚀 Getting started

### Development mode
#### All-in-one script (included installation)
To launch the dev mode, you can launch the all-in-one script called 'wakeup.sh'.
This script launches the front and back projects together.
```
$ ./wakeup.sh
```

#### Separately
You can launch back and front separately.
  ```
  $ cd front
  $ npm run dev

  $ cd ../back
  $ npm run start
  ```

#### View the project
Finally, you can open the frontend with your browser: `localhost:8000`.
The backend will be listening in `localhost:3000`.

---

## Production mode

### Front:
```
$ cd front
$ npm run build
```

### Library:
```
$ cd lib
$ npm run build
```
Note: You may want to publish a new version of the package (in <a href="https://docs.npmjs.com/cli/v8/using-npm/registry">npm public registry</a>) and then install it in the front dependencies.
```
$ npm version X.X.X
$ npm publish
```

### Back:
Build process is not necessary. Only deploy the last version of back on your favorite server.
We uses <a href="https://railway.app/">Railway</a> but you can use whatever.

#### Different environments
There are more instructions to generate differente API environment inside the subfolder [/back/README.md](./back/README.md).

#### API URL
https://css-api.up.railway.app/api/v1/questions

# 🛣️ Roadmap
Some next steps to include:

- Weekly challenges and gifts.
- Landing page.
- Replay game without reload.
- Legal notes.
- Night mode.

You can view the roadmap visiting this link: [Sleepy Spider, the pet project](https://zeneke.notion.site/Ara-a-b00b9e23adc445108bbe3744acfdf275).

# 💡 Idea
This project is an experiment to test the capabilities of canvas. It also serves as a challenge to practice using vanilla JS without the need for frameworks like React or Vue.

This project started like almost all of them: with pencil and paper.

<section style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <img src="https://lh3.googleusercontent.com/u/0/drive-viewer/AITFw-zAmdcbynt4mDHnQZCQzxQ9Z79gl2syLLiDtV530-iUPYguRjcg7-4Jf52Ur__IfzmfzHzDafkIExzgltzzXMiOCzOsgw=w3024-h1656" min-width="100" height="auto" max-height="100" alt="Sketch one" />
  <img src="https://lh3.googleusercontent.com/u/0/drive-viewer/AITFw-yF_8ngZRvqRLGhoW4Uj4cFOj-z0RBgLyBeIxC-_Rizo_UjkhRWbQ0-cp7xhhVxJcndHutiavWgc0NSz9XnqNaavC6FRw=w2164-h1656" min-width="200" height="auto" max-height="200" alt="Sketch two" />
</section>

---

# 🗣️ Stay in touch
- [Twitter](https://twitter.com/zenekezene)
- [Instagram](https://instagram.com/zenekezene)
- [Linkedin](https://www.linkedin.com/in/hectorvillarm/)


# Contribution
The main purpose of this repository is to continue learning JS and canvas posibilities. Development of Sleepy Spider happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements.

And you can help donating:

<a href="https://www.buymeacoffee.com/zeneke" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

<br />
<br />

## Contributors

<div style="display: flex; gap: 1rem;">

  <a href="https://github.com/zenekezene" style="display: inline-flex; flex-direction: column; align-items: center;">
    <img style="display: inline; border-radius: 50%; margin-right: 0.5rem;" src="https://github.com/zenekezene.png" width="60px;" alt="Zeneke"/></a>

  <a href="https://github.com/arturobarbaro" style="display: inline-flex; flex-direction: column; align-items: center;">
    <img style="display: inline; border-radius: 50%; margin-right: 0.5rem;" src="https://github.com/arturobarbaro.png" width="60px;" alt="Arturo Barba" /></a>

</div>


---


# License
Sleepy Spider is (WIP).

<img src="https://sleepy.zenekezene.com/sleepy.jpg" alt="Sleepy Spider" width="200" style="border-radius: 10px"/>

Copyright (c) 2022-present.
