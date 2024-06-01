import type { Child } from 'hono/jsx'
import {html,raw} from "hono/html"


//////////////////////////////////////////////
////// Props for Functional Components  //////
//////////////////////////////////////////////
interface $Layout {
	scripts: string[],
	children: Child,
	title: string,
	hydrationData: object,
}

//////////////////////////////////////////////
/////////// Functional Components  ///////////
//////////////////////////////////////////////
function Layout ({scripts, children, title, hydrationData}: $Layout) {
  return (
    <html>
			<head>
				<meta charset='utf-8'/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
				<link href="/static/css/app.css" rel="stylesheet"></link>
				<title>{title}</title>
				{html`
						<script>
							const hydrationData = ${raw(JSON.stringify(hydrationData))}
						</script>
				`}
			</head>
      <body>
				<div className="container" id="root">
					{children}
				</div>
			</body>

			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
			{scripts.map(script => <script src={script}></script>)}
    </html>
  )
}


export default Layout