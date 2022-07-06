import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { userKey, usernameUniqueKey } from '$services/keys';

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
	const user = await client.hGetAll(userKey(id));

	return deserialize(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
	const id = genId();

	//see if the username is already in the set of usernames
	const exists = await client.sIsMember(usernameUniqueKey(), attrs.username);
    
	//if so throw en error 
	if(exists) {
	  throw new Error('username is taken')	
	}
	await client.hSet(userKey(id), serialize(attrs));

	await client.sAdd(usernameUniqueKey(), attrs.username);

	return id;
};

const serialize = (user: CreateUserAttrs) => ({ username: user.username, password: user.password });

const deserialize = (id: string, user: { [key: string]: string }) => ({
	id,
	username: user.username,
	password: user.password
});
