"use strict";

function setMessage(message) {
  const messageContainer = document.querySelector('#message'); 
  if (messageContainer) {
    messageContainer.textContent = message;
    
  } 
};

const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    } else {
      setMessage('Ошибка при выходе из системы');
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  } else {
    setMessage('Не удалось получить данные профиля');
  }
});

const ratesBoard = new RatesBoard();

function updateRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      setMessage('Ошибка при получении курсов валют');
    }
  });
}

updateRates();
setInterval(updateRates, 60 * 1000); 

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      setMessage('Баланс успешно пополнен');
    } else {
      setMessage(`Ошибка пополнения: ${response.error}`);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      setMessage('Конвертация прошла успешно');
    } else {
      setMessage(`Ошибка конвертации: ${response.error}`);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      setMessage('Перевод выполнен успешно');
    } else {
      setMessage(`Ошибка перевода: ${response.error}`);
    }
  });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    favoritesWidget.updateUsersList(); 
  } else {
    setMessage('Не удалось загрузить список избранных');
  }
});

favoritesWidget.addUserCallback = (userId) => {
  ApiConnector.addUserToFavorites(userId, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.updateUsersList();
      setMessage('Пользователь добавлен в избранное');
    } else {
      setMessage(`Ошибка добавления: ${response.error}`);
    }
  });
};

favoritesWidget.removeUserCallback = (userId) => {
  ApiConnector.removeUserFromFavorites(userId, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.updateUsersList();
      setMessage('Пользователь удалён из избранных');
    } else {
      setMessage(`Ошибка удаления: ${response.error}`);
    }
  });
};