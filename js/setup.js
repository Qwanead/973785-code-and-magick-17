'use strict';

(function () {

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBOLL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomValue = function (arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  };

  var createWizard = function (character) {
    var wizard = similarWizardTemplate.cloneNode(true);
    wizard.querySelector('.setup-similar-label').textContent = character.name;
    wizard.querySelector('.wizard-coat').style.fill = character.colorCoat;
    wizard.querySelector('.wizard-eyes').style.fill = character.colorEyes;

    return wizard;
  };

  var createWizardList = function (characters) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(createWizard(characters[i]));
    }

    return fragment;
  };

  var shuffleArray = function (arr) {
    var buffer;
    var rndNum;

    for (var i = 0; i < (arr.length - 1); i++) {
      rndNum = Math.floor(Math.random() * (arr.length - (i + 1))) + (i + 1);

      buffer = arr[i];
      arr[i] = arr[rndNum];
      arr[rndNum] = buffer;
    }
  };

  var renderWizards = function (wizards) {
    shuffleArray(wizards);
    similarListElement.appendChild(createWizardList(wizards));
  };

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // события

  var initialUserDialogCoords = {};

  var onUserDialogEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && (document.activeElement !== inputUserName)) {
      evt.preventDefault();
      closeUserDialog();
    }
  };

  var openUserDialog = function () {
    userDialog.classList.remove('hidden');

    initialUserDialogCoords = {
      x: userDialog.offsetLeft,
      y: userDialog.offsetTop
    };

    document.addEventListener('keydown', onUserDialogEscPress);
  };

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');

    userDialog.style.left = initialUserDialogCoords.x + 'px';
    userDialog.style.top = initialUserDialogCoords.y + 'px';

    document.removeEventListener('keydown', onUserDialogEscPress);
  };

  var changeColor = function (item, colors) {
    var color = getRandomValue(colors);

    if (item === wizardFireball) {
      item.style.background = color;
      userDialog.querySelector('input[name=fireball-color]').value = color;
    } else {
      item.style.fill = color;

      if (item === wizardCoat) {
        userDialog.querySelector('input[name=coat-color]').value = color;
      } else {
        userDialog.querySelector('input[name=eyes-color]').value = color;
      }
    }
  };

  var openButton = document.querySelector('.setup-open');
  var openIcon = document.querySelector('.setup-open-icon');
  var closeButton = userDialog.querySelector('.setup-close');
  var inputUserName = userDialog.querySelector('.setup-user-name');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');


  openButton.addEventListener('click', function () {
    openUserDialog();
  });

  openIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openUserDialog();
    }
  });

  closeButton.addEventListener('click', function () {
    closeUserDialog();
  });

  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeUserDialog();
    }
  });

  wizardCoat.addEventListener('click', function () {
    changeColor(wizardCoat, COAT_COLORS);
  });

  wizardEyes.addEventListener('click', function () {
    changeColor(wizardEyes, EYES_COLORS);
  });

  wizardFireball.addEventListener('click', function () {
    changeColor(wizardFireball, FIREBOLL_COLORS);
  });

  // перемещение UserDialog

  var dialogMoveIcon = userDialog.querySelector('.upload');

  dialogMoveIcon.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      userDialog.style.left = userDialog.offsetLeft - shift.x + 'px';
      userDialog.style.top = userDialog.offsetTop - shift.y + 'px';

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault(clickEvt);
          userDialog.removeEventListener('click', onClickPreventDefault);
        };

        userDialog.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // drag-n-drop

  var shopItem = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopItem.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var artifact = document.querySelector('.setup-artifacts');

  artifact.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifact.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });


  artifact.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifact.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  // отправка/загрузка данных

  var onSuccessSave = function () {
    userDialog.classList.add('hidden');
  };

  var onSuccessLoad = function (response) {
    renderWizards(response);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var errorAlert = document.createElement('div');
    errorAlert.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorAlert.style.position = 'absolute';
    errorAlert.style.left = 0;
    errorAlert.style.right = 0;
    errorAlert.style.fontSize = '30px';

    errorAlert.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorAlert);
  };

  var form = userDialog.querySelector('form');

  window.backend.load(onSuccessLoad, onError);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessSave, onError);
  });
})();
