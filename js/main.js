'use strict';
import './page-status.js';
import { setObjectsOnMap, resetMap } from './map.js';
import { setOnFormSubmit, resetForm } from './form.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage, showAlert } from './util.js';
import { turnFilterOn, filterObjects, setOnFilters, resetFilter } from './filter.js';

const onGetDataSuccess = (data) => {
  turnFilterOn(data);
  setObjectsOnMap(filterObjects());
  setOnFilters(setObjectsOnMap);
};  

const onSendDataSuccess = () => { 
  showSuccessMessage();
  resetForm();
  resetMap();
  resetFilter();
};

const onSendDataError = () => {
  showErrorMessage();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, onSendDataError, data);
});

getData(onGetDataSuccess, showAlert);