import { client } from '$services/redis';
import { userLikeKey, itemKey } from '$services/keys';
import { getItems } from './items';

export const userLikesItem = async (itemId: string, userId: string) => {
	return client.sIsMember(userLikeKey(userId), itemId);
};

export const likedItems = async (userId: string) => {
	//fetch all the item ID's from the this user's liked set
	const ids = await client.sMembers(userLikeKey(userId));

	//fetch all the item hashes with those ids and return array
	return getItems(ids);
};

export const likeItem = async (itemId: string, userId: string) => {
	const inserted = await client.sAdd(userLikeKey(userId), itemId);

	if (inserted) {
		return client.hIncrBy(itemKey(itemId), 'likes', 1);
	}
};

export const unlikeItem = async (itemId: string, userId: string) => {
	const removed = await client.sRem(userLikeKey(userId), itemId);

	if (removed) {
		return client.hIncrBy(itemKey(itemId), 'likes', -1);
	}
};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => {
	const ids = await client.sInter([userLikeKey(userOneId), userLikeKey(userTwoId)]);
   
	return getItems(ids);
};
