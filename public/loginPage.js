"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function (data) {
  ApiConnector.login(
    {
      login: data.login,
      password: data.password,
    },
    (response) => {
      console.log("Ответ сервера при входе:", response);
      location.reload();
    }
  );
};

userForm.registerFormCallback = function (data) {
  ApiConnector.register(
    {
      login: data.login,
      password: data.password,
    },
    (response) => {
      console.log("Ответ сервера при регистрации:", response);
      location.reload();
    }
  );
};
