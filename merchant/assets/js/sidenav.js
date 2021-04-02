/* ========================================================================
 * sidenav.js
 * ======================================================================== */

+function ($) {
  'use strict';

  // SIDEBAR PUBLIC CLASS DEFINITION
  // ================================

  var SideNav = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, SideNav.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  SideNav.DEFAULTS = {
    toggle: true
  }

  SideNav.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('sidenav-open')) return


    var startEvent = $.Event('show.bs.sidenav')
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return

    this.$element
      .addClass('sidenav-open')

    this.transitioning = 1

    var complete = function () {
      this.$element
      this.transitioning = 0
      this.$element.trigger('shown.bs.sidenav')
    }

    if(!$.support.transition) return complete.call(this)

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(400)
  }

  SideNav.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('sidenav-open')) return

    var startEvent = $.Event('hide.bs.sidenav')
    this.$element.trigger(startEvent)
    if(startEvent.isDefaultPrevented()) return

    this.$element
      .removeClass('sidenav-open')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.sidenav')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(400)
  }

  SideNav.prototype.toggle = function () {
    this[this.$element.hasClass('sidenav-open') ? 'hide' : 'show']()
  }

  var old = $.fn.sidenav

  $.fn.sidenav = function (option) {
    return this.each(function (){
      var $this = $(this)
      var data = $this.data('bs.sidenav')
      var options = $.extend({}, SideNav.DEFAULTS, $this.data(), typeof options == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.sidenav', (data = new SideNav(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.sidenav.Constructor = SideNav

  $.fn.collapse.noConflict = function () {
    $.fn.sidenav = old
    return this
  }

  $(document).on('click.bs.sidenav.data-api', '[data-toggle="sidenav"]', function (e) {
    var $this = $(this), href
    var target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')
    var $target = $(target)
    var data = $target.data('bs.sidenav')
    var option = data ? 'toggle' : $this.data()

    $target.sidenav(option)
  })

  $('html').on('click.bs.sidenav.autohide', function(event){
    var $this = $(event.target);
    var isButtonOrSidebar = $this.is('.sidenav, [data-toggle="sidenav"]') || $this.parents('.sidenav, [data-toggle="sidenav"]').length;
    if (isButtonOrSidebar) {
      return;
    } else {
      var $target = $('.sidenav');
      $target.each(function(i, trgt) {
        var $trgt = $(trgt);
        if($trgt.data('bs.sidenav') && $trgt.hasClass('sidenav-open')) {
            $trgt.sidenav('hide');
        }
      })
    }
  });
}(jQuery);
