# Main Components of the APP
- App.js
- Game.js

## App.js

Performs the following tasks
1. Initializes the board for every level
2. Generates the cells to be memorized
3. Manages the lives
4. Send the color to display the cells
5. Sends the number of correct guess to be required to win the level
6. Sends the grid size for each level
7. Manages if the game is over or not

## Game.js

Performs the following tasks
1. Generates the board
2. Tracks the cells selected by the user, compares it with the desired value, if matches, increments the levels
3. Decrements the lives for each incorrect selection
4. Displays intuitive messages to the user after each level

## More Info:
- All the default values are initialized in a config file

## How to rum the APP: 
1. navigate to **frontend** after cloning the repo; then run `npm start`

## Application UI:

![Screenshot (2487)](https://user-images.githubusercontent.com/60538942/199353081-4ae77156-979c-4a94-ad67-828337aa653f.png)


![Screenshot (2487)](https://user-images.githubusercontent.com/60538942/199353144-11c554b4-8360-4a7c-a0d4-3c0273cc65d6.png)
