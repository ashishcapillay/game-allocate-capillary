## The node.js for Game Allocate module : Capillary
## Created By : Ashish Singh

The app works for the moduel called game-allocation with th help of transactions:

- Get the details of transacstion
- Vaidate the transaction against the SKUs
- Allocate the game and store/update values

## Requirements

* Node >= 18.20.2
* Git
* MySQL

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/ashishcapillay/game-allocate-capillary.git
cd game-allocate
```

```bash
npm install or npm install --save
```

## Steps for start the server

- Create one env file and assign the environment variables
Open `variables.env` and inject the access token, port number etc
- Start your local MYSql server ```mysql -u username -p```

```
NODE_ENV=development
PORT=<PORT NUMBER> || 4100
BASIC_AUTH=<AUTH TOKEN TO ACCESS CAPILLARY APIS>
```

Then

```bash
npm run start
```

Open [http://localhost:4100](http://localhost:4100) or any customized port number and take a look around by calling Get transaction and Game allocation APIs.


## Use Docker
You can also run this app as a Docker container:

Step 1: Clone the repo

```bash
git clone https://github.com/ashishcapillay/game-allocate-capillary.git
```

Step 2: Build the Docker image

```bash
docker build -t game-allocate.nodejs .
```

Step 3: Run the Docker container locally:

```bash
docker run -p 4101:4101 -d game-allocate.nodejs
```
