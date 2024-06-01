import Layout from "../components/Layout";
import { Flatten, GetProps } from "./typeUtil";
type RenderOptions = {
	title: string,
	scripts?: string[]
}

// hydrate's arguments:
// 1: a functional component
// 2: props the functional component expects
// 3: options for rendering, such as paths to additional scripts, or the page title
//
// what does hydrate do?
// it wraps the component with a layout
// sets the passed in options within the layout
// and hydrates the component
//
// what does it mean to hydrate?
// it means to pass the same data to a component on the server and on the client
// both times it is used to create the UI
// on the server the data is passed to the functional component to produce a string of HTML
// on the client the data is used to recreate the functional component and update the UI
//
// how does this app hydrate?
// the layout component takes the props data and saves it into a script tag on the page
// it therefore creates a variable hydration Data which contains the data
// <script>const hydrationData = {todos: ["todo1", "todo2"]}</script>
//
// a client component can then use this variable to recreate the state it was in when rendered on the server
export function hydrate<T extends (...args: any[]) => any>(Component: T, props: Flatten<GetProps<T>>, options: RenderOptions) {
	console.log(Component.name);
	return (
		<Layout hydrationData={props} title={options.title} scripts={[`/static/pages-client-js/${Component.name}.js`]}>
			<Component {...props}/>
		</Layout>
	)
}