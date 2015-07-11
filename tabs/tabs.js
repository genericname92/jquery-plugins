$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data("content-tabs"));
  this.$activeTab = this.$contentTabs.children().first();
  this.$activeTab.addClass('active');
  this.clickTab();
};

$.Tabs.prototype.clickTab = function (){
  var that = this;
  $('.tabs a').on('click', function(){
    var $currentTarget = $(event.currentTarget);
    var $newActiveTab = that.$contentTabs.find($currentTarget.attr("href"));
    that.$activeTab.removeClass('active').addClass('transitioning');

    that.$activeTab.one("transitionend", function() {
      that.$activeTab.removeClass('transitioning');
      $newActiveTab.addClass('transitioning');
      setTimeout( function() {
        $newActiveTab.removeClass('transitioning').addClass('active');
      }, 0);
      that.$activeTab = $newActiveTab;
    });
  });
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
