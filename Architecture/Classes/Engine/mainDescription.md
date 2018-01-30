The "main" file is the driver program for the game, and therefore one of the most important. It does most of what is outlined
in GameStateDescription.md, such as keeping track of all the entities currently in the game, and applying the laws 
of physics that govern their interactions. Since it does not really define a concrete object, it uses objects and behaviours
defined in other major components. For example, although it keeps track of all the entities currently in the game, it does 
not include the code defining these entities, since that is done in the Entity logical component. It also interacts with the Interface 
component, as it provides the information about the game world that the programs in the Interface component make visible to the 
user.

Attributes:
<ul>
  <li>player</li>
  <li>enemies</li>
  <li>obstacles</li>
  <li>projectiles</li>
  <li>pick-ups</li>
  <li>blocks (terrain)</li>
</ul>

Methods:
<ul>
  <li>update</li>
  <li>testCollision(entity1, entity2)</li>
  <li>startGame</li>
  <li>endGame</li>
</ul>
