export default class UserInfo {
  /**
   * Создаёт экземпляр класса с информацией о пользователе
   * @param {string} nameSelector - Селектор элемента с именем пользователя
   * @param {string} jobSelector - Селектор элемента с родом занятий пользователя
   */
  constructor({nameSelector, jobSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }


  /**
   * Метод отдаёт информацию о пользователе
   * @returns {{name: (*|string), job: (*|string)}}
   */
  getUserInfo() {
    return {name: this._name.textContent, job: this._job.textContent};
  }


  /**
   * Метод обновляет информацию о пользователе
   * @param {string} name - Имя пользователя
   * @param {string} job - Род занятий пользователя
   */
  setUserInfo({name, job}) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
