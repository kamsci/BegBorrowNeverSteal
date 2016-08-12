# BegBorrowNeverSteal
A site where a community of friends can list all the items they have that they are willing to lend to their friends. Tech: Javascript, Node/Express

## Technologies Used
* Angular (front-end)
 * ui.router
 * ui.bootstrap
 * ngResources
* Node.js
 * Express.js (web-server)
* Postgresql (database)


## Approach
WHAT - 
The goal was to separate frontend action and activity from the back end. Angular is all front end, taling to Node and Express on the backend, and using a SQL/Postgresql database.

WHY - 
When thinking about coding from a DRY, RESTfull, and MVC perspective, you want to have clear roles for each tool and not allow bleeding over, express doesn't do any frontend routeing, and Angular doesn't talk to the database. This project was an exersice in making the very front (HTML) talk to the very backe (DB) through the proper use of appropriate channels. 

How - 
Introducing... the PEAN stack. Postgresql - Express - Angular - Node.js

## MVP User Stories
As a loaner
* Add items to be borrowed
* See who has my stuff
 * when they borrowed it
* Mark items as On-Loan

As a borrower
* View available items to borrow 
* See what I have borrowed
 * when I borrowed it

## Wireframes
See wireframes in Axure: http://wpiif7.axshare.com

## Outstanding Blockers
* After a new item is added or edited, signal Express to call the database again to trigger a change in the front end without having to switch views and come back
* Getting 2 ui.bootstrap modals in the same Angualr controller

## Feature Backlog
As a loaner
*  Edit an item
*  Delete an item
*  View Items by available or not

As a borrower
*  View items to borrow by category
*  Ask for items to borrow
 * Does anyone have a ____?
 * Alert all users
*  View Items by available or not

All
* Add user auth
* Add animations
