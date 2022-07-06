import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis';
import { serialize } from './serialize';
import { genId } from '$services/utils';
import { itemKey } from '$services/keys';
import { deserialize } from './deserialize';

export const getItem = async (id: string) => {
	const item = await client.hGetAll(itemKey(id));

	if (!Object.keys(item).length) {
		return null;
	}
	return deserialize(id, item);
};

export const getItems = async (ids: string[]) => {
	const commands = ids.map((id) => client.hGetAll(itemKey(id)));

	const results = await Promise.all(commands);

	return results.map((result, index) => {
		if (!Object.keys(result).length) {
			return null;
		}

		return deserialize(ids[index], result);
	});
};

export const createItem = async (attrs: CreateItemAttrs) => {
	const id = genId();

	const serialized = serialize(attrs);

	await client.hSet(itemKey(id), serialized);

	return id;
};
