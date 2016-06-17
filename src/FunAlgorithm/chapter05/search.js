'use strict';

import _ from 'lodash';
import { BUCKET_COUNT } from './constants';
import Dump from './dump';

export default class Search {
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