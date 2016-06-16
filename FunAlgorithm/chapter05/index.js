'use strict';

const _ = require('lodash');

const BUCKET_COUNT = 3; // 水桶数目

const BUCKET_EIGHT = 1; // 8升水桶
const BUCKET_FIVE = 2; // 5升水桶
const BUCKET_THREE = 3; // 3升水桶

class Bucket {
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

class Dump {
  static canTakeDumpAction (source, dest) {
    if (source.num >= 1 && source.num <= BUCKET_COUNT 
      && dest.num >= 1 && dest.num <= BUCKET_COUNT) {
       if (source.num !== dest.num 
        && !source.isEmpty() 
        && !dest.isFull()) {
        return true;
      }
    }
    return false;
  }
  
  static dumpWater (source, dest) {
    let dumpedWater = Math.min(dest.max - dest.water, source.water);
    source.reduce(dumpedWater);
    dest.add(dumpedWater);
  }
}

class Search {
  constructor (states) {
    this.states = states;
    this.count = 0;
    this.steps = [];
  }
  
  isStateExist (state) {
    return this.states.some((item) => item.getResult().join('|') === state.getResult().join('|'));
  }
  
  isFinal (state) {
    let result = state.getResult();
    return result[0] === 4 && result[1] === 4;
  }
  
  print () {
    let result = this.states.map((state) => '[' + state.getResult().join(',') + ']');
    this.steps.push({
      'step': result.join('->'),
      'num': result.length - 1
    });
    console.log('第' + this.count + '种解法：' + result.join('->') + '，需要' + (result.length - 1) + '步！');
    console.log();
  }
  
  start () {
    let currentState = this.states[this.states.length - 1];
    
    if (this.isFinal(currentState)) {
      this.count++;
      this.print();
      return;
    }
    for (let j = 0; j < BUCKET_COUNT; j++) {
      for (let i = 0; i < BUCKET_COUNT; i++) {
        var currentStateCopy = _.cloneDeep(currentState);
        let source = currentStateCopy.get(i);
        let dest = currentStateCopy.get(j);
        if (Dump.canTakeDumpAction(source, dest)) {
          Dump.dumpWater(source, dest);
          if (!this.isStateExist(currentStateCopy)) {
            this.states.push(currentStateCopy);
            this.start();
            this.states.pop();
          }
        }
      }
    }
    if (this.states.length === 1) {
      let best = this.steps.sort((v1, v2) => v1.num - v2.num)[0];
      console.log('最优解为' + best.step + '，需要' + best.num +  '步！');
    }
  }
}


class State {
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

const main = () => {
  let bucket1 = new Bucket(BUCKET_EIGHT, 8, 8);
  let bucket2 = new Bucket(BUCKET_FIVE, 0, 5);
  let bucket3 = new Bucket(BUCKET_THREE, 0, 3);

  let states = [];

  let initialState = new State([bucket1, bucket2, bucket3]);
  states.push(initialState);
  let search = new Search(states);
  search.start();
}

main();