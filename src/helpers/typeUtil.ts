// flatten takes complicated types and simplifies them
export type Flatten<T> = T extends object ? { [K in keyof T]: Flatten<T[K]> } : T;

// A functional component is a function, where the first argument is an object
// This object is called props.
//
// In this example the props object has the following type: {children: JSX.Element[], message: string}
// function Error({children, message}: {children: JSX.Element[], message: string}) {
// 	return (
// 		<div>
// 			<div>{message}</div>
// 			<div>{children}</div>
// 		</div>
// 	)
// }
//
// GetProps takes a functional component and gets its props excluding children
// For the Error component above, GetProps would return {message: string}
export type GetProps<T extends (...args:any)=>any> = 
	Parameters<T> extends never[]
		? Record<any, never>
		: Omit<Parameters<T>[0], "children">
;

