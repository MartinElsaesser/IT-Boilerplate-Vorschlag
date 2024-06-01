import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'
import { GetProps } from '../helpers/typeUtil';


// Define hydration Data
declare var hydrationData:  GetProps<typeof CounterPage>;


// CounterPage Props
type $CounterPage = {
	count: number
}

// Export CounterPage
export default function CounterPage({count}: $CounterPage) {
  var [count, setCount] = useState(count)
  return (
    <div>
      <p>Count: {count}</p>
      <button class="btn btn-primary" onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// Hydrate CounterPage
void function hydrate_in_browser() {
	if(typeof document !== "undefined") {
		const root = document.getElementById('root')
		render(<CounterPage {...hydrationData} />, root!)
	}
}()