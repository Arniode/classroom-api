import { createClient } from 'redis';

const client = createClient({
    socket: {
        host: 'localhost',
        port: 6379,
    },
    disableOfflineQueue: false,
    RESP: 2
} as any);

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
        console.log('Redis connection failed:', error);
    }
}

export default client;