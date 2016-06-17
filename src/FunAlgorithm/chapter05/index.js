'use strict';

import { BUCKET_EIGHT, BUCKET_FIVE, BUCKET_THREE } from './constants';
import Bucket from './bucket';
import State from './state';
import Search from './search';

const main = () => {
  let bucket1 = new Bucket(BUCKET_EIGHT, 8, 8);
  let bucket2 = new Bucket(BUCKET_FIVE, 0, 5);
  let bucket3 = new Bucket(BUCKET_THREE, 0, 3);

  let states = [];

  let initialState = new State([bucket1, bucket2, bucket3]);
  states.push(initialState);
  let search = new Search(states);
  search.start();
};

main();