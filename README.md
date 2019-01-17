**SMTP-TESTER**
----


* **URL**

  /send

* **Method:**
  

  `POST`

**Body**

````json
{
    "mailer": {
        "host": "smtp.example.net",
        "port": 587,
        "secure": false,
        "user": "user",
        "pass": "secret"
    },
    "mail": {
        "from": "\"John Doe 👻\" <foo@example.com>",
        "to": "john.doe@exa ple.com",
        "subject": "Hello ✔",
        "text": "Hello world?",
        "html": "<b>Hello world?</b>"
    }
}
````

**Success Response:**


````json
{
    "message": "Message sent: <d25ab8784684@example.com>"
}
````
 
**Error Response:**

````json
{
    "error": {
        "code": "EAUTH",
        "response": "The provided authorization grant is invalid",
        "responseCode": 535,
        "command": "AUTH PLAIN"
    }
}
````