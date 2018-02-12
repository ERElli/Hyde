The "weapon" abstract class defines those usable items that modify the player's current weapon.
This effects the damage, pattern, bullet speed, and firing rate of the shooting mechanic.
It implements the modifyAttribute method from the "usable" interface by calling the changeWeapon method in the "player" class.
Each weapon implementation will over-write the "fire" method to provide their own unique behavior.

Attributes:
<ul>
  <li>firingRate</li>
  <li>bulletSpeed</li>
  <li>damage</li>
  <li>range</li>
  <li>startAmmo</li>
</ul>

Methods:
<ul>
  <li>fire</li>
