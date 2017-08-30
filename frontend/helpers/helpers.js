import * as _ from 'lodash';

export const capitalize = str => {
  return str.split(' ').map( w => w[0].toUpperCase() + w.slice(1) ).join(' ');
};

export const propContains = (props, id) => {
  return props !== null && props[id];
};

export const queryStringFrom = obj => {
  return _.keys(obj).map( k => `${k}=${obj[k]}` ).join('&');
};