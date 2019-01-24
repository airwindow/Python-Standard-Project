!function(a){"use strict";function b(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function f(a,c){this.button=a,this.options=b({},this.options),b(this.options,c),this._init()}Modernizr.addTest("csstransformspreserve3d",function(){var d,b=Modernizr.prefixed("transformStyle"),c="preserve-3d";return!!b&&(b=b.replace(/([A-Z])/g,function(a,b){return"-"+b.toLowerCase()}).replace(/^ms-/,"-ms-"),Modernizr.testStyles("#modernizr{"+b+":"+c+";}",function(c,e){d=a.getComputedStyle?getComputedStyle(c,null).getPropertyValue(b):""}),d===c)});var c={transitions:Modernizr.csstransitions,transforms3d:Modernizr.csstransforms3d&&Modernizr.csstransformspreserve3d},d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},e=d[Modernizr.prefixed("transition")];f.prototype.options={statusTime:1500},f.prototype._init=function(){this._validate(),this._create(),this._initEvents()},f.prototype._validate=function(){null===this.button.getAttribute("data-style")&&this.button.setAttribute("data-style","fill"),null===this.button.getAttribute("data-vertical")&&null===this.button.getAttribute("data-horizontal")&&this.button.setAttribute("data-horizontal",""),c.transforms3d||null===this.button.getAttribute("data-perspective")||(this.button.removeAttribute("data-perspective"),this.button.setAttribute("data-style","fill"),this.button.removeAttribute("data-vertical"),this.button.setAttribute("data-horizontal",""))},f.prototype._create=function(){var a=document.createElement("span");a.className="content",a.innerHTML=this.button.innerHTML;var b=document.createElement("span");b.className="progress";var c=document.createElement("span");if(c.className="progress-inner",b.appendChild(c),this.button.innerHTML="",null!==this.button.getAttribute("data-perspective")){var d=document.createElement("span");d.className="progress-wrap",d.appendChild(a),d.appendChild(b),this.button.appendChild(d)}else this.button.appendChild(a),this.button.appendChild(b);this.progress=c,null!==this.button.getAttribute("data-horizontal")?this.progressProp="width":null!==this.button.getAttribute("data-vertical")&&(this.progressProp="height"),this._enable()},f.prototype._setProgress=function(a){this.progress.style[this.progressProp]=100*a+"%"},f.prototype._initEvents=function(){var a=this;this.button.addEventListener("click",function(){a.button.setAttribute("disabled",""),classie.remove(a.progress,"notransition"),classie.add(this,"state-loading"),setTimeout(function(){if("function"==typeof a.options.callback)a.options.callback(a);else{a._setProgress(1);var b=function(d){c.transitions&&d.propertyName!==a.progressProp||(this.removeEventListener(e,b),a._stop())};c.transitions?a.progress.addEventListener(e,b):b.call()}},"fill"===a.button.getAttribute("data-style")||"top-line"===a.button.getAttribute("data-style")||"lateral-lines"===a.button.getAttribute("data-style")?0:200)})},f.prototype._stop=function(a){var b=this;setTimeout(function(){b.progress.style.opacity=0;var d=function(a){c.transitions&&"opacity"!==a.propertyName||(this.removeEventListener(e,d),classie.add(b.progress,"notransition"),b.progress.style[b.progressProp]="0%",b.progress.style.opacity=1)};if(c.transitions?b.progress.addEventListener(e,d):d.call(),"number"==typeof a){var f=a>=0?"state-success":"state-error";classie.add(b.button,f),setTimeout(function(){classie.remove(b.button,f),b._enable()},b.options.statusTime)}else b._enable();classie.remove(b.button,"state-loading")},100)},f.prototype._enable=function(){this.button.removeAttribute("disabled")},a.ProgressButton=f}(window);