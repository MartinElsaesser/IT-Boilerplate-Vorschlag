import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import advancedRouter from "./routes/advancedRouter"
import basicRouter from "./routes/basicRouter"

const app = new Hono()

// serve static files
app.use("/static/*", serveStatic({ root: "./" }))

app.route("/advanced", advancedRouter)
app.route("/", basicRouter)

// spin up server
serve(
	{fetch: app.fetch, port: 3000},
	(info) => {
		const address = info.address === "0.0.0.0" ? "localhost" : info.address
		console.log(`Server started: http://${address}:${info.port}`);
	}
);
