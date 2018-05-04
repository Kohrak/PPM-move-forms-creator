# move-forms-creator
This app is capable of reading and writing move out forms for PPM

Installation:

This is a node program so you would require NodeJS to execute it or it could be deployed to heroku to use it as a web application, please note that there are some features missing like authentication that would be better to have if it is decided to deploy as a web app

-Run the node console (or any other console that has access to node functions) and type "npm install"
-if you get any errors (in windows) then type "npm install --global --production windows-build-tools "
(will install python and visual studio tools) and then type "npm install" again
-please create "out" and "zip" directories in the app root folder or you will run into erros
-Once all dependencies are installed just run npm start to start the app
-open http://localhots:3000/ in any web browser on your machine to start using it

Usage:

-run "npm start" to start the app
-open http://localhots:3000/ in any web browser on your machine to start using it

The app has 2 main modes, manual and automatic creation for each of the rooms and common areas.

To create forms manually (still faster than the old way):
-Select the mode you want using the navbar on the top right, room for a resident move out or kitchen for the common areas
-Then type all the info needed in the respective cell and hit create and the bottom. Room and cluster numbers are required
-repeat the process for multiple rooms
-To get the files go to the download section, review the files created and hit get files. You will get a zip folder with all the forms inside

To create forms automatically:
-Select the mode you want using the navbar on the top right, room for a resident move out or kitchen for the common areas
-On the right side, click the link and download the xml template
-Open the xml template in excel, remove the sample data (leaving the header row) and input all the data you need.
-IMPORTANT: save the file again as xml data
-Back in the app, click the browse button and select the the  file you just saved in the previous step
-Give the app a few seconds to process the data
-repeat the process if needed
-To get the files go to the download section, review the files created and hit get files. You will get a zip folder with all the forms inside


Developed by Kohrak
