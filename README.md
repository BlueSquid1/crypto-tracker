# CryptoTracker

## Dependancies
- NPM long term support version. Can be installed with `npm install -g n` and then `n lts`
- TypeScript. Can be installed with `npm install -g typescript`
- Angular. Can be installed with `npm install -g @angular/cli`
- Nodemon. Script that restarts the node application whenever a code change occurs. Can be installed with `npm install -g nodemon`
- Concurrently. A tool that can run multiple npm processes in the same terminal. Can be installed with `npm install -g concurrently`
- Docker. Lite weight virtual machine packages for programs. Can be downloaded from here: https://www.docker.com/products/docker-desktop

## Inspiration for repository layout

setup a MEAN server:
https://dev.to/jsheridanwells/a-modern-mean-stack-with-angular-and-typescript-part-1-242a


Setup mongo DB:
https://www.bmc.com/blogs/mongodb-docker-container/

## Useful tips
can connect to mongo DB docker container by running the command `docker exec -it mongodb bash`

Check health of docker images by running: `docker ps -a`

See logs of a docker image by running: `docker logs mongodb`

## Development server

Run `npm run dev` for a dev server. Then navigate to `http://localhost:3000/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).