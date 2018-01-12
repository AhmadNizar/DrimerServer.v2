# DrimerServer.v2
## Endpoint from DrimerServer.v2

There are many endpoint for get, put, post ,delete data. From Drimer Client. 
This is our main endpoint [https://drimer-191803.appspot.com](https://drimer-191803.appspot.com).
End point table User:
### User routes:

|         ROUTES       |METHODS                          |DESCRIPTION	| REQUIRED PARAM                         |
|----------------|-------------------------------|-----------------------------|-----------------------|
|/|`GET'`            |Get all data user            | |
|/user/login|`POST`            |Login User            |<ul><li>[x] name</li><li>[x] password</li><li>[x] email</li><li>[x] age</li><li>[x] gender</li><li>[x] sugest</li></ul>
|/user/register|`POST`|Register User|<ul><li>[x] password</li><li>[x] email</li></ul>
|/user/edit/:id|`PUT`|Edit User|<ul><li>[x]_id<li>[x] name</li><li>[x] email</li><li>[x] age</li><li>[x] gender</li><li>[x] sugest</li></li></ul>
|/user/delete/:id|`DELETE`|Delete User|<ul><li>[x] _id</li></ul>


### History User:

|         ROUTES       |METHODS                          |DESCRIPTION	| REQUIRED PARAM                         |
|----------------|-------------------------------|-----------------------------|-----------------------|
|/history|`GET`|Get All Data History||
|/history|`POST`|Post Data History|<ul><li>[x] userHistory</li><li>[x] drinkWater</li><li>[x] stepDay</li><li>[x] dayWeather</li><li>[x] createdAt</li><li>[x] drinkTime</li></ul>