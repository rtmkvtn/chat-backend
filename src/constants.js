const constants = {
  errors: {
    NO_USER: 'Пользователь с данным id не найден.',
    NO_DOC: 'The document with requested id not found.',
    DUPL_EMAIL: 'Пользователь с таким email уже зарегистрирован.',
    DUPL_NAME: 'The user with this userName already exists',
    AUTHORIZATION_ERROR: 'Wrong user name or password.',
    NO_RIGHTS_DOC: 'У вас нет прав на изменение данного документа.',
    NOT_FOUND: 'Requested resource not found.',
    NO_AUTH: 'Authorization is required!',
  },
};

module.exports = Object.freeze(constants);
