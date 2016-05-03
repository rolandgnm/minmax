/// <reference path='../../typings/jquery/jquery.d.ts' />
/*eslint-env jquery */

'use strict';

var CROSS_TURN = true;
var nodes = [[],[],[]];

// TODO: var hasCross= function (elem ) {
// TODO: var resetGameField = function (positionSet);

$(document).ready(function(){
  // Initialization
  var initializeGame = function () {
    $('.field-cell').each(function (index, elem) {
      nodes[$(elem).parent().data('id')].push(0);
      if ($(elem).hasClass('cross')) { $(elem).removeClass('cross'); }
      if ($(elem).hasClass('circle')) { $(elem).removeClass('circle'); }
    });
  }
  initializeGame();


  $('.field-cell').click(function(){
    var node = $(this);
    var parentId = node.parent().data('id');
    var nodeId = node.data('id');
    console.log(parentId + ' ' + nodeId);

    if (CROSS_TURN) {
      if (node.hasClass('cross')) { node.removeClass('cross'); }
      node.addClass('circle');
    } else {
      if (node.hasClass('circle')) { node.removeClass('circle'); }
      node.addClass('cross');
    }
    CROSS_TURN = !CROSS_TURN;
    // block propagation of fast new clicks
    return false;
  });

});
