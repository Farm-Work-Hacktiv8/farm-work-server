!!! API DOC !!!

===============================================================================
                                    USER
===============================================================================
POST - http://localhost:3000/login

- Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ3YWh5dWRhbmFuZyIsImlhdCI6MTYxNjIxNTM1NH0.PqtjPUdpbA3sthOkcYf_yDO52tHJ2a8i-i2q8tVgdTc"
}

- Error
{
  "error": <error msg>
}

===============================================================================
POST - http://localhost:3000/register

- Response
{
  "id": 2,
  "firstName": "Wahyu",
  "lastName": "Danang",
  "email": "wahyudanang@gmail.com",
  "username": "wahyudanang2"
}

- Error
{
  "error": <error msg>
}

===============================================================================
                                  FIELDS
===============================================================================

GET - http://localhost:3000/fields

- Response
[
  {
    "id": 1,
    "fieldName": "Kebun Jeruk 2",
    "fieldArea": 15,
    "userId": 1,
    "createdAt": "2021-03-20T04:05:40.486Z",
    "updatedAt": "2021-03-20T04:43:05.728Z"
  }
]

- Error
{
  "error": <error msg>
}

===============================================================================
POST - http://localhost:3000/fields

- Response
{
  "id": 2,
  "fieldName": "Apel",
  "fieldArea": 10,
  "updatedAt": "2021-03-20T04:13:48.733Z",
  "createdAt": "2021-03-20T04:13:48.733Z"
}

- Error
{
  "error": <error msg>
}

===============================================================================
PUT - http://localhost:3000/fields/:id

- Response
{
  "id": 1,
  "fieldName": "Kebun Jeruk",
  "fieldArea": 10,
  "userId": 1,
  "createdAt": "2021-03-20T04:05:40.486Z",
  "updatedAt": "2021-03-20T05:23:27.321Z"
}

- Error
{
  "error": <error msg>
}

===============================================================================
DELETE - http://localhost:3000/fields/:id

- Response
{
  "msg": "Kebun Jeruk 2"
}

- Error
{
  "error": <error msg>
}

===============================================================================
                                  PLANTS
===============================================================================

GET - http://localhost:3000/plants/:fieldId

- Response
{
  "id": 1,
  "fieldName": "Kebun Jeruk 2",
  "fieldArea": 15,
  "userId": 1,
  "createdAt": "2021-03-20T04:05:40.486Z",
  "updatedAt": "2021-03-20T04:54:12.035Z",
  "Plants": [
    {
      "id": 1,
      "plantName": "Jeruk",
      "harvestTime": 27,
      "createdAt": "2021-03-20T04:06:52.789Z",
      "updatedAt": "2021-03-20T04:06:52.789Z",
      "PlantFields": {
          "createdAt": "2021-03-20T04:06:52.792Z",
          "updatedAt": "2021-03-20T04:06:52.792Z",
          "fieldId": 1,
          "plantId": 1
      }
    },
    {
      "id": 2,
      "plantName": "Apel",
      "harvestTime": 27,
      "createdAt": "2021-03-20T04:13:48.733Z",
      "updatedAt": "2021-03-20T04:13:48.733Z",
      "PlantFields": {
          "createdAt": "2021-03-20T04:13:48.744Z",
          "updatedAt": "2021-03-20T04:13:48.744Z",
          "fieldId": 1,
          "plantId": 2
      }   
    }
  ]
}

- Error
{
  "error": <error msg>
}

===============================================================================
POST - http://localhost:3000/plants/:fieldId

- Response
{
  "id": 4,
  "plantName": "Anggur",
  "harvestTime": 27,
  "updatedAt": "2021-03-20T05:01:21.415Z",
  "createdAt": "2021-03-20T05:01:21.415Z"
}

- Error
{
  "error": <error msg>
}

===============================================================================
PUT - http://localhost:3000/plants/:fieldId/:plantId

- Response
{
  "id": 4,
  "plantName": "Anggur Muda",
  "harvestTime": 28,
  "createdAt": "2021-03-20T05:01:21.415Z",
  "updatedAt": "2021-03-20T05:03:24.016Z"
}

- Error
{
  "error": <error msg>
}

===============================================================================
DELETE - http://localhost:3000/plants/:fieldId/:plantId

- Response
{
  "msg": 'Delete success'
}

- Error
{
  "error": <error msg>
}