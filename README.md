# Assumption

- You have `docker` [installed](https://docs.docker.com/)
- You have `docker-compose` [installed](https://docs.docker.com/compose/install)

# How to use

### Starting API server with MySQL

* go to the working directory, 
* run `docker-compose up`

### After you started the API server successfully

##### API Doc

* <http://localhost:3000/swagger>

##### Runing Test case

- run `docker exec -it api yarn test`