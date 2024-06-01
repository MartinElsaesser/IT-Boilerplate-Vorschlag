import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'
import { Flatten, GetProps } from '../helpers/typeUtil';

// Define hydration Data
declare var hydrationData:  Flatten<GetProps<typeof GreetingsPage>>;

// GreetingsPage Props
export default function GreetingsPage({greetings: server_greetings}: {greetings:string[]}){
	const [greetings, setGreetings] = useState(server_greetings);
	const [newGreeting, setNewGreeting] = useState("");

	function addMessages() {
		setNewGreeting("");
		setGreetings([...greetings, newGreeting])
	}

	function handleInput(e: InputEvent) {
		const el = e.target as HTMLInputElement;
		setNewGreeting(el.value);
	}


  return (
		<>
			<h1>Greetings Page</h1>
			<h4 class="font-weight-normal">This Page lists greetings, add new ones below</h4>
			<div className="d-flex w-100">
				<input value={newGreeting} onInput={handleInput} onKeyPress={e => e.key == "Enter" && addMessages()} class="w-75 d-block" type="text" placeholder="Enter a greeting"/>
				<button class="btn btn-primary btn-sm ms-auto" onClick={e => addMessages()}>Add greeting</button>
			</div>
			<ul>
				{greetings.map((message) => {
					return <li>{message}</li>
				})}
			</ul>
		</>
  )
}

// Hydrate GreetingsPage
void function hydrate_in_browser() {
	if(typeof document !== "undefined") {
		const root = document.getElementById('root')
		render(<GreetingsPage {...hydrationData} />, root!)
	}
}()
