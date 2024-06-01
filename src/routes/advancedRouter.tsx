
import { Hono } from 'hono'
import { GetProps } from '../helpers/typeUtil'

import { hydrate } from '../helpers/renderUtil'

import HomePage from "../pages/HomePage"
import CounterPage from "../pages/CounterPage"
import AccordionPage from '../pages/AccordionPage'
import GreetingsPage from '../pages/GreetingsPage'

// advanced Router uses components to render sites
// which are automatically hydrated
const advancedRouter = new Hono()
const basePath = "/advanced"

advancedRouter.get('/', (c) => {
	type ILinks = GetProps<typeof HomePage>["links"];

  const links: ILinks = [
		{text:"Counter Page", href:`${basePath}/counter`},
		{text:"Accordion Page", href:`${basePath}/accordions`},
		{text:"Greetings Page", href:`${basePath}/greetings`},
	];

	return c.html(hydrate(HomePage, {links}, {title: "My title"}));
});

advancedRouter.get('/counter', (c) => {
	const count = 1;
	return c.html(hydrate(CounterPage, {count}, {title: "Counter Page"}));
});

advancedRouter.get('/accordions', (c) => {
	return c.html(hydrate(AccordionPage, {}, {title: "Accordion Page"}));
});

advancedRouter.get('/greetings', (c) => {
	type IGreetings = GetProps<typeof GreetingsPage>["greetings"];
	const greetings:IGreetings = ["Good Morning", "Good Afternoon", "Good Night"];
	return c.html(hydrate(GreetingsPage, {greetings}, {title: "Greetings Page"}));
});

export default advancedRouter