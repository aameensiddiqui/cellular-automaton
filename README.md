# Cellular Automaton

This system demonstrates how incredibly complex behaviors can emerge from simple local rules. In the Game of Life, just a few rules about cell birth and death create patterns that can grow, move, reproduce, and even compute. This principle of emergence helps us understand how complexity arises in biological systems, ecosystems, and social networks.

## Game of Life

[Conway's Game of Life Wiki](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

Rules:

    1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    2. Any live cell with two or three live neighbours lives on to the next generation.
    3. Any live cell with more than three live neighbours dies, as if by overpopulation.
    4. Any dead cell with exactly three live neighbours becomes a live cell, 
       as if by reproduction.
