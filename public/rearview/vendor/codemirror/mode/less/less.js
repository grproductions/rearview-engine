CodeMirror.defineMode("less",function(t){function e(t,e){return l=e,t}function r(t){for(var e=0;e<c.length;e++)if(t===c[e])return!0}function n(t,n){var o=t.next();if("@"==o)return t.eatWhile(/[\w\-]/),e("meta",t.current());if("/"==o&&t.eat("*"))return n.tokenize=i,i(t,n);if("<"==o&&t.eat("!"))return n.tokenize=s,s(t,n);if("="==o)e(null,"compare");else{if("|"==o&&t.eat("="))return e(null,"compare");if('"'==o||"'"==o)return n.tokenize=u(o),n.tokenize(t,n);if("/"==o){if(t.eat("/"))return n.tokenize=a,a(t,n);if("string"==l||"("==l)return e("string","string");if(void 0!=n.stack[n.stack.length-1])return e(null,o);if(t.eatWhile(/[\a-zA-Z0-9\-_.\s]/),/\/|\)|#/.test(t.peek()||t.eatSpace()&&")"==t.peek())||t.eol())return e("string","string")}else{if("!"==o)return t.match(/^\s*\w*/),e("keyword","important");if(/\d/.test(o))return t.eatWhile(/[\w.%]/),e("number","unit");if(/[,+<>*\/]/.test(o))return"="==t.peek()||"a"==l?e("string","string"):e(null,"select-op");if(!/[;{}:\[\]()~\|]/.test(o)){if("."==o)return"("==l||"string"==l?e("string","string"):(t.eatWhile(/[\a-zA-Z0-9\-_]/)," "==t.peek()&&t.eatSpace(),")"==t.peek()?e("number","unit"):e("tag","tag"));if("#"==o)return t.eatWhile(/[A-Za-z0-9]/),4==t.current().length||7==t.current().length?null!=t.current().match(/[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}/,!1)?t.current().substring(1)!=t.current().match(/[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}/,!1)?e("atom","tag"):(t.eatSpace(),/[\/<>.(){!$%^&*_\-\\?=+\|#'~`]/.test(t.peek())?e("atom","tag"):"}"==t.peek()?e("number","unit"):/[a-zA-Z\\]/.test(t.peek())?e("atom","tag"):t.eol()?e("atom","tag"):e("number","unit")):(t.eatWhile(/[\w\\\-]/),e("atom","tag")):(t.eatWhile(/[\w\\\-]/),e("atom","tag"));if("&"==o)return t.eatWhile(/[\w\-]/),e(null,o);if(t.eatWhile(/[\w\\\-_%.{]/),"string"==l)return e("string","string");if(null!=t.current().match(/(^http$|^https$)/))return t.eatWhile(/[\w\\\-_%.{:\/]/),e("string","string");if("<"==t.peek()||">"==t.peek())return e("tag","tag");if(/\(/.test(t.peek()))return e(null,o);if("/"==t.peek()&&void 0!=n.stack[n.stack.length-1])return e("string","string");if(t.current().match(/\-\d|\-.\d/))return e("number","unit");if(r(t.current().toLowerCase()))return e("tag","tag");if(/\/|[\s\)]/.test(t.peek()||t.eol()||t.eatSpace()&&"/"==t.peek())&&-1!==t.current().indexOf("."))return"{"==t.current().substring(t.current().length-1,t.current().length)?(t.backUp(1),e("tag","tag")):(t.eatSpace(),/[{<>.a-zA-Z\/]/.test(t.peek())||t.eol()?e("tag","tag"):e("string","string"));if(t.eol()||"["==t.peek()||"#"==t.peek()||"tag"==l)return"{"==t.current().substring(t.current().length-1,t.current().length)&&t.backUp(1),e("tag","tag");if("compare"==l||"a"==l||"("==l)return e("string","string");if("|"==l||"-"==t.current()||"["==l)return e(null,o);if(":"==t.peek()){t.next();var c=":"==t.peek()?!0:!1;if(c)t.backUp(1);else{var g=t.pos,p=t.current().length;t.eatWhile(/[a-z\\\-]/);var m=t.pos;if(null!=t.current().substring(p-1).match(f))return t.backUp(m-(g-1)),e("tag","tag");t.backUp(m-(g-1))}return c?e("tag","tag"):e("variable","variable")}return e("variable","variable")}if(":"==o)return t.eatWhile(/[a-z\\\-]/),f.test(t.current())?e("tag","tag"):":"==t.peek()?(t.next(),t.eatWhile(/[a-z\\\-]/),t.current().match(/\:\:\-(o|ms|moz|webkit)\-/)?e("string","string"):f.test(t.current().substring(1))?e("tag","tag"):e(null,o)):e(null,o);if("~"!=o)return e(null,o);if("r"==l)return e("string","string")}}}function a(t,r){return t.skipToEnd(),r.tokenize=n,e("comment","comment")}function i(t,r){for(var a,i=!1;null!=(a=t.next());){if(i&&"/"==a){r.tokenize=n;break}i="*"==a}return e("comment","comment")}function s(t,r){for(var a,i=0;null!=(a=t.next());){if(i>=2&&">"==a){r.tokenize=n;break}i="-"==a?i+1:0}return e("comment","comment")}function u(t){return function(r,a){for(var i,s=!1;null!=(i=r.next())&&(i!=t||s);)s=!s&&"\\"==i;return s||(a.tokenize=n),e("string","string")}}var l,o=t.indentUnit,c="a abbr acronym address applet area article aside audio b base basefont bdi bdo big blockquote body br button canvas caption cite code col colgroup command datalist dd del details dfn dir div dl dt em embed fieldset figcaption figure font footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins keygen kbd label legend li link map mark menu meta meter nav noframes noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strike strong style sub summary sup table tbody td textarea tfoot th thead time title tr track tt u ul var video wbr".split(" "),f=/(^\:root$|^\:nth\-child$|^\:nth\-last\-child$|^\:nth\-of\-type$|^\:nth\-last\-of\-type$|^\:first\-child$|^\:last\-child$|^\:first\-of\-type$|^\:last\-of\-type$|^\:only\-child$|^\:only\-of\-type$|^\:empty$|^\:link|^\:visited$|^\:active$|^\:hover$|^\:focus$|^\:target$|^\:lang$|^\:enabled^\:disabled$|^\:checked$|^\:first\-line$|^\:first\-letter$|^\:before$|^\:after$|^\:not$|^\:required$|^\:invalid$)/;return{startState:function(t){return{tokenize:n,baseIndent:t||0,stack:[]}},token:function(t,e){if(t.eatSpace())return null;var r=e.tokenize(t,e),n=e.stack[e.stack.length-1];return"hash"==l&&"rule"==n?r="atom":"variable"==r&&("rule"==n?r=null:n&&"@media{"!=n||(r="when"==t.current()?"variable":/[\s,|\s\)|\s]/.test(t.peek())?"tag":l)),"rule"==n&&/^[\{\};]$/.test(l)&&e.stack.pop(),"{"==l?"@media"==n?e.stack[e.stack.length-1]="@media{":e.stack.push("{"):"}"==l?e.stack.pop():"@media"==l?e.stack.push("@media"):"{"==n&&"comment"!=l&&e.stack.push("rule"),r},indent:function(t,e){var r=t.stack.length;return/^\}/.test(e)&&(r-="rule"==t.stack[t.stack.length-1]?2:1),t.baseIndent+r*o},electricChars:"}"}}),CodeMirror.defineMIME("text/x-less","less"),CodeMirror.mimeModes.hasOwnProperty("text/css")||CodeMirror.defineMIME("text/css","less");