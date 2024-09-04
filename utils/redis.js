/* eslint-disable linebreak-style */
const { createClient } = require("redis");
const { promisify } = require("util");

// Class to define methods for commonly used redis commands.
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on("error", (err) => console.log(err));
    this.connected = false;
    this.client.on("connect", () => {
      this.connected = true;
    });
  }

  // Check connection status and report
  isAlive() {
    return this.connected;
  }

  // Get value for given key from redis server
  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    const val = await getAsync(key);
    return val;
  }

  // Set key value pair to redis server
  async set(key, val, dur) {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, val, "EX", dur);
  }

  // del key value pair from redis server
  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
