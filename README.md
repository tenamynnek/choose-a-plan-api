# Assumption

- You have `docker` [installed](https://docs.docker.com/)
- You have `docker-compose` [installed](https://docs.docker.com/compose/install)

# How to use

### Starting API server with MySQL

- go into working directory,
- run `docker-compose up`

### API Doc

- <http://localhost:3000/swagger>

### Runing Test case

- run `docker exec -it api yarn test`

### Adding New Plan

- run the following command
- you can change the serviceId to 1,2,3
- `curl --location --request POST 'http://localhost:3000/plans' \ --header 'Content-Type: application/json' \ --data-raw '{ "name": "New Plan", "price": 99, "serviceId": [1,2] }'`
