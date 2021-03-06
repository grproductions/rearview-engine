/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.0
 *
 * Requires: 1.2.2+
 */

!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function t(t){var l=t||window.event,i=[].slice.call(arguments,1),h=0,s=0,a=0,u=0,r=0;return t=e.event.fix(l),t.type="mousewheel",l.wheelDelta&&(h=l.wheelDelta),l.detail&&(h=-1*l.detail),l.deltaY&&(a=-1*l.deltaY,h=a),l.deltaX&&(s=l.deltaX,h=-1*s),void 0!==l.wheelDeltaY&&(a=l.wheelDeltaY),void 0!==l.wheelDeltaX&&(s=-1*l.wheelDeltaX),u=Math.abs(h),(!n||n>u)&&(n=u),r=Math.max(Math.abs(a),Math.abs(s)),(!o||o>r)&&(o=r),i.unshift(t,Math.floor(h/n),Math.floor(s/o),Math.floor(a/o)),(e.event.dispatch||e.event.handle).apply(this,i)}var n,o,l=["wheel","mousewheel","DOMMouseScroll"],i="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"];if(e.event.fixHooks)for(var h=l.length;h;)e.event.fixHooks[l[--h]]=e.event.mouseHooks;e.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var e=i.length;e;)this.addEventListener(i[--e],t,!1);else this.onmousewheel=t},teardown:function(){if(this.removeEventListener)for(var e=i.length;e;)this.removeEventListener(i[--e],t,!1);else this.onmousewheel=null}},e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})});