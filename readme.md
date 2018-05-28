# Simple Reservation

This application will be a basic reservation system for booking appointments and interacting with via text message.

### Core Technology/Services (goals)
* React
* Firebase
* Twilio

### Features (wishlist)
* Ability to find a slot based on a Resource (person, Room)
* Ability to reserve a slot based on a Resource (person, Room)
* Admin Dashboard for viewing and editing appointments
* Ability to confirm and cancel an appointment via text
* Sending automatic text message reminders
 

## Getting Started

Install packages 
```
yarn
```

start dev server on **localhost:1234** (creates `local` directory)
```
yarn start
```

Since we are using Parcel JS and babel you are free to use modern js features such as import statements.

## Functions

test functions on local machine
```
//cd into function directory
cd functions

//run the local function server
yarn serve
```


## Production

build minified bundle for production (creates `public` directory)
```
yarn build
```

deletes `public`, `local`, `.cache` directories
```
yarn clean
```


This project is a proof of concept to show how we can levrage core services to build a robust system...so...

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL WE BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
