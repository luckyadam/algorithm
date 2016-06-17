'use strict';

export default class State {
  constructor (buckets) {
    this.buckets = buckets;
  }
  
  set (index, bucket) {
    this.buckets[index] = bucket;
  }
  
  get (index) {
    return this.buckets[index];
  }
  
  getResult () {
    return this.buckets.map((item) => item.water);
  }
}