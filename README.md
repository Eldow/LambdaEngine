# LambdaEngine
A simple game engine in JS

Contains a basic game loop & collisions handling.

To start, use `npm install` then `node server.js`

Then, render `localhost:3000` using your favorite web browser.
(You can edit the port in `server.js`)

Features :
- A basic game loop (fps fixed in `src/main.js`)
- Point implementation
- Vector implementation
- Circle implementation
- Aabb implementation
- Obb implementation
- KDop implementation

Collisions actually implemented (see `src/Collision.js`):
- Circle vs Circle : Distance check
- Circle vs Aabb : X & Y Distance check composition
- Circle vs Obb : Line projection
- Circle vs KDop : Line projection
- Circle vs Point : Distance check
- Aabb vs Aabb : Corners comparison
- Aabb vs Obb : Separating Axis Theorem
- Aabb vs KDop : Separating Axis Theorem
- Aabb vs Point : Distance to segment
- Obb vs Obb : Separating Axis Theorem
- Obb vs KDop : Separating Axis Theorem
- Obb vs Point : Distance to segment
- KDop vs KDop : Looping through KDop's mins and maxs
- KDop vs Point : Distance to segment
- Point vs Point : Coordinates superposition
