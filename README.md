# GroupProject4770

This is Eric Roy Elli's for of the repository for Group #3 in CS 4770 for the Winter semester of 2017-18.

See the Wiki for the [Game Design](https://github.com/markwindsorr/CS4770/wiki/Game-Design-Document), [Software Requirements](https://github.com/markwindsorr/CS4770/wiki/Software-Requirements-Document), [Architecture](https://github.com/markwindsorr/CS4770/wiki/Architecture-Document) and [Corrections documents](https://github.com/markwindsorr/CS4770/wiki/Documentation-Corrections). The [Gameplay instructions](https://github.com/markwindsorr/CS4770/wiki/Gameplay-Instructions) can also be found on the wiki.

# Instructions: 

###### Install MongoDB on [https://www.mongodb.com/download-center#atlas](https://www.mongodb.com/download-center#atlas)

###### Install NodeJS on [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

In the terminal, change directory to the gameCode folder and type:

> npm install express

> npm install socket.io


###### Go to the downloaded file for MongoDB and open the mongod.exe file.

 ###### To start the Server, in the terminal change directory to the gameCode folder and type: 
 
 > node server.js
 
 > Then on your browser, go to : localhost:2000

Nodemon will automatically restart the node application when changes are made, it can be installed from the terminal and works globally, type: npm install -g nodemon

After installing nodemon you can start the server as outlined above by using the command "nodemon server.js" instead of "node server.js"
