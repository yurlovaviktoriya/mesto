export default class UserInfo {
  /**
   * Создаёт экземпляр класса с информацией о пользователе
   * @param {string} nameSelector - Селектор элемента с именем пользователя
   * @param {string} jobSelector - Селектор элемента с родом занятий пользователя
   */
  constructor({nameSelector, jobSelector}) {
    this._name = document.querySelector(nameSelector).textContent;
    this._job = document.querySelector(jobSelector).textContent;
  }


  /**
   * Метод отдаёт информацию о пользователе
   * @returns {{name: (*|string), job: (*|string)}}
   */
  getUserInfo() {
    return {name: this._name, job: this._job};
  }


  /**
   * Метод обновляет информацию о пользователе
   * @param {string} name - Имя пользователя
   * @param {string} job - Род занятий пользователя
   */
  setUserInfo({name, job}) {
    this._name = name;
    this._job = job;
    const profileInfo = document.querySelector('.profile__info');
    profileInfo.querySelector('.profile__title').textContent = this._name;
    profileInfo.querySelector('.profile__subtitle').textContent = this._job;
  }
}
