

## Project setup

## Clone the repository
```bash 
git clone https://github.com/Eun424/NestJS--Mini-Processing--App.git
cd order-system


```
##  Install Dependencies
```bash 
npm install


 ``` 
 ## Set up PostgreSQL database 
 CREATE DATABASE orders_db;

 ### Run Migrations 
 ```bash
 npx typeorm migration:run -d src/config/data-source.ts
 
```

## Compile and run the project

```bash
# development
$ npm run start:dev

# watch mode
$ npm run start:dev




