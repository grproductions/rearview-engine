/*!
 * jQuery UI Effects Fade 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fade-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */

!function(e){e.effects.effect.fade=function(t,a){var f=e(this),i=e.effects.setMode(f,t.mode||"toggle");f.animate({opacity:i},{queue:!1,duration:t.duration,easing:t.easing,complete:a})}}(jQuery);