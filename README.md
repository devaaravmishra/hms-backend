# Hospital Management System (Backend)

# Getting Started
## Prerequisite
- nodejs
- mongodb

## Running the server
```bash
git clone https://github.com/Aarav619/hms-backend.git
cd hms-backend && npm i && node app.js
```

# Routes
## User Routes
- **/user/signup**: Create a new user.

    POST /user/signup
    ```json
    {
        "name": "Carl Morris",
        "email": "carl@email.org",
        "password": "12345678",
        "age": 21
    }
    ```
    Response
    ```
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 29
    Content-Type: text/html; charset=utf-8
    Date: Sat, 26 Jun 2021 15:50:55 GMT
    ETag: W/"1d-QsicU/RZoD0p5aWOmhf+2BcogKw"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    New user created: Carl Morris
    ```
- **/user/login**: Login an existing user.

    GET /user/login
    ```json
    {
        "email": "carl@email.org",
        "password": "12345678"
    }
    ```
    Response
    ```
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 28
    Content-Type: text/html; charset=utf-8
    Date: Sat, 26 Jun 2021 15:52:33 GMT
    ETag: W/"1c-06UtxFu4LhmjSzdQV7I3MmOc8qY"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    Welcome back, carl@email.org
    ```
- **/user/makeApt**: Make an appointment.

    POST /user/makeApt
    ```json
    {
        "pid": "<patient._id>",
        "date": "2021-06-26T15:33:03Z",
        "slot": 1
    }
    ```
    Response
    ```
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 49
    Content-Type: text/html; charset=utf-8
    Date: Sat, 26 Jun 2021 15:55:09 GMT
    ETag: W/"31-oiLbP0UE+MxSl55THQZyUvKHRZw"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    New appointment created: 60d74cdf8e49e914a6b846b4
    ```
- **/user/getApt**: Get all appointments of a user.

    GET /user/getApt/<appointment._id>

    Response
    ```
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 120
    Content-Type: application/json; charset=utf-8
    Date: Sat, 26 Jun 2021 15:56:18 GMT
    ETag: W/"78-fDVQl/kjOK+ut1cOP2urA/DQJhU"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    [
        {
            "__v": 0,
            "_id": "60d74ddd8e49e914a6b846b7",
            "date": "2021-06-26T15:33:03.000Z",
            "pid": "60d74cdf8e49e914a6b846b4",
            "slot": 1
        }
    ]
    ```

## Admin Routes
- **/admin/signup**: Create a new admin.

    POST /admin/signup
    ```json
    {
        "name": "Dennis Vance",
        "email": "dennis@email.org",
        "password": "12345678"
    }
    ```
    Response
    ```
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 32
    Content-Type: text/html; charset=utf-8
    Date: Sat, 26 Jun 2021 15:57:46 GMT
    ETag: W/"20-1m9PEWaGBrn/dplii1L9GuPMeIc"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    New admin assigned: Dennis Vance
    ```
- **/admin/login**: Login an existing admin.

    GET /admin/login
    ```json
    {
        "email": "dennis@email.org",
        "password": "12345678"
    }
    ```
    Response
    ```
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 30
    Content-Type: text/html; charset=utf-8
    Date: Sat, 26 Jun 2021 15:58:26 GMT
    ETag: W/"1e-jxrLyeSCkjaCKMyvwiIAOlceBI4"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    Welcome back, dennis@email.org
    ```
- **/admin/addDoc**: Add a doctor to database.

    POST /admin/addDoc
    ```json
    {
        "name": "Dr. Stephen",
        "email": "stephen@email.org",
        "password": "12345678",
        "specialization": "ENT"
    }
    ```
    Response
    ```
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 32
    Content-Type: text/html; charset=utf-8
    Date: Sat, 26 Jun 2021 15:59:51 GMT
    ETag: W/"20-8Tq4RO6QYExA5K03Fjl3VYNFVvA"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    New doctor assigned: Dr. Stephen
    ```
- **/admin/assignDoc**: Assign a doctor to an appointment.

    PUT /admin/assignDoc/<appointment._id>
    ```json
    {
        "did": "<doctor._id>"
    }
    ```
    Response
    ```
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 82
    Content-Type: text/html; charset=utf-8
    Date: Sat, 26 Jun 2021 16:01:44 GMT
    ETag: W/"52-S3/ekAYdpUQvZlZtPSYOmND+Vyk"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    Doctor: 60d74ef78e49e914a6b846be assigned to appointment: 60d74ddd8e49e914a6b846b7
    ```
