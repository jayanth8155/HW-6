# Creating an API with MEN (MongoDB, Express, and Node.js)

## Introduction

### First off, what is "Node.js?"

[Node.js](https://nodejs.org/en/about) is a runtime for the JavaScript language. The traditional use of JavaScript was for creating interactivity in web pages, but Node allows us to build servers using JavaScript as well. This means that JavaScript has become somewhat of a "universal language," and can be used to design both the frontend and backend of our web pages. For today however, we will only focus on implementing the backend in the form of an API.

### What is "Express?"

[Express](https://expressjs.com/) is a framework that we use in our Node app to create routes for our API and create middleware (easier means of interacting with the system we have designed). Since we have already used MongoDB to create a simple server, let's continue on to the process of backend development.

## Getting Started

### Installing Node.js and Node Package Manager

You can install Node.js and NPM through the website mentioned earlier, but I personally would recommend using [Node Version Manager](https://github.com/nvm-sh/nvm). It's a tool that allows you to easily install and manage different versions of Node.js and NPM through a single installer, and I find it helps you avoid a lot of the mistakes you can make when trying to install a fresh copy of Node. It's a pretty intuitive process, but if you need help, [here's a guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

### Wait... What is "NPM?"

Node Package Manager is a program that we run in our terminal which allows us to manage a node project. We need it to install the packages, dependencies and frameworks required to complete our project (including Express). Ensure that you've installed Node and NPM correctly by opening a terminal by using the commands `node -v` and `npm -v`. You should see the latest version of Node and NPM that you installed.

### Creating the Project

First we have to create the directory for our Node app. Since this is just a tutorial for creating an API, maybe you could call it something like "Node API." Open the folder you just created using VS Code (or whatever IDE you chose to install earlier in the class). Open a new terminal and change your current directory to the directory that we just created (VS Code allows you to open a terminal by pressing
CTRL + SHIFT + ~). Then, use the command `npm init -y` to initialize a Node.js project in the directory. The '-y' flag confirms that we want to use all of the default configurations. If you inspect the contents of the current directory, you will notice a new file called "package.json" has been created. This file contains all of the configuration you project will use: metadata, dependencies, custom scripts, etc.

### Installing the Dependencies

There are several packages we want to include in our project in our project: one is required for functionality, and the others are useful tools for the development of our project. You can install a package by opening your terminal and typing `npm install [package name]` (keep in mind that package names must be all lowercase with no spaces).

The first package we want to install is Express: the framework mentioned earlier (package name is 'express'). Since I explained it before, we'll just move on to the next package.

The second is called Nodemon (package name is 'nodemon'). Rather than restarting our server every time we want to see the changes we coded, Nodemon automatically does this for us, saving us a lot of time.

The third package is called Mongoose (package name is 'mongoose'), and it allows us to more easily interact with our MongoDB database by simplifying the creation process for schemas, among other functions.

After installing all of the packages using the npm command indicated above, your package.json file should look like this:

```json
{
  "name": "node-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "nodemon": "^3.0.1"
  }
}
```

If your file doesn't look like this, then you made a mistake when attempting to install the dependencies. Remember that to install a package, the command is `npm install`and then the name
of the package you want to install. If you want to install all of the packages we will use with one command, use `npm install express nodemon mongoose`.

## Creating a Server

### The Server File

First we have to create a file that will manage the backend functions of our server: essentially, this is how an API is born. Create the file in the root of your directory, that is,
in the same location
as your package.json and package-lock.json files. I would recommend naming it something intuitive like "server.js."

### Using Express

To include any package in your javascript file, you have to use the keyword `require`. As such, if we want to use the Express package, we need a way to interact with the functions of the Express package. We can do this by writing the following line:

```javascript
const express = require("express");
```

The constant `express` we just created gives us the ability to call any function we like from the Express package. \
The first function we will need to call is the constructor, which will create an instance of an express application which we can use to route users to API endpoint. We will also need to establish a port on which we will run the server. Here's how this is done:

```javascript
const app = express();
const port = 3000;
```

Now we have created an instance of the express application called "app." We will invoke all of the functions from this instance, so get ready to see the word "app" a lot. \
To ensure that everything has been done correctly up to this point, let's write a quick test route. This might seem complicated, but it really isn't. Let's briefly break it down.:

```javascript
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Example app listening on port ${port}");
});
```

`app.get()` is a call to the "get" function of our application. This is one of the major functions of an API which allows us to retrieve response information from our endpoint. In this case, "/" is the root of our server URL (this is our enpoint) and 'Hello World!' is the response we are sending (notice how we call `res.send()` inside of our function). \
Similarly, `app.listen()` is calling a function of our application, but this time, it's an instruction for our app to make a connection to the port we established earlier, which should be 3000. This means that, after we run our server, we should be able to access our server from the address "localhost:3000." The `console.log()` function allows us to confirm that we directed to port 3000 correctly by notifying us through the browser's console.

In your terminal, run the following command:

```
node server.js
```

This will start the server on port 3000. Congratulations, you just created your first API! Notice how your terminal now will no longer accept input. You can end the server by pressing CTRL + C if you're using Windows or Linux, and CMD + C if you're using Mac, and you will regain the ability to enter commands.

## Creating API Routes

You might be thinking "wait, didn't we already create an API route?" Yes, we already did create one GET request, but if you'll recall from the previous MongoDB assignment, APIs utilize several other requests as well: POST, PATCH and DELETE. Rather than putting all of our requests in the server file, the best practice is to modularize the functions into several files. First, let's create a new directory inside of our root folder, and call it "routes."

The MongoDB assignment asked you to create a database filled with information about a sports team you have an interest in. You could use this assignment as an extension of that previous one. For my example, I'll be creating an API relating to information about the players of the Green Bay Packers: Wisconsin's beloved American football team.

Within my routes folder, I'm going to create a file to hold the data for all of the different playable classes, called "players." You might also want to call yours "players" if you're going to extend your sports project. Within this file, we want to write these lines:

```javascript
const express = require("express");
const router = express.Router();
```

This will create an instance of the express router, which will be the way that we get users to their desired endpoints.

Next, we need to create the routes. It's easiest to begin with a GET request that doesn't require any user input. The way this is done is very similar to what we did before, only this time we're now having our router object send the response:

```javascript
router.get("/", (req, res) => {
  res.send("sending all players");
});
```

Notice how the endpoint of the GET request is just forward slash (/). What if we wanted to send alternative responses from different endpoints? Try something like this:

```javascript
router.get("/1", (req, res) => {
  res.send("sending player 1");
});
```

Finally, we need to export all of the routes we just created so that they can be used by the server. Write this at the end of the route file:

```javascript
module.exports = router;
```

Now let's verify that both of our GET requests work properly. Back in our "server.js" file, we need to include another dependency: since we have the file located locally, we need to include the filepath of our routing file. Put this near the top of your server file:

```javascript
const playerRoutes = require("./routes/players");
```

The "." means go up a directory (into our project root), and then we descend into our routes folder and include the particular route file from that directory. \
Now we need a way to interact with the routes we just created. The way we do this is by creating middleware between the server and the router:

```javascript
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/players", playerRoutes);
```

Here's what all of this means:

- The first function allows us to parse the JSON from a request
- The function following is global middleware which logs each request sent by a user.
- The last function allows us to interact with the player routes we just created using the URI `localhost:3000/api/players`.

If you now visit `localhost:3000` in your web browser, there is nothing there. This is because we have changed the endpoint of the primary GET route to be `localhost:3000/api/players`,
and the "get 1" endpoint we created is now located at `localhost:3000/api/players/1`. GET is the most basic functionality of any API, but we will have to make new endpoints if we want to create, update, and delete objects. The GET functions we created are just examples, and we will be deleting them later and replacing them with more relevant endpoints later.

## Linking to a MongoDB database

First, get the MongoDB database you created previously up and running. Then, once you've activated it, we have to make a few changes to our server.js file in order to interact with it.
We need to include Mongoose as a depenency just like we did for Express. Near the top of your server file, add this line: `const mongoose = require('mongoose')`

Then, add these lines before your app.listen() line:

```javascript
mongoose
  .connect("mongodb://localhost:{port}/{db name}")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Example app listening on port" + port);
    });
  })
  .catch((err) => console.error("Failed to connect", err));
```

Delete the app.listen() function below, since we have now moved it to a more appropriate place.
Replace the {port} with whatever port your database is running on, and replace {db name} with whatever your database was named. For example, here is the above first line after replacing the values with my own. Yours should look similar to this:

```javascript
mongoose.connect("mongodb://localhost:27017/Packers");
```

What does this code do? The first line is pretty obvious: it uses mongoose as a way to connect the server to the database. If the connection is a success, then we inform the terminal of the success, and then begin listening on the predefined port. Otherwise, we catch the outgoing error and report it in the terminal.

## Schemas and Modeling

Now we have to create a schema for our data. This will be a safeguard against mistakes when trying to enter data into or get data from our database. Back in the root forlder, create another folder called "models," and inside of it create a file called "playerModel.js."

Since we will be interacting with our database, we need to require mongoose at the beginning of the playerModel.js file, just like we did inside the server.js file. We will also want to utilize the constructor function for a Schema type, so following your require statement, write `const Schema = mongoose.Schema`.

The purpose of a schema is to provide a predictable structure upon which all objects of a given type will be based. It looks a lot like JSON, and it's pretty easy to write. For my example, this is how I'll be creating a schema called "playerSchema:"

```javascript
const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
});
```

As you can see, a player has these three attributes: a name, a uniform number, and a position. Each of these is characterized by an explicit type (String, Number, and String respectively), and all of them are required attributes because I think they're pretty important qualities.

A schema defines the structure of a document within a database, but we need to create a model to interact with the "players" collection within our database. The schema we just created will serve as the core of our model. To create a model based on our schema, we use the following line: `module.exports = mongoose.model('Player', playerSchema)`. We can now use our newly created Player model to interact with the Players collection within other files in our backend.

## Creating API Routes (continued)

Now that we have a Player model to work with, let's go back to our Routes file to implement more API endpoints. At the top of the player.js file, just after we call the constructor for router, let's include our newly created Player model by writing: `const Player = require('../models/playerModel.js')`. We will also want to include mongoose the same way we did previously, since we will want to use one of its functions later. I think it's better to start fresh here, so let's delete the example GET functions we previously created. I promise we will be making something much better. That said, your players.js file should look something like this now:

```javascript
const express = require("express");
const router = express.Router();
const Player = require("../models/playerModel");
const mongoose = require("mongoose");

module.exports = router;
```

Now let's create some fresh API routes. We need functionality to create, read, update, and delete content through the API. Each of these core functions is associated with a different type of command: POST, GET, PATCH, and DELETE. Let's first create a POST function. An API route has two main elements: a request and a response (usually called 'req' and 'res'). The request is data passed to the API by the user, and the response is what the API delivers back the the user when it is called.

If we want to create a POST function, we would probably write something like this (make sure it is before the `module.exports` line):

```javascript
// POST a new player
router.post("/", async (req, res) => {
  const { name, number, position } = req.body;
  try {
    const player = await Player.create({ name, number, position });
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

Let's break down how this function works:

- the "async" attribute allows us to call the function on the basis of promise. This is followed-up by the word "await," and a ".create()" function. Essentially how this works is we promise that the function will eventually create a Player with the attributes from the request body, and this promise will be fulfilled through the calling of ".create()" from Player.
- The "try... catch" clause is an error handler. If our POST is unsuccessful, it will throw an error instead of crashing.
- The code for a success is 200 (hence "res.status(200)), and likewise the code for this kind of error is 400.

Let's attempt a POST using our new API route. For this, we'll need some way to interact with our API. My preference is an application called [Postman](https://www.postman.com/downloads/). There's a web version, but I've had problems in the past trying to interact with my localhost, so I would recommend downloading the desktop application. You'll have to create an account, but it is free.

Once you have Postman open, make sure your database and backend server are both running. Then, click the "Plus" (+) button to create a new request. Next, change the request type to POST, and enter the URL used to access the server \
(It should be http://localhost:3000/api/players).

Right underneath the URL prompt, there should be some options including "Params, Authorization, Headers," etc. Choose the option that says "Body," as this will be the body of the POST requst that we'll be sending. Beneath that, you should see some options including "none, form-data" etc. Click the option that says "raw." To the right of these options should be a dropdown menu that includes options such as "Text, Javascript, JSON," etc. Click JSON, since we will be using JSON to form the body of our request.

Now let's create a new document within our database! As we defined in the Player schema previously, a player document needs these three components: a name, a number, and a position. Using JSON (JavaScript Object Notation), I'm going to represent the Packers' quarterback [Jordan Love](https://en.wikipedia.org/wiki/Jordan_Love) by typing this into the Postman request body prompt:

```json
{
  "name": "Jordan Love",
  "number": 10,
  "position": "quarterback"
}
```

If you did everything right, you should have confirmation JSON below the prompt box which contains all of the information we entered, plus two additional fields: "\_id" and "\_\_v." The first field is the unique 12-byte identification code representing in hexadecimal which assigned to every document within a collection, and the second field indicates the version of a document. It's automatically added by Mongoose as a means to prevent conflicts between concurrent updates. Good job! We've successfully integrated POST functionality in our database! Let's take care of everything else while we're at it... Remember, all of these requests will be contained within our players.js file before the line that says "module.exports":

```javascript
// GET all players
router.get("/", async (req, res) => {
  const players = await Player.find();
  res.status(200).json(players);
});

// GET a single player
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Player does not exist." });
  }
  const player = await Player.findById(id);
  if (!player) {
    return res.status(404).json({ error: "Player does not exist." });
  }
  res.status(200).json(player);
});

// PATCH a single player's information
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Player does not exist." });
  }
  const player = await Player.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!player) {
    return res.status(404).json({ error: "Player does not exist." });
  }
  res.status(200).json(player);
});

// DELETE a single player
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Player does not exist." });
  }
  const player = await Player.findOneAndDelete({ _id: id });
  if (!player) {
    return res.status(404).json({ error: "Player does not exist." });
  }
  res.status(200).json(player);
});
```

As you can see, there are some safeguards put into place for the GET one, PATCH, and DELETE functions which prevent requests for an invalid ID or player. This will prevent the user from accidentaly (or purposely) causing the server to crash. And with that complete, you have successfully created an API using MongoDB, Express and Node.js, so congratulations! The only other thing we need for a complete implementation of fullstack development is a frontend. For the next and final tutorial, we will be creating said frontend using a library called React.
