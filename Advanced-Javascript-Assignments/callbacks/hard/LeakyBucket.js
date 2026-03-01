// Problem Description – Leaky Bucket Rate Limiter
//
// You are required to implement a RateLimiter based on the Leaky Bucket algorithm.
//
// The rate limiter has a fixed capacity and processes tasks at a constant rate.
// Tasks are executed in the exact order they are received.
//
// Requirements:
// 1. The bucket has a maximum capacity
// 2. Tasks are processed at a fixed interval (leak rate)
// 3. If the bucket is full, new tasks must be rejected immediately
// 4. Fairness must be preserved (FIFO execution)

      /**DONE */
class LeakyBucket {
  constructor(capacity, leakRateMs) {
    this.capacity = capacity;
    this.leakRate = leakRateMs;
    this.tasks = [];
    this.running = false;
  }

  add(task, onComplete) {

    if (this.tasks.length >= this.capacity) {
      onComplete(new Error("Rate Limit Exceeded"));
      return;
    }

    this.tasks.push([task, onComplete]);

    if (!this.running) {
      this.running = true;
      this._process();
    }
  }

  _process() {
    if (this.tasks.length === 0) {
      this.running = false;
      return;
    }

    const [task, onComplete] = this.tasks[0];

    task((err, val) => {
      if (err) onComplete(err);
      else onComplete(null, val);

      this.tasks.shift();

      setTimeout(() => this._process(), this.leakRate);
    });
  }
}

module.exports = LeakyBucket;