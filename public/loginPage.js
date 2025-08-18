"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function (data) {
  ApiConnector.login(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(`Вход не выполнен: ${response.error}`);
    }
  });
};

userForm.registerFormCallback = function (data) {
  ApiConnector.register(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(
        `Регистрация не выполнена: ${response.error}`
      );
    }
  });
};
