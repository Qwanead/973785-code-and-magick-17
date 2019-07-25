'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var LINE_SPACING = 20;
  var PADDING_LEFT = 50;
  var HEIGHT_STATS = 150;
  var WIDTH_COLUMN = 40;
  var COLUMN_GAP = 50;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var renderStatColumn = function (ctx, x, y, height, name, time) {
    ctx.textBaseline = 'top';
    ctx.fillText(Math.round(time), x, y);
    if (name === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
    }
    ctx.fillRect(x, y + LINE_SPACING, WIDTH_COLUMN, height);
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(name, x, y + height + LINE_SPACING * 2);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');

    ctx.fillStyle = 'black';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + PADDING_LEFT, CLOUD_Y + LINE_SPACING);
    ctx.fillText('Список результатов:', CLOUD_X + PADDING_LEFT, CLOUD_Y + LINE_SPACING * 2);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      var heightColumn = HEIGHT_STATS * times[i] / maxTime;

      renderStatColumn(ctx, CLOUD_X + PADDING_LEFT + i * (WIDTH_COLUMN + COLUMN_GAP), CLOUD_Y + LINE_SPACING * 3 + HEIGHT_STATS - heightColumn, heightColumn, names[i], times[i]);
    }
  };
})();
