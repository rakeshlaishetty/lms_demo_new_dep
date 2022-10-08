(this["webpackJsonpqwings-react-lms"]=this["webpackJsonpqwings-react-lms"]||[]).push([[23],{101:function(e,a,t){"use strict";t(8);var c=t(21),s=function(){var e=(new Date).getHours(),a=window.localStorage.getItem("user");return e<12?"Good morning, ".concat("admin"===a?"Admin":"teacher"===a?"Teacher":"Student"):e>=12&&e<16?"Good afternoon, ".concat("admin"===a?"Admin":"teacher"===a?"Teacher":"Student"):"Good evening, ".concat("admin"===a?"Admin":"teacher"===a?"Teacher":"Student")};a.a=function(){return Object(c.jsx)("h1",{children:s()})}},112:function(e,a,t){"use strict";var c=t(14),s=t(17),r=t(8),n=t.n(r),i=t(43),l=t.n(i),o=t(91),j=t.n(o),d=t(92),b={tag:d.tagPropType,inverse:l.a.bool,color:l.a.string,body:l.a.bool,outline:l.a.bool,className:l.a.string,cssModule:l.a.object,innerRef:l.a.oneOfType([l.a.object,l.a.string,l.a.func])},u=function(e){var a=e.className,t=e.cssModule,r=e.color,i=e.body,l=e.inverse,o=e.outline,b=e.tag,u=e.innerRef,O=Object(s.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),m=Object(d.mapToCssModules)(j()(a,"card",!!l&&"text-white",!!i&&"card-body",!!r&&(o?"border":"bg")+"-"+r),t);return n.a.createElement(b,Object(c.a)({},O,{className:m,ref:u}))};u.propTypes=b,u.defaultProps={tag:"div"},a.a=u},116:function(e,a,t){"use strict";var c=t(14),s=t(17),r=t(8),n=t.n(r),i=t(43),l=t.n(i),o=t(91),j=t.n(o),d=t(92),b={tag:d.tagPropType,className:l.a.string,cssModule:l.a.object,innerRef:l.a.oneOfType([l.a.object,l.a.string,l.a.func])},u=function(e){var a=e.className,t=e.cssModule,r=e.innerRef,i=e.tag,l=Object(s.a)(e,["className","cssModule","innerRef","tag"]),o=Object(d.mapToCssModules)(j()(a,"card-body"),t);return n.a.createElement(i,Object(c.a)({},l,{className:o,ref:r}))};u.propTypes=b,u.defaultProps={tag:"div"},a.a=u},131:function(e,a,t){"use strict";var c=t(14),s=t(17),r=t(8),n=t.n(r),i=t(43),l=t.n(i),o=t(91),j=t.n(o),d=t(92),b={tag:d.tagPropType,className:l.a.string,cssModule:l.a.object},u=function(e){var a=e.className,t=e.cssModule,r=e.tag,i=Object(s.a)(e,["className","cssModule","tag"]),l=Object(d.mapToCssModules)(j()(a,"card-title"),t);return n.a.createElement(r,Object(c.a)({},i,{className:l}))};u.propTypes=b,u.defaultProps={tag:"div"},a.a=u},1358:function(e,a,t){"use strict";t.r(a);var c=t(95),s=t(8),r=t(330),n=t(112),i=t(116),l=t(131),o=t(384),j=t(776),d=t(97),b=t(98),u=t(101),O=t(240),m=t(289),x=t(230),f=t(21),g=function(){var e=function(e,a){var t=a||"";switch(e){case"primary":x.b.primary("This is a notification!","Primary Notification",3e3,null,null,t);break;case"secondary":x.b.secondary("This is a notification!","Secondary Notification",3e3,null,null,t);break;case"info":x.b.info("Info message","",3e3,null,null,t);break;case"success":x.b.success("Success message","Title here",3e3,null,null,t);break;case"warning":x.b.warning("Warning message","Close after 3000ms",3e3,null,null,t);break;case"error":x.b.error("Error message","Click me!",5e3,(function(){alert("callback")}),null,t);break;default:x.b.info("Info message")}};return Object(f.jsx)(n.a,{children:Object(f.jsxs)(i.a,{children:[Object(f.jsx)(l.a,{children:Object(f.jsx)(d.a,{id:"alert.react-notifications"})}),Object(f.jsx)(O.a,{children:Object(f.jsx)(d.a,{id:"alert.outline"})}),Object(f.jsx)(m.a,{outline:!0,className:"mb-3",color:"primary",onClick:function(){return e("primary")},children:Object(f.jsx)(d.a,{id:"alert.primary"})})," ",Object(f.jsx)(m.a,{outline:!0,className:"mb-3",color:"secondary",onClick:function(){return e("secondary")},children:Object(f.jsx)(d.a,{id:"alert.secondary"})})," ",Object(f.jsx)(m.a,{outline:!0,className:"mb-3",color:"info",onClick:function(){return e("info")},children:Object(f.jsx)(d.a,{id:"alert.info"})})," ",Object(f.jsx)(m.a,{outline:!0,className:"mb-3",color:"success",onClick:function(){return e("success")},children:Object(f.jsx)(d.a,{id:"alert.success"})})," ",Object(f.jsx)(m.a,{outline:!0,className:"mb-3",color:"warning",onClick:function(){return e("warning")},children:Object(f.jsx)(d.a,{id:"alert.warning"})})," ",Object(f.jsx)(m.a,{outline:!0,className:"mb-3",color:"danger",onClick:function(){return e("error")},children:Object(f.jsx)(d.a,{id:"alert.error"})}),Object(f.jsx)(O.a,{children:Object(f.jsx)(d.a,{id:"alert.filled"})}),Object(f.jsx)(m.a,{className:"mb-3",color:"primary",onClick:function(){return e("primary","filled")},children:Object(f.jsx)(d.a,{id:"alert.primary"})})," ",Object(f.jsx)(m.a,{className:"mb-3",color:"secondary",onClick:function(){return e("secondary","filled")},children:Object(f.jsx)(d.a,{id:"alert.secondary"})})," ",Object(f.jsx)(m.a,{className:"mb-3",color:"info",onClick:function(){return e("info","filled")},children:Object(f.jsx)(d.a,{id:"alert.info"})})," ",Object(f.jsx)(m.a,{className:"mb-3",color:"success",onClick:function(){return e("success","filled")},children:Object(f.jsx)(d.a,{id:"alert.success"})})," ",Object(f.jsx)(m.a,{className:"mb-3",color:"warning",onClick:function(){return e("warning","filled")},children:Object(f.jsx)(d.a,{id:"alert.warning"})})," ",Object(f.jsx)(m.a,{className:"mb-3",color:"danger",onClick:function(){return e("error","filled")},children:Object(f.jsx)(d.a,{id:"alert.error"})})]})})};a.default=function(e){var a=e.match,t=Object(s.useState)(!0),O=Object(c.a)(t,2),m=O[0],x=O[1];return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(r.a,{children:Object(f.jsxs)(b.a,{xxs:"12",children:[Object(f.jsx)(u.a,{heading:"menu.alerts",match:a}),Object(f.jsx)(b.b,{className:"mb-5"})]})}),Object(f.jsxs)(r.a,{children:[Object(f.jsx)(b.a,{xxs:"12",className:"mb-4",children:Object(f.jsx)(g,{})}),Object(f.jsx)(b.a,{xxs:"12",className:"mb-4",children:Object(f.jsx)(n.a,{children:Object(f.jsxs)(i.a,{children:[Object(f.jsx)(l.a,{children:Object(f.jsx)(d.a,{id:"alert.rounded"})}),Object(f.jsx)(o.a,{color:"primary",className:"rounded",children:Object(f.jsx)(d.a,{id:"alert.primary-text"})}),Object(f.jsx)(o.a,{color:"secondary",className:"rounded",children:Object(f.jsx)(d.a,{id:"alert.secondary-text"})}),Object(f.jsx)(o.a,{color:"success",className:"rounded",children:Object(f.jsx)(d.a,{id:"alert.success-text"})}),Object(f.jsx)(o.a,{color:"danger",className:"rounded",children:Object(f.jsx)(d.a,{id:"alert.danger-text"})}),Object(f.jsx)(o.a,{color:"warning",className:"rounded",children:Object(f.jsx)(d.a,{id:"alert.warning-text"})}),Object(f.jsx)(o.a,{color:"info",className:"rounded",children:Object(f.jsx)(d.a,{id:"alert.info-text"})}),Object(f.jsx)(o.a,{color:"light",className:"rounded",children:Object(f.jsx)(d.a,{id:"alert.light-text"})}),Object(f.jsx)(o.a,{color:"dark",className:"rounded",children:Object(f.jsx)(d.a,{id:"alert.dark-text"})})]})})}),Object(f.jsx)(b.a,{xxs:"12",className:"mb-4",children:Object(f.jsx)(n.a,{children:Object(f.jsxs)(i.a,{children:[Object(f.jsx)(l.a,{children:Object(f.jsx)(d.a,{id:"alert.default"})}),Object(f.jsx)(o.a,{color:"primary",children:Object(f.jsx)(d.a,{id:"alert.primary-text"})}),Object(f.jsx)(o.a,{color:"secondary",children:Object(f.jsx)(d.a,{id:"alert.secondary-text"})}),Object(f.jsx)(o.a,{color:"success",children:Object(f.jsx)(d.a,{id:"alert.success-text"})}),Object(f.jsx)(o.a,{color:"danger",children:Object(f.jsx)(d.a,{id:"alert.danger-text"})}),Object(f.jsx)(o.a,{color:"warning",children:Object(f.jsx)(d.a,{id:"alert.warning-text"})}),Object(f.jsx)(o.a,{color:"info",children:Object(f.jsx)(d.a,{id:"alert.info-text"})}),Object(f.jsx)(o.a,{color:"light",children:Object(f.jsx)(d.a,{id:"alert.light-text"})}),Object(f.jsx)(o.a,{color:"dark",children:Object(f.jsx)(d.a,{id:"alert.dark-text"})})]})})}),Object(f.jsx)(b.a,{xxs:"12",className:"mb-4",children:Object(f.jsx)(n.a,{children:Object(f.jsxs)(i.a,{children:[Object(f.jsx)(l.a,{children:Object(f.jsx)(d.a,{id:"alert.dismissing"})}),Object(f.jsx)(o.a,{color:"warning",className:"rounded",isOpen:m,toggle:function(){return x(!m)},children:Object(f.jsx)(d.a,{id:"alert.dismissing-text"})}),Object(f.jsx)(j.a,{color:"warning",fade:!1,children:Object(f.jsx)(d.a,{id:"alert.dismissing-without-animate-text"})})]})})})]})]})}},240:function(e,a,t){"use strict";var c=t(14),s=t(17),r=t(8),n=t.n(r),i=t(43),l=t.n(i),o=t(91),j=t.n(o),d=t(92),b={tag:d.tagPropType,className:l.a.string,cssModule:l.a.object},u=function(e){var a=e.className,t=e.cssModule,r=e.tag,i=Object(s.a)(e,["className","cssModule","tag"]),l=Object(d.mapToCssModules)(j()(a,"card-subtitle"),t);return n.a.createElement(r,Object(c.a)({},i,{className:l}))};u.propTypes=b,u.defaultProps={tag:"div"},a.a=u},384:function(e,a,t){"use strict";var c=t(14),s=t(17),r=t(34),n=t(8),i=t.n(n),l=t(43),o=t.n(l),j=t(91),d=t.n(j),b=t(92),u=t(205);function O(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);a&&(c=c.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,c)}return t}function m(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?O(Object(t),!0).forEach((function(a){Object(r.a)(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):O(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}var x={children:o.a.node,className:o.a.string,closeClassName:o.a.string,closeAriaLabel:o.a.string,cssModule:o.a.object,color:o.a.string,fade:o.a.bool,isOpen:o.a.bool,toggle:o.a.func,tag:b.tagPropType,transition:o.a.shape(u.a.propTypes),innerRef:o.a.oneOfType([o.a.object,o.a.string,o.a.func])},f={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:m(m({},u.a.defaultProps),{},{unmountOnExit:!0})};function g(e){var a=e.className,t=e.closeClassName,r=e.closeAriaLabel,n=e.cssModule,l=e.tag,o=e.color,j=e.isOpen,O=e.toggle,x=e.children,f=e.transition,g=e.fade,p=e.innerRef,h=Object(s.a)(e,["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"]),y=Object(b.mapToCssModules)(d()(a,"alert","alert-"+o,{"alert-dismissible":O}),n),N=Object(b.mapToCssModules)(d()("close",t),n),v=m(m(m({},u.a.defaultProps),f),{},{baseClass:g?f.baseClass:"",timeout:g?f.timeout:0});return i.a.createElement(u.a,Object(c.a)({},h,v,{tag:l,className:y,in:j,role:"alert",innerRef:p}),O?i.a.createElement("button",{type:"button",className:N,"aria-label":r,onClick:O},i.a.createElement("span",{"aria-hidden":"true"},"\xd7")):null,x)}g.propTypes=x,g.defaultProps=f,a.a=g},776:function(e,a,t){"use strict";var c=t(14),s=t(107),r=t(104),n=t(8),i=t.n(n),l=t(384),o=function(e){function a(a){var t;return(t=e.call(this,a)||this).state={isOpen:!0},t.toggle=t.toggle.bind(Object(s.a)(t)),t}Object(r.a)(a,e);var t=a.prototype;return t.toggle=function(){this.setState({isOpen:!this.state.isOpen})},t.render=function(){return i.a.createElement(l.a,Object(c.a)({isOpen:this.state.isOpen,toggle:this.toggle},this.props))},a}(n.Component);a.a=o}}]);
//# sourceMappingURL=components-alerts.1c291e14.chunk.js.map