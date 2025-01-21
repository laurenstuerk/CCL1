# Devlog No. 1

Today marks the first day of my journey in creating a video game for the Creative Code Lab. Here's what I accomplished:

1. **Started with a 2D Game Template**  
   I used the 2D game templat.

2. **Implemented a Character**  
   - Set up basic player movement using keyboard input.  
   - Added a jump mechanic
  
3. **Optimized Jump Physics and Added Double Jump**  
   - Adjusted the jump mechanics to feel more responsive.  
   - Added a double-jump feature, which already makes the gameplay more dynamic and fun.

4. **Created a Block Class**  
   - Designed it to handle obstacles and platforms.  
   - It's still basic, but it works for now.  

5. **Added Placeholder Images**  
   - Added a placeholder background image and a character sprite.  
   - Even these simple visuals made the game feel more alive.  

6. **Set Up the Floor and Side-Scrolling Elements**  
   - Implemented a floor for the character to stand on.  
   - Made the camera follow the character while the world scrolles.  

# Devlog No. 2

Today was a challenging but rewarding day. Bugs gave me a hard time, but I managed to squash them all and add some exciting new features:  

- **World Generation:** Implemented a world generation array, so I no longer have to manually place every block.  
- **Collision Fixes:** Resolved a bug where the player would glitch on top of platforms. Collisions now work perfectly.  
- **Canvas Movement:** Fixed the issue of the canvas moving with the player in all directions. I removed the unnecessary move triggers and implemented a proper canvas transform system.  

Despite the struggles, it feels great to see the game evolving!  

# Diary Entry No. 3  

Today brought big updates to the game:  

- **Enemy and Coin Classes:** Added functionality for enemies (monsters) and collectible coins.  
- **World Generation:** Created a large array to auto-generate the world with various blocks, barriers, and coins. Unfortunately, this caused performance issues that need optimization.  
- **Custom Sprite Sheet:** Implemented my self-drawn, animated character sprite sheet—it looks great in action!  


# Diary Entry No. 4  

- **Shooting Mechanic:** Added functionality to shoot towards the cursor's location on the canvas. It's not fully working yet due to canvas transformation issues.  
- **Directional Sprites:** Updated the character to face the correct direction based on movement.  
- **Holy Beer Item:** Introduced a collectible that activates double jump.  

# Diary Entry No. 5  

Today's progress:  

- **Fixed Shooting:** Shooting now correctly targets the cursor.  
- **New Enemies:** Added mines, defense towers, and a mini-boss class.  
- **Main Menu:** Worked on the main menu and a restart function.  
- **Parallax Background:** Started implementing parallax scrolling for the background.  
- **Sound Effects:** Added sound for shooting and jumping.  


markdown
Copy
Edit
# Diary Entry No. 6  

This day (plus the weekend) brought some updates:  

- **Main Menu:** Created a new main menu with level selection and a level manager (still in progress).  
- **Level Loading:** Worked on proper level loading with the start game setup.  
- **Game Restart:** Faced challenges stopping and restarting the requestAnimationFrame for a proper game reset.  
- **New Game Objects:** Added land mines and defense towers that can shoot and kill the player.  
