
Database Classes: 

1.The login class will validate the username and password that the user inputs in the interface login menu. The login class will connect to the database and check to see if the combination of username and password is stored on the database and returns true if it is. In the case where the combination of username or password is wrong, an error message will be displayed.

![](https://github.com/markwindsorr/CS4770/blob/master/images/LoginUML%20(1).png)

2. The create account class will add a new user's information to the database. In order to create a new account a user must enter his username, password, first name, last name, and email. His/her username and password will be added to the login database and the full information will be added to the Profile class which we will discuss below.

![](https://github.com/markwindsorr/CS4770/blob/master/images/createAccount%20copy.png)

3. The Profile class contains information about the user and his/her progress and achievement in the game. The data is retrieved when the user is viewing their profile on the interface. The data stored is updated as the user progresses in the game. 

![](https://github.com/markwindsorr/CS4770/blob/master/images/profile%20(1).png)

4. The class for saving a created level simply stores the newly created level in the form of objects in the database to be retrieved and generated upon request by the engine when the user wants to play it. The saved data in the level allow for it to be generated. 

![](https://github.com/markwindsorr/CS4770/blob/master/images/profile%20(1).png)





