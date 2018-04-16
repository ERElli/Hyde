Account Use cases:

**Create Account:**
![Create Account](https://github.com/markwindsorr/CS4770/blob/master/DesignDocuments/Diagrams/CreateAccount.png)

Description: the user creates an account if he doesn’t have one already in order to have a profile and save his progress.

Actor: User 

Triggers: the player presses on “Create Account” in the login menu.

Preconditions: user is viewing the login menu.

Postconditions: a new page is displayed for the player to enter his name, password, and email in order to create his account.

Normal flow: 

1. Player enters his username, password, and email in the text boxes specified. 
2. Player presses  "Create Account" button. 
3. The account gets created and saved in the database and the user can continue playing the game. 

Alternative flow:

1. The account is not saved for some reason(for example, no connection to the database server
2. The user is advised to try again.

**Sign in:**
![Sign in](https://github.com/markwindsorr/CS4770/blob/master/DesignDocuments/Diagrams/SignIn.png)
Description: the user signs in to his already existing account.

Actor: User

Triggers: the  player presses on “Sign in” in the login menu.

Preconditions: user is viewing the login menu.

Postconditions: A new page is displayed for the player to enter his username & password.

Normal flow: 

1. Player enters his login information which is his username and password.

2. Player presses on "Sign In" button. 

3. The account gets signed in successfully.

Alternative flow:

1. Account does not exist, wrong email/password combination, or connection to the database is not possible to verify the account information.

2. The user is prompted to try again.

**Forgot password:**

Description: the user forgot his/her password and wants to reset his password. 

Actor: User

Triggers: the user clicks on the “Forgot Password” button on the login menu underneath the textbox for entering his password.

Preconditions: user is viewing the login menu.

Postconditions: the "Forget Password" screen is displayed.

Normal flow: 
1. The user enters his username in  the required information text bar.
2. The user presses the reset password button.
3. An email is sent to the user's email to reset his password. 

Alternative flow: 

1. The user enters information that does not match the database information about his username and is not able to reset his password.
2. The user is prompted to try again.

**Update score and finishing time:**

Description: At the end of each level the score of the player and time to finish is updated and saved in his/her profile if it is higher than the ones before it.

Actor: User

Triggers: End of level reached.

Preconditions: Player is signed in to the game.

Postconditions: Player is displayed with his updated score and time to finish.

Normal flow: 
1. The player reaches the end of the level successfully.
2. the score and time to finish is displayed.
3. In the backend, comparison between previous scores and times in the database is done.
4. The highest score and time to finish is displayed on the player's profile. 

Alternative flow:

1. Connection to the database is not possible.
2. A message is displayed on the screen to the user saying "Sorry, We were unable to update your score and time".
3. The score and time are not saved.

**Unlock Achievements (Medals):**

Description: Player unlocks medals based on his time to finish the level. There are 4 medal: bronze, silver, gold, and platinum. Specific times are set and compared to the user's timer. If the medal awarded is higher than the one before it, it is saved in the player's account. 

Actor: User

Triggers: End of level is reached.

Preconditions: Player is signed in.

Postconditions: Player is displayed with his achievement for that level.

Normal flow: 
1. The time to finish the level is displayed on the user's screen. 
2. The unlocked achievement is displayed to the user's screen.
3. Comparison between previous ones  in the database is done, and if the achievement is the highest it is shown on the player’s profile.

Alternative flow: 

1. connection to the database is not possible.
2. A message is displayed on the screen to the user saying "Sorry, We were unable to update your achievement to your account".
3. the achievement is not saved.

