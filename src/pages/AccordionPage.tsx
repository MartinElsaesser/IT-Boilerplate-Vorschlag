import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'
import { Flatten, GetProps } from '../helpers/typeUtil';
import Accordion from '../components/Accordion';

// Define hydration Data
declare var hydrationData:  Flatten<GetProps<typeof AccordionPage>>;

// Pass data to AccordionPage, could also be done through a prop
const accordion1 = [
	{heading: "Accordion Item #1", body: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."},
	{heading: "Accordion Item #2", body: "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."},
	{heading: "Accordion Item #3", body: "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."}
];
const accordion2 = [
	{heading: "H1", body: "B1"}, {heading: "H2", body: "B2"}, {heading: "H3", body: "B3"}
];

// Export AccordionPage
export default function AccordionPage(){

  return (
		<>
			<h1>Accordion Page</h1>
			<Accordion accordionItems={accordion1}/>
			<Accordion accordionItems={accordion2}/>
		</>
  )
}


// Hydrate AccordionPage
void function hydrate_in_browser() {
	if(typeof document !== "undefined") {
		const root = document.getElementById('root')
		render(<AccordionPage {...hydrationData} />, root!)
	}
}()