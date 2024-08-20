const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      'https://25.javascript.htmlacademy.pro/keksobooking/data'
    );

    if (!response.ok) {
      throw new Error('Не удалось загрузить объявления');
    }

    const offers = await response.json();    
    return onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://25.javascript.htmlacademy.pro/keksobooking',
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export { getData, sendData };
