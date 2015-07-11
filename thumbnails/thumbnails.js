$.Thumbnails = function(el){
  this.$el = $(el);
  this.$gutterImages = $(this.$el.data("gutter-images"));
  this.$activeImage = $(this.$gutterImages.children().first());
  this.activate(this.$activeImage);
  this.setHovers();
  this.setActiveImage();
  this.killHovers();
  this.gutterIdx = 0;
  this.$images = this.$gutterImages.children();
  this.fillGutterImages(this.$images);
  this.setNav();
};

$.Thumbnails.prototype.activate = function($img){
  var activeImageSrc = $img.attr("src");
  var $bigImage = $('.active img').attr("src", activeImageSrc);
};

$.Thumbnails.prototype.setActiveImage = function(){
  var that = this;
  $(".gutter-images").on("click", "img", function(event){
    var $currentTarget = $(event.currentTarget);
    that.$activeImage = $currentTarget;
  });

};
$.Thumbnails.prototype.setHovers = function () {
  var that = this;
  $(".gutter-images").on("mouseenter", "img", function(event){
    var $currentTarget = $(event.currentTarget);
    that.activate($currentTarget);
  });
};

$.Thumbnails.prototype.killHovers = function () {
  var that = this;
  $(".gutter-images").on("mouseleave", "img", function(event){
    that.activate(that.$activeImage);
  });
};

$.Thumbnails.prototype.fillGutterImages = function() {
  $('.in-gutter').removeClass('in-gutter');
  for(var i = this.gutterIdx; i < this.gutterIdx + 5; i++ ){
    this.$images.eq(i).addClass('in-gutter');
  }
};

$.Thumbnails.prototype.setNav = function() {
  var that = this;
  $('.nav.left').on('click', function(){
    if (that.gutterIdx > 0){
      that.gutterIdx--;
      that.fillGutterImages(that.$images);
    }
  });

  $('.nav.right').on('click', function(){
    if (that.gutterIdx < that.$images.length - 5){
      that.gutterIdx++;
      that.fillGutterImages(that.$images);
    }
  });
};

$.fn.thumbnails = function () {
  var that = this;
  var $images;
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
