import api, { getAPICallsWithinLastMinute } from './api.js';
import localforage from 'localforage';

let id = 0;
let queue = [];

self.addEventListener(
  'message',
  async function (e) {
    id++;
    //show stats about the current local storage
    let localdata = await localforage.getItem('data');
    let cachedIds = Object.keys(localdata || {});
    let apicalls = await getAPICallsWithinLastMinute();
    let relatedIds = e.data.relatedProducts.related_product_ids;

    relatedIds.forEach((x) => {
      if (!queue.includes(x)) {
        queue.push(x);
      }
    });

    console.log(id, 'Initiating Service Worker');
    console.log('---------------------------------');
    console.log('API calls l60s : ', apicalls);
    console.log('Cached Products: ', cachedIds.length);
    console.log('Related Ids    : ', relatedIds.join(', '));
    console.log('Fetch Queue    : ', queue.join(', '));

    console.log('background job -- going to do some stuff', e.data);
    //self.postMessage('hmmm');
  },
  false
);
