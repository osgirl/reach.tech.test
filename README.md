# Palindrome Database 
*Technical test developed by Robert Morgan*

## Brief

We want to build a service that stores a number of palindromes. A palindrome is a word or phrase string that reads the same backwards as forwards, independent of spaces and punctuation. An example could be 'Dammit I'm Mad'.
- The service has a simple REST API that presents two endpoints:
  - An endpoint that accepts a string parameter, that will return true if the string is palindrome (and false otherwise) 
  - An endpoint that returns a list of the last 10 palindromes the system has received in the last 10 minutes (there is no need to persist the palindromes, it is OK to keep them in memory) 
- The service should have a simple web frontend, which you are free to design however you want

## Implementation
### Installation
To install the application using [Yarn](https://yarnpkg.com/en/) (preferred), execute the following command:

    yarn
To install the application using [npm](https://www.npmjs.com/get-npm) , execute the following command:

    npm install

### Usage
To install the application execute the following command:

    yarn start
or

    npm start

### Configuration
Configuration for the application can be changed through modifying `config.json`
| Setting Name | Default Value | Description |
|--|--|--|
| `history.maxValues` | `10` | The maximum number of palindromes to return when requesting the history of matching requests. |
| `history.ttlMinutes` | `10` | The amount of time in minutes that a palindrome will be stored in the history of matching requests before being automatically removed. |
| `server.errorLogging` | `OBJECT` | Primitive settings which are passed to [Winston](https://github.com/winstonjs/winston)'s logging engine to handle errors. |
| `server.logging` | `OBJECT` | Primitive settings which are passed to [Winston](https://github.com/winstonjs/winston)'s logging engine to handle incoming requests. |
| `server.port` | `3000` | The port number that the application runs on. |

### Endpoints
The Application has 2  RESTful API endpoints:
#### Check
Used to check if the string provided is a palindrome or not.
**Path:** `/check`
**Query Parameters:**
| Name | Type | Description |
|--|--|--|
| value | string | The value which will be checked for its palindrome status.|
**Example Response**

    {
      isPalindrome: true
    }

#### History
**Path:** `/history`
**Query Parameters:** N/A
**Example Response**

    [
      "Don't nod.",
      "I did, did I?",
      "My gym",
      "Red rum, sir, is murder",
      "Step on no pets",
      "Top spot",
      "Was it a cat I saw?",
      "Eva, can I see bees in a cave?",
      "No lemon, no melon"
    ]

### User Interface
The user interface can be accessed at `/app`

For the sake of simplicity, the JavaScript which powers this user interface is embedded into the page. Normally, this would be split out with its own set of tests and pipeline to produce production-ready code. 

---
*NB: Example responses have been pretty-prented to make them easier to read.*