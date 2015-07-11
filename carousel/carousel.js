$.Carousel = function(el){
  this.$el = $(el);
  this.$items = $(this.$el.data("items"));
  this.activeIdx = 0;
  this.$activeItem = this.$items.children().eq(this.activeIdx);
  this.$activeItem.addClass('active');
  this.setSliders();
};

$.Carousel.prototype.setSliders = function () {
  var that = this;
  $('.slide-left').on('click', function(){
    that.slideLeft();
  });
  $('.slide-right').on("click", function(){
    that.slideRight();
  });
};
$.Carousel.prototype.slideLeft = function(){
  this.slide(1);
};

$.Carousel.prototype.slideRight = function(){
  this.slide(-1);
};

$.Carousel.prototype.slide = function(dir){
  var that = this;
  this.activeIdx = (dir + this.activeIdx) % this.$items.children().length;
  var $newActiveItem = this.$items.children().eq(this.activeIdx);

  if( dir === 1) {
    $(".left").removeClass('active').removeClass('left').removeClass('right');
    $newActiveItem.addClass('active').addClass('right');

    that.$activeItem.addClass('left');
    setTimeout(function(){
      $newActiveItem.removeClass('right');
    },0);
  } else if (dir === -1) {
    $(".right").removeClass('active').removeClass('right').removeClass('left');
    $newActiveItem.addClass('active').addClass('left');

    that.$activeItem.addClass('right');
    setTimeout(function(){
      $newActiveItem.removeClass('left');
    },0);
  }

  this.$activeItem = $newActiveItem;

};


$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
