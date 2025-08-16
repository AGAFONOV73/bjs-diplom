"use strict"; 
const logoutBtn = new LogoutBtn();
logoutBtn.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();

function updateRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
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
      setMessage(true, 'Баланс успешно пополнен');
    } else {
      setMessage(false, `Ошибка пополнения: ${response.error}`);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      setMessage(true, 'Конвертация прошла успешно');
    } else {
      setMessage(false, `Ошибка конвертации: ${response.error}`);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      setMessage(true, 'Перевод выполнен успешно');
    } else {
      setMessage(false, `Ошибка перевода: ${response.error}`);
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
    setMessage(false, `Список избранных не загружен: ${response.error}`);
  }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.updateUsersList();
      setMessage(true, 'Пользователь добавлен в избранное');
    } else {
      setMessage(false, `Ошибка добавления: ${response.error}`);
    }
  });
};

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.updateUsersList();
      setMessage(true, 'Пользователь удалён из избранных');
    } else {
      setMessage(false, `Ошибка удаления: ${response.error}`);
    }
  });
};