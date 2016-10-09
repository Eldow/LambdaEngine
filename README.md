# LambdaEngine
A simple game engine in JS

## Pre-requisites
Please before using this sample make sure you have node and npm installed.
This version is currently tested with :
  * node 4.3.1
  * npm 2.14.12

## Installation
Contains a basic game loop & collisions handling.

To start, use `npm install` then `node server.js`

## Run the app
Visit <http://localhost:3000> (by default) using your favorite web browser.
You may want to edit the port in **server.js**.

## Tests
To have a look at the Jasmine test suite, visit : <http://localhost:3000/tests>

## Features
### Core
* A basic game loop (Edit fps in **src/main.js**)
* Load a basic set of shapes from a JSON configuration file (Edit it in **config.json**)
* Point implementation
* Vector implementation
* Circle implementation
* Aabb implementation
* Obb implementation
* KDop implementation

### Collisions
* Circle vs Circle : Distance check
* Circle vs Aabb : X & Y Distance check composition
* Circle vs Obb : Line projection
* Circle vs KDop : Line projection
* Circle vs Point : Distance check
* Aabb vs Aabb : Corners comparison
* Aabb vs Obb : Separating Axis Theorem
* Aabb vs KDop : Separating Axis Theorem
* Aabb vs Point : Distance to segment
* Obb vs Obb : Separating Axis Theorem
* Obb vs KDop : Separating Axis Theorem
* Obb vs Point : Distance to segment
* KDop vs KDop : Looping through KDop's mins and maxs
* KDop vs Point : Distance to segment
* Point vs Point : Coordinates superposition
