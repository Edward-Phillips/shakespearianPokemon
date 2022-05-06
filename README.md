# Shakespearian Pokemon
## How to use

To run this project you will need [npm and nodeJS](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [docker](https://docs.docker.com/get-started/), and [git](https://git-scm.com/).

first, checkout the repository:

```
git clone https://github.com/Edward-Phillips/shakespearianPokemon.git
```

then, install the dependencies:

```
npm install
```

then, you can run the project in development mode:

```
npm run dev
```

or you can run the project in production mode:

```
npm run build && npm run start
```

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. you will need to set your environmental variables to configure your api url, database urls and  shakespeare translation key if you have one.
1. Build your container: `docker build -t shakespearianpokemon .`.
1. Run your container: `docker run -p 3000:3000 shakespearianpokemon`.

You can view your images created with `docker images`.
## Running Locally

First, you will want to configure your database 
- I have used mysql, but if you want to change that you can edit in the schema.prisma file.
You will need 2 environmental variables, one to your DATABASE_URL and one to to your SHADOW_DATABASE_URL, both of which you will need to set in the .env and on deployment.
To do this you need to run the following command:

``` prisma migrate dev```


This will run the migrations for your database.

Then you will need to configure youre environment variables. There are 4 environment variables to set, but only 3 are required.
 - FUNTRANSLATIONS_API_SECRET - this key is optional, but without it the api is limited to 5 calls an hour.
  - POKEAPI_ADDRESS - this is the address of the backend that will be answering your requests, http://localhost:3000/api/pokemon/ works for development.
  - DATABASE_URL - prisma database urls - mysql is currently a requirement
  - SHADOW_DATABASE_URL - prisma database urls - mysql is currently a requirement

```bash
npm run dev
# or
yarn dev
```

this will run both the pokemon API and the  frontend in development mode.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
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
- successfully configure docker-compose up to have the database running and talking to the API.
- improve victory screen
- add cookies to start tracking stats
- refactor success logic to lift state out of cell components and into gridRow component or even whoIsthatPokemon component for ease of sharing state to scoreModal component.
- refactor database code to use any database type.