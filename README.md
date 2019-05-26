<img height="150px" src="./frontend/src/assets/images/MunroLogo.png" />

# Munro

### Fast and Easy Results for Orienteering Leagues

Live at: munro-leagues.herokuapp.com

Originally created as part of my Advanced Higher Computing project, Munro is a Single Page VueJS App with a RESTful style Python Flask API and authentication using Firebase. Munro calculates and displays the results for a league of Orienteering events, with options to search and sort the results. It also allows the league administrator to login and update all the details for the league and upload the results file for processing. Designed and created based off Orienteers feedback from what they wanted from the system.

For any help or enquires please email munro.leagues(a)gmail.com or add an issue on Github

## Frontend

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

## Backend

```bash
cd backend

# run virtual enviroment
.\venv\Scripts\activate.bat

# install dependancies
pip install -r requirements.txt

# set enviroment variables (for development, ignore if running pre-built frontend)
set FLASK_ENV=development
set FLASK_DEBUG=1
set DATABASE_URL=<database-url>

# run on all interfaces, defaults to port 5000
flask run --host=0.0.0.0

# run unit tests
pytest --cov-report term-missing --cov=. -vv
```
