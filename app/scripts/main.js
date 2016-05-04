/// <reference path='../../typings/jquery/jquery.d.ts' />
/*eslint-env jquery */

'use strict';

var CROSS_TURN = true;
var nodesMatrix = [[],[],[]];


$(document).ready(function(){
  // Initialization
  initializeGame();


  $('.field-cell').on('click', function () {
    var nodeId = getNodeId(this);

    if( !nodesMatrix[nodeId.i][nodeId.j] ) {
      var $elem = $(this);

      if (CROSS_TURN) {
        if ($elem.hasClass('cross')) { $elem.removeClass('cross'); }
        $elem.addClass('circle');
        nodesMatrix[nodeId.i][nodeId.j] = 1;
      } else {
        if ($elem.hasClass('circle')) { $elem.removeClass('circle'); }
        $elem.addClass('cross');
        nodesMatrix[nodeId.i][nodeId.j] = -1;
      }
    CROSS_TURN = !CROSS_TURN;
   }
    //block propagation of new clicks
    return false;
  }
  );

});

var markNodeById = function (positionI, positionJ, CSSclass ) {
  $(getNodeById(positionI, positionJ)).addClass(CSSclass);
}

var getNodeById = function (positionI, positionJ) {
   return $('.field-row')
            .find('[data-id="'+ positionI + '"]')
            .children('.field-cell')
            .find('[data-id="'+ positionj + '"]')
}

var getNodeId = function (DOMelem) {
  // i for line, j for column.
  return {
    i: $(DOMelem).parent().data('id')
    ,j: $(DOMelem).data('id')
  }
}

var initializeGame = function () {
    $('.field-cell').each(function (index, DOMelem) {
      nodesMatrix[$(DOMelem).parent().data('id')].push(0);
      if ($(DOMelem).hasClass('cross')) { $(DOMelem).removeClass('cross'); }
      if ($(DOMelem).hasClass('circle')) { $(DOMelem).removeClass('circle'); }
    });

}
