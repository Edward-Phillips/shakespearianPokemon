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
1. Build your container: `docker build -t shakespearianPokemon .`.
1. Run your container: `docker run -p 3000:3000 shakespearianPokemon`.
1. unfortunately the docker container does not handle fetchErrors well despite them being contained in a try/catch block. Due to time constraints this was not resolved. - Fortunately the frontend uses validation to avoid malformed requests being sent to the back end.

You can view your images created with `docker images`.
## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

this will run both the pokemon API and the  frontend in development mode.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## Deployment

I have used vercel to deploy this application, if you would like to do the same you can follow the instructions here: https://nextjs.org/docs/deployment

You can configure vercel to deploy on push to the main branch of your project if [using github](https://vercel.com/docs/concepts/git/vercel-for-github). This requires giving vercel access to your github repository. If following this method you will be have the option to include environmental variables for the deployment. This project uses 2 variables: an API key to funnytranslations if you have one (not required) and the url to the API for the frontend in case you would like the frontend to point to a pre-existing shakespearian pokemon API.

## Feature wishlist
There are some additional features I would like to add.
 - long term caching
    - currently the API stores the cache data in memory, in theory due to the largely static nature of both external APIs it would be possible to entirely remove the use of the external apis and fetch the data from our own database.
    - a step in this direction would be to decouple the model from the API and use a database class to handle the data requests, as it would make it easier to change data sources.
 - Better error handling.
   - this has now been resolved, the dockerfile has also been updated to handle fetch errors.
 - The idea is to encourage engagement with pokemon in young children, so a guess that pokemon game mode is a must.
