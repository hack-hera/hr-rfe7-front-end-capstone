import { exposeWorker } from 'react-hooks-worker';
import api from './api.js';
import localforage from 'localforage';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetchBackgroundProducts = async (obj) => {
  if (obj && obj.current && obj.related) {
    let ids = obj.related.related_product_ids;

    let data = await localforage.getItem('data');
    let cachedIds = Object.keys(data || {}).map((x) => parseInt(x));

    console.log('cachedIds>>>', cachedIds.join('-'));
    console.log('relatedIds>>', ids.join('-'));

    for (let i = 0; i < ids.length; i++) {
      if (!cachedIds.includes(ids[i])) {
        await api.getAllData({ product_id: ids[i] });
        console.log('background-update>>', ids[i]);
        await sleep(5000);
      }
    }

    console.log('background-update>> Done');
  }
};

exposeWorker(fetchBackgroundProducts);
