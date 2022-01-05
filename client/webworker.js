import { exposeWorker } from 'react-hooks-worker';
import api from './api.js';

const fetchBackgroundProducts = async (obj) => {
  var req = indexedDB.open('mydb', 1);

  if (obj && obj.current && obj.related) {
    let ids = obj.related.related_product_ids;

    console.log('background update: ', ids);

    for (let i = 0; i < ids.length; i++) {
      console.log(i, ids[i]);
    }
  }
};

exposeWorker(fetchBackgroundProducts);
