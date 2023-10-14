## Overview

A sample project that demonstrates how a NodeJS REST API can be Dockerized and auto-deployed using GitLab CI/CD. Deployments are handled over SSH.

![Auto Deployment Process](https://taylor.callsen.me/wp-content/uploads/2021/03/GitLab_CI_Deployment_of_Docker_Container-Taylor_Callsen_March_2021.svg)

## NodeJS REST API

### Install Dependencies

Install the dependencies with the following command:

```
nvm use
npm install
```

### Launch Development Server

To run a build and launch the development server, execute:

`npm start`

### Routes

Once completed, the REST API should be avialable at the following routes:

#### GET http://localhost:3000/info

Returns an example JSON response to confirm the API endpoint is accessible.

## Docker

This repo is configured with GitLab CI to build and deploy a docker image whenever changes are commited. The Docker image will be tagged with `latest` as well as the version listed in the `package.json`.

### Image Build and Execution

The Image can be built using the standard `docker build` command. The `docker run` command can be used to launch the container, however network information and environment variables will need to be defined. Please see the how `docker run` is executed in the [gitlab-ci.yaml](https://github.com/tcallsen/node-docker-gitlab-ci/blob/master/.gitlab-ci.yml#L39) as an example.

### Endpoints

Once deployed into a Docker Runtime, the REST API's endpoints will be available on the local machine via:

- {host}:8882/info

## GitLab Deployment

Changes will be deployed automatically to a configured Deployment Server (i.e. server being deployed to). For this to happen, ensure the following CI/CD variables are defined at either the group or project level in GitLab:

- `STAGE_SERVER_IP` - contains the IP address of the Deployment Server. This is the IP address used to make SSH connections from the GitLab Runner.
- `STAGE_SERVER_USER` - contains the user used when opening the SSH session.
- `STAGE_ID_RSA` - SSH private key file used to authenticate when opening the SSH session.

For more information on these variables, see [section 2: Preparing the Staging Server](https://taylor.callsen.me/how-to-dockerize-a-nodejs-app-and-deploy-it-using-gitlab-ci/) on this blog post.

I also ran into issues with DinD (Docker in Docker) during the Docker image builds. Strange things like `cannot connect to the docker daemon`. Ultimate applying this fix to the GitLab Runner worked for me: https://gitlab.com/gitlab-org/gitlab-runner/-/issues/1986#note_20339074

### Docker Debugging

Execute the following command to terminal into the running docker container:

```
docker exec -it node-docker-gitlab-ci /bin/sh
```

## Supplemental Blog Post

Here is a blog post I created that explains this project and the CI/CD process in further detail: [https://taylor.callsen.me/how-to-dockerize-a-nodejs-app-and-deploy-it-using-gitlab-ci/](https://taylor.callsen.me/how-to-dockerize-a-nodejs-app-and-deploy-it-using-gitlab-ci/)