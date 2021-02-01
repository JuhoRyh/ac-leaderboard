# AC-Leaderboard

View on [Heroku](https://frozen-spire-46357.herokuapp.com/)

AC-Leaderboard is a small MERN-stack app with the intention to store and list Hotlap timings. It contains all the cars and tracks of the game Assetto Corsa  

## API

### GET
*  /api/cars

   _Sends all the cars_

* /api/cars/:carId

   _Sends a specific car_

* /api/tracks

  _Sends all the tracks_

* /api/tracks/trackId

  _Sends a specific track_

* /api/records/trackId

  _Sends all the records of the specified track_

### POST

* /api/record

  _Saves a record to the database_

## Bugs

As of now you can send a broken object to the backend which saves it to the db which unfortunately can break the leaderboard page

## Future

 - Error handling and making it impossible to send objects with invalid information or no information at all will be addressed ASAP
 - The styling is very minimal so design will still change
 - Adding user handling to see a users records and so records could be more easily deleted or modified
