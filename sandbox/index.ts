import 'dotenv/config';
import { client } from '../src/services/redis';

//pipelining in redis
const run = async () => {
	await client.hSet('car1', {
		color: 'red',
		year: 1950
	});
	await client.hSet('car2', {
		color: 'green',
		year: 1955
	});
	await client.hSet('car3', {
		color: 'blue',
		year: 1960
	});

	const commands = [1, 2, 3].map(id => client.hGetAll('car' + id)); 

	const results = await Promise.all(commands);

	console.log(results);

	process.exit(1)
};

run();
