# Hex in a QR code

Hex is a game where 2 players try to connect opposite sides of a rhombus-shaped board made of hexagons!

I implemented the game but with a catch: All of the code fits inside a single QR code! Here try it:

![qr code](https://github.com/Dimitris-Toulis/hex-qr/blob/main/dist/qrcode.png?raw=true)

Video demo: 

https://github.com/user-attachments/assets/90ae60d4-787e-4c1c-82a7-f4e9dcfe0582


Fun facts:
- Draws are impossible in Hex
- Without the swap rule (see below) player 1 can always win if they can calculate all possible outcomes
- In 11×11 Hex, the state space complexity is approximately $2.4 \cdot 10^{56}$ versus $4.6 \cdot 10^{46}$ for chess

## Rules

- Player 1 tries to connect the top and bottom sides while player 2 tries to connect the right and left sides
- Usually, the swap rule is used. This rule lets player 2 choose whether to switch positions with the player 1 after player 1 makes the first move. While this is not implemented due to size limits, you can just switch colors with the other player

The game is best played on desktop due to the weird board shape not fitting nicely in smaller screens.
