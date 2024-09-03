import { resetMap } from './map.js';
import { setOnFormSubmit, resetForm } from './form.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './util.js';
import { resetFilter } from './filter.js';

const onSendDataSuccess = () => { 
  showSuccessMessage();
  resetFilter();
  resetForm();
  resetMap();
};

const onSendDataError = () => {
  showErrorMessage();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, onSendDataError, data);
});
