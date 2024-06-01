
import { Hono } from 'hono'
import { GetProps } from '../helpers/typeUtil'

import { hydrate } from '../helpers/renderUtil'

import HomePage from "../pages/HomePage"
import CounterPage from "../pages/CounterPage"
import AccordionPage from '../pages/AccordionPage'
import GreetingsPage from '../pages/GreetingsPage'

const baseRouter = new Hono()


baseRouter.get('/', (c) => {
	type ILinks = GetProps<typeof HomePage>["links"];

  const links: ILinks = [
		{text:"Counter Page", href:"/counter"},
		{text:"Accordions Page",   href:"/accordions"},
		{text:"Greetings Page",   href:"/greetings"}
	];

	return c.html(hydrate(HomePage, {links}, {title: "My title"}));
});

baseRouter.get('/counter', (c) => {
	const count = 1;
	return c.html(hydrate(CounterPage, {count}, {title: "Counter Page"}));
});

baseRouter.get('/accordions', (c) => {
	return c.html(hydrate(AccordionPage, {}, {title: "Accordion Page"}));
});

baseRouter.get('/greetings', (c) => {
	type IGreetings = GetProps<typeof GreetingsPage>["greetings"];
	const greetings:IGreetings = ["Good Morning", "Good Afternoon", "Good Night"];
	return c.html(hydrate(GreetingsPage, {greetings}, {title: "Greetings Page"}));
});

export default baseRouter