Installation:
- Git
- NodeJS
- curl
- npm
- snak

----

$ sudo apt install git
$ sudo apt install nodejs
$ sudo apt install npm
$ sudo apt install curl
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
$ sudo npm install --unsafe-perm --verbose -g snak

----
Fixing dev_pipe.js:

usr/local/lib/node_modules/snak/node_modules/burrow-contracts/lib/pipes/

line 124:
data.return.toUpperCase() --> data.Return.toUpperCase()
----

$ git clone <link>

----

Deploy: change directory to folder

$ cd.....

New terminal:
$ ./monax-keys server

New terminal:
$ snak import_keys account_list.json
$ snak run_burrow

New terminal:
$ snak compile
$ snak migrate


$ snak call Buying getBuyers
(Buying - contract's name
 getBuyers - a function in contract)

New terminal:
$ npm start

launch: http://localhost:3000

Enjoy