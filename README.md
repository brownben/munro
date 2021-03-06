<div align="center">
<img height="120px" src="./frontend/src/assets/images/MunroLogo.png" />

# Munro

## League Results. Sorted.

[![license - MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](https://github.com/brownben/munro/blob/master/LICENSE.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![](https://img.shields.io/github/workflow/status/brownben/munro/CI?style=flat-square)

[munroleagues.com](https://munroleagues.com)

</div>

Munro is a Sports League Results Calculator, it takes the resultsfiles from a series of events and produces overall ranking tables. Originally Created by Ben Brown for his local Orienteering League as part of his Advanced Higher Computing Project.

Munro is designed to be as easy to use as possible providing all the features and information you need, whilst making it fast and simple to view the results; with multiple options to sort and filter them. It supports multiple file formats for upload and several different scoring systems, making the process as quick and stress free as possible for event organisers. Once logged in administrators can update all the league and event details. Designed and created based off Orienteers feedback from what they wanted from the system.

I have written more about Munro's features, and why I created it on my [blog.](https://benbrown.dev/posts/introducing-munro-leagues.html)

Munro is a Single Page VueJS App with a RESTful style Python Flask API and authentication using Firebase.

For any help or enquires please email munro.leagues(a)gmail.com or add an issue on Github

## Frontend

```bash
cd frontend

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# lint and fix styles and javascript
npm run lint

# check javascript and styles match rules
npm run check

# run all jest unit tests
npm test

# build for production with minification
npm run build

```

## Backend

```bash
cd backend

# set up virtual enviroment
py -m venv ./.venv

# run virtual enviroment
.\.venv\Scripts\activate.bat

# install dependancies
pip install -r requirements.txt

# set enviroment variables (for development, ignore if running pre-built frontend)
set FLASK_ENV=development
set FLASK_DEBUG=1
set DATABASE_URL=<database-url>

# run on all interfaces, defaults to port 5000
flask run --host=0.0.0.0

# lint with black
black . --check --line-length 88

# typecheck
mypy ../backend

# run tests and generate coverage
coverage run -m pytest && coverage report -m && coverage html -d tests/coverage

```
