'use strict';

import { BUCKET_COUNT } from './constants';

export default class Dump {
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