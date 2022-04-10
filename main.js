(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e){var n=e.nameSelector,r=e.jobSelector,o=e.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=document.querySelector(n),this._job=document.querySelector(r),this._avatar=document.querySelector(o)}var n,r;return n=t,(r=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,job:this._job.textContent,avatar:this._avatar.src,id:this._id}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about,r=e.avatar,o=e._id;this._name.textContent=t,this._job.textContent=n,this._avatar.src=r,this._id=o}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=t,this._container=document.querySelector(n)}var t,r;return t=e,(r=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=function(){function e(t,n,r,o,a,c){var s=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,"_likePlace",(function(){s._likeButton.classList.contains("card__btn-like_active")?s._handleRemoveCardLike(s._id,s._counterLike):s._handleCardLike(s._id,s._counterLike),s._likeButton.classList.toggle("card__btn-like_active")})),i(this,"_deletePlace",(function(){s._createPopupCardDelete(s._id,s._cardElement)})),this._id=t._id,this._owner=t.owner._id,this._placeTitle=t.name,this._imgUri=t.link,this._likes=t.likes,this._numLike=t.likes.length,this._templateSelector=n,this._handleCardClick=r,this._createPopupCardDelete=o,this._handleCardLike=a,this._handleRemoveCardLike=c}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){var e=document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0);return this._userIsCardOwner||e.querySelector(".card__btn-del").remove(),e}},{key:"_addCardListeners",value:function(){var e=this;this._cardImg.addEventListener("click",(function(){e._handleCardClick(e._placeTitle,e._imgUri)})),this._likeButton.addEventListener("click",this._likePlace),this._userIsCardOwner&&this._deleteButton.addEventListener("click",this._deletePlace)}},{key:"_checkUserIsCardOwner",value:function(e){var t=!0;return this._owner!=e&&(t=!1),t}},{key:"_checkUserLikesCard",value:function(e){return this._likes.some((function(t){return t._id===e}))}},{key:"generateCard",value:function(e){return this._userIsCardOwner=this._checkUserIsCardOwner(e),this._cardElement=this._getTemplate(),this._cardImg=this._cardElement.querySelector(".card__img"),this._likeButton=this._cardElement.querySelector(".card__btn-like"),this._deleteButton=this._cardElement.querySelector(".card__btn-del"),this._counterLike=this._cardElement.querySelector(".card__counter-like"),this._addCardListeners(),this._cardElement.querySelector(".card__title").textContent=this._placeTitle,this._cardImg.src=this._imgUri,this._cardImg.alt="Изображение места ".concat(this._placeTitle),this._numLike>0&&(this._counterLike.textContent=this._numLike),this._checkUserLikesCard(e)&&this._likeButton.classList.add("card__btn-like_active"),this._cardElement}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._boundHandleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close(),t.target.classList.contains("popup__btn-close")&&e.close()}))}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._boundHandleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._boundHandleEscClose)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=p(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},f.apply(this,arguments)}function p(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}function h(e,t){return h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},h(e,t)}function d(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _(e){return _=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},_(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=_(r);if(o){var n=_(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return d(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleForm=t,n._form=n._popup.querySelector(".form"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputValues={},this._inputList=this._form.querySelectorAll(".form__input"),this._inputList.forEach((function(t){e._inputValues[t.name]=t.value})),this._inputValues}},{key:"setEventListeners",value:function(){var e=this;f(_(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleForm(e._popup,e._getInputValues())}))}},{key:"close",value:function(){f(_(a.prototype),"close",this).call(this),this._form.reset()}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=g(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},b.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}function k(e,t){return k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},k(e,t)}function w(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}var j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._imgUri=t._popup.querySelector(".popup__place-img"),t._titleImg=t._popup.querySelector(".popup__place-title"),t}return t=a,(n=[{key:"open",value:function(e){var t=e.name,n=e.link;this._imgUri.src=n,this._imgUri.alt="Изображение места ".concat(t),this._titleImg.textContent=t,b(E(a.prototype),"open",this).call(this)}}])&&m(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function P(){return P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=S(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},P.apply(this,arguments)}function S(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}function L(e,t){return L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},L(e,t)}function I(e,t){if(t&&("object"===C(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}var R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&L(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(r);if(o){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return I(this,e)});function a(e,t,n,r){var o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(o=i.call(this,e))._handleConfirm=r,o._elementId=t,o._element=n,o._confirmButton=o._popup.querySelector(".popup__btn-confirm"),o}return t=a,(n=[{key:"setEventListeners",value:function(){var e=this;P(q(a.prototype),"setEventListeners",this).call(this),this._confirmButton.addEventListener("click",(function(t){e._handleConfirm(e,e._elementId,e._element)}))}}])&&O(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var U=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._settings=t,this._formElement=n}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._settings.inputErrorClass),n.textContent=t,n.classList.add(this._settings.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._settings.inputErrorClass),t.classList.remove(this._settings.errorClass),t.textContent=""}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._settings.inactiveButtonClass),this._buttonElement.disabled="disabled"):(this._buttonElement.classList.remove(this._settings.inactiveButtonClass),this._buttonElement.disabled="")}},{key:"_setEventListeners",value:function(){var e=this;this._inputList=Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)),this._buttonElement=this._formElement.querySelector(this._settings.submitButtonSelector),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}}])&&T(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var x,A=new(function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._options=t}var t,n;return t=e,(n=[{key:"getInitialCards",value:function(){return fetch("".concat(this._options.baseUrl,"/cards"),{headers:this._options.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"getProfileInfo",value:function(){return fetch("".concat(this._options.baseUrl,"/users/me "),{headers:this._options.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"editProfileInfo",value:function(e){var t=e.name,n=e.job;return fetch("".concat(this._options.baseUrl,"/users/me"),{method:"PATCH",headers:this._options.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"updateAvatar",value:function(e){var t=e.avatar;return fetch("".concat(this._options.baseUrl,"/users/me/avatar "),{method:"PATCH",headers:this._options.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"addCard",value:function(e){var t=e.name,n=e.link;return fetch("".concat(this._options.baseUrl,"/cards"),{method:"POST",headers:this._options.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"deleteCard",value:function(e){return fetch("".concat(this._options.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._options.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"likeCard",value:function(e){return fetch("".concat(this._options.baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._options.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"removeLikeCard",value:function(e){return fetch("".concat(this._options.baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._options.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-39",headers:{authorization:"fb780614-8b91-4a08-a132-9155c120d0f3","Content-Type":"application/json"}}),V=document.querySelector(".profile__edit-btn"),D=document.querySelector(".profile__avatar-overlay"),H=document.querySelector(".profile__add-btn"),N=document.querySelector("#input-profile-name"),J=document.querySelector("#input-profile-job"),F=new t({nameSelector:".profile__title",jobSelector:".profile__subtitle",avatarSelector:".profile__avatar"}),z=new r((function(e){z.addItem(te(e))}),".places"),M=new y(".popup_type_edit-profile",(function(e,t){ne(e,!0),A.editProfileInfo({name:t.nameProfile,job:t.jobProfile}).then((function(e){F.setUserInfo(e)})).catch((function(e){console.log(e)})),ne(e,!1),M.close()})),G=new y(".popup_type_update-avatar",(function(e,t){ne(e),A.updateAvatar({avatar:t.urlAvatar}).then((function(e){document.querySelector(".profile__avatar").src=e.avatar})).catch((function(e){console.log(e)})),G.close()})),K=new y(".popup_type_add-place",(function(e,t){var n={name:t.namePlace,link:t.urlPlaceImg};ne(e),A.addCard(n).then((function(e){z.addItem(te(e))})).catch((function(e){console.log(e)})),K.close()})),Q=new j(".popup_type_view-place"),W={};function X(e,t){Q.open({name:e,link:t})}function Y(e,t){var n=new R(".popup_type_confirm-delete",e,t,Z);n.setEventListeners(),n.open()}function Z(e,t,n){A.deleteCard(t).catch((function(e){console.log(e)})),e.close(),e=null,n.remove(),n=null}function $(e,t){A.likeCard(e).then((function(e){t.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function ee(e,t){A.removeLikeCard(e).then((function(e){0===e.likes.length?t.textContent="":t.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function te(e){return new a(e,".template__place-card",X,Y,$,ee).generateCard(F.getUserInfo().id)}function ne(e,t){var n=e.querySelector(".form__btn");t?(n.disabled="disabled",n.textContent="Сохранение..."):n.textContent="Сохранить"}V.addEventListener("click",(function(){W[formEditProfile.getAttribute("name")].resetValidation();var e=F.getUserInfo(),t=e.name,n=e.job;N.value=t,J.value=n,M.open()})),D.addEventListener("click",(function(){W[formUpdateAvatar.getAttribute("name")].resetValidation(),G.open()})),H.addEventListener("click",(function(){W[formAddPlace.getAttribute("name")].resetValidation(),K.open()})),K.setEventListeners(),M.setEventListeners(),Q.setEventListeners(),G.setEventListeners(),x={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__btn",inactiveButtonClass:"form__btn_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__error_visible"},Array.from(document.querySelectorAll(x.formSelector)).forEach((function(e){var t=new U(x,e),n=e.getAttribute("name");W[n]=t,t.enableValidation()})),A.getProfileInfo().then((function(e){F.setUserInfo(e)})).catch((function(e){console.log(e)})),A.getInitialCards().then((function(e){z.renderItems(e)})).catch((function(e){console.log(e)}))})();