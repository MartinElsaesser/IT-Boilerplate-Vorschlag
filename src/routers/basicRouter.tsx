
import { Hono } from 'hono'

const basicRouter = new Hono()

// This is a functional JSX component
// it takes the arguments:
// * children: any -> HTML to display within Layout
// * title: string -> sets the title of the page
function Layout ({children, title }: {children: any, title: string}) {
  return (
    <html>
			<head>
				<meta charset='utf-8'/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
				<link href="/static/css/app.css" rel="stylesheet"></link>
				<title>{title}</title>
			</head>
      <body>
				<div className="container" id="root">
					{children}
				</div>
			</body>

			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </html>
  )
}


basicRouter.get('/', (c) => {
	return c.html(
    <html>
			<head>
				<meta charset='utf-8'/>
				<title>Basic Page</title>
			</head>
      <body>
				<h1>Very basic page</h1>
				<div>No Bootstrap, no client logic and no data from the server.</div>
				<h3>Links</h3>
				<ul>
					<li> <a href="./layout">Page uses a layout</a> </li>
					<li> <a href="./server-data">Page renders server data into HTML</a> </li>
					<li> <a href="./server-data-layout">Page renders server data into HTML and uses a layout</a> </li>
				</ul>
				<a href="/advanced">Go to advanced routes</a>
			</body>
    </html>
	);
});

basicRouter.get('/layout', (c) => {
	return c.html(
		<Layout title="Layout Test">
			<h1>Page with a layout</h1>
			<div>Instead of always writing the HTML boilerplate markup, this route uses a layout on the server</div>
			<div>The layout is just a basic JSX component</div>
			<hr />
			<div>Now Bootstrap is included</div>
		</Layout>
	);
});

basicRouter.get('/server-data', (c) => {
	const greetings = ["Hello", "Good Morning"]
	return c.html(
    <html>
			<head>
				<meta charset='utf-8'/>
				<title>Server Data</title>
			</head>
      <body>
				<h1>Page renders server data into the HTML</h1>
				<div>The greetings below are from the server</div>
				{/* This is a comment */}
				<ul>
					{/* And below is a loop transforming the array of greetings into an array of li's which then get put into the html */}
					{greetings.map(greeting => <li>{greeting}</li>)}
				</ul>
			</body>
    </html>
	);
});

basicRouter.get('/server-data-layout', (c) => {
	const greetings = ["Hello", "Good Morning", "Good evening"]
	return c.html(
    <Layout title="Server data with layout">
				<h1>Page renders server data into the HTML while also using a layout</h1>
				<div>This page contains data from the server, but uses a layout instead of writing out all the boilerplate HTML</div>
				<ul>
					{greetings.map(greeting => <li>{greeting}</li>)}
				</ul>
		</Layout>
	);
});

export default basicRouter