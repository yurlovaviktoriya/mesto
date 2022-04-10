export default class UserInfo {
  /**
   * Создаёт экземпляр класса с информацией о пользователе
   * @param {string} nameSelector - Селектор элемента с именем пользователя
   * @param {string} jobSelector - Селектор элемента с родом занятий пользователя
   * @param {string} avatarSelector - Селектор элемента с аватаром пользователя
   */
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }


  /**
   * Метод отдаёт информацию о пользователе
   * @returns {{name: (*|string), job: (*|string), avatar: (*|string), id: (*|string)}}
   */
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
      id: this._id
    };
  }


  /**
   * Метод обновляет информацию о пользователе
   * @param {string} name - Имя пользователя
   * @param {string} job - Род занятий пользователя
   * @param {string} avatar - Ссылка на аватар пользователя
   * @param {string} id - Идентификатор пользователя
   */
  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}
