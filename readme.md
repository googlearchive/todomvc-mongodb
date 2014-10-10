This sample app is based on TodoMVC framework. 

TodoMVC is a project which offers the same Todo application implemented using MV* concepts in most of the popular JavaScript MV\* frameworks of today.

# ![TodoMVC](media/logo.png)
### [Website](http://todomvc.com)&nbsp;&nbsp;&nbsp;&nbsp;[Blog](http://blog.tastejs.com)&nbsp;&nbsp;&nbsp;&nbsp;[TasteJS](http://tastejs.com)

## Run the app

To get the app running, follow the instructions below:
- Install and run MongoDB <br/>
	$sudo apt-get install mongodb <br/>
	$ sudo service mongodb stop <br/>
	$ sudo mkdir $HOME/db ; sudo mongod --dbpath $HOME/db --port 80 --fork --logpath /var/tmp/mongodb <br/>
- Install and run the app <br/>
	$ git clone <git-repo-url> <br/>
	$ cd todomvc-mongodb, npm install <br/>
	$ node server.js --fe_ip <IP of machine running the app> --be_ip <IP of machine running mongodb> <br/>

## View & Run the TodoMVC in Web IDE

Click on the button below to view the TodoMVC code in a Web IDE. Feel free to edit the code and then run it all from your browser.

[![IDE](site-assets/editcloud9.png)](https://c9.io/open/git/?url=git://github.com/tastejs/todomvc.git)
[![IDE](https://codio-public.s3.amazonaws.com/sharing/demo-in-ide.png)](https://codio.com/p/create/?from_github=tastejs/todomvc)


## License

Everything in this repo is MIT License unless otherwise specified.

MIT © Addy Osmani, Sindre Sorhus, Pascal Hartig, Stephen Sawchuk.
