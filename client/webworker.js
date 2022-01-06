import { exposeWorker } from 'react-hooks-worker';
import api, { getAPICallsWithinLastMinute } from './api.js';
import localforage from 'localforage';

const queue = [];

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

console.log('web worker!');

const fetchBackgroundProducts = async (obj) => {
  if (obj && obj.current && obj.related) {
    let ids = obj.related.related_product_ids;

    ids.forEach((x) => {
      if (!queue.includes(x)) {
        queue.unshift(x);
      }
    });

    console.log(queue);

    while (queue.length > 0) {
      await sleep(1000);
      let id = queue.pop();
      console.log(id);
    }
  }

  // if (obj && obj.current && obj.related) {
  //   let ids = obj.related.related_product_ids;

  //   let data = await localforage.getItem('data');
  //   let cachedIds = Object.keys(data || {}).map((x) => parseInt(x));

  //   console.log('cachedIds>>>(' + cachedIds.length + ')', cachedIds.join('-'));
  //   console.log('relatedIds>>', ids.join('-'));

  //   for (let i = 0; i < ids.length; i++) {
  //     if (!cachedIds.includes(ids[i])) {
  //       let apicalls;
  //       do {
  //         apicalls = await getAPICallsWithinLastMinute();
  //         console.log('api calls: ', apicalls);
  //         await sleep(5000);
  //       } while (apicalls > 50);

  //       console.log('background-update>>', ids[i]);
  //       await api.getAllData({ product_id: ids[i] });
  //     }
  //   }

  //   console.log('background-update>> Done');
  // }
};

exposeWorker(fetchBackgroundProducts);
