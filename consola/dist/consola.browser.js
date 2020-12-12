!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).consola=e()}(this,(function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function r(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function n(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function s(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach((function(e){o(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function i(t){return function(t){if(Array.isArray(t))return l(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||a(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){if(t){if("string"==typeof t)return l(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(t,e):void 0}}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,o=new Array(e);r<e;r++)o[r]=t[r];return o}function u(t){if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=a(t))){var e=0,r=function(){};return{s:r,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,n,s=!0,i=!1;return{s:function(){o=t[Symbol.iterator]()},n:function(){var t=o.next();return s=t.done,t},e:function(t){i=!0,n=t},f:function(){try{s||null==o.return||o.return()}finally{if(i)throw n}}}}var c={};c[c.Fatal=0]="Fatal",c[c.Error=0]="Error",c[c.Warn=1]="Warn",c[c.Log=2]="Log",c[c.Info=3]="Info",c[c.Success=3]="Success",c[c.Debug=4]="Debug",c[c.Trace=5]="Trace",c[c.Silent=-1/0]="Silent",c[c.Verbose=1/0]="Verbose";var f={silent:{level:-1},fatal:{level:c.Fatal},error:{level:c.Error},warn:{level:c.Warn},log:{level:c.Log},info:{level:c.Info},success:{level:c.Success},debug:{level:c.Debug},trace:{level:c.Trace},verbose:{level:c.Trace},ready:{level:c.Info},start:{level:c.Info}};function p(t){return e=t,"[object Object]"===Object.prototype.toString.call(e)&&(!(!t.message&&!t.args)&&!t.stack);var e}var h=!1,y=[],d=function(){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};for(var o in t(this,e),this._reporters=r.reporters||[],this._types=r.types||f,this.level=void 0!==r.level?r.level:3,this._defaults=r.defaults||{},this._async=void 0!==r.async?r.async:void 0,this._stdout=r.stdout,this._stderr=r.stderr,this._mockFn=r.mockFn,this._throttle=r.throttle||1e3,this._throttleMin=r.throttleMin||5,this._types)this[o]=this._wrapLogFn(Object.assign({type:o},this._types[o],this._defaults));this._mockFn&&this.mockTypes(),this._lastLogSerialized=void 0,this._lastLog=void 0,this._lastLogTime=void 0,this._lastLogCount=0,this._throttleTimeout=void 0}return r(e,[{key:"create",value:function(t){return new e(Object.assign({reporters:this._reporters,level:this.level,types:this._types,defaults:this._defaults,stdout:this._stdout,stderr:this._stderr,mockFn:this._mockFn},t))}},{key:"withDefaults",value:function(t){return this.create({defaults:Object.assign({},this._defaults,t)})}},{key:"withTag",value:function(t){return this.withDefaults({tag:this._defaults.tag?this._defaults.tag+":"+t:t})}},{key:"addReporter",value:function(t){return this._reporters.push(t),this}},{key:"removeReporter",value:function(t){if(t){var e=this._reporters.indexOf(t);if(e>=0)return this._reporters.splice(e,1)}else this._reporters.splice(0);return this}},{key:"setReporters",value:function(t){return this._reporters=Array.isArray(t)?t:[t],this}},{key:"wrapAll",value:function(){this.wrapConsole(),this.wrapStd()}},{key:"restoreAll",value:function(){this.restoreConsole(),this.restoreStd()}},{key:"wrapConsole",value:function(){for(var t in this._types)console["__"+t]||(console["__"+t]=console[t]),console[t]=this[t]}},{key:"restoreConsole",value:function(){for(var t in this._types)console["__"+t]&&(console[t]=console["__"+t],delete console["__"+t])}},{key:"wrapStd",value:function(){this._wrapStream(this.stdout,"log"),this._wrapStream(this.stderr,"log")}},{key:"_wrapStream",value:function(t,e){var r=this;t&&(t.__write||(t.__write=t.write),t.write=function(t){r[e](String(t).trim())})}},{key:"restoreStd",value:function(){this._restoreStream(this.stdout),this._restoreStream(this.stderr)}},{key:"_restoreStream",value:function(t){t&&t.__write&&(t.write=t.__write,delete t.__write)}},{key:"pauseLogs",value:function(){h=!0}},{key:"resumeLogs",value:function(){h=!1;var t,e=u(y.splice(0));try{for(e.s();!(t=e.n()).done;){var r=t.value;r[0]._logFn(r[1],r[2])}}catch(t){e.e(t)}finally{e.f()}}},{key:"mockTypes",value:function(t){if(this._mockFn=t||this._mockFn,"function"==typeof this._mockFn)for(var e in this._types)this[e]=this._mockFn(e,this._types[e])||this[e]}},{key:"_wrapLogFn",value:function(t){return function(){if(!h)return this._logFn(t,arguments);y.push([this,t,arguments])}.bind(this)}},{key:"_logFn",value:function(t,e){var r=this;if(t.level>this.level)return!!this._async&&Promise.resolve(!1);var o=Object.assign({date:new Date,args:[]},t);1===e.length&&p(e[0])?Object.assign(o,e[0]):o.args=Array.from(e),o.message&&(o.args.unshift(o.message),delete o.message),o.additional&&(Array.isArray(o.additional)||(o.additional=o.additional.split("\n")),o.args.push("\n"+o.additional.join("\n")),delete o.additional),o.type="string"==typeof o.type?o.type.toLowerCase():"",o.tag="string"==typeof o.tag?o.tag.toLowerCase():"";var n=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=r._lastLogCount-r._throttleMin;if(r._lastLog&&e>0){var n=i(r._lastLog.args);e>1&&n.push("(repeated ".concat(e," times)")),r._log(s(s({},r._lastLog),{},{args:n})),r._lastLogCount=1}if(t){if(r._lastLog=o,r._async)return r._logAsync(o);r._log(o)}};clearTimeout(this._throttleTimeout);var a=this._lastLogTime?o.date-this._lastLogTime:0;if(this._lastLogTime=o.date,a<this._throttle)try{var l=JSON.stringify([o.type,o.tag,o.args]),u=this._lastLogSerialized===l;if(this._lastLogSerialized=l,u&&(this._lastLogCount++,this._lastLogCount>this._throttleMin))return void(this._throttleTimeout=setTimeout(n,this._throttle))}catch(t){}n(!0)}},{key:"_log",value:function(t){var e,r=u(this._reporters);try{for(r.s();!(e=r.n()).done;){e.value.log(t,{async:!1,stdout:this.stdout,stderr:this.stderr})}}catch(t){r.e(t)}finally{r.f()}}},{key:"_logAsync",value:function(t){var e=this;return Promise.all(this._reporters.map((function(r){return r.log(t,{async:!0,stdout:e.stdout,stderr:e.stderr})})))}},{key:"stdout",get:function(){return this._stdout||console._stdout}},{key:"stderr",get:function(){return this._stderr||console._stderr}}]),e}();d.prototype.add=d.prototype.addReporter,d.prototype.remove=d.prototype.removeReporter,d.prototype.clear=d.prototype.removeReporter,d.prototype.withScope=d.prototype.withTag,d.prototype.mock=d.prototype.mockTypes,d.prototype.pause=d.prototype.pauseLogs,d.prototype.resume=d.prototype.resumeLogs;var g,v=function(){function e(r){t(this,e),this.options=Object.assign({},r),this.defaultColor="#7f8c8d",this.levelColorMap={0:"#c0392b",1:"#f39c12",3:"#00BCD4"},this.typeColorMap={success:"#2ecc71"}}return r(e,[{key:"log",value:function(t){var e=t.level<1?console.__error||console.error:1===t.level&&console.warn?console.__warn||console.warn:console.__log||console.log,r="log"!==t.type?t.type:"",o=t.tag?t.tag:"",n=this.typeColorMap[t.type]||this.levelColorMap[t.level]||this.defaultColor,s="\n      background: ".concat(n,";\n      border-radius: 0.5em;\n      color: white;\n      font-weight: bold;\n      padding: 2px 0.5em;\n    "),a="%c".concat([o,r].filter(Boolean).join(":"));"string"==typeof t.args[0]?e.apply(void 0,["".concat(a,"%c ").concat(t.args[0]),s,""].concat(i(t.args.slice(1)))):e.apply(void 0,[a,s].concat(i(t.args)))}}]),e}();return"undefined"!=typeof window&&window.consola||((g=new d({reporters:[new v]})).Consola=d,g.LogLevel=c,g.BrowserReporter=v,g)}));
