<strong> Title: </strong>
Play Tutorial

<strong> Description: </strong>
The user is currently on the starting main menu and wants to play a tutorial

<strong> Actors: </strong>
User

<strong> Triggers: </strong>
User does not know how to play and choses to play the tutorial

<strong> Preconditions: </strong>

<ul>
<li>The user is currently on the main starting menu</li>
<li>The user does not know how to play</li>
</ul>

<strong> Postconditions </strong>

<ul>
  <li>The user selects tutorial and begins</li>
  <li>User completes tutorial and has learned fundamentals of playing the game</li>
</ul>

<strong> Normal Flow </strong>

<ol>
<li>User accesses the games's main menu (separate use case)</li>
<li>User selects "Play Tutorial"</li>
<li>Tutorial begins in same environment as level one</li>
<li>Movement lesson is given. User completes lesson by moving and jumping</li>
<li>Enemy lesson is given. Various enemies are presented. User completes lesson by killing enemies with weapon or jumping on them</li>
<li>Transformation lesson is given. Movement lesson and enemy lesson is given but you must figure out what character to use when moving and defeating enemies</li>
<li>Once user completes movement, enemy and transformation lesson. User unlocks tutorial achievement</li>

</ol>

<strong> Alternative Flows </strong>

&nbsp;&nbsp;4.a. User fails movement lesson 
  <ol>
    <li>Resume at beggining of step 4 of normal flow</li>
  </ol>
  
&nbsp;&nbsp;5.a. User fails enemy lesson by getting defeated o
  <ol>
    <li>Resume at beggining of step 5 of normal flow</li>
  </ol>
  
  &nbsp;&nbsp;6.a. User fails transformation lesson
  <ol>
    <li>Resume at beggining of step 6 of normal flow</li>
  </ol>
