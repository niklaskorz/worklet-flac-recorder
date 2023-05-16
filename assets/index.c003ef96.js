const be=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerpolicy&&(l.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?l.credentials="include":r.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}};be();function $(){}function pe(e){return e()}function se(){return Object.create(null)}function j(e){e.forEach(pe)}function ge(e){return typeof e=="function"}function ye(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let z;function ue(e,t){return z||(z=document.createElement("a")),z.href=t,e===z.href}function ke(e){return Object.keys(e).length===0}function i(e,t){e.appendChild(t)}function b(e,t,n){e.insertBefore(t,n||null)}function m(e){e.parentNode.removeChild(e)}function a(e){return document.createElement(e)}function h(e){return document.createTextNode(e)}function w(){return h(" ")}function R(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function N(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function we(e){return Array.from(e.childNodes)}let X;function x(e){X=e}const O=[],fe=[],T=[],ae=[],Ce=Promise.resolve();let J=!1;function Se(){J||(J=!0,Ce.then(_e))}function Q(e){T.push(e)}const K=new Set;let D=0;function _e(){const e=X;do{for(;D<O.length;){const t=O[D];D++,x(t),Ee(t.$$)}for(x(null),O.length=0,D=0;fe.length;)fe.pop()();for(let t=0;t<T.length;t+=1){const n=T[t];K.has(n)||(K.add(n),n())}T.length=0}while(O.length);for(;ae.length;)ae.pop()();J=!1,K.clear(),x(e)}function Ee(e){if(e.fragment!==null){e.update(),j(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Q)}}const $e=new Set;function ve(e,t){e&&e.i&&($e.delete(e),e.i(t))}function Ae(e,t,n,o){const{fragment:r,on_mount:l,on_destroy:c,after_update:s}=e.$$;r&&r.m(t,n),o||Q(()=>{const f=l.map(pe).filter(ge);c?c.push(...f):j(f),e.$$.on_mount=[]}),s.forEach(Q)}function Le(e,t){const n=e.$$;n.fragment!==null&&(j(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Me(e,t){e.$$.dirty[0]===-1&&(O.push(e),Se(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Oe(e,t,n,o,r,l,c,s=[-1]){const f=X;x(e);const u=e.$$={fragment:null,ctx:null,props:l,update:$,not_equal:r,bound:se(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(f?f.$$.context:[])),callbacks:se(),dirty:s,skip_bound:!1,root:t.target||f.$$.root};c&&c(u.root);let y=!1;if(u.ctx=n?n(e,t.props||{},(_,C,...S)=>{const E=S.length?S[0]:C;return u.ctx&&r(u.ctx[_],u.ctx[_]=E)&&(!u.skip_bound&&u.bound[_]&&u.bound[_](E),y&&Me(e,_)),C}):[],u.update(),y=!0,j(u.before_update),u.fragment=o?o(u.ctx):!1,t.target){if(t.hydrate){const _=we(t.target);u.fragment&&u.fragment.l(_),_.forEach(m)}else u.fragment&&u.fragment.c();t.intro&&ve(e.$$.fragment),Ae(e,t.target,t.anchor,t.customElement),_e()}x(f)}class Re{$destroy(){Le(this,1),this.$destroy=$}$on(t,n){const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(t){this.$$set&&!ke(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function Ne(e){let t;return{c(){t=a("p"),t.textContent="Loading..."},m(n,o){b(n,t,o)},p:$,d(n){n&&m(t)}}}function xe(e){let t,n,o,r,l=e[6].sampleRate+"",c,s,f,u,y,_,C,S,E,B,U,P,v,p,q,Y,Z,ee,F,A,te,ne,oe,re,I,L,le,G,M,H,ce;function ie(d,g){return d[4]?Be:je}let W=ie(e),k=W(e);return{c(){t=a("h1"),t.textContent="Flac Recorder",n=w(),o=a("p"),r=h("Sample rate: "),c=h(l),s=a("br"),f=h(`
      Bits per sample: `),u=h(V),y=a("br"),_=h(`
      Buffer size: `),C=h(me),S=a("br"),E=h(`
      Compression level: `),B=h(he),U=a("br"),P=w(),v=a("label"),p=a("input"),q=h(`
        Auto gain control`),Y=w(),Z=a("br"),ee=w(),F=a("label"),A=a("input"),te=h(`
        Echo cancellation`),ne=w(),oe=a("br"),re=w(),I=a("label"),L=a("input"),le=h(`
        Noise suppression`),G=w(),M=a("p"),k.c(),N(p,"type","checkbox"),N(A,"type","checkbox"),N(L,"type","checkbox")},m(d,g){b(d,t,g),b(d,n,g),b(d,o,g),i(o,r),i(o,c),i(o,s),i(o,f),i(o,u),i(o,y),i(o,_),i(o,C),i(o,S),i(o,E),i(o,B),i(o,U),i(o,P),i(o,v),i(v,p),p.checked=e[0],i(v,q),i(o,Y),i(o,Z),i(o,ee),i(o,F),i(F,A),A.checked=e[1],i(F,te),i(o,ne),i(o,oe),i(o,re),i(o,I),i(I,L),L.checked=e[2],i(I,le),b(d,G,g),b(d,M,g),k.m(M,null),H||(ce=[R(p,"change",e[10]),R(A,"change",e[11]),R(L,"change",e[12])],H=!0)},p(d,g){g&1&&(p.checked=d[0]),g&2&&(A.checked=d[1]),g&4&&(L.checked=d[2]),W===(W=ie(d))&&k?k.p(d,g):(k.d(1),k=W(d),k&&(k.c(),k.m(M,null)))},d(d){d&&m(t),d&&m(n),d&&m(o),d&&m(G),d&&m(M),k.d(),H=!1,j(ce)}}}function je(e){let t,n,o;return{c(){t=a("button"),t.textContent="Start"},m(r,l){b(r,t,l),n||(o=R(t,"click",e[7]),n=!0)},p:$,d(r){r&&m(t),n=!1,o()}}}function Be(e){let t,n,o;return{c(){t=a("button"),t.textContent="Stop"},m(r,l){b(r,t,l),n||(o=R(t,"click",e[8]),n=!0)},p:$,d(r){r&&m(t),n=!1,o()}}}function de(e){let t,n,o,r,l;return{c(){t=a("h2"),t.textContent="Result",n=w(),o=a("p"),r=a("audio"),ue(r.src,l=e[5])||N(r,"src",l),r.controls=!0},m(c,s){b(c,t,s),b(c,n,s),b(c,o,s),i(o,r)},p(c,s){s&32&&!ue(r.src,l=c[5])&&N(r,"src",l)},d(c){c&&m(t),c&&m(n),c&&m(o)}}}function Ue(e){let t,n;function o(s,f){return s[3]?xe:Ne}let r=o(e),l=r(e),c=e[5]&&de(e);return{c(){t=a("main"),l.c(),n=w(),c&&c.c()},m(s,f){b(s,t,f),l.m(t,null),i(t,n),c&&c.m(t,null)},p(s,[f]){r===(r=o(s))&&l?l.p(s,f):(l.d(1),l=r(s),l&&(l.c(),l.m(t,n))),s[5]?c?c.p(s,f):(c=de(s),c.c(),c.m(t,null)):c&&(c.d(1),c=null)},i:$,o:$,d(s){s&&m(t),l.d(),c&&c.d()}}}const Pe=!1,V=24,me=8192,he=5;function qe(e,t,n){let o=!0,r=!0,l=!0,c=!1,s=!1,f=new AudioContext,u,y,_;const C=new Worker("/worklet-flac-recorder/workers/encoder.js");C.addEventListener("message",p=>{p.data.type==="done"&&(console.log("Encoding complete"),n(5,_=URL.createObjectURL(p.data.blob)))});async function S(){await f.audioWorklet.addModule("/worklet-flac-recorder/workers/recorder.worklet.js"),u=new AudioWorkletNode(f,"recorder"),u.port.onmessage=q=>{q.data.type==="done"&&(n(4,s=!1),console.log("Recorder stopped"))},u.connect(f.destination);let p;n(9,y=await navigator.mediaDevices.getUserMedia({audio:{autoGainControl:o,echoCancellation:r,noiseSuppression:l},video:!1})),p=f.createMediaStreamSource(y),p.connect(u),n(3,c=!0)}S();async function E(){const p=new MessageChannel;u.port.postMessage({type:"start",bufferSize:me,bitsPerSample:V},[p.port1]),C.postMessage({type:"start",sampleRate:f.sampleRate,bitsPerSample:V,compression:he},[p.port2]),n(4,s=!0)}function B(){u==null||u.port.postMessage({type:"stop"})}function U(){o=this.checked,n(0,o)}function P(){r=this.checked,n(1,r)}function v(){l=this.checked,n(2,l)}return e.$$.update=()=>{e.$$.dirty&527&&c&&!Pe&&(console.log("Reconfiguring audio:",{autoGainControl:o,echoCancellation:r,noiseSuppression:l}),y.getAudioTracks()[0].applyConstraints({autoGainControl:o,echoCancellation:r,noiseSuppression:l}))},[o,r,l,c,s,_,f,E,B,y,U,P,v]}class Fe extends Re{constructor(t){super(),Oe(this,t,qe,Ue,ye,{})}}new Fe({target:document.getElementById("app")});
