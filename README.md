## Initializing the `package.json` file

```javascript
npm init -y
```

## Install the dependencies

```javascript
npm i -D typescript ts-node nodemon
```

## Create a `tsconfig.json` file

```javascript
npx tsc --init
```

Note: add `["include": ["src/**/*"]]` line to the tsconfig.json file

# Create a `nodemon.json` file and add the following lines

```javascript
{
    "watch": ["src"],
    "ext": ".ts,.js",
    "exec": "ts-node ./src/index.ts"
}
```

# Create a src folder

```bash
mkdir src
```

# Create a `index.ts` file inside the `src` folder

# Add the following lines to the `package.json` file

```javascript
"scripts": {
    "start": "nodemon"
}
```

# Install the following dependencies

```bash
npm i express cors dotenv mongoose cookie-parser compression body-parser
```

# Install the following dev dependencies

```bash
npm i -D @types/express @types/cors @types/cookie-parser @types/compression @types/body-parser
```

# Create a `.env` file and add the following lines

```bash
PORT=5000
MONGO_URL=<get_the_URL_from_mongodb_account>
```

You can get the URL from the mongodb account. Create a new project and get the URL from there.

# Put the following lines to the `index.ts` file

```javascript
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}/`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL || '');
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});
```

This will create a server and connect to the mongodb database.

# Configuring the `eslint` for the project (optional)

```bash
npm init @eslint/config
```

After then, select the necessary options. Finally, some dependencies will be installed and the `.eslint.js` file will be created.

Add the following lines to the `.eslint.js` file. It will disable some errors.

```javascript
    "rules": {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "off",
    }
```

# Run the following command to start the server

```bash
npm start
```

# Now, the server is running on the port 5000. You can check it by going to the browser and typing `http://localhost:5000/`

Develop the project as you want. Happy coding!