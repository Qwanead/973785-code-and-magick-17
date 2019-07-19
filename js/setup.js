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

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var characters = createCharacters(4);

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var fragment = document.createDocumentFragment();

for (var i = 0; i < characters.length; i++) {
  fragment.appendChild(createWizard(characters[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
