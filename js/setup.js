'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

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

var createCharacter = function (name, coatColor, eyesColor) {
  var character = {};
  character.name = name;
  character.coatColor = coatColor;
  character.eyesColor = eyesColor;

  return character;
};

var createCharacters = function (num) {
  var characters = [];
  for (var i = 0; i < num; i++) {
    var name = getRandomValue(NAMES) + ' ' + getRandomValue(SURNAMES);
    var coatColor = getRandomValue(COAT_COLORS);
    var eyesColor = getRandomValue(EYES_COLORS);
    var character = createCharacter(name, coatColor, eyesColor);
    characters.push(character);
  }

  return characters;
};

var createWizard = function (character) {
  var wizard = similarWizardTemplate.cloneNode(true);
  wizard.querySelector('.setup-similar-label').textContent = character.name;
  wizard.querySelector('.wizard-coat').style.fill = character.coatColor;
  wizard.querySelector('.wizard-eyes').style.fill = character.eyesColor;

  return wizard;
};

var createWizardList = function (characters) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < characters.length; i++) {
    fragment.appendChild(createWizard(characters[i]));
  }

  return fragment;
};

var userDialog = document.querySelector('.setup');

var characters = createCharacters(4);

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

similarListElement.appendChild(createWizardList(characters));

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// события

var onUserDialogEscPress = function (evt) {
  if ((evt.keyCode === ESC_KEYCODE) && (document.activeElement !== inputUserName)) {
    evt.preventDefault();
    closeUserDialog();
  }
};

var openUserDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onUserDialogEscPress);
};

var closeUserDialog = function () {
  userDialog.classList.add('hidden');
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
var wizardFireball = document.querySelector('.setup-fireball-wrap');


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
