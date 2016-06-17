'use strict';

export default class Bucket {
  constructor (num, water, max) {
    this.num = num;
    this.water = water;
    this.max = max;
  }
  
  add (water) {
    this.water += water;
  }
  
  reduce (water) {
    this.water -= water;
  }
  
  isEmpty () {
    return this.water <= 0;
  }
  
  isFull () {
    return this.water >= this.max;
  }
}