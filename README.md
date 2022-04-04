# pratilipi-microservices

This application contains microservices: 
1. Content Service
2. Users & Dailly-Pass Services
Each microservice have their separate own database.
An API Gateway is used for the communication between these microservices, which passes the request from one microservice to another acting as a proxy.
App is dockerised using docker-compose.

![Backend APIs Communication Diagram](https://user-images.githubusercontent.com/62262069/161607842-60821dec-2134-482b-be2d-425840af4479.jpg)


## Tech Stack Used
* Nodejs
* Express
* MongoDB

## Steps to run the app
* Clone the repo.
* Run `docker-compose build` command
* Run `docker-compose up` command
* Both services & API gateway started.  
* Can check `http://localhost:3000/api-docs` to see the API documentation.
