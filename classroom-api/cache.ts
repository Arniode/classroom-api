import { createClient } from 'redis';

const client = createClient({
    socket: {
        host: 'localhost',
        port: 6379,
    },
    disableOfflineQueue: false,
});

client.on('error', (err) => {
    console.log('Redis error:', err);
});

client.on('ready', () => {
    console.log('Connected to Redis successfully');
});

export async function connectRedis() {
    try {
        await client.connect();
    } catch (error) {
        console.error('Redis connection failed:', error);
        throw error;
    }
}

export default client;