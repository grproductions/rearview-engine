!function(){function e(){this.marked=[]}function t(t){return t._matchHighlightState||(t._matchHighlightState=new e)}function n(e){for(var n=t(e),r=0;r<n.marked.length;++r)n.marked[r].clear();n.marked=[]}function r(e,r,o){if(n(e),o="undefined"!=typeof o?o:i,e.somethingSelected()&&e.getSelection().replace(/^\s+|\s+$/g,"").length>=o){var a=t(e),c=e.getSelection();e.operation(function(){if(e.lineCount()<2e3)for(var t=e.getSearchCursor(c);t.findNext();)(t.from().line!==e.getCursor(!0).line||t.from().ch!==e.getCursor(!0).ch)&&a.marked.push(e.markText(t.from(),t.to(),r))})}}var i=2;CodeMirror.defineExtension("matchHighlight",function(e,t){r(this,e,t)})}();