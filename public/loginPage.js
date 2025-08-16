"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    
    ApiConnector.login(data, (response) => {
        if(response.success) {
          console.log("Вход успешный")
          location.reload();
        } else {
          setLoginErrorMessage(`Вход не выполнен: ${response.error}`);
        }
    }
);
};
    
    userForm.registerFormCallback = function(data) {
        ApiConnector.register(data, (response) => {
            if(response.success) {
              console.log("Регистрация успешная")
              location.reload();
            } else {
              setRegisterErrorMessage(`Регистрация не выполнена: ${response.error}`);
            }
           }
        );
    };  
    