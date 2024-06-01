import Layout from "../components/Layout";
import { Flatten, GetProps } from "./typeUtil";
type RenderOptions = {
	title: string,
	scripts?: string[]
}

// hydrate's arguments:
// 1: a functional component
// 2: props the functional component expects
// 3: options for rendering, such paths to additional scripts, or the page title
//
// hydrate passes the component to a layout, sets options within the layout and passes the props onto the client for hydration
export function hydrate<T extends (...args: any[]) => any>(Component: T, props: Flatten<GetProps<T>>, options: RenderOptions) {
	console.log(Component.name);
	return (
		<Layout hydrationData={props} title={options.title} scripts={[`/static/pages-client-js/${Component.name}.js`]}>
			<Component {...props}/>
		</Layout>
	)
}