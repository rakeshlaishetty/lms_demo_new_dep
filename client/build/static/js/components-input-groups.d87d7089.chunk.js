(this["webpackJsonpqwings-react-lms"]=this["webpackJsonpqwings-react-lms"]||[]).push([[33],{101:function(e,a,s){"use strict";s(8);var c=s(21),t=function(){var e=(new Date).getHours(),a=window.localStorage.getItem("user");return e<12?"Good morning, ".concat("admin"===a?"Admin":"teacher"===a?"Teacher":"Student"):e>=12&&e<16?"Good afternoon, ".concat("admin"===a?"Admin":"teacher"===a?"Teacher":"Student"):"Good evening, ".concat("admin"===a?"Admin":"teacher"===a?"Teacher":"Student")};a.a=function(){return Object(c.jsx)("h1",{children:t()})}},112:function(e,a,s){"use strict";var c=s(14),t=s(17),n=s(8),j=s.n(n),r=s(43),d=s.n(r),i=s(91),l=s.n(i),o=s(92),b={tag:o.tagPropType,inverse:d.a.bool,color:d.a.string,body:d.a.bool,outline:d.a.bool,className:d.a.string,cssModule:d.a.object,innerRef:d.a.oneOfType([d.a.object,d.a.string,d.a.func])},p=function(e){var a=e.className,s=e.cssModule,n=e.color,r=e.body,d=e.inverse,i=e.outline,b=e.tag,p=e.innerRef,u=Object(t.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),x=Object(o.mapToCssModules)(l()(a,"card",!!d&&"text-white",!!r&&"card-body",!!n&&(i?"border":"bg")+"-"+n),s);return j.a.createElement(b,Object(c.a)({},u,{className:x,ref:p}))};p.propTypes=b,p.defaultProps={tag:"div"},a.a=p},116:function(e,a,s){"use strict";var c=s(14),t=s(17),n=s(8),j=s.n(n),r=s(43),d=s.n(r),i=s(91),l=s.n(i),o=s(92),b={tag:o.tagPropType,className:d.a.string,cssModule:d.a.object,innerRef:d.a.oneOfType([d.a.object,d.a.string,d.a.func])},p=function(e){var a=e.className,s=e.cssModule,n=e.innerRef,r=e.tag,d=Object(t.a)(e,["className","cssModule","innerRef","tag"]),i=Object(o.mapToCssModules)(l()(a,"card-body"),s);return j.a.createElement(r,Object(c.a)({},d,{className:i,ref:n}))};p.propTypes=b,p.defaultProps={tag:"div"},a.a=p},1254:function(e,a,s){"use strict";s.r(a);s(8);var c=s(330),t=s(112),n=s(116),j=s(131),r=s(385),d=s(386),i=s(598),l=s(227),o=s(289),b=s(820),p=s(938),u=s(823),x=s(841),O=s(805),h=s(324),m=s(97),g=s(98),y=s(101),N=s(21);a.default=Object(h.c)((function(e){var a=e.intl,s=e.match,h=a.messages;return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(c.a,{children:Object(N.jsxs)(g.a,{xxs:"12",children:[Object(N.jsx)(y.a,{heading:"menu.input-groups",match:s}),Object(N.jsx)(g.b,{className:"mb-5"})]})}),Object(N.jsx)(c.a,{children:Object(N.jsxs)(g.a,{xxs:"12",children:[Object(N.jsx)(t.a,{className:"mb-4",children:Object(N.jsxs)(n.a,{children:[Object(N.jsx)(j.a,{children:Object(N.jsx)(m.a,{id:"input-groups.basic"})}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(d.a,{addonType:"prepend",children:"@"}),Object(N.jsx)(i.a,{placeholder:h["user.username"]})]}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(i.a,{placeholder:h["user.username"]}),Object(N.jsx)(d.a,{addonType:"append",children:"@example.com"})]}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(d.a,{addonType:"prepend",children:"https://example.com/users/"}),Object(N.jsx)(i.a,{})]}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(d.a,{addonType:"prepend",children:"$"}),Object(N.jsx)(i.a,{type:"number",step:"1"}),Object(N.jsx)(d.a,{addonType:"append",children:".00"})]}),Object(N.jsxs)(r.a,{children:[Object(N.jsx)(d.a,{addonType:"prepend",children:"With textarea"}),Object(N.jsx)(i.a,{type:"textarea",name:"text"})]})]})}),Object(N.jsx)(t.a,{className:"mb-4",children:Object(N.jsxs)(n.a,{children:[Object(N.jsx)(j.a,{children:Object(N.jsx)(m.a,{id:"input-groups.sizing"})}),Object(N.jsxs)(r.a,{size:"sm",className:"mb-3",children:[Object(N.jsx)(d.a,{addonType:"prepend",children:Object(N.jsx)("span",{className:"input-group-text",children:Object(N.jsx)(m.a,{id:"input-groups.small"})})}),Object(N.jsx)(i.a,{})]}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(d.a,{addonType:"prepend",children:Object(N.jsx)("span",{className:"input-group-text",children:Object(N.jsx)(m.a,{id:"input-groups.default"})})}),Object(N.jsx)(i.a,{})]}),Object(N.jsxs)(r.a,{size:"lg",children:[Object(N.jsx)(d.a,{addonType:"prepend",children:Object(N.jsx)("span",{className:"input-group-text",children:Object(N.jsx)(m.a,{id:"input-groups.large"})})}),Object(N.jsx)(i.a,{})]})]})}),Object(N.jsx)(t.a,{className:"mb-4",children:Object(N.jsxs)(n.a,{children:[Object(N.jsx)(j.a,{children:Object(N.jsx)(m.a,{id:"input-groups.checkboxes-and-radios"})}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(d.a,{addonType:"prepend",children:Object(N.jsx)(l.a,{children:Object(N.jsx)(i.a,{addon:!0,type:"checkbox","aria-label":"Checkbox for following text input"})})}),Object(N.jsx)(i.a,{})]}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(d.a,{addonType:"prepend",children:Object(N.jsx)(l.a,{children:Object(N.jsx)(i.a,{addon:!0,type:"radio","aria-label":"Radio for following text input"})})}),Object(N.jsx)(i.a,{})]})]})}),Object(N.jsx)(t.a,{className:"mb-4",children:Object(N.jsxs)(n.a,{children:[Object(N.jsx)(j.a,{children:Object(N.jsx)(m.a,{id:"input-groups.multiple-inputs"})}),Object(N.jsxs)(r.a,{children:[Object(N.jsx)(d.a,{addonType:"prepend",children:Object(N.jsx)("span",{className:"input-group-text",children:Object(N.jsx)(m.a,{id:"input-groups.first-and-last-name"})})}),Object(N.jsx)(i.a,{}),Object(N.jsx)(i.a,{})]})]})}),Object(N.jsx)(t.a,{className:"mb-4",children:Object(N.jsxs)(n.a,{children:[Object(N.jsx)(j.a,{children:Object(N.jsx)(m.a,{id:"input-groups.multiple-addons"})}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsxs)(d.a,{addonType:"prepend",children:[Object(N.jsx)(l.a,{children:"$"}),Object(N.jsx)(l.a,{children:"0.00"})]}),Object(N.jsx)(i.a,{})]}),Object(N.jsxs)(r.a,{children:[Object(N.jsx)(i.a,{}),Object(N.jsxs)(d.a,{addonType:"append",children:[Object(N.jsx)(l.a,{children:"$"}),Object(N.jsx)(l.a,{children:"0.00"})]})]})]})}),Object(N.jsx)(t.a,{className:"mb-4",children:Object(N.jsxs)(n.a,{children:[Object(N.jsx)(j.a,{children:Object(N.jsx)(m.a,{id:"input-groups.button-addons"})}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(d.a,{addonType:"prepend",children:Object(N.jsx)(o.a,{outline:!0,color:"secondary",children:Object(N.jsx)(m.a,{id:"input-groups.button"})})}),Object(N.jsx)(i.a,{})]}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(i.a,{}),Object(N.jsx)(d.a,{addonType:"append",children:Object(N.jsx)(o.a,{outline:!0,color:"secondary",children:Object(N.jsx)(m.a,{id:"input-groups.button"})})})]}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsxs)(d.a,{addonType:"prepend",children:[Object(N.jsx)(o.a,{outline:!0,color:"secondary",children:Object(N.jsx)(m.a,{id:"input-groups.button"})}),Object(N.jsx)(o.a,{outline:!0,color:"secondary",children:Object(N.jsx)(m.a,{id:"input-groups.button"})})]}),Object(N.jsx)(i.a,{})]}),Object(N.jsxs)(r.a,{children:[Object(N.jsx)(i.a,{}),Object(N.jsxs)(d.a,{addonType:"append",children:[Object(N.jsx)(o.a,{outline:!0,color:"secondary",children:Object(N.jsx)(m.a,{id:"input-groups.button"})}),Object(N.jsx)(o.a,{outline:!0,color:"secondary",children:Object(N.jsx)(m.a,{id:"input-groups.button"})})]})]})]})}),Object(N.jsx)(t.a,{className:"mb-4",children:Object(N.jsxs)(n.a,{children:[Object(N.jsx)(j.a,{children:Object(N.jsx)(m.a,{id:"input-groups.buttons-with-dropdowns"})}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsxs)(b.a,{addonType:"prepend",children:[Object(N.jsx)(p.a,{caret:!0,outline:!0,color:"secondary",children:Object(N.jsx)(m.a,{id:"input-groups.dropdown"})}),Object(N.jsxs)(u.a,{children:[Object(N.jsx)(x.a,{header:!0,children:Object(N.jsx)(m.a,{id:"input-groups.header"})}),Object(N.jsx)(x.a,{disabled:!0,children:Object(N.jsx)(m.a,{id:"input-groups.action"})}),Object(N.jsx)(x.a,{children:Object(N.jsx)(m.a,{id:"input-groups.another-action"})}),Object(N.jsx)(x.a,{divider:!0}),Object(N.jsx)(x.a,{children:Object(N.jsx)(m.a,{id:"input-groups.another-action"})})]})]}),Object(N.jsx)(i.a,{})]}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(i.a,{}),Object(N.jsxs)(b.a,{addonType:"append",children:[Object(N.jsx)(p.a,{caret:!0,outline:!0,color:"secondary",children:Object(N.jsx)(m.a,{id:"input-groups.dropdown"})}),Object(N.jsxs)(u.a,{children:[Object(N.jsx)(x.a,{header:!0,children:Object(N.jsx)(m.a,{id:"input-groups.header"})}),Object(N.jsx)(x.a,{disabled:!0,children:Object(N.jsx)(m.a,{id:"input-groups.action"})}),Object(N.jsx)(x.a,{children:Object(N.jsx)(m.a,{id:"input-groups.another-action"})}),Object(N.jsx)(x.a,{divider:!0}),Object(N.jsx)(x.a,{children:Object(N.jsx)(m.a,{id:"input-groups.another-action"})})]})]})]})]})}),Object(N.jsx)(t.a,{className:"mb-4",children:Object(N.jsxs)(n.a,{children:[Object(N.jsx)(j.a,{children:Object(N.jsx)(m.a,{id:"input-groups.custom-file-input"})}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(d.a,{addonType:"prepend",children:"Upload"}),Object(N.jsx)(O.a,{type:"file",id:"exampleCustomFileBrowser1",name:"customFile"})]}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(O.a,{type:"file",id:"exampleCustomFileBrowser2",name:"customFile"}),Object(N.jsx)(d.a,{addonType:"append",children:"Upload"})]}),Object(N.jsxs)(r.a,{className:"mb-3",children:[Object(N.jsx)(d.a,{addonType:"prepend",children:Object(N.jsx)(o.a,{outline:!0,color:"secondary",children:Object(N.jsx)(m.a,{id:"input-groups.button"})})}),Object(N.jsx)(O.a,{type:"file",id:"exampleCustomFileBrowser3",name:"customFile"})]}),Object(N.jsxs)(r.a,{children:[Object(N.jsx)(O.a,{type:"file",id:"exampleCustomFileBrowser4",name:"customFile"}),Object(N.jsx)(d.a,{addonType:"append",children:Object(N.jsx)(o.a,{outline:!0,color:"secondary",children:Object(N.jsx)(m.a,{id:"input-groups.button"})})})]})]})})]})})]})}))},131:function(e,a,s){"use strict";var c=s(14),t=s(17),n=s(8),j=s.n(n),r=s(43),d=s.n(r),i=s(91),l=s.n(i),o=s(92),b={tag:o.tagPropType,className:d.a.string,cssModule:d.a.object},p=function(e){var a=e.className,s=e.cssModule,n=e.tag,r=Object(t.a)(e,["className","cssModule","tag"]),d=Object(o.mapToCssModules)(l()(a,"card-title"),s);return j.a.createElement(n,Object(c.a)({},r,{className:d}))};p.propTypes=b,p.defaultProps={tag:"div"},a.a=p},227:function(e,a,s){"use strict";var c=s(14),t=s(17),n=s(8),j=s.n(n),r=s(43),d=s.n(r),i=s(91),l=s.n(i),o=s(92),b={tag:o.tagPropType,className:d.a.string,cssModule:d.a.object},p=function(e){var a=e.className,s=e.cssModule,n=e.tag,r=Object(t.a)(e,["className","cssModule","tag"]),d=Object(o.mapToCssModules)(l()(a,"input-group-text"),s);return j.a.createElement(n,Object(c.a)({},r,{className:d}))};p.propTypes=b,p.defaultProps={tag:"span"},a.a=p},385:function(e,a,s){"use strict";var c=s(14),t=s(17),n=s(8),j=s.n(n),r=s(43),d=s.n(r),i=s(91),l=s.n(i),o=s(92),b={tag:o.tagPropType,size:d.a.string,className:d.a.string,cssModule:d.a.object},p=function(e){var a=e.className,s=e.cssModule,n=e.tag,r=e.size,d=Object(t.a)(e,["className","cssModule","tag","size"]),i=Object(o.mapToCssModules)(l()(a,"input-group",r?"input-group-"+r:null),s);return j.a.createElement(n,Object(c.a)({},d,{className:i}))};p.propTypes=b,p.defaultProps={tag:"div"},a.a=p},386:function(e,a,s){"use strict";var c=s(14),t=s(17),n=s(8),j=s.n(n),r=s(43),d=s.n(r),i=s(91),l=s.n(i),o=s(92),b=s(227),p={tag:o.tagPropType,addonType:d.a.oneOf(["prepend","append"]).isRequired,children:d.a.node,className:d.a.string,cssModule:d.a.object},u=function(e){var a=e.className,s=e.cssModule,n=e.tag,r=e.addonType,d=e.children,i=Object(t.a)(e,["className","cssModule","tag","addonType","children"]),p=Object(o.mapToCssModules)(l()(a,"input-group-"+r),s);return"string"===typeof d?j.a.createElement(n,Object(c.a)({},i,{className:p}),j.a.createElement(b.a,{children:d})):j.a.createElement(n,Object(c.a)({},i,{className:p,children:d}))};u.propTypes=p,u.defaultProps={tag:"div"},a.a=u}}]);
//# sourceMappingURL=components-input-groups.d87d7089.chunk.js.map