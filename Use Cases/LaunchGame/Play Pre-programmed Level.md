<strong> Title: </strong>
Play pre-programmed level.

<strong> Description: </strong>
The user is currently on the starting main menu and wants to play a level that is part of the regular story mode.

<strong> Actors: </strong>
User

<strong> Triggers: </strong>
User choses a desired level to play.

<strong> Preconditions: </strong>

<ul>
<li>The user is currently on the main starting menu</li>
</ul>

<strong> Postconditions </strong>

<ul>
<li>The user has selected level he/she wants to play and begins level.</li>
</ul>

<strong> Normal Flow </strong>

<ol>
<li>User accesses the games's main menu (separate use case)</li>
<li>User selects "Play"</li>
<li>User is presented with option to either play story or play own created level. User selects play story</li>
<li>System presents a stage screen with a list of stages(each stage has a collection of levels), where user must select</li>
<li>After user has selected stage, system presents a level screen with list of levels included in that stage</li>
<li>User selects desired level and begins to play</li>
</ol>

<strong> Alternative Flows </strong>

&nbsp;&nbsp;3.a. User selects "Back" on stage screen
  <ol>
    <li>Resume at step 2 of normal flow</li>
  </ol>
  
&nbsp;&nbsp;5.a. User selects "Back" on level screen
  <ol>
    <li>Resume at step 3 of normal flow</li>
  </ol>
