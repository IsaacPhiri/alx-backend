# 0x03-queuing_system_in_js
## Learning Objectives
### General
* How to run a Redis server on your machine
* How to run simple operations with the Redis client
* How to use a Redis client with Node JS for basic operations
* How to store hash values in Redis
* How to deal with async operations with Redis
* How to use Kue as a queue system
* How to build a basic Express app interacting with a Redis server
* How to the build a basic Express app interacting with a Redis server and queue
## Requirements
### General
* All your files will be interpreted/compiled on Ubuntu 18.04 LTS using node (version 12.x.x)
* All your files should end with a new line
* A README.md file, at the root of the folder of the project, is mandatory
* Your code should use the js extension
* Your code will be tested using Jest and the command npm run test
* Your code will be verified against lint using ESLint
* Your code needs to pass all the tests and lint. You can verify the entire project running npm run full-test
* All your functions must be exported
## Setup
### Install NodeJS 12.11.x
(in your home directory):
```bash
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs
```
```bash
$ nodejs -v
v12.11.1
$ npm -v
6.11.3
```
### Install Redis 5.0.x
```bash
$ wget https://download.redis.io/releases/redis-5.0.7.tar.gz
$ tar xzf redis-5.0.7.tar.gz
$ cd redis-5.0.7
$ make
$ sudo make install
```
### Install Packages
```bash
$ npm install
```
## Run Redis Server
```bash
$ redis-server
```