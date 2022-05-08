# Shakespearian Pokemon
## How to use

To run this project you will need [npm and nodeJS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [docker](https://docs.docker.com/get-started/), and [git](https://git-scm.com/).

It is recommended to use docker with the database profile for a quick and easy setup.

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) on your machine.
The environmental variables are set in the 'docker.env.' file, if you have a funtranslation api key, set it there under FUNTRANSLATIONS_API_SECRET. If you are using an external pokemon api, update the POKEAPI_ADDRESS variable.

```
git clone https://github.com/Edward-Phillips/shakespearianPokemon.git
```
1. you can run the docker container with just the node app using an external database by running:
```
docker-compose up -d
```

1. if you wanted to spin up a database locally for the app seeded with some data to avoid making too many api calls you can run:
```
docker-compose --profile database up --build -d
```
This runs the mysql_db service in the docker-compose.yml file. Be sure that your docker_database urls point at mysql_db and not local host as they are networking within the container.

## Running the app without docker

first, checkout the repository:

```
git clone https://github.com/Edward-Phillips/shakespearianPokemon.git
```

then, install the dependencies:

```
npm install
```
You will need to configure the environmental variables in an .env file as in the .env.example file, except docker_database urls will not be required.
on first time setup of the database you will need to run the following prisma command to create the database from the schema and also generate the prisma client:
```
npx prisma migrate dev
```

then, you can run the project in development mode:

```
npm run dev
```

or you can run the project in production mode:

```
npm run build && npm run start
```

## Deployment

I have used vercel to deploy this application, if you would like to do the same you can follow the instructions here: https://nextjs.org/docs/deployment

You can configure vercel to deploy on push to the main branch of your project if [using github](https://vercel.com/docs/concepts/git/vercel-for-github). This requires giving vercel access to your github repository. If following this method you will be have the option to include environmental variables for the deployment. This project uses 4 variables: 
- the DATABASE_URL  & SHADOW_DATABASE_URL env varibles
- an API key to funnytranslations if you have one (not required) stored under FUNTRANSLATIONS_API_SECRET
- the url to the API for the frontend in case you would like the frontend to point to a pre-existing shakespearian pokemon API.


## current objectives:

Who is that Pokemon objectives:
- submit bug = seems to be submitting when delete is pressed and all the inputs are full
- restyle to more closely match Wordle
- improve victory screen
- add cookies to start tracking stats
- refactor success logic to lift state out of cell components and into gridRow component or even whoIsthatPokemon component for ease of sharing state to scoreModal component.
- add try catch to db query to handle invalid database details, but not to block request entirely.
- drop shakespearian search and switch to pokedex search, based on pokemon seen in the who's that pokemon game. -- requires cookie consent or user sign up to track pokedex performance