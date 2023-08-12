import { Promisable } from "type-fest";

type QueueFn = () => Promisable<unknown>;

export class Queue {
  private readonly queue: QueueFn[] = [];
  private isRunning: boolean = false;

  get promise() {
    return new Promise<void>(resolve => {
      const interval = setInterval(() => {
        if (!this.isRunning) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  add(fn: QueueFn) {
    this.queue.push(fn);
    if (!this.isRunning) {
      this.__next();
    }
  }

  remove(fn: QueueFn) {
    const index = this.queue.indexOf(fn);
    if (index > -1) {
      this.queue.splice(index, 1);
    }
  }

  extend(queue: Queue) {
    queue.queue.forEach(fn => {
      this.add(fn);
      queue.remove(fn);
    });
    queue.add = this.add.bind(this);
  }

  private __next() {
    this.isRunning = true;
    const fn = this.queue.shift();
    if (fn) {
      const promise = fn();
      const res = promise instanceof Promise ? promise : Promise.resolve(promise);
      res.then(this.__next.bind(this));
    } else {
      this.isRunning = false;
    }
  }
}

export const queue = new Queue();
