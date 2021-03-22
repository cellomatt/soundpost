


**Soundpost** is an app for music students to book lessons with their teachers, track their practice statistics, and access their practice assignments all in one place. Logged in students can quickly and easily choose lesson times from their teacher's availability, and upcoming lessons display directly in their dashboard. To ensure that they are practicing consistently, students can keep a record of which days they practice and look at interactive stats to see how they measure up. Students can also ensure that their practice is effective by viewing current and previous assignments from their teachers. 

### Try the live site <a href=https://soundpost.herokuapp.com/>here</a>. <b>|</b> View the database schema and feature list in the <a href="https://github.com/cellomatt/soundpost/wiki">Wiki</a>.



# Tech Stack
Soundpost uses the following tools, frameworks, and key packages:

### [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) (with [PostgreSQL](https://www.postgresql.org/))
### [Flask](https://flask.palletsprojects.com/en/1.1.x/)
### [React](https://reactjs.org/)
### [Redux](https://react-redux.js.org/)
### [AWS S3](https://aws.amazon.com/s3/)
### [React Nice Dates](https://reactnicedates.hernansartorio.com/)
### [React Circular Progressbar](https://www.npmjs.com/package/react-circular-progressbar)
### [react-modal](https://www.npmjs.com/package/react-modal)
### Hosted on [Heroku](https://www.heroku.com)




## Running Soundpost Locally

1. Clone this repository

   ```bash
   git clone https://github.com/cellomatt/soundpost
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary).
***


