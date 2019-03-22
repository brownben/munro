# Munro

> Fast and Easy Results for Orienteering Leagues

My Advanced Higher Computing Project, a dynamic SPA which calculates the results for a league of orienteering events and allows sorting and filtering of results. Interacts with a backend API made with Flask to manage authentication and the database

## Frontend Build Setup

``` bash
cd frontend

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# lint stylus and javascript
npm run lint

# lint js
npm run lint-js

# lint javascript and fix
npm run lint-js-fix

# lint stylus
npm run lint-styles

# run all jest unit tests
npm test
```

## Run Backend for Development

```bash
cd backend

# run virtual enviroment
.\venv\Scripts\activate.bat

# install dependancies
pip install -r requirements.txt

# set enviroment variables (for development, ignore if running pre-built frontend)
set FLASK_ENV=development
set FLASK_DEBUG=1

# run on all interfaces, defaults to port 5000
flask run --host=0.0.0.0

# run unit tests
pytest --cov-report term-missing --cov=. -vv
```
