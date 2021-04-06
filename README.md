# Discord Bot
Started out as a side project for a discord server, but I have since decided to opensource it for others to use.
This project will likely not see any more updates as I look for other (more enjoyable) things to do instead.

# Prerequisites:
+ NodeJS and npm
+ MongoDB set up and running (See [this](https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04) if you don't know how)
+ A decent enough server (I can run this fine on a 2GB Digitalocean droplet with 50GB storage)

# How to set up
+ 1. Clone the repository to your directory of choice on your server. (It will create its own folder so keep this in mind) 
``git clone https://github.com/dev-sda1/DiscBot.git`` This shouldn't take long to copy over if your provider's bandwidth is good enough
+ 2. Edit the config.json file in the storage folder to add your token and mongo account. [Make sure it's secure! Click here if you don't know how](https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04)
+ 3. Navigate to the root of the folder and run ``npm install && npm bot``
+ 4. Check that your bot is online in the server!

Can't figure out bot permissions? Use [this website](https://discordapi.com/permissions.html)

If you want it to keep running, see the guide below for how to run it with forever:

# Running it under [Forever](https://www.npmjs.com/package/forever)
+ 1. Install forever using ``npm install forever``
+ 2. Follow all the steps above until step 3.
+ 3. On step 3, use ``npm install && forever start bot`` to install all the required extras and to start it immediately.

To check logs, use ``forever logs`` and navigate to the directory it shows you. It's typically ``/root/.forever/[random_name].log``

