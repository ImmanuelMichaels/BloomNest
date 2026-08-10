// src/data/foods/regions.js
import { COUNTRIES } from './countries';

export const REGIONS = {
  africa: {
    id: 'africa',
    name: 'Africa',
    subregions: [
      'west_central_african',
      'east_african',
      'north_african',
      'southern_african'
    ]
  },
  asia: {
    id: 'asia',
    name: 'Asia',
    subregions: [
      'east_asian',
      'southeast_asian',
      'south_asian',
      'central_asian',
      'west_asian'
    ]
  },
  caribbean: {
    id: 'caribbean',
    name: 'Caribbean',
    subregions: [
      'jamaica',
      'trinidad_tobago',
      'barbados',
      'grenada',
      'haiti'
    ]
  },
  europe: {
    id: 'europe',
    name: 'Europe'
  },
  north_america: {
    id: 'north_america',
    name: 'North America'
  },
  latin_america: {
    id: 'latin_america',
    name: 'Latin America'
  },
  middle_east: {
    id: 'middle_east',
    name: 'Middle East'
  }
};