# ThreadIt

Create communities and interact with them.

How to run:

- Clone the repository.
- Open the directory in a terminal and run <code>npm install</code>
- Create a MySQL database and copy the connection string.
- Copy Google Client ID and Client Secret Key from [here](https://console.cloud.google.com/).
- Create a Redis instance from [here](https://upstash.com/) and copy the required credentials.
- Create a uploadthings instance from [here](https://uploadthing.com/) and copy the required credentials.
- Create a dotenv file and put the following in it:
```bash
DATABASE_URL='<YOUR_SQL_DB_URL>'
NEXTAUTH_SECRET="<YOUR_NEXT_AUTH_SECRET_KEY>"

GOOGLE_CLIENT_ID= "<YOUR_GOOGLE_CLIENT_ID>"
GOOGLE_CLIENT_SECRET= "<YOUR_GOOGLE_CLIENT_SECRET>"

UPLOADTHING_SECRET="<YOUR_UPLOADTHING_SECRET_KEY>"
UPLOADTHING_APP_ID="<YOUR_UPLOADTHING_APP_ID>"

REDIS_URL="<YOUR_REDIS_URL>"
REDIS_SECRET="<YOUR_REDIS_SECRET_KEY>"
```
- In the terminal now run <code>npx prisma db push</code>
- Now run <code>npm run dev</code> in the terminal.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.