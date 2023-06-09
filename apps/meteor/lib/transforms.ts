type Transform<T, U extends T | Promise<T>> = (x: T) => U;

type TransformChain<T, U extends T | Promise<T>> = {
	(x: T): U;
	use(transform: Transform<T, U>): () => void;
};

export const createAsyncTransformChain = <T>(...transforms: Transform<T, Promise<T>>[]): TransformChain<T, Promise<T>> => {
	let chain = transforms;

	const call = (x: T): Promise<T> => chain.reduce((x, transform) => x.then(transform), Promise.resolve(x));

	const use = (transform: Transform<T, Promise<T>>): (() => void) => {
		chain.push(transform);

		return (): void => {
			chain = chain.filter((t) => t !== transform);
		};
	};

	return Object.assign(call, { use });
};
