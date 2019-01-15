(function(global){'use strict';
var g = this;
function k(a, b) {
  a = a.split(".");
  var c = g;
  a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
  for (var d; a.length && (d = a.shift());) {
    a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b;
  }
}
;const m = (a) => {
  a %= 360;
  return 0 > 360 * a ? a + 360 : a;
};
var n = (a, b) => a + b * -a;
const p = navigator.userAgent.match(/iPhone/i) && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
class q {
  constructor(a) {
    this.el = a || document.body;
    this.b = this.v = !1;
    this.c = 0;
    this.touches = [];
    this.el.addEventListener("touchstart", this.h.bind(this), !1);
    this.el.addEventListener("touchmove", this.f.bind(this), !1);
    this.el.addEventListener("touchend", this.a.bind(this), !1);
  }
  h(a) {
    this.b = this.v = !0;
    this.c = (new Date).getTime();
    var b = a.changedTouches[0];
    this.touches = [a.timeStamp, b.pageX, b.pageY];
  }
  f(a) {
    var b = this.touches, c = a.changedTouches[0];
    if (20 < Math.abs(c.pageX - b[1]) || 20 < Math.abs(c.pageY - b[2])) {
      this.v = !1;
    }
    if (this.b) {
      if (b.push(a.timeStamp, c.pageX, c.pageY), +new Date > b[0] + 100) {
        this.b = !1;
      } else {
        var d = a.timeStamp;
        b = b.filter((a, b, c) => c[b - b % 3] > d - 250);
        1 >= b.length / 3 || 60 > Math.pow(b[1] - b[b.length - 2], 2) + Math.pow(b[2] - b[b.length - 1], 2) || (c = m(180 * Math.atan2(b[b.length - 1] - b[2], b[b.length - 2] - b[1]) / Math.PI), b = "swipeRight", 45 < c && 135 > c ? b = "swipeDown" : 135 < c && 225 > c ? b = "swipeLeft" : 225 < c && 315 > c && (b = "swipeUp"), (c = document.createEvent("Event")) && c.initEvent(b, !0, !0), a.target.dispatchEvent(c), this.b = !1);
      }
    }
  }
  a(a) {
    if (this.v) {
      var b = this.touches, c = a.changedTouches[0];
      if (20 < Math.abs(c.pageX - b[1]) || 20 < Math.abs(c.pageY - b[2])) {
        this.v = !1;
      } else {
        var d = (new Date).getTime() - this.c;
        (b = document.createEvent("Event")) && b.initEvent(800 < d ? "longTap" : "tap", !0, !0);
        a = a.target;
        p && (a = document.elementFromPoint(c.pageX - window.pageXOffset, c.pageY - window.pageYOffset));
        a.dispatchEvent(b);
      }
    }
  }
}
;let u = Math.floor(2147483648 * Math.random());
const v = {}, w = {};
let x;
const y = "click mouseover mouseout mousemove mousedown mouseup scroll keyup keypress focus touchstart touchmove touchend tap longtap doubletap press pan swipe swipeTop swipeRight swipeBottom swipeLeft".split(" "), ba = (a) => {
  a.m = a.target;
  let b = z(a.target);
  var c = !1;
  do {
    if (c) {
      break;
    }
    a.targetEl = a.m;
    {
      c = b;
      var d = a;
      let e = !1;
      for (let a = 0; a < c.length; a++) {
        let b = c[a], h = b && b.events && b.events[d.type];
        if (!h) {
          continue;
        }
        let t = Object.keys(h);
        if (!1 === aa(b, d, h, t)) {
          e = !0;
          break;
        }
      }
      c = e;
    }
  } while ((a.m = a.m.parentNode) && a.m != document.body);
}, A = () => {
  y.forEach((a) => document.body.addEventListener(a, ba));
  x = new q;
  (new MutationObserver(() => {
    for (let a in w) {
      w[a].render() && delete w[a];
    }
  })).observe(document.body, {childList:!0, subtree:!0});
};
document.body ? A() : document.addEventListener("DOMContentLoaded", A);
const ca = (() => {
  const a = document.createElement("div");
  return (b) => {
    a.innerHTML = b.trim();
    return a.removeChild(a.firstChild);
  };
})(), z = (a) => {
  let b = a, c = [], d, e;
  if (e = b.Y) {
    return e.split(",").forEach((a) => c.push(v[a])), c;
  }
  e = [];
  do {
    if (d = v[b.id]) {
      c.push(d), e.push(b.id);
    }
  } while (b = b.parentNode);
  a.Y = e.join(",");
  return c;
}, aa = (a, b, c, d) => {
  let e = !0;
  d.forEach((d) => {
    b.m.matches && b.m.matches(d) && (e = c[d].call(a, b, v[b.m.id]));
  });
  return e;
}, da = new RegExp(`^(${y.join("|")}) (.*)`);
function ea(a) {
  const b = a.constructor.prototype;
  if (!b.events) {
    var c = {};
    Object.getOwnPropertyNames(b).map((a) => da.exec(a)).filter((a) => a).forEach(([b, e, h]) => {
      c[e] = c[e] || {};
      c[e][h] = a[b];
    });
    b.events = c;
  }
}
var B = {get P() {
  return x;
}};
/*
 EventEmitter3

 https://www.github.com/primus/eventemitter3

 Copyright (c) 2014 Arnout Kazemier
*/
function C() {
  this.b = new D;
  this.D = 0;
}
var F = "~";
function D() {
}
Object.create && (D.prototype = Object.create(null), (new D).__proto__ || (F = !1));
function fa(a, b, c) {
  this.g = a;
  this.context = b;
  this.once = c || !1;
}
function G(a, b, c, d, e) {
  if ("function" !== typeof c) {
    throw new TypeError("The listener must be a function");
  }
  c = new fa(c, d || a, e);
  b = F ? F + b : b;
  a.b[b] ? a.b[b].g ? a.b[b] = [a.b[b], c] : a.b[b].push(c) : (a.b[b] = c, a.D++);
  return a;
}
function H(a, b) {
  0 === --a.D ? a.b = new D : delete a.b[b];
}
C.prototype.o = function(a, b, c, d, e, h) {
  var f = F ? F + a : a;
  if (this.b[f]) {
    f = this.b[f];
    var r = arguments.length, t;
    if (f.g) {
      f.once && this.H(a, f.g);
      switch(r) {
        case 1:
          f.g.call(f.context);
          return;
        case 2:
          f.g.call(f.context, b);
          return;
        case 3:
          f.g.call(f.context, b, c);
          return;
        case 4:
          f.g.call(f.context, b, c, d);
          return;
        case 5:
          f.g.call(f.context, b, c, d, e);
          return;
        case 6:
          f.g.call(f.context, b, c, d, e, h);
          return;
      }
      var l = 1;
      for (t = Array(r - 1); l < r; l++) {
        t[l - 1] = arguments[l];
      }
      f.g.apply(f.context, t);
    } else {
      var ha = f.length;
      for (l = 0; l < ha; l++) {
        switch(f[l].once && this.H(a, f[l].g), r) {
          case 1:
            f[l].g.call(f[l].context);
            break;
          case 2:
            f[l].g.call(f[l].context, b);
            break;
          case 3:
            f[l].g.call(f[l].context, b, c);
            break;
          case 4:
            f[l].g.call(f[l].context, b, c, d);
            break;
          default:
            if (!t) {
              var E = 1;
              for (t = Array(r - 1); E < r; E++) {
                t[E - 1] = arguments[E];
              }
            }
            f[l].g.apply(f[l].context, t);
        }
      }
    }
  }
};
C.prototype.I = function(a, b) {
  G(this, a, b, void 0, !1);
};
C.prototype.once = function(a, b, c) {
  return G(this, a, b, c, !0);
};
C.prototype.H = function(a, b) {
  a = F ? F + a : a;
  if (this.b[a]) {
    if (b) {
      var c = this.b[a];
      if (c.g) {
        c.g !== b || !c.once || H(this, a);
      } else {
        for (var d = 0, e = [], h = c.length; d < h; d++) {
          c[d].g === b && c[d].once || e.push(c[d]);
        }
        e.length ? this.b[a] = 1 === e.length ? e[0] : e : H(this, a);
      }
    } else {
      H(this, a);
    }
  }
};
C.prototype.F = function() {
  this.b = new D;
  this.D = 0;
};
class I extends C {
  constructor() {
    super();
    this.U = (u++).toString(36);
    this.w = this.c = null;
    this.h = !1;
    v[this.id] = this;
    this.rendered || (w[this.id] = this);
    this.events || ea(this);
  }
  get id() {
    return this.U;
  }
  get el() {
    let a = this.c;
    a || (a = this.c = document.getElementById(this.id) || ca(this.toString()));
    return a;
  }
  G() {
    return `$1 id="${this.id}"`;
  }
  toString() {
    if (this.w) {
      return this.w;
    }
    var a = /^(<[^>]+)/, b = this.template().trim();
    if (!b.match(a)) {
      throw Error("Template needs to start with a valid tag.");
    }
    return this.w = b = b.replace(/\s+/, " ").replace(a, this.G());
  }
  $$(a) {
    let b = [], c = this.el;
    c && (b = [...c.querySelectorAll(a)]);
    return b;
  }
  $(a) {
    let b = null, c = this.c;
    c && (b = void 0 == a ? c : c.querySelector(a));
    return b;
  }
  render(a, b) {
    if (this.h) {
      return !0;
    }
    if (!this.c) {
      var c = document.getElementById(this.id);
      if (!c && !a) {
        return !1;
      }
      if (c && (a = c.parentElement, !b)) {
        return this.c = c, this.h = !0, this.onAfterRender(), !0;
      }
      b = b ? b : a && a.children.length - 1 || -1;
      b = a && a.children[b];
      a && a.insertBefore(this.el, b || null);
      this.h = !0;
    }
    this.onAfterRender();
    return !0;
  }
  get rendered() {
    if (!this.h) {
      var a = document.getElementById(this.id);
      a && (this.c = a, this.h = !0, this.onAfterRender());
    }
    return this.h;
  }
  onAfterRender() {
  }
  template() {
    return "<div></div>";
  }
  dispose() {
    delete v[this.id];
    delete w[this.id];
    this.F();
    this.c && this.c.parentNode && this.c.parentNode.removeChild(this.c);
    this.c = null;
  }
  get events() {
  }
}
I.prototype.dispose = I.prototype.dispose;
I.prototype.template = I.prototype.template;
I.prototype.onAfterRender = I.prototype.onAfterRender;
I.prototype.render = I.prototype.render;
I.prototype.$ = I.prototype.$;
I.prototype.$$ = I.prototype.$$;
I.prototype.toString = I.prototype.toString;
class J extends I {
  constructor() {
    super();
  }
  render(a = document.body, b = 0) {
    this.index = b;
    return super.render(a);
  }
  onAfterRender() {
    super.onAfterRender();
    this.el.style.zIndex = this.index;
    this.el.style.transform = `translate3d(0, 0, ${this.index}px)`;
  }
  onActivation() {
  }
  template() {
    return "\n<view></view>\n";
  }
  G() {
    return `$1 id="${this.id}" view`;
  }
  static get WIDTH() {
    if (J.b) {
      return J.b;
    }
    var a = window.getComputedStyle(document.body, null);
    J.b = parseInt(a && a.width || 0, 10);
    return J.b;
  }
}
J.prototype.onActivation = J.prototype.onActivation;
J.prototype.index = 0;
J.prototype.index = J.prototype.index;
J.prototype.supportsBackGesture = !1;
J.prototype.supportsBackGesture = J.prototype.supportsBackGesture;
J.prototype.hasSidebar = !1;
J.prototype.hasSidebar = J.prototype.hasSidebar;
class K {
  constructor(a) {
    this.history = [];
    this.c = [];
    this.b = L;
    this.s = this.currentView = this.f = null;
    this.a = 0;
    this.i = !1;
    this.o = void 0;
    a && (this.o = a);
  }
  l() {
    this.i = !0;
    if (this.o instanceof J) {
      var a = this.o;
      if (a.rendered) {
        this.f = a.el;
      } else {
        throw Error("View Manager's root is not rendered yet");
      }
    } else {
      this.f = this.o || document.body;
    }
    this.H();
  }
  getLastViewInHistory() {
    return this.history[this.history.length - 1] || null;
  }
  pull(a, b) {
    this.i || this.l();
    !a.rendered && this.f && a.render(this.f, this.h += 2);
    var c = this.currentView;
    if (!c) {
      return this.setCurrentView(a);
    }
    if (b) {
      this.history.push(c);
      const a = () => {
        c.el.style.transitionDuration = "0s";
        c.el.style.transform = "translate3d(-100%,-100%,0)";
        c.el.removeEventListener("transitionend", a);
      };
      c.el.addEventListener("transitionend", a);
    } else {
      var d = this.history.slice(0);
      this.history = [];
      setTimeout(() => {
        c.dispose();
        d.forEach((a) => a.dispose());
      }, 1000);
    }
    a.el.style.transitionDuration = "0s";
    a.el.style.transform = `translate3d(100%, 0, ${a.index}px)`;
    requestAnimationFrame(() => {
      c.el.style.transitionDuration = "0.35s";
      a.el.style.transitionDuration = "0.35s";
      requestAnimationFrame(() => {
        a.el.style.transform = `translate3d(0, 0, ${a.index}px)`;
        c.el.style.transform = `translate3d(-30%, 0, ${c.index}px)`;
        a.el.style.boxShadow = "0 0 24px black";
      });
    });
    this.currentView = a;
    this.currentView.onActivation && this.currentView.onActivation();
    this.b = L;
  }
  canGoBack() {
    return this.history && 0 < this.history.length;
  }
  push() {
    var a = this.history.pop(), b = this.currentView;
    a && (this.i || this.l(), window.requestAnimationFrame(() => {
      b.el.style.transitionDuration = "0s";
      a.el.style.transitionDuration = "0s";
      a.el.style.transform = "translate3d(-30%,0,0)";
      window.requestAnimationFrame(() => {
        a.el.style.transitionDuration = "0.35s";
        b.el.style.transitionDuration = "0.35s";
        a.el.style.transform = `translate3d(0, 0, ${a.index}px)`;
        b.el.style.transform = `translate3d(100%, 0, ${b.index}px)`;
        b.el.style.boxShadow = "0 0 0 black";
      });
    }), this.currentView = a, a.onActivation && a.onActivation(), setTimeout(() => b.dispose(), 1000), this.b = L);
  }
  setCurrentView(a, b) {
    this.i || this.l();
    !a.rendered && this.f && a.render(this.f, this.h += 2);
    var c = this.currentView;
    b ? c && (c.el.style.transitionDuration = "0s", c.el.style.transform = `translate3d(100%, 0, ${c.index}px)`) : setTimeout(() => c && c.dispose(), 1000);
    a.index = this.h += 2;
    this.currentView = a;
    this.currentView.onActivation && this.currentView.onActivation();
    this.history.forEach((a) => a.dispose());
    this.history = [];
    b = `translate3d(0, 0, ${a.index}px)`;
    a.el.style.transitionDuration = "0s";
    this.b == M ? (b = `translate3d(${128 - J.WIDTH}px, 0, ${a.index}px)`, a.el.style.transform = b, this.j(!1)) : (a.el.style.zIndex = a.index, a.el.style.transform = b, this.b = L);
  }
  toggleSidebar() {
    this.i || this.l();
    this.j(this.b == L);
  }
  H() {
    this.f && (this.f.addEventListener("touchmove", this.G.bind(this), !1), this.f.addEventListener("touchend", this.I.bind(this), !1));
  }
  G(a) {
    var b = a.changedTouches && a.changedTouches[0].clientX || 0;
    clearTimeout(this.s);
    if (this.b == L || this.b == M) {
      this.a = b;
    }
    this.b == L && (this.c = [], this.b = N);
    this.b == N && (50 >= b ? this.history.length && this.currentView && this.currentView.supportsBackGesture && (this.b = O) : this.currentView && this.currentView.hasSidebar && (this.c.push(this.a - b), 4 == this.c.length && this.c.shift(), 40 < this.c[2] - this.c[0] && (this.b = P)));
    this.b == M && (this.b = Q);
    switch(this.b) {
      case O:
        this.D(a);
        break;
      case Q:
        this.F(a);
        break;
      case P:
        this.A(a);
    }
  }
  I(a) {
    switch(this.b) {
      case O:
        this.w(a);
        break;
      case P:
        a = !0;
        3 > this.c[2] - this.c[0] && (a = !1);
        this.j(a);
        break;
      case Q:
        a = !0;
        -3 > this.c[2] - this.c[0] && (a = !1);
        this.j(a);
        break;
      case M:
        if (B.P.v) {
          break;
        }
        this.j(!1);
        break;
      default:
        this.b = L;
    }
  }
  w(a) {
    if (this.a) {
      var b = this.history, c = this.getLastViewInHistory(), d = this.currentView, e = a.changedTouches && a.changedTouches[0].clientX || 0, h = 0.15 + (J.WIDTH - e) / J.WIDTH * (0.35 - 0.15);
      window.requestAnimationFrame(() => {
        d.el.style.transitionDuration = h + "s";
        c.el.style.transitionDuration = h + "s";
        var a = "100%", r = "0";
        if (e < J.WIDTH / 2) {
          a = "0";
          r = "-30%";
          const b = () => {
            c.el.style.transitionDuration = "0s";
            c.el.style.transform = "translate3d(-100%,-100%,0)";
            c.el.removeEventListener("transitionend", b);
          };
          c.el.addEventListener("transitionend", b);
        } else {
          this.currentView = this.getLastViewInHistory(), b.pop(), c.onActivation && c.onActivation(), setTimeout(() => {
            d.dispose();
          }, 1000);
        }
        d.el.style.transform = `translate3d(${a}, 0, ${d.index}px)`;
        c.el.style.transform = `translate3d(${r}, 0, ${d.index - 1}px)`;
        d.el.style.boxShadow = "0px 0 0px black";
      });
      this.b = L;
    }
  }
  D(a) {
    if (this.history.length) {
      a.preventDefault();
      var b = this.history[this.history.length - 1], c = this.currentView, d = (a.changedTouches && a.changedTouches[0].clientX || 0) - this.a;
      a = J.WIDTH;
      var e = Math.floor(n(0.3 * -a, d / (a - this.a))), h = Math.floor(5 * (1 + d / (a - this.a) * -1)) / 5;
      0 > d || window.requestAnimationFrame(() => {
        c.el.style.transitionDuration = "0s";
        b.el.style.transitionDuration = "0s";
        c.el.style.transform = `translate3d(${d}px, 0, ${c.index}px)`;
        b.el.style.transform = `translate3d(${e}px, 0, ${c.index - 1}px)`;
        c.el.style.boxShadow = `0px 0 24px rgba(0, 0, 0, ${h})`;
      });
    }
  }
  F(a) {
    var b = a.changedTouches && a.changedTouches[0].clientX || 0;
    this.c.push(this.a - b);
    4 == this.c.length && this.c.shift();
    a.preventDefault();
    var c = this.currentView, d = b - this.a - 4 * J.WIDTH / 5;
    window.requestAnimationFrame(() => {
      c.el.style.transitionDuration = "0s";
      c.el.style.transform = `translate3d(${d}px, 0, ${c.index}px)`;
    });
  }
  j(a) {
    var b = this.currentView, c = document.querySelector("sidebar");
    requestAnimationFrame(() => {
      b.el.style.transitionDuration = "0.35s";
      var d = `${128 - J.WIDTH}px`, e = "0", h = `${b.index - 1}px`;
      a ? c.style.transform = `translate3d(${e}, 0, ${h})` : (d = "0", e = "100%", h = 0, this.s = setTimeout(() => {
        this.b == L && (c.style.transform = `translate3d(${e}, 0, ${h})`);
      }, 1000));
      b.el.style.transform = `translate3d(${d}, 0, ${b.index}px)`;
    });
    this.b = a ? M : L;
  }
  A(a) {
    if (!B.P.v) {
      var b = a.changedTouches && a.changedTouches[0].clientX || 0;
      this.c.push(this.a - b);
      4 == this.c.length && this.c.shift();
      a.preventDefault();
      var c = document.querySelector("sidebar"), d = this.currentView, e = b - this.a;
      0 <= e || (this.b = P, window.requestAnimationFrame(() => {
        c.style.transform = `translate3d(0, 0, ${d.index - 1}px)`;
        c.style.transitionDuration = "0s";
        d.el.style.transitionDuration = "0s";
        d.el.style.transform = `translate3d(${e}px, 0, ${d.index}px)`;
      }));
    }
  }
}
K.prototype.toggleSidebar = K.prototype.toggleSidebar;
K.prototype.setCurrentView = K.prototype.setCurrentView;
K.prototype.push = K.prototype.push;
K.prototype.canGoBack = K.prototype.canGoBack;
K.prototype.pull = K.prototype.pull;
K.prototype.getLastViewInHistory = K.prototype.getLastViewInHistory;
var L = "default", N = "started", Q = "closingSidebar", P = "openingSidebar", M = "sidebarOpen", O = "going";
k("ViewManager$$module$lib$view_manager.State", {u:L, ea:N, aa:Q, ca:P, da:M, ba:O});
K.prototype.h = 1;
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
  window.setTimeout(a, 1000 / 60);
};
var R = {en:{__name:"English"}}, S = R.en;
const T = (a, ...b) => (S[a] || a).replace(/{(\d+)}/g, (a, d) => "undefined" != typeof b[d] ? b[d] : a);
var U = {setDictionary:(a, b) => {
  R[a] = b;
}, setLanguage:(a) => {
  S = R[a];
}, getLocalizedString:T, __:T};
class V extends I {
  constructor() {
    super();
    this.vm = null;
  }
  onSidebarItemTap(a) {
    if (a = a.m && a.m.getAttribute && a.m.getAttribute("data-view")) {
      this.o(V.EventType.SWITCH_VIEW, {view:a}), this.vm && this.vm.toggleSidebar();
    }
  }
  template() {
    return `
<sidebar>
    <sidebar-items>${this.template_items()}</sidebar-items>
</sidebar>
`;
  }
  template_items() {
    return "";
  }
  get a() {
    return {B:"sidebar-item"};
  }
  get events() {
    return {tap:{[this.a.B]:this.onSidebarItemTap}};
  }
  static get EventType() {
    return {SWITCH_VIEW:"switchView"};
  }
}
V.prototype.template_items = V.prototype.template_items;
V.prototype.onSidebarItemTap = V.prototype.onSidebarItemTap;
class W extends J {
  constructor() {
    super();
    this.vm = null;
    this.views = [];
    this.activeItemIndex = null;
  }
  onAfterRender() {
    super.onAfterRender();
    var a = this.$(this.a.X);
    if (!a) {
      throw Error("TabView template must have <views>");
    }
    this.vm = new K(a);
    this.activateItem(0);
  }
  onItemTap(a) {
    var b = this.$(this.a.S);
    b && b == a.m || (b = this.$(this.a.M), this.activateItem([].indexOf.call(b && b.children, a.m)));
  }
  activateItem(a) {
    if (!(0 > a)) {
      this.deactivateActiveItem();
      var b = this.$$(this.a.B)[a];
      b && b.classList.add("active");
      this.views && this.views[a] && (this.vm.setCurrentView(this.views[a], !0), this.views[a].el.classList.add("active"));
      this.activeItemIndex = a;
    }
  }
  activateItemByName(a) {
    if (a = this.$(this.a.B + "[data-view=" + a + "]")) {
      var b = this.$(this.a.M);
      this.activateItem([].indexOf.call(b && b.children, a));
    }
  }
  deactivateActiveItem() {
    this.$$(this.a.R).forEach((a) => a.classList.remove("active"));
  }
  template() {
    return `
<tab-view>
    ${this.template_views()}
    <tab-bar>
        <tab-items>
            ${this.template_items()}
        </tab-items>
    </tab-bar>
</tab-view>
`;
  }
  template_views() {
    return `<views>${this.views.join("")}</views>`;
  }
  template_items() {
    return "";
  }
  get a() {
    return {B:"tab-item", M:"tab-items", R:".active", S:"tab-items .active", Z:"views .active", X:"views"};
  }
  get events() {
    return {touchend:{[this.a.B]:this.onItemTap.bind(this)}};
  }
}
W.prototype.template_items = W.prototype.template_items;
W.prototype.template_views = W.prototype.template_views;
W.prototype.deactivateActiveItem = W.prototype.deactivateActiveItem;
W.prototype.activateItemByName = W.prototype.activateItemByName;
W.prototype.activateItem = W.prototype.activateItem;
W.prototype.onItemTap = W.prototype.onItemTap;
class X extends I {
  constructor(a = {hasBackButton:!1, hasMenuButton:!1, title:""}) {
    super();
    this.vm = null;
    this.config = a;
  }
  onBackButtonTap() {
    this.vm && this.vm.push();
  }
  onMenuButtonTap() {
    this.vm && this.vm.toggleSidebar();
  }
  template() {
    var a = this.config, b = "", c = "";
    a.hasBackButton && (b = "<back-button></back-button>");
    a.hasMenuButton && (c = "<menu-button></menu-button>");
    return `
<nav-bar>${b}${c}${a.title}</nav-bar>
`;
  }
  get a() {
    return {T:"back-button", W:"menu-button"};
  }
  get events() {
    return {tap:{[this.a.T]:this.onBackButtonTap, [this.a.W]:this.onMenuButtonTap}};
  }
}
X.prototype.onMenuButtonTap = X.prototype.onMenuButtonTap;
X.prototype.onBackButtonTap = X.prototype.onBackButtonTap;
class ia extends C {
  constructor() {
    super();
    this.reset();
    this.a = this.c.u;
  }
  reset() {
    this.a = this.c.u;
  }
  i() {
    this.a != this.c.N && (this.a = this.c.C);
  }
  h() {
    return this.a == this.c.C;
  }
  f() {
    this.h() && (this.a = this.c.N, this.o(this.EventType.SHOULD_REFRESH));
  }
  get c() {
    return {u:"default", C:"shouldCheck", N:"refreshing"};
  }
  get EventType() {
    return {SHOULD_REFRESH:"refresh"};
  }
}
;class Y extends I {
  constructor(a) {
    super();
    this.a = new ia;
    this.EventType = this.a.EventType;
    this.s = this.i = this.l = this.f = null;
    a && this.register(a);
    this.A();
  }
  A() {
    this.a.I(this.a.EventType.SHOULD_REFRESH, this.onShouldRefresh.bind(this));
  }
  onShouldRefresh() {
    var a = this.$(this.j.O), b = this.$(this.j.J);
    window.requestAnimationFrame(() => {
      this.l.style.transform = `translateY(${this.height}px)`;
      this.l.style.transition = "800ms cubic-bezier(.41,1,.1,1)";
      a && (a.style.opacity = 1);
      b && (b.style.opacity = 0);
      this.o(this.a.EventType.SHOULD_REFRESH);
    });
  }
  onAfterRender() {
    super.onAfterRender();
    this.f || this.register(this.el.parentElement);
  }
  reset() {
    this.f && (this.l.style.transform = "translateY(0)", this.l.style.transition = "300ms ease-out");
    var a = this.$(this.j.O), b = this.$(this.j.J);
    a && (a.style.opacity = 0);
    setTimeout(() => {
      b && (b.style.opacity = 1);
    }, 500);
    this.a.reset();
  }
  register(a, b) {
    a && (this.i && this.f.removeEventListener("scroll", this.i), this.s && document.body.removeEventListener("touchend", this.s), this.f = a, this.l = b ? b : a, this.reset(), this.i = this.K.bind(this), this.s = this.V.bind(this), this.f.addEventListener("scroll", this.i), document.body.addEventListener("touchend", this.s));
  }
  K(a) {
    this.L();
    var b = 0, c = -(a.target && a.target.scrollTop || 0);
    a = this.arrowOffset + Math.pow(c, 0.75);
    var d = this.threshold - 60;
    c >= d && (b = Math.min(180, 3 * (c - d)));
    if (c = this.$(this.j.J)) {
      c.style.transform = `translateY(${a}px) rotate(${b}deg)`;
    }
  }
  V() {
    this.f.scrollTop < -this.threshold && this.a.f();
  }
  L() {
    this.a.i();
  }
  template() {
    return '\n<pull-to-refresh>\n    <pull-to-refresh-arrow></pull-to-refresh-arrow>\n    <div class="spinner"></div>\n</pull-to-refresh>\n';
  }
  dispose() {
    this.a.F();
    this.el && this.el.removeEventListener("scroll", this.i);
    document.body.removeEventListener("touchend", this.s);
    super.dispose();
  }
  get j() {
    return {J:"pull-to-refresh-arrow", O:".spinner"};
  }
}
Y.prototype.register = Y.prototype.register;
Y.prototype.reset = Y.prototype.reset;
Y.prototype.onShouldRefresh = Y.prototype.onShouldRefresh;
Y.prototype.threshold = 135;
Y.prototype.threshold = Y.prototype.threshold;
Y.prototype.height = 96;
Y.prototype.height = Y.prototype.height;
Y.prototype.arrowOffset = 0;
Y.prototype.arrowOffset = Y.prototype.arrowOffset;
class ja extends C {
  constructor() {
    super();
    this.a = this.c.u;
  }
  reset() {
    this.a = this.c.u;
  }
  h() {
    this.a != this.c.LOADING && (this.a = this.c.C);
  }
  f() {
    return this.a == this.c.C;
  }
  load() {
    this.f() && (this.a = this.c.LOADING, this.o(this.EventType.SHOULD_LOAD));
  }
  get c() {
    return {u:"default", C:"shouldCheck", LOADING:"loading"};
  }
  get EventType() {
    return {SHOULD_LOAD:"load"};
  }
}
;/*
 Throttle function

 https://remysharp.com/2010/07/21/throttling-function-calls

 Copyright (c) 2010 Remy Sharp
*/
var ka = (a, b) => {
  var c = 0, d;
  return (...e) => {
    var h = +new Date;
    c && h < c + 100 ? (clearTimeout(d), d = setTimeout(() => {
      c = h;
      a.apply(b, e);
    }, 100 + c - h)) : (c = h, a.apply(b, e));
  };
};
class Z extends I {
  constructor(a) {
    super();
    this.a = new ja;
    this.EventType = this.a.EventType;
    this.f = this.i = null;
    this.j = "";
    this.L = ka(this.A, this);
    a && this.register(a);
    this.l();
  }
  l() {
    this.a.I(this.a.EventType.SHOULD_LOAD, this.K.bind(this));
  }
  K() {
    this.o(this.EventType.SHOULD_LOAD);
  }
  render(a, b) {
    a = super.render(a, b);
    this.el || this.register(this.el.parentElement);
    return a;
  }
  reset() {
    this.a.reset();
  }
  register(a) {
    a && (this.reset(), this.f && this.f.removeEventListener("scroll", this.i), this.f = a, this.i = this.s.bind(this), this.f.addEventListener("scroll", this.i));
  }
  s() {
    this.L();
  }
  A() {
    this.a.h();
    if (this.a.f()) {
      var a = this.f;
      a && a.scrollHeight > a.offsetHeight && a.scrollTop > a.scrollHeight - a.offsetHeight - 400 && this.a.load();
    }
  }
  showSpinner() {
    this.el.classList.add("spinner");
    this.el.innerText = "";
    this.reset();
  }
  showEndOfList() {
    this.el.innerText = this.j;
    this.el.classList.remove("spinner");
  }
  template() {
    return "<inf-scroll></inf-scroll>";
  }
  dispose() {
    this.a.F();
    this.f.removeEventListener("scroll", this.i);
    super.dispose();
  }
}
Z.prototype.showEndOfList = Z.prototype.showEndOfList;
Z.prototype.showSpinner = Z.prototype.showSpinner;
Z.prototype.register = Z.prototype.register;
Z.prototype.reset = Z.prototype.reset;
k("$jscompDefaultExport$$module$index", {Component:I, ViewManager:K, View:J, locale:U, Sidebar:V, TabView:W, NavBar:X, PullToRefresh:Y, InfiniteScroll:Z, __:U.__});

const erste = this.$jscompDefaultExport$$module$index;if(typeof define=='function'&&define.amd){define(function(){return erste})}else if(typeof module=='object'&&typeof exports=='object'){module.exports=erste}else{window.erste=erste}}).call(null, {});

//# sourceMappingURL=erste.js.map
