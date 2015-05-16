This sample app is based on TodoMVC framework. 

TodoMVC is a project which offers the same Todo application implemented using MV* concepts in most of the popular JavaScript MV\* frameworks of today.

# ![TodoMVC](media/logo.png)
### [Website](http://todomvc.com)&nbsp;&nbsp;&nbsp;&nbsp;[Blog](http://blog.tastejs.com)&nbsp;&nbsp;&nbsp;&nbsp;[TasteJS](http://tastejs.com)

## Run the app

To get the app running, follow the instructions below:
- Install and run [MongoDB][1] <br/>
	`$ sudo apt-get install mongodb`  
	`$ sudo service mongodb stop`  
	`$ sudo mkdir $HOME/db ; sudo mongod --dbpath $HOME/db --port 80 --fork --logpath /var/tmp/mongodb`  
- Install and run the app <br/>
	`$ git clone <git-repo-url>`  
	`$ cd todomvc-mongodb, npm install`  
	`$ node server.js --fe_ip <IP of machine running the app> --be_ip <IP of machine running mongodb>`  

## License

Everything in this repo is MIT License unless otherwise specified.

MIT © Addy Osmani, Sindre Sorhus, Pascal Hartig, Stephen Sawchuk.

[1]: http://www.mongodb.com/
