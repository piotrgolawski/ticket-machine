# ticket-machine
Project made for the recruitment process with usage of Vue, TypeScript, Sass, and docker (with docker-compose).

The main purpose was to mimic the ticket machine, allow to manually chose the station with hints which letter is available to pick next.
Data was fetched from the server and parsed. At the start all letters are possible to choose, after the choice of letter, next available letters were highlighted and possible station results were shown. Available letters were the first letters of all the next possible stations. For better user experience clear and back buttons were added. All needed station data is available when the station is chosen to help with the possible development of the project.


<p align="center">
        <img src="https://raw.githubusercontent.com/piotrgolawski/ticket-machine/master/public/ticket-machine.gif?raw=true">
</p>

## Project setup
```
npm install or docker-compose up 
```

## What can be done more?

More tests can be written, especially some E2E tests.

The usage of the store is also a good idea here.

Git hook on commit with lint and prettier.



Hope you will enjoy
