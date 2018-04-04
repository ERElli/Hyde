<strong> Title: </strong>
Play Online 

<strong> Description: </strong>
Playing online functionality includes playing levels other users have created and uploading your own.

<strong> Actors: </strong>
User

<strong> Triggers: </strong>
User choses to play his/her created levels, another level created by another user, or upload his/her own to server

<strong> Preconditions: </strong>

<ul>
<li>The user has clicked play online on the main starting menu</li>
<li>The user has working internet connection</li>
<li>The user has successfully connected to game server</li>
</ul>

<strong> Postconditions </strong>

<ul>
<li>The user has selected play his/her own created level that has been uploaded previously on the server</li>
<li>The user has selected play another users level that has been uploaded previously on the server</li>
<li>The user has selected to upload one of his/her own created levels to the server</li>
</ul>

<strong> Normal Flow </strong>

<ol>
<li>User accesses the games's main menu (separate use case)</li>
<li>User selects "Play Online"</li>
<li>Navigate to online menu where system presents four options. 3.a) Find levels, 3.b) My levels, 3.c)Upload level and 4.)Quit</li>
  
  &nbsp;&nbsp;3.a) User selects "Find Levels"
  
  <ol>
    <li>User is presented with browse menu displaying all the most recently created levels from all users</li>
    <li>User selects desired level and begins to play</li>
  </ol>
  
  &nbsp;&nbsp;3.b) User selects "My Levels"
  
  <ol>
    <li>User is presented with browse menu displaying all levels created by the user</li>
    <li>User selects desired level and begins to play</li>
  </ol>
  
  &nbsp;&nbsp;3.c) User selects "Upload"
  
  <ol>
    <li>User is presented with browse menu displaying all levels created by the user</li>
    <li>User selects desired level to upload</li>
    <li>User confirms upload. Level is now on server for other users to play</li>
  </ol>
  
  &nbsp;&nbsp;3.d) User selects "Quit"
  
  <ol>
    <li>User disconnects from server and is brought back to main starting menu</li>
  </ol>
  
</ol>

<strong> Alternative Flows </strong>

&nbsp;&nbsp;3.)Loses connection to server on any part of online play

<ol>
  <li>Display alert message with message saying you lost connection to internet.</li>
  <li>User presses "OK" and navigates back to main starting menu</li>
</ol>

&nbsp;&nbsp;3.a) User selects "Back" browse(Users others users levels) menu
  
  <ol>
    <li>Resume at step 3 of normal flow</li>
  </ol>
  
&nbsp;&nbsp;3.b) User selects "Back" on browse(Users levels) menu
  
  <ol>
    <li>Resume at step 3 of normal flow</li>
  </ol>
  
  &nbsp;&nbsp;3.c) User selects "Back" on browse(Upload levels) menu
  
  <ol>
    <li>Resume at step 3 of normal flow</li>
  </ol>
