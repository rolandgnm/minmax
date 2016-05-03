/// <reference path='../../typings/jquery/jquery.d.ts' />
/*eslint-env jquery */

'use strict';

var CROSS_TURN = true;

// TODO: var hasCross= function (elem ) {
// TODO: var resetGameField = function (positionSet);

$(document).ready(function(){
  // Initialization




  $('.field-cell').click(function(){
    console.log(this);
    var node = $(this);
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
