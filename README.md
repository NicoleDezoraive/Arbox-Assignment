# Arbox Home Assignment - Elevators

## How to run
Clone the repository:

### `git clone https://github.com/NicoleDezoraive/Arbox-Assignment.git`

Install node modules:

### `cd ./Arbox-Assignment`
### `npm install`

Start the web app:

### `npm start`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Description:

This project is built using React and aims to simulate a building with elevators. It offers users the option to select the number of floors and elevators they want to include in the building. Once they click the "Show Building" button, the building with the elevators will appear.

The project manages the state of each elevator using an array called "elevators," which represents each elevator and contains information about its index, current floor, status , etc..

When a user presses a "call" button, the system determines which elevator will arrive in first and in the shortest time from the moment of calling the elevator. The calculation of the shortest time is based on the distance between the floors and the waiting time for the elevator.

Once an elevator receives a call, it starts moving towards the selected floor. The elevators are initialized to be on the ground floor, but its position will be calculated according to the next floor it will arrive at to create the animation.

As the elevator moves, it updates its current floor and the estimated time of arrival (ETA) in seconds. Once it arrives at its destination, it updates its state to "Arrived," and after two seconds, it changes back to "Available." This allows it to move to the next call or wait for a new one.

Overall, this project provides an excellent opportunity to demonstrate proficiency in React and showcase one's abilities in managing a complex state system for elevators.
