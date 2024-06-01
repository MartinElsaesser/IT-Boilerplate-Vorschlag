import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'
import { Flatten, GetProps } from '../helpers/typeUtil';

// Define hydration Data
declare var hydrationData:  Flatten<GetProps<typeof HomePage>>;

// HomePage Props
type $HomePage = {
	links: {text: string, href: string}[]
}

// Export HomePage
export default function HomePage({links}: $HomePage){
  return (
		<>
			<h1>Home Page</h1>
			<ul>
				{links.map((link) => {
					return (
						<li>
							<a href={link.href} class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{link.text}</a>
						</li>
					)
				})}
			</ul>
		</>
  )
}


// Hydrate HomePage
void function hydrate_in_browser() {
	if(typeof document !== "undefined") {
		const root = document.getElementById('root')
		render(<HomePage {...hydrationData} />, root!)
	}
}()
