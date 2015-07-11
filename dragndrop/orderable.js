$.Orderable = function (el, options) {
  var order = this;
  this.$el = $(el);
  this.draggable = this.$el.children();
  this.draggable.each(function(){
    $(this).mousedown(function(event){
      order.hold(event);
    });
  });
};

$.Orderable.prototype.hold = function (event) {
  var $target = $(event.currentTarget);
  var order = this;
  var originalPos = $target.offset(); //this is the top left corner
  var width = $target.width();
  var height = $target.height();
  var originalMousePos = [event.pageY, event.pageX];
  this.makeAbsolute($target);
  $(document).mousemove(function(event){
    order.moveThing(event, $target);
  });
  $target.mouseup(function(event){
    $(document).off("mousemove");
    order.reposition(event, $target);
  })

};

$.Orderable.prototype.moveThing = function (event, $target) {
  $target.css({top: event.pageY, left: event.pageX})
};

$.Orderable.prototype.makeAbsolute = function($el){
  var pos = $el.offset();
  $el.css({ position: "absolute",
      marginLeft: 0, marginTop: 0,
      top: pos.top, left: pos.left });
};

$.Orderable.prototype.reposition = function(event, $target){
  var draggedPos = [$target.offset().top, $target.offset().left];
  var bestEl;
  var bestOffset = [600, 600];
  this.draggable.each(function(){
    var pic = $(this);
    var sibTop = pic.offset().top;
    var sibLeft =  pic.offset().left;
    if ((Math.abs(bestOffset[0]) +
      Math.abs(bestOffset[1]) > Math.abs(draggedPos[0] - sibTop) + Math.abs(draggedPos[1] - sibLeft)) && pic.attr("id") != $target.attr("id")){
      bestEl = pic;
      bestOffset = [draggedPos[0] - sibTop, draggedPos[1] - sibLeft];
    }
  });
  $target.insertBefore(bestEl);
  $target.removeAttr('style');
}

$.fn.orderable = function (options) {
  this.each(function () {
    new $.Orderable(this, options);
  });
};
