var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequire7bc7;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequire7bc7=o);var i=o("iQIUW");const r=document.querySelector(".form"),l=document.querySelector("input[name=amount]"),u=document.querySelector("input[name=delay]"),a=document.querySelector("input[name=step]");r.querySelector("button").classList.add("submit"),r.addEventListener("submit",(function(e){e.preventDefault();let t=0;const n=setInterval((function(){t<l.value?(function(e,t){const n=Math.random()>.3;return new Promise(((o,i)=>{setTimeout((()=>{n?o({position:e,delay:t}):i({position:e,delay:t})}),t)}))}(t,u.value).then((({position:e,delay:t})=>{i.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{i.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`)})),t+=1):clearInterval(n)}),a.value)}));
//# sourceMappingURL=03-promises.1801b33f.js.map
