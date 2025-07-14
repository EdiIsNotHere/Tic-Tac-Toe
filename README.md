# Tic-Tac-Toe Game

A responsive Tic-Tac-Toe game with AI opponent and two-player mode, built with HTML, CSS, and JavaScript.

![Game Screenshot](https://via.placeholder.com/400x400/000000/FFFFFF?text=Tic-Tac-Toe+Game) 
*(Replace with actual screenshot)*

## Features

- **Two Game Modes**:
  - Play against an AI opponent
  - Two-player mode (hotseat)
- **Smart AI** with winning strategy:
  - Looks for immediate wins
  - Blocks opponent's winning moves
  - Prefers center and corner positions
- **Visual Feedback**:
  - Color-coded X (red) and O (green)
  - Winning/draw indicators
- **Responsive Design**:
  - Works on different screen sizes
- **Modern UI**:
  - Gradient backgrounds
  - Smooth animations


## Game Logic

- The AI uses a simple strategy:
  1. First checks if it can win immediately
  2. Then checks if it needs to block the player
  3. Otherwise takes the center or a corner position
  4. Finally takes any available position

## Code Structure

- **HTML**: Basic game board structure
- **CSS**: Styling with modern gradients and flexbox
- **JavaScript**:
  - Game state management
  - Win/draw detection
  - AI decision making
  - Event handling

## Future Improvements

- [ ] Add score tracking
- [ ] Implement difficulty levels
- [ ] Add animations for moves
- [ ] Make fully responsive for mobile
- [ ] Add sound effects


## License

This project is open source and available under the [MIT License](LICENSE).

---

Enjoy the game! For any issues or suggestions, please open an issue on GitHub.
