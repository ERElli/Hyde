Use cases:

**Create Account:**

Description: the user creates an account if he doesn’t have one already in order to have a profile and save his progress.
Actor: Player

Triggers: the player presses on “Create Account” in the main menu.

Preconditions: user is viewing the login menu.

Postconditions: a new page is displayed for the player to enter his name, password, and email.

Normal flow: 

1. Player enters his name, password, and email.
2. Player presses  create account button. 
3. The account gets created and saved in the database and the user can continue playing the game. 

Alternative flow: the account is not saved for some reason( for example no connection to the database server) , and the user is advised to try again.

**Sign in:**

Description: the user signs in to his already existing account

Actor: Player

Triggers: the  player presses on “Sign in” in the main menu.

Preconditions: user is viewing the login menu.

Postconditions: the main menu game screen is displayed to the player

Normal flow: player enters his login information and his account gets signed in
Alternative flow: account does not exist, or wrong email/password combination, the user is prompted to try again.

**Forget password:**

Description: the user forgot his password and wants to change it

Actor: Player

Triggers: the user clicks on the “Forgot Password” button on the login menu.

Preconditions: user is viewing the login menu

Postconditions: the forget password screen is displayed

Normal flow: 
1. The user enters his username in  the required information text bar.
2. The user presses the reset password button.

Alternative flow: the user enters information that does not match the database information and is not able to reset his password. Instead his prompted to try again.

**Update score and finishing time:**

Description: at the end of each level the score of the player and time to finish is updated and saved in his profile if it is higher than the ones before it.

Actor: player

Triggers: end of level reached

Preconditions: player is signed in

Postconditions: player is displayed with his updated score and time to finish

Normal flow: the score and time is displayed, comparison between previous scores and times in the database is done, and if the score and time are highest it is shown on the player’s profile.

Alternative flow: connection to the database is not possible and the score and time are not saved.

**Unlock Achievements:**

Description: at the end of each level an achievement is unlocked based on the score of the player and saved in his profile if it is higher than the one before it (example gold medal, bronze medal).

Actor: player

Triggers: end of level reached

Preconditions: player is signed in

Postconditions: player is displayed with his achievement for that level

Normal flow: the unlocked achievement is displayed, comparison between previous ones  in the database is done, and if the achievement is the highest it is shown on the player’s profile.

Alternative flow: connection to the database is not possible and the achievement is not saved.

