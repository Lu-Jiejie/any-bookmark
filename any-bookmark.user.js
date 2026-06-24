// ==UserScript==
// @name               Any Bookmark
// @name:zh-CN         万能收藏夹
// @namespace          npm/vite-plugin-monkey
// @version            0.0.2
// @author             Lu-Jiejie
// @description        Add a per-site bookmark panel to any website that lacks one.
// @description:zh-CN  为任何没有收藏功能的网站添加按域名分组的收藏夹面板。
// @license            MIT
// @icon               https://vitejs.dev/logo.svg
// @homepage           https://github.com/Lu-Jiejie/any-bookmark
// @homepageURL        https://github.com/Lu-Jiejie/any-bookmark
// @source             https://github.com/Lu-Jiejie/any-bookmark.git
// @downloadURL        https://github.com/Lu-Jiejie/any-bookmark/raw/gh-pages/any-bookmark.user.js
// @updateURL          https://github.com/Lu-Jiejie/any-bookmark/raw/gh-pages/any-bookmark.user.js
// @match              *://*/*
// @require            https://cdn.jsdelivr.net/npm/vue@3.5.38/dist/vue.global.prod.js
// @grant              GM_getValue
// @grant              GM_registerMenuCommand
// @grant              GM_setValue
// @noframes
// ==/UserScript==

(function(vue) {
	"use strict";
	var s = new Set();
	var _css = async (t) => {
		if (s.has(t)) return;
		s.add(t);
		((css) => {
			const w = globalThis;
			(w.__anyBookmarkCss ||= []).push(css);
			w.__anyBookmarkApplyCss?.();
		})(t);
	};
	_css(" .trigger-btn[data-v-b045b254]{box-shadow:0 0 6px color-mix(in srgb, var(--c-accent) 65%, transparent),  0 0 12px color-mix(in srgb, var(--c-accent) 40%, transparent),  0 0 24px color-mix(in srgb, var(--c-accent) 0%, transparent),  inset 0 0 0 1.5px color-mix(in srgb, var(--c-accent) 40%, transparent);transition:box-shadow .3s ease-in-out}.trigger-btn[data-v-b045b254]:hover{box-shadow:0 0 8px color-mix(in srgb, var(--c-accent) 95%, transparent),  0 0 16px color-mix(in srgb, var(--c-accent) 75%, transparent),  0 0 24px color-mix(in srgb, var(--c-accent) 40%, transparent),  inset 0 0 0 1.5px color-mix(in srgb, var(--c-accent) 75%, transparent)}.icon-wrapper[data-v-b045b254]{justify-content:center;align-items:center;transition:transform .3s cubic-bezier(.34,1.56,.64,1);display:flex}@font-face{font-family:DM Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYthSQBK6PYK3EXw.woff2)format(\"woff2\");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:DM Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYthqQBK6PYK0.woff2)format(\"woff2\");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:DM Sans;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxRR232RmYJp8I5zzw.woff2)format(\"woff2\");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:DM Sans;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxRSW32RmYJp8I5.woff2)format(\"woff2\");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:DM Serif Display;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmserifdisplay/v17/-nFnOHM81r4j6k0gjAW3mujVU2B2G_5x0vrx52jJ3Q.woff2)format(\"woff2\");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:DM Serif Display;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmserifdisplay/v17/-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0vrx52g.woff2)format(\"woff2\");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--un-ease:initial;--un-bg-opacity:100%;--un-text-opacity:100%;--un-border-opacity:100%;--un-from-opacity:100%;--un-via-opacity:100%;--un-placeholder-opacity:100%}}@property --un-text-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --un-border-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --un-bg-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --un-ease{syntax:\"*\";inherits:false}@property --un-from-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --un-gradient-from{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --un-gradient-from-position{syntax:\"<length-percentage>\";inherits:false;initial-value:0%}@property --un-gradient-position{syntax:\"*\";inherits:false}@property --un-gradient-stops{syntax:\"*\";inherits:false}@property --un-gradient-to{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --un-gradient-to-position{syntax:\"<length-percentage>\";inherits:false;initial-value:100%}@property --un-gradient-via{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --un-gradient-via-position{syntax:\"<length-percentage>\";inherits:false;initial-value:50%}@property --un-gradient-via-stops{syntax:\"*\";inherits:false}@property --un-via-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --un-placeholder-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}:root,:host{--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in:cubic-bezier(.4, 0, 1, 1);--spacing:.25rem;--radius-2xl:1rem;--tracking-wider:.05em;--fontWeight-bold:700;--default-transition-timingFunction:cubic-bezier(.4, 0, .2, 1);--default-transition-duration:.15s;--radius-lg:.5rem;--font-sans:\"DM Sans\",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";--ease-in-out:cubic-bezier(.4, 0, .2, 1);--font-mono:\"DM Mono\",ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace;--font-serif:\"DM Serif Display\",ui-serif,Georgia,Cambria,\"Times New Roman\",Times,serif;--colors-black:#000;--colors-white:#fff;--text-lg-fontSize:1.125rem;--text-lg-lineHeight:1.75rem;--text-base-fontSize:1rem;--text-base-lineHeight:1.5rem;--text-xs-fontSize:.75rem;--text-xs-lineHeight:1rem;--text-sm-fontSize:.875rem;--text-sm-lineHeight:1.25rem;--colors-red-400:oklch(70.4% .191 22.216);--text-2xl-fontSize:1.5rem;--text-2xl-lineHeight:2rem;--default-font-family:var(--font-sans);--default-monoFont-family:var(--font-mono)}*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-featureSettings,normal);font-variation-settings:var(--default-font-variationSettings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-monoFont-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-monoFont-featureSettings,normal);font-variation-settings:var(--default-monoFont-variationSettings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden~=until-found])){display:none!important}.i-mdi-bookmark-outline,[i-mdi-bookmark-outline=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m17 18l-5-2.18L7 18V5h10m0-2H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-bookmark-plus,[i-mdi-bookmark-plus=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M17 3a2 2 0 0 1 2 2v16l-7-3l-7 3V5a2 2 0 0 1 2-2zm-6 4v2H9v2h2v2h2v-2h2V9h-2V7z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-chevron-left,[i-mdi-chevron-left=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-chevron-right,[i-mdi-chevron-right=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-close,[i-mdi-close=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-delete-outline,[i-mdi-delete-outline=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.text-base,[text-base=\"\"]{font-size:var(--text-base-fontSize);line-height:var(--un-leading,var(--text-base-lineHeight))}.text-lg,[text-lg=\"\"]{font-size:var(--text-lg-fontSize);line-height:var(--un-leading,var(--text-lg-lineHeight))}.text-sm,[text-sm=\"\"],[text~=sm],[un-text~=sm]{font-size:var(--text-sm-fontSize);line-height:var(--un-leading,var(--text-sm-lineHeight))}.text-xs,[text-xs=\"\"]{font-size:var(--text-xs-fontSize);line-height:var(--un-leading,var(--text-xs-lineHeight))}[text~=\"2xl\"]{font-size:var(--text-2xl-fontSize);line-height:var(--un-leading,var(--text-2xl-lineHeight))}.text-accent,[text-accent=\"\"]{color:color-mix(in srgb, var(--c-accent) var(--un-text-opacity), transparent) }.text-accent\\/90{color:color-mix(in srgb, var(--c-accent) 90%, transparent) }.text-white,[text-white=\"\"],[text~=white]{color:color-mix(in srgb, var(--colors-white) var(--un-text-opacity), transparent) }.text-white\\/40{color:color-mix(in srgb, var(--colors-white) 40%, transparent) }[text~=\\#a6926d]{color:color-mix(in oklab, #a6926d var(--un-text-opacity), transparent) }[text~=\"white/90!\"],[un-text~=\"white/90!\"]{color:color-mix(in srgb, var(--colors-white) 90%, transparent) !important}.group:hover .group-hover\\:text-\\[var\\(--c-accent\\)\\]\\!{color:color-mix(in oklab, var(--c-accent) var(--un-text-opacity), transparent) !important}.hover\\:text-accent:hover{color:color-mix(in srgb, var(--c-accent) var(--un-text-opacity), transparent) }.hover\\:text-red-400\\!:hover{color:color-mix(in srgb, var(--colors-red-400) var(--un-text-opacity), transparent) !important}.hover\\:text-white:hover{color:color-mix(in srgb, var(--colors-white) var(--un-text-opacity), transparent) }.hover\\:text-white\\/90:hover{color:color-mix(in srgb, var(--colors-white) 90%, transparent) }[hover\\:text-accent=\"\"]:hover{color:color-mix(in srgb, var(--c-accent) var(--un-text-opacity), transparent) }[hover\\:text-white=\"\"]:hover{color:color-mix(in srgb, var(--colors-white) var(--un-text-opacity), transparent) }.tracking-wider,[tracking-wider=\"\"]{--un-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider)}.font-bold,[font-bold=\"\"]{--un-font-weight:var(--fontWeight-bold);font-weight:var(--fontWeight-bold)}.font-bold\\!,[font-bold\\!=\"\"]{--un-font-weight:var(--fontWeight-bold)!important;font-weight:var(--fontWeight-bold)!important}.font-mono,[font-mono=\"\"]{font-family:var(--font-mono)}.font-sans,[font-sans=\"\"]{font-family:var(--font-sans)}.font-serif,[font-serif=\"\"]{font-family:var(--font-serif)}.mb-3,[mb-3=\"\"]{margin-bottom:calc(var(--spacing) * 3)}.ml-2,[ml-2=\"\"]{margin-left:calc(var(--spacing) * 2)}.p-0\\.5,[p-0\\.5=\"\"]{padding:calc(var(--spacing) * .5)}.p-1,[p-1=\"\"]{padding:calc(var(--spacing) * 1)}.px-3,[p~=x-3],[px-3=\"\"]{padding-inline:calc(var(--spacing) * 3)}.py-2\\.5,[py-2\\.5=\"\"]{padding-block:calc(var(--spacing) * 2.5)}[p~=x-4]{padding-inline:calc(var(--spacing) * 4)}[p~=y-2]{padding-block:calc(var(--spacing) * 2)}[p~=y-3]{padding-block:calc(var(--spacing) * 3)}[p~=t-3]{padding-top:calc(var(--spacing) * 3)}.outline-none,[outline-none=\"\"]{--un-outline-style:none;outline-style:none}.border,[border~=\"1\"]{border-width:1px}[border~=\"0\"]{border-width:0}.border-accent{border-color:color-mix(in srgb, var(--c-accent) var(--un-border-opacity), transparent) }.border-border\\!{border-color:color-mix(in srgb, var(--c-border) var(--un-border-opacity), transparent) !important}[border~=border-accent]{border-color:color-mix(in srgb, var(--c-border-accent) var(--un-border-opacity), transparent) }[border~=border]{border-color:color-mix(in srgb, var(--c-border) var(--un-border-opacity), transparent) }[border~=transparent]{border-color:#0000}.hover\\:border-accent:hover{border-color:color-mix(in srgb, var(--c-accent) var(--un-border-opacity), transparent) }[border~=hover\\:border-accent]:hover{border-color:color-mix(in srgb, var(--c-border-accent) var(--un-border-opacity), transparent) }.focus\\:border-accent:focus{border-color:color-mix(in srgb, var(--c-accent) var(--un-border-opacity), transparent) }[border~=focus\\:border-accent]:focus{border-color:color-mix(in srgb, var(--c-border-accent) var(--un-border-opacity), transparent) }.rounded-2xl,[rounded-2xl=\"\"]{border-radius:var(--radius-2xl)}.rounded-full,[border~=rounded-full]{border-radius:3.40282e38px}.rounded-lg,[border~=rounded-lg],[rounded-lg=\"\"]{border-radius:var(--radius-lg)}.border-none,[border-none=\"\"]{--un-border-style:none;border-style:none}[border~=solid]{--un-border-style:solid;border-style:solid}.bg-accent{background-color:color-mix(in srgb, var(--c-accent) var(--un-bg-opacity), transparent) }.bg-accent\\/10\\!{background-color:color-mix(in srgb, var(--c-accent) 10%, transparent) !important}.bg-black,[bg-black=\"\"]{background-color:color-mix(in srgb, var(--colors-black) var(--un-bg-opacity), transparent) }.bg-input,[bg-input=\"\"]{background-color:color-mix(in srgb, var(--c-input) var(--un-bg-opacity), transparent) }.bg-panel,[bg-panel=\"\"]{background-color:color-mix(in srgb, var(--c-panel) var(--un-bg-opacity), transparent) }.bg-transparent,[bg-transparent=\"\"]{background-color:#0000}.important-bg-input,[important-bg-input=\"\"]{background-color:color-mix(in srgb, var(--c-input) var(--un-bg-opacity), transparent) !important}.hover\\:bg-accent\\!:hover{background-color:color-mix(in srgb, var(--c-accent) var(--un-bg-opacity), transparent) !important}.op-0,.opacity-0,[op-0=\"\"]{opacity:0}.op-20,[op-20=\"\"]{opacity:.2}.op-30,[op-30=\"\"]{opacity:.3}.op-40,[op-40=\"\"]{opacity:.4}.op-60,[op-60=\"\"]{opacity:.6}.op-80,[op-80=\"\"]{opacity:.8}.opacity-10\\!,[opacity-10\\!=\"\"]{opacity:.1!important}.group:hover .group-hover\\:op-100,.hover\\:op-100:hover{opacity:1}.hover\\:op-100\\!:hover{opacity:1!important}.hover\\:op-80:hover{opacity:.8}.hover\\:op-90:hover{opacity:.9}[hover\\:op-100=\"\"]:hover{opacity:1}[hover\\:op-80=\"\"]:hover{opacity:.8}[hover\\:op-90=\"\"]:hover{opacity:.9}.no-underline,[no-underline=\"\"]{text-decoration:none}.flex,[flex=\"\"],[flex~=\\~]{display:flex}.flex-1,[flex-1=\"\"]{flex:1}.shrink-0,[shrink-0=\"\"]{flex-shrink:0}[flex~=col]{flex-direction:column}.gap-1,[flex~=gap-1]{gap:calc(var(--spacing) * 1)}.gap-2,[flex~=gap-2]{gap:calc(var(--spacing) * 2)}.gap-2\\.5,[gap-2\\.5=\"\"]{gap:calc(var(--spacing) * 2.5)}.gap-3,[gap-3=\"\"]{gap:calc(var(--spacing) * 3)}.size-14,[size-14=\"\"]{width:calc(var(--spacing) * 14);height:calc(var(--spacing) * 14)}.size-6,[size-6=\"\"]{width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}.h-6,[h-6=\"\"]{height:calc(var(--spacing) * 6)}.h-px,[h-px=\"\"]{height:1px}.min-w-0,[min-w-0=\"\"]{min-width:calc(var(--spacing) * 0)}.w-130,[w-130=\"\"]{width:calc(var(--spacing) * 130)}.w-6,[w-6=\"\"]{width:calc(var(--spacing) * 6)}[max-w~=\"[95vw]\"]{max-width:95vw}.cursor-pointer,[cursor-pointer=\"\"]{cursor:pointer}.cursor-not-allowed,[cursor-not-allowed=\"\"]{cursor:not-allowed}.pointer-events-none,[pointer-events-none=\"\"]{pointer-events:none}.select-none,[select-none=\"\"]{-webkit-user-select:none;user-select:none}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.transform{transform:var(--un-rotate-x) var(--un-rotate-y) var(--un-rotate-z) var(--un-skew-x) var(--un-skew-y)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter;transition-timing-function:var(--un-ease,var(--default-transition-timingFunction));transition-duration:var(--un-duration,var(--default-transition-duration))}.transition-200,[transition-200=\"\"]{--un-duration:.2s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter;transition-timing-function:var(--un-ease,var(--default-transition-timingFunction));transition-duration:var(--un-duration,var(--default-transition-duration))}.transition-250,[transition-250=\"\"]{--un-duration:.25s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter;transition-timing-function:var(--un-ease,var(--default-transition-timingFunction));transition-duration:var(--un-duration,var(--default-transition-duration))}.transition-all,[transition-all=\"\"]{transition-property:all;transition-timing-function:var(--un-ease,var(--default-transition-timingFunction));transition-duration:var(--un-duration,var(--default-transition-duration))}.transition-colors,[transition-colors=\"\"]{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to;transition-timing-function:var(--un-ease,var(--default-transition-timingFunction));transition-duration:var(--un-duration,var(--default-transition-duration))}.duration-150{--un-duration:.15s;transition-duration:.15s}.duration-200,[duration-200=\"\"]{--un-duration:.2s;transition-duration:.2s}.ease-in{--un-ease:var(--ease-in);transition-timing-function:var(--ease-in)}.ease-in-out{--un-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-out{--un-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.items-center,[flex~=items-center],[items-center=\"\"]{align-items:center}.justify-center,[flex~=justify-center],[justify-center=\"\"]{justify-content:center}.justify-between,[flex~=justify-between]{justify-content:space-between}.inset-0,[inset-0=\"\"]{inset:calc(var(--spacing) * 0)}.absolute,[absolute=\"\"]{position:absolute}.fixed,[fixed=\"\"]{position:fixed}.relative,[relative=\"\"]{position:relative}.z-0,[z-0=\"\"]{z-index:0}.z-1,[z-1=\"\"]{z-index:1}.z-2{z-index:2}.z-999999,[z-999999=\"\"]{z-index:999999}.overflow-hidden,[overflow-hidden=\"\"]{overflow:hidden}.to-transparent,[to-transparent=\"\"]{--un-gradient-to:transparent;--un-gradient-stops:var(--un-gradient-via-stops,var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))}[from~=\"[var(--border-dark)]\"]{--un-gradient-from:color-mix(in oklab, var(--border-dark) var(--un-from-opacity), transparent);--un-gradient-stops:var(--un-gradient-via-stops,var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))}[via~=\"[var(--c-accent)]\"]{--un-gradient-via:color-mix(in oklab, var(--c-accent) var(--un-via-opacity), transparent);--un-gradient-via-stops:var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-via) var(--un-gradient-via-position), var(--un-gradient-to) var(--un-gradient-to-position);--un-gradient-stops:var(--un-gradient-via-stops)}.bg-gradient-to-r,[bg-gradient-to-r=\"\"]{--un-gradient-position:to right in oklab;background-image:linear-gradient(var(--un-gradient-stops))}.placeholder-white\\/40\\!::placeholder{color:color-mix(in srgb, var(--colors-white) 40%, transparent) !important}.touch-none,[touch-none=\"\"]{touch-action:none}@media print{.print\\:hidden,[print\\:hidden=\"\"]{display:none}}@supports (color:color-mix(in lab, red, red)){.text-white{color:color-mix(in oklab, var(--colors-white) var(--un-text-opacity), transparent) }.text-white\\/40{color:color-mix(in oklab, var(--colors-white) 40%, transparent) }[text-white=\"\"],[text~=white]{color:color-mix(in oklab, var(--colors-white) var(--un-text-opacity), transparent) }[text~=\"white/90!\"],[un-text~=\"white/90!\"]{color:color-mix(in oklab, var(--colors-white) 90%, transparent) !important}.hover\\:text-red-400\\!:hover{color:color-mix(in oklab, var(--colors-red-400) var(--un-text-opacity), transparent) !important}.hover\\:text-white:hover{color:color-mix(in oklab, var(--colors-white) var(--un-text-opacity), transparent) }.hover\\:text-white\\/90:hover{color:color-mix(in oklab, var(--colors-white) 90%, transparent) }[hover\\:text-white=\"\"]:hover{color:color-mix(in oklab, var(--colors-white) var(--un-text-opacity), transparent) }.bg-black,[bg-black=\"\"]{background-color:color-mix(in oklab, var(--colors-black) var(--un-bg-opacity), transparent) }.placeholder-white\\/40\\!::placeholder{color:color-mix(in oklab, var(--colors-white) 40%, transparent) !important}}\n/*$vite$:1*/ ");
	function tryOnScopeDispose(fn, failSilently) {
		if ((0, vue.getCurrentScope)()) {
			(0, vue.onScopeDispose)(fn, failSilently);
			return true;
		}
		return false;
	}
	var localProvidedStateMap = new WeakMap();
	var injectLocal = (...args) => {
		var _getCurrentInstance;
		const key = args[0];
		const instance = (_getCurrentInstance = (0, vue.getCurrentInstance)()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.proxy;
		const owner = instance !== null && instance !== void 0 ? instance : (0, vue.getCurrentScope)();
		if (owner == null && !(0, vue.hasInjectionContext)()) throw new Error("injectLocal must be called in setup");
		if (owner && localProvidedStateMap.has(owner) && key in localProvidedStateMap.get(owner)) return localProvidedStateMap.get(owner)[key];
		return (0, vue.inject)(...args);
	};
	var isClient = typeof window !== "undefined" && typeof document !== "undefined";
	typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
	var toString = Object.prototype.toString;
	var isObject = (val) => toString.call(val) === "[object Object]";
	var noop = () => {};
	var isIOS = getIsIOS();
	function getIsIOS() {
		var _window, _window2, _window3;
		return isClient && !!((_window = window) === null || _window === void 0 || (_window = _window.navigator) === null || _window === void 0 ? void 0 : _window.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.navigator) === null || _window2 === void 0 ? void 0 : _window2.maxTouchPoints) > 2 && /iPad|Macintosh/.test((_window3 = window) === null || _window3 === void 0 ? void 0 : _window3.navigator.userAgent));
	}
	function toRef$1(...args) {
		if (args.length !== 1) return (0, vue.toRef)(...args);
		const r = args[0];
		return typeof r === "function" ? (0, vue.readonly)((0, vue.customRef)(() => ({
			get: r,
			set: noop
		}))) : (0, vue.ref)(r);
	}
	function pxValue(px) {
		return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
	}
	function toArray(value) {
		return Array.isArray(value) ? value : [value];
	}
	function getLifeCycleTarget(target) {
		return target || (0, vue.getCurrentInstance)();
	}
	function toRefs$1(objectRef, options = {}) {
		if (!(0, vue.isRef)(objectRef)) return (0, vue.toRefs)(objectRef);
		const result = Array.isArray(objectRef.value) ? Array.from({ length: objectRef.value.length }) : {};
		for (const key in objectRef.value) result[key] = (0, vue.customRef)(() => ({
			get() {
				return objectRef.value[key];
			},
			set(v) {
				var _toValue;
				if ((_toValue = (0, vue.toValue)(options.replaceRef)) !== null && _toValue !== void 0 ? _toValue : true) if (Array.isArray(objectRef.value)) {
					const copy = [...objectRef.value];
					copy[key] = v;
					objectRef.value = copy;
				} else {
					const newObject = {
						...objectRef.value,
						[key]: v
					};
					Object.setPrototypeOf(newObject, Object.getPrototypeOf(objectRef.value));
					objectRef.value = newObject;
				}
				else objectRef.value[key] = v;
			}
		}));
		return result;
	}
	function tryOnMounted(fn, sync = true, target) {
		if (getLifeCycleTarget(target)) (0, vue.onMounted)(fn, target);
		else if (sync) fn();
		else (0, vue.nextTick)(fn);
	}
	function watchImmediate(source, cb, options) {
		return (0, vue.watch)(source, cb, {
			...options,
			immediate: true
		});
	}
	var defaultWindow = isClient ? window : void 0;
	isClient && window.document;
	isClient && window.navigator;
	isClient && window.location;
	function unrefElement(elRef) {
		var _$el;
		const plain = (0, vue.toValue)(elRef);
		return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
	}
	function useEventListener(...args) {
		const register = (el, event, listener, options) => {
			el.addEventListener(event, listener, options);
			return () => el.removeEventListener(event, listener, options);
		};
		const firstParamTargets = (0, vue.computed)(() => {
			const test = toArray((0, vue.toValue)(args[0])).filter((e) => e != null);
			return test.every((e) => typeof e !== "string") ? test : void 0;
		});
		return watchImmediate(() => {
			var _firstParamTargets$va, _firstParamTargets$va2;
			return [
				(_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e) => unrefElement(e))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e) => e != null),
				toArray((0, vue.toValue)(firstParamTargets.value ? args[1] : args[0])),
				toArray((0, vue.unref)(firstParamTargets.value ? args[2] : args[1])),
				(0, vue.toValue)(firstParamTargets.value ? args[3] : args[2])
			];
		}, ([raw_targets, raw_events, raw_listeners, raw_options], _, onCleanup) => {
			if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
			const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
			const cleanups = raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))));
			onCleanup(() => {
				cleanups.forEach((fn) => fn());
			});
		}, { flush: "post" });
	}
	function useMounted() {
		const isMounted = (0, vue.shallowRef)(false);
		const instance = (0, vue.getCurrentInstance)();
		if (instance) (0, vue.onMounted)(() => {
			isMounted.value = true;
		}, instance);
		return isMounted;
	}
	function useSupported(callback) {
		const isMounted = useMounted();
		return (0, vue.computed)(() => {
			isMounted.value;
			return Boolean(callback());
		});
	}
	var ssrWidthSymbol = Symbol("vueuse-ssr-width");
	function useSSRWidth() {
		const ssrWidth = (0, vue.hasInjectionContext)() ? injectLocal(ssrWidthSymbol, null) : null;
		return typeof ssrWidth === "number" ? ssrWidth : void 0;
	}
	function useMediaQuery(query, options = {}) {
		const { window = defaultWindow, ssrWidth = useSSRWidth() } = options;
		const isSupported = useSupported(() => window && "matchMedia" in window && typeof window.matchMedia === "function");
		const ssrSupport = (0, vue.shallowRef)(typeof ssrWidth === "number");
		const mediaQuery = (0, vue.shallowRef)();
		const matches = (0, vue.shallowRef)(false);
		const handler = (event) => {
			matches.value = event.matches;
		};
		(0, vue.watchEffect)(() => {
			if (ssrSupport.value) {
				ssrSupport.value = !isSupported.value;
				matches.value = (0, vue.toValue)(query).split(",").some((queryString) => {
					const not = queryString.includes("not all");
					const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
					const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
					let res = Boolean(minWidth || maxWidth);
					if (minWidth && res) res = ssrWidth >= pxValue(minWidth[1]);
					if (maxWidth && res) res = ssrWidth <= pxValue(maxWidth[1]);
					return not ? !res : res;
				});
				return;
			}
			if (!isSupported.value) return;
			mediaQuery.value = window.matchMedia((0, vue.toValue)(query));
			matches.value = mediaQuery.value.matches;
		});
		useEventListener(mediaQuery, "change", handler, { passive: true });
		return (0, vue.computed)(() => matches.value);
	}
	var defaultScrollConfig = {
		speed: 2,
		margin: 30,
		direction: "both"
	};
	function clampContainerScroll(container) {
		if (container.scrollLeft > container.scrollWidth - container.clientWidth) container.scrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
		if (container.scrollTop > container.scrollHeight - container.clientHeight) container.scrollTop = Math.max(0, container.scrollHeight - container.clientHeight);
	}
	function useDraggable(target, options = {}) {
		var _toValue, _toValue2, _toValue3, _scrollConfig$directi;
		const { pointerTypes, preventDefault, stopPropagation, exact, onMove, onEnd, onStart, initialValue, axis = "both", draggingElement = defaultWindow, containerElement, handle: draggingHandle = target, buttons = [0], restrictInView, autoScroll = false } = options;
		const position = (0, vue.ref)((_toValue = (0, vue.toValue)(initialValue)) !== null && _toValue !== void 0 ? _toValue : {
			x: 0,
			y: 0
		});
		const pressedDelta = (0, vue.ref)();
		const filterEvent = (e) => {
			if (pointerTypes) return pointerTypes.includes(e.pointerType);
			return true;
		};
		const handleEvent = (e) => {
			if ((0, vue.toValue)(preventDefault)) e.preventDefault();
			if ((0, vue.toValue)(stopPropagation)) e.stopPropagation();
		};
		const scrollConfig = (0, vue.toValue)(autoScroll);
		const scrollSettings = typeof scrollConfig === "object" ? {
			speed: (_toValue2 = (0, vue.toValue)(scrollConfig.speed)) !== null && _toValue2 !== void 0 ? _toValue2 : defaultScrollConfig.speed,
			margin: (_toValue3 = (0, vue.toValue)(scrollConfig.margin)) !== null && _toValue3 !== void 0 ? _toValue3 : defaultScrollConfig.margin,
			direction: (_scrollConfig$directi = scrollConfig.direction) !== null && _scrollConfig$directi !== void 0 ? _scrollConfig$directi : defaultScrollConfig.direction
		} : defaultScrollConfig;
		const getScrollAxisValues = (value) => typeof value === "number" ? [value, value] : [value.x, value.y];
		const handleAutoScroll = (container, targetRect, position) => {
			const { clientWidth, clientHeight, scrollLeft, scrollTop, scrollWidth, scrollHeight } = container;
			const [marginX, marginY] = getScrollAxisValues(scrollSettings.margin);
			const [speedX, speedY] = getScrollAxisValues(scrollSettings.speed);
			let deltaX = 0;
			let deltaY = 0;
			if (scrollSettings.direction === "x" || scrollSettings.direction === "both") {
				if (position.x < marginX && scrollLeft > 0) deltaX = -speedX;
				else if (position.x + targetRect.width > clientWidth - marginX && scrollLeft < scrollWidth - clientWidth) deltaX = speedX;
			}
			if (scrollSettings.direction === "y" || scrollSettings.direction === "both") {
				if (position.y < marginY && scrollTop > 0) deltaY = -speedY;
				else if (position.y + targetRect.height > clientHeight - marginY && scrollTop < scrollHeight - clientHeight) deltaY = speedY;
			}
			if (deltaX || deltaY) container.scrollBy({
				left: deltaX,
				top: deltaY,
				behavior: "auto"
			});
		};
		let autoScrollInterval = null;
		const startAutoScroll = () => {
			const container = (0, vue.toValue)(containerElement);
			if (container && !autoScrollInterval) autoScrollInterval = setInterval(() => {
				const targetRect = (0, vue.toValue)(target).getBoundingClientRect();
				const { x, y } = position.value;
				const relativePosition = {
					x: x - container.scrollLeft,
					y: y - container.scrollTop
				};
				if (relativePosition.x >= 0 && relativePosition.y >= 0) {
					handleAutoScroll(container, targetRect, relativePosition);
					relativePosition.x += container.scrollLeft;
					relativePosition.y += container.scrollTop;
					position.value = relativePosition;
				}
			}, 1e3 / 60);
		};
		const stopAutoScroll = () => {
			if (autoScrollInterval) {
				clearInterval(autoScrollInterval);
				autoScrollInterval = null;
			}
		};
		const isPointerNearEdge = (pointer, container, margin, targetRect) => {
			const [marginX, marginY] = typeof margin === "number" ? [margin, margin] : [margin.x, margin.y];
			const { clientWidth, clientHeight } = container;
			return pointer.x < marginX || pointer.x + targetRect.width > clientWidth - marginX || pointer.y < marginY || pointer.y + targetRect.height > clientHeight - marginY;
		};
		const checkAutoScroll = () => {
			if ((0, vue.toValue)(options.disabled) || !pressedDelta.value) return;
			const container = (0, vue.toValue)(containerElement);
			if (!container) return;
			const targetRect = (0, vue.toValue)(target).getBoundingClientRect();
			const { x, y } = position.value;
			if (isPointerNearEdge({
				x: x - container.scrollLeft,
				y: y - container.scrollTop
			}, container, scrollSettings.margin, targetRect)) startAutoScroll();
			else stopAutoScroll();
		};
		if ((0, vue.toValue)(autoScroll)) (0, vue.watch)(position, checkAutoScroll);
		const start = (e) => {
			var _container$getBoundin;
			if (!(0, vue.toValue)(buttons).includes(e.button)) return;
			if ((0, vue.toValue)(options.disabled) || !filterEvent(e)) return;
			if ((0, vue.toValue)(exact) && e.target !== (0, vue.toValue)(target)) return;
			const container = (0, vue.toValue)(containerElement);
			const containerRect = container === null || container === void 0 || (_container$getBoundin = container.getBoundingClientRect) === null || _container$getBoundin === void 0 ? void 0 : _container$getBoundin.call(container);
			const targetRect = (0, vue.toValue)(target).getBoundingClientRect();
			const pos = {
				x: e.clientX - (container ? targetRect.left - containerRect.left + (autoScroll ? 0 : container.scrollLeft) : targetRect.left),
				y: e.clientY - (container ? targetRect.top - containerRect.top + (autoScroll ? 0 : container.scrollTop) : targetRect.top)
			};
			if ((onStart === null || onStart === void 0 ? void 0 : onStart(pos, e)) === false) return;
			pressedDelta.value = pos;
			handleEvent(e);
		};
		const move = (e) => {
			if ((0, vue.toValue)(options.disabled) || !filterEvent(e)) return;
			if (!pressedDelta.value) return;
			const container = (0, vue.toValue)(containerElement);
			if (container instanceof HTMLElement) clampContainerScroll(container);
			const targetRect = (0, vue.toValue)(target).getBoundingClientRect();
			let { x, y } = position.value;
			if (axis === "x" || axis === "both") {
				x = e.clientX - pressedDelta.value.x;
				if (container) x = Math.min(Math.max(0, x), container.scrollWidth - targetRect.width);
			}
			if (axis === "y" || axis === "both") {
				y = e.clientY - pressedDelta.value.y;
				if (container) y = Math.min(Math.max(0, y), container.scrollHeight - targetRect.height);
			}
			if ((0, vue.toValue)(autoScroll) && container) {
				if (autoScrollInterval === null) handleAutoScroll(container, targetRect, {
					x,
					y
				});
				x += container.scrollLeft;
				y += container.scrollTop;
			}
			if (container && (restrictInView || autoScroll)) {
				if (axis !== "y") {
					const relativeX = x - container.scrollLeft;
					if (relativeX < 0) x = container.scrollLeft;
					else if (relativeX > container.clientWidth - targetRect.width) x = container.clientWidth - targetRect.width + container.scrollLeft;
				}
				if (axis !== "x") {
					const relativeY = y - container.scrollTop;
					if (relativeY < 0) y = container.scrollTop;
					else if (relativeY > container.clientHeight - targetRect.height) y = container.clientHeight - targetRect.height + container.scrollTop;
				}
			}
			position.value = {
				x,
				y
			};
			onMove === null || onMove === void 0 || onMove(position.value, e);
			handleEvent(e);
		};
		const end = (e) => {
			if ((0, vue.toValue)(options.disabled) || !filterEvent(e)) return;
			if (!pressedDelta.value) return;
			pressedDelta.value = void 0;
			if (autoScroll) stopAutoScroll();
			onEnd === null || onEnd === void 0 || onEnd(position.value, e);
			handleEvent(e);
		};
		if (isClient) {
			const config = () => {
				var _options$capture;
				return {
					capture: (_options$capture = options.capture) !== null && _options$capture !== void 0 ? _options$capture : true,
					passive: !(0, vue.toValue)(preventDefault)
				};
			};
			useEventListener(draggingHandle, "pointerdown", start, config);
			useEventListener(draggingElement, "pointermove", move, config);
			useEventListener(draggingElement, "pointerup", end, config);
		}
		return {
			...toRefs$1(position),
			position,
			isDragging: (0, vue.computed)(() => !!pressedDelta.value),
			style: (0, vue.computed)(() => `
      left: ${position.value.x}px;
      top: ${position.value.y}px;
      ${autoScroll ? "text-wrap: nowrap;" : ""}
    `)
		};
	}
	function resolveElement(el) {
		if (typeof Window !== "undefined" && el instanceof Window) return el.document.documentElement;
		if (typeof Document !== "undefined" && el instanceof Document) return el.documentElement;
		return el;
	}
	function checkOverflowScroll(ele) {
		const style = window.getComputedStyle(ele);
		if (style.overflowX === "scroll" || style.overflowY === "scroll" || style.overflowX === "auto" && ele.clientWidth < ele.scrollWidth || style.overflowY === "auto" && ele.clientHeight < ele.scrollHeight) return true;
		else {
			const parent = ele.parentNode;
			if (!parent || parent.tagName === "BODY") return false;
			return checkOverflowScroll(parent);
		}
	}
	function preventDefault(rawEvent) {
		const e = rawEvent || window.event;
		const _target = e.target;
		if (checkOverflowScroll(_target)) return false;
		if (e.touches.length > 1) return true;
		if (e.preventDefault) e.preventDefault();
		return false;
	}
	var elInitialOverflow = new WeakMap();
	function useScrollLock(element, initialState = false) {
		const isLocked = (0, vue.shallowRef)(initialState);
		let stopTouchMoveListener = null;
		let initialOverflow = "";
		(0, vue.watch)(toRef$1(element), (el) => {
			const target = resolveElement((0, vue.toValue)(el));
			if (target) {
				const ele = target;
				if (!elInitialOverflow.get(ele)) elInitialOverflow.set(ele, ele.style.overflow);
				if (ele.style.overflow !== "hidden") initialOverflow = ele.style.overflow;
				if (ele.style.overflow === "hidden") return isLocked.value = true;
				if (isLocked.value) return ele.style.overflow = "hidden";
			}
		}, { immediate: true });
		const lock = () => {
			const el = resolveElement((0, vue.toValue)(element));
			if (!el || isLocked.value) return;
			if (isIOS) stopTouchMoveListener = useEventListener(el, "touchmove", (e) => {
				preventDefault(e);
			}, { passive: false });
			el.style.overflow = "hidden";
			isLocked.value = true;
		};
		const unlock = () => {
			const el = resolveElement((0, vue.toValue)(element));
			if (!el || !isLocked.value) return;
			if (isIOS) stopTouchMoveListener === null || stopTouchMoveListener === void 0 || stopTouchMoveListener();
			el.style.overflow = initialOverflow;
			elInitialOverflow.delete(el);
			isLocked.value = false;
		};
		tryOnScopeDispose(unlock);
		return (0, vue.computed)({
			get() {
				return isLocked.value;
			},
			set(v) {
				if (v) lock();
				else unlock();
			}
		});
	}
	Number.POSITIVE_INFINITY;
	function useWindowSize(options = {}) {
		const { window = defaultWindow, initialWidth = Number.POSITIVE_INFINITY, initialHeight = Number.POSITIVE_INFINITY, listenOrientation = true, includeScrollbar = true, type = "inner" } = options;
		const width = (0, vue.shallowRef)(initialWidth);
		const height = (0, vue.shallowRef)(initialHeight);
		const update = () => {
			if (window) if (type === "outer") {
				width.value = window.outerWidth;
				height.value = window.outerHeight;
			} else if (type === "visual" && window.visualViewport) {
				const { width: visualViewportWidth, height: visualViewportHeight, scale } = window.visualViewport;
				width.value = Math.round(visualViewportWidth * scale);
				height.value = Math.round(visualViewportHeight * scale);
			} else if (includeScrollbar) {
				width.value = window.innerWidth;
				height.value = window.innerHeight;
			} else {
				width.value = window.document.documentElement.clientWidth;
				height.value = window.document.documentElement.clientHeight;
			}
		};
		update();
		tryOnMounted(update);
		const listenerOptions = { passive: true };
		useEventListener("resize", update, listenerOptions);
		if (window && type === "visual" && window.visualViewport) useEventListener(window.visualViewport, "resize", update, listenerOptions);
		if (listenOrientation) (0, vue.watch)(useMediaQuery("(orientation: portrait)"), () => update());
		return {
			width,
			height
		};
	}
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	var STORAGE_KEY$1 = "any-bookmark-data";
	var ENABLED_DOMAINS_KEY = "any-bookmark-enabled-domains";
	function gmGetValue(key, defaultValue) {
		if (typeof _GM_getValue !== "undefined") return _GM_getValue(key, defaultValue);
		return localStorage.getItem(key) ?? defaultValue;
	}
	function gmSetValue(key, value) {
		if (typeof _GM_setValue !== "undefined") {
			_GM_setValue(key, value);
			return;
		}
		localStorage.setItem(key, value);
	}
	function loadBookmarks() {
		try {
			const raw = gmGetValue(STORAGE_KEY$1, "{}");
			return JSON.parse(raw);
		} catch {
			return {};
		}
	}
	function saveBookmarks(data) {
		gmSetValue(STORAGE_KEY$1, JSON.stringify(data));
	}
	function loadEnabledDomains() {
		try {
			const parsed = JSON.parse(gmGetValue(ENABLED_DOMAINS_KEY, "[]"));
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	}
	function saveEnabledDomains(domains) {
		gmSetValue(ENABLED_DOMAINS_KEY, JSON.stringify(domains));
	}
	var SETTINGS_VERSION = 1;
	function exportSettings() {
		const data = {
			version: SETTINGS_VERSION,
			bookmarks: loadBookmarks(),
			enabledDomains: loadEnabledDomains()
		};
		return JSON.stringify(data, null, 2);
	}
	function importSettings(json) {
		const data = JSON.parse(json);
		if (!data || typeof data !== "object") throw new TypeError("无效的设置文件");
		if (data.bookmarks && typeof data.bookmarks === "object") saveBookmarks(data.bookmarks);
		if (Array.isArray(data.enabledDomains)) saveEnabledDomains(data.enabledDomains);
	}
	function useBookmarks() {
		const allBookmarks = (0, vue.ref)(loadBookmarks());
		const hostname = (0, vue.computed)(() => {
			try {
				return new URL(location.href).hostname;
			} catch {
				return location.hostname;
			}
		});
		const currentBookmarks = (0, vue.computed)(() => allBookmarks.value[hostname.value] ?? []);
		(0, vue.watch)(allBookmarks, saveBookmarks, { deep: true });
		function add(name) {
			const trimmed = name.trim();
			if (!trimmed) return;
			const entry = {
				name: trimmed,
				url: location.href
			};
			const data = { ...allBookmarks.value };
			if (!data[hostname.value]) data[hostname.value] = [];
			data[hostname.value] = [entry, ...data[hostname.value]];
			allBookmarks.value = data;
		}
		function remove(index) {
			const data = { ...allBookmarks.value };
			data[hostname.value].splice(index, 1);
			if (data[hostname.value].length === 0) delete data[hostname.value];
			allBookmarks.value = data;
		}
		return {
			allBookmarks,
			hostname,
			currentBookmarks,
			add,
			remove
		};
	}
	function usePagination(items, pageSize = 8) {
		const current = (0, vue.ref)(1);
		const paged = (0, vue.computed)(() => {
			const list = items();
			const start = (current.value - 1) * pageSize;
			return list.slice(start, start + pageSize);
		});
		const total = (0, vue.computed)(() => Math.ceil(items().length / pageSize));
		(0, vue.computed)(() => {
			if (current.value > total.value && total.value > 0) current.value = total.value;
		});
		return {
			current,
			paged,
			total
		};
	}
	var _hoisted_1$1 = {
		p: "x-4 t-3",
		flex: "~ gap-1 items-center justify-center"
	};
	var _hoisted_2$1 = ["disabled"];
	var _hoisted_3$1 = {
		key: 0,
		"text-accent": "",
		"text-sm": "",
		"font-bold": "",
		"font-mono": "",
		"border-none": "",
		"bg-transparent": "",
		flex: "",
		"h-6": "",
		"w-6": "",
		"items-center": "",
		"justify-center": ""
	};
	var _hoisted_4$1 = {
		key: 0,
		"text-sm": "",
		"text-white": "",
		"font-mono": "",
		"op-20": "",
		flex: "",
		"size-6": "",
		"select-none": "",
		"items-center": "",
		"justify-center": ""
	};
	var _hoisted_5$1 = ["disabled", "onClick"];
	var _hoisted_6$1 = ["disabled"];
	var Pagination_default = (0, vue.defineComponent)({
		__name: "Pagination",
		props: (0, vue.mergeModels)({ total: {} }, {
			"current": { required: true },
			"currentModifiers": {}
		}),
		emits: ["update:current"],
		setup(__props) {
			const props = __props;
			const current = (0, vue.useModel)(__props, "current");
			const visiblePages = (0, vue.computed)(() => {
				const t = props.total;
				if (t <= 0) return [];
				const c = current.value;
				const pages = [];
				if (t <= 5) {
					for (let i = 1; i <= t; i++) pages.push(i);
					return pages;
				}
				pages.push(1);
				let start = Math.max(2, c - 1);
				let end = Math.min(t - 1, c + 1);
				if (c <= 3) {
					start = 2;
					end = 4;
				} else if (c >= t - 2) {
					start = t - 3;
					end = t - 1;
				}
				if (start > 2) pages.push("...");
				for (let i = start; i <= end; i++) pages.push(i);
				if (end < t - 1) pages.push("...");
				pages.push(t);
				return pages;
			});
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_1$1, [
					(0, vue.createElementVNode)("button", {
						"hover:text-accent": "",
						"text-white": "",
						"p-1": "",
						"border-none": "",
						"bg-transparent": "",
						"op-40": "",
						flex: "",
						"cursor-pointer": "",
						"transition-colors": "",
						"duration-200": "",
						"items-center": "",
						"hover:op-100": "",
						disabled: current.value === 1 || __props.total <= 1,
						class: (0, vue.normalizeClass)({ "opacity-10! cursor-not-allowed hover:text-white": current.value === 1 || __props.total <= 1 }),
						onClick: _cache[0] || (_cache[0] = ($event) => current.value--)
					}, [..._cache[2] || (_cache[2] = [(0, vue.createElementVNode)("div", {
						"i-mdi-chevron-left": "",
						"text-sm": ""
					}, null, -1)])], 10, _hoisted_2$1),
					__props.total === 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", _hoisted_3$1, " 1 ")) : ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, (0, vue.renderList)(visiblePages.value, (p, idx) => {
						return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: idx }, [p === "..." ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_4$1, " ... ")) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
							key: 1,
							"text-sm": "",
							"font-mono": "",
							"border-none": "",
							flex: "",
							"size-6": "",
							"transition-all": "",
							"duration-200": "",
							"items-center": "",
							"justify-center": "",
							class: (0, vue.normalizeClass)(p === current.value ? "bg-transparent text-accent font-bold! " : "bg-transparent text-white op-40 hover:text-white hover:op-80 cursor-pointer"),
							disabled: p === current.value,
							onClick: ($event) => current.value = p
						}, (0, vue.toDisplayString)(p), 11, _hoisted_5$1))], 64);
					}), 128)),
					(0, vue.createElementVNode)("button", {
						"hover:text-accent": "",
						"text-white": "",
						"p-1": "",
						"border-none": "",
						"bg-transparent": "",
						"op-40": "",
						flex: "",
						"cursor-pointer": "",
						"transition-colors": "",
						"duration-200": "",
						"items-center": "",
						"hover:op-100": "",
						disabled: current.value === __props.total || __props.total <= 1,
						class: (0, vue.normalizeClass)({ "opacity-10! cursor-not-allowed hover:text-white": current.value === __props.total || __props.total <= 1 }),
						onClick: _cache[1] || (_cache[1] = ($event) => current.value++)
					}, [..._cache[3] || (_cache[3] = [(0, vue.createElementVNode)("div", {
						"i-mdi-chevron-right": "",
						"text-sm": ""
					}, null, -1)])], 10, _hoisted_6$1)
				]);
			};
		}
	});
	var _hoisted_1 = {
		key: 0,
		flex: "",
		"items-center": "",
		"inset-0": "",
		"justify-center": "",
		fixed: "",
		"z-999999": "",
		"print:hidden": ""
	};
	var _hoisted_2 = {
		"max-w": "[95vw]",
		flex: "~ col",
		border: "1 solid border",
		"bg-panel": "",
		"rounded-2xl": "",
		"w-130": "",
		relative: "",
		"z-1": "",
		"overflow-hidden": "",
		p: "x-4 y-3"
	};
	var _hoisted_3 = {
		flex: "~ items-center justify-between",
		"mb-3": ""
	};
	var _hoisted_4 = {
		flex: "",
		"gap-3": "",
		"items-center": ""
	};
	var _hoisted_5 = {
		text: "#a6926d",
		"text-xs": "",
		"font-mono": ""
	};
	var _hoisted_6 = {
		flex: "~  gap-2",
		"mb-3": ""
	};
	var _hoisted_7 = ["disabled"];
	var _hoisted_8 = {
		flex: "~ col gap-1",
		"p-1": "",
		border: "1 solid border rounded-lg"
	};
	var _hoisted_9 = ["href", "title"];
	var _hoisted_10 = { class: "truncate" };
	var _hoisted_11 = ["onClick"];
	var PAGE_SIZE = 10;
	var STORAGE_KEY = "bookmark-current-page";
	var BookmarkPanel_default = (0, vue.defineComponent)({
		__name: "BookmarkPanel",
		props: { open: { type: Boolean } },
		emits: ["close"],
		setup(__props, { emit: __emit }) {
			const props = __props;
			const emit = __emit;
			const isLocked = useScrollLock(document.body);
			(0, vue.watch)(() => props.open, (val) => {
				isLocked.value = val;
			}, { immediate: true });
			const { hostname, currentBookmarks, add, remove } = useBookmarks();
			const { current, paged, total } = usePagination(() => currentBookmarks.value, PAGE_SIZE);
			const newName = (0, vue.ref)("");
			const inputRef = (0, vue.ref)();
			const hasNewName = (0, vue.computed)(() => newName.value.trim().length > 0);
			const emptyRowsCount = (0, vue.computed)(() => {
				return PAGE_SIZE - paged.value.length;
			});
			(0, vue.watch)(current, (val) => {
				localStorage.setItem(STORAGE_KEY, String(val));
			});
			(0, vue.watch)(() => props.open, (val) => {
				if (val) {
					newName.value = document.title || "";
					const savedPage = localStorage.getItem(STORAGE_KEY);
					const targetPage = savedPage ? Number(savedPage) : 1;
					(0, vue.nextTick)(() => {
						const maxPage = total.value || 1;
						current.value = Math.min(targetPage, maxPage);
						inputRef.value?.focus();
					});
				}
			});
			function handleAdd() {
				add(newName.value);
				newName.value = "";
				current.value = 1;
			}
			function handleRemove(index) {
				remove((current.value - 1) * PAGE_SIZE + index);
			}
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, {
					"enter-active-class": "duration-200 ease-out",
					"leave-active-class": "duration-150 ease-in",
					"enter-from-class": "opacity-0",
					"leave-to-class": "opacity-0"
				}, {
					default: (0, vue.withCtx)(() => [__props.open ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_1, [(0, vue.createElementVNode)("div", {
						"bg-black": "",
						"op-60": "",
						"inset-0": "",
						absolute: "",
						"z-0": "",
						onClick: _cache[0] || (_cache[0] = ($event) => emit("close"))
					}), (0, vue.createElementVNode)("div", _hoisted_2, [
						(0, vue.createElementVNode)("div", _hoisted_3, [_cache[7] || (_cache[7] = (0, vue.createElementVNode)("div", {
							flex: "",
							"gap-2.5": "",
							"items-center": ""
						}, [(0, vue.createElementVNode)("div", {
							"i-mdi-bookmark-outline": "",
							"text-accent": "",
							"text-lg": ""
						}), (0, vue.createElementVNode)("span", {
							"text-base": "",
							"text-white": "",
							"tracking-wider": "",
							"font-bold": "",
							"font-serif": ""
						}, "收藏夹")], -1)), (0, vue.createElementVNode)("div", _hoisted_4, [(0, vue.createElementVNode)("span", _hoisted_5, (0, vue.toDisplayString)((0, vue.unref)(hostname)), 1), (0, vue.createElementVNode)("button", {
							"text-white": "",
							"p-0.5": "",
							"border-none": "",
							"bg-transparent": "",
							"op-40": "",
							"cursor-pointer": "",
							"transition-colors": "",
							"duration-200": "",
							"hover:op-90": "",
							onClick: _cache[1] || (_cache[1] = ($event) => emit("close"))
						}, [..._cache[6] || (_cache[6] = [(0, vue.createElementVNode)("div", {
							"i-mdi-close": "",
							"text-lg": ""
						}, null, -1)])])])]),
						_cache[11] || (_cache[11] = (0, vue.createElementVNode)("div", {
							"mb-3": "",
							"h-px": "",
							"to-transparent": "",
							"bg-gradient-to-r": "",
							from: "[var(--border-dark)]",
							via: "[var(--c-accent)]"
						}, null, -1)),
						(0, vue.createElementVNode)("div", _hoisted_6, [(0, vue.withDirectives)((0, vue.createElementVNode)("input", {
							ref_key: "inputRef",
							ref: inputRef,
							"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => newName.value = $event),
							type: "text",
							placeholder: "为当前页面命名…",
							border: "1 solid border focus:border-accent",
							p: "x-3 y-2",
							"important-bg-input": "",
							text: "sm white/90! placeholder-white/40!",
							"outline-none": "",
							"rounded-lg": "",
							"flex-1": "",
							"transition-200": "",
							onKeydown: _cache[3] || (_cache[3] = (0, vue.withKeys)(($event) => handleAdd(), ["enter"]))
						}, null, 544), [[vue.vModelText, newName.value]]), (0, vue.createElementVNode)("button", {
							p: "x-3 y-2",
							border: "1 solid border-accent rounded-lg",
							flex: "~ gap-1",
							"bg-input": "",
							"text-sm": "",
							"cursor-pointer": "",
							"transition-200": "",
							class: (0, vue.normalizeClass)({
								"border-border! cursor-not-allowed text-white/40": !hasNewName.value,
								"bg-accent/10! text-accent/90 hover:bg-accent! hover:text-white/90": hasNewName.value
							}),
							disabled: !hasNewName.value,
							onClick: _cache[4] || (_cache[4] = ($event) => handleAdd())
						}, [..._cache[8] || (_cache[8] = [(0, vue.createElementVNode)("span", null, "收藏", -1)])], 10, _hoisted_7)]),
						(0, vue.createElementVNode)("div", _hoisted_8, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(paged), (bm, i) => {
							return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
								key: `${(0, vue.unref)(current)}-${i}`,
								border: "1 solid transparent hover:border-accent",
								"bg-input": "",
								"px-3": "",
								"rounded-lg": "",
								flex: "~ items-center",
								"transition-250": "",
								class: "group"
							}, [(0, vue.createElementVNode)("a", {
								href: bm.url,
								title: bm.url,
								"un-text": "sm white/90!",
								"font-sans": "",
								"py-2.5": "",
								"op-80": "",
								"no-underline": "",
								flex: "",
								"flex-1": "",
								"min-w-0": "",
								"items-center": "",
								class: "transition-all duration-200 group-hover:op-100 group-hover:text-[var(--c-accent)]!"
							}, [(0, vue.createElementVNode)("span", _hoisted_10, (0, vue.toDisplayString)(bm.name), 1)], 8, _hoisted_9), (0, vue.createElementVNode)("button", {
								"text-white": "",
								"ml-2": "",
								"p-1": "",
								"border-none": "",
								"bg-transparent": "",
								"op-30": "",
								flex: "",
								"shrink-0": "",
								"cursor-pointer": "",
								"items-center": "",
								class: "transition-all duration-200 relative z-2 hover:text-red-400! hover:op-100!",
								onClick: ($event) => handleRemove(i)
							}, [..._cache[9] || (_cache[9] = [(0, vue.createElementVNode)("div", {
								"i-mdi-delete-outline": "",
								"text-sm": ""
							}, null, -1)])], 8, _hoisted_11)]);
						}), 128)), ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(emptyRowsCount.value, (n) => {
							return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
								key: `empty-${n}`,
								border: "1 solid transparent",
								"px-3": "",
								"py-2.5": "",
								"bg-transparent": "",
								flex: "",
								"pointer-events-none": "",
								"select-none": "",
								"items-center": ""
							}, [..._cache[10] || (_cache[10] = [(0, vue.createElementVNode)("span", {
								"text-sm": "",
								"op-0": ""
							}, "\xA0", -1)])]);
						}), 128))]),
						(0, vue.createVNode)(Pagination_default, {
							current: (0, vue.unref)(current),
							"onUpdate:current": _cache[5] || (_cache[5] = ($event) => (0, vue.isRef)(current) ? current.value = $event : null),
							total: (0, vue.unref)(total)
						}, null, 8, ["current", "total"])
					])])) : (0, vue.createCommentVNode)("", true)]),
					_: 1
				});
			};
		}
	});
	var btnSize = 56;
	var margin = 24;
	var MOVE_THRESHOLD = 5;
	var TriggerButton_vue_vue_type_script_setup_true_lang_default = (0, vue.defineComponent)({
		__name: "TriggerButton",
		emits: ["toggle"],
		setup(__props, { emit: __emit }) {
			const emit = __emit;
			const btnRef = (0, vue.useTemplateRef)("btnRef");
			const { width, height } = useWindowSize();
			const startX = (0, vue.ref)(0);
			const startY = (0, vue.ref)(0);
			const dragged = (0, vue.ref)(false);
			function handlePointerDown(e) {
				startX.value = e.clientX;
				startY.value = e.clientY;
				dragged.value = false;
			}
			function handlePointerMove(e) {
				if (dragged.value) return;
				const dx = e.clientX - startX.value;
				const dy = e.clientY - startY.value;
				if (Math.hypot(dx, dy) > MOVE_THRESHOLD) dragged.value = true;
			}
			function handleClick() {
				if (dragged.value) return;
				emit("toggle");
			}
			const { x, y, style } = useDraggable(btnRef, {
				initialValue: () => ({
					x: Math.max(0, width.value - btnSize - margin),
					y: Math.max(0, height.value - btnSize - margin)
				}),
				preventDefault: true,
				onMove() {
					x.value = Math.max(margin, Math.min(x.value, width.value - btnSize - margin));
					y.value = Math.max(margin, Math.min(y.value, height.value - btnSize - margin));
				}
			});
			(0, vue.watch)([width, height], () => {
				x.value = Math.max(margin, Math.min(x.value, width.value - btnSize - margin));
				y.value = Math.max(margin, Math.min(y.value, height.value - btnSize - margin));
			});
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					ref_key: "btnRef",
					ref: btnRef,
					style: (0, vue.normalizeStyle)((0, vue.unref)(style)),
					text: "2xl white",
					"outline-none": "",
					border: "0 rounded-full",
					flex: "",
					"size-14": "",
					"cursor-pointer": "",
					"select-none": "",
					"items-center": "",
					"justify-center": "",
					fixed: "",
					"z-999999": "",
					"touch-none": "",
					class: "trigger-btn bg-accent",
					role: "button",
					tabindex: "0",
					"aria-label": "打开书签",
					onPointerdown: handlePointerDown,
					onPointermove: handlePointerMove,
					onClick: handleClick,
					onKeydown: [_cache[0] || (_cache[0] = (0, vue.withKeys)(($event) => emit("toggle"), ["enter"])), _cache[1] || (_cache[1] = (0, vue.withKeys)((0, vue.withModifiers)(($event) => emit("toggle"), ["prevent"]), ["space"]))]
				}, [..._cache[2] || (_cache[2] = [(0, vue.createElementVNode)("div", { class: "icon-wrapper" }, [(0, vue.createElementVNode)("div", {
					"i-mdi-bookmark-plus": "",
					flex: "",
					"pointer-events-none": "",
					"items-center": "",
					"justify-center": ""
				})], -1)])], 36);
			};
		}
	});
	var _plugin_vue_export_helper_default = (sfc, props) => {
		const target = sfc.__vccOpts || sfc;
		for (const [key, val] of props) target[key] = val;
		return target;
	};
	var TriggerButton_default = _plugin_vue_export_helper_default(TriggerButton_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-b045b254"]]);
	var currentDomain = location.hostname;
	var enabledDomains = (0, vue.ref)(loadEnabledDomains());
	var currentDomainEnabled = (0, vue.computed)(() => enabledDomains.value.includes(currentDomain));
	function toggleCurrentDomain() {
		const next = new Set(enabledDomains.value);
		if (next.has(currentDomain)) next.delete(currentDomain);
		else next.add(currentDomain);
		enabledDomains.value = [...next];
		saveEnabledDomains(enabledDomains.value);
	}
	var initialized = false;
	var TOGGLE_MENU_ID = "any-bookmark-toggle-domain";
	var EXPORT_MENU_ID = "any-bookmark-export";
	var IMPORT_MENU_ID = "any-bookmark-import";
	function registerMenu() {
		if (typeof _GM_registerMenuCommand !== "function") return;
		_GM_registerMenuCommand(enabledDomains.value.includes(currentDomain) ? `在 ${currentDomain} 隐藏书签按钮` : `在 ${currentDomain} 显示书签按钮`, () => toggleCurrentDomain(), { id: TOGGLE_MENU_ID });
	}
	function downloadSettings() {
		const blob = new Blob([exportSettings()], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `any-bookmark-settings-${new Date().toISOString().slice(0, 10)}.json`;
		document.body.append(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	}
	function promptImportSettings() {
		const json = prompt("粘贴导出的设置 JSON：");
		if (!json) return;
		try {
			importSettings(json);
			location.reload();
		} catch {
			alert("导入失败：JSON 格式无效");
		}
	}
	function setupSettings() {
		if (initialized) return;
		initialized = true;
		registerMenu();
		if (typeof _GM_registerMenuCommand === "function") {
			_GM_registerMenuCommand("导出书签设置", () => downloadSettings(), { id: EXPORT_MENU_ID });
			_GM_registerMenuCommand("导入书签设置", () => promptImportSettings(), { id: IMPORT_MENU_ID });
		}
		(0, vue.watch)(currentDomainEnabled, registerMenu);
	}
	var App_default = (0, vue.defineComponent)({
		__name: "App",
		setup(__props) {
			setupSettings();
			const panelOpen = (0, vue.ref)(false);
			return (_ctx, _cache) => {
				return (0, vue.unref)(currentDomainEnabled) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createVNode)(TriggerButton_default, { onToggle: _cache[0] || (_cache[0] = ($event) => panelOpen.value = !panelOpen.value) }), (0, vue.createVNode)(BookmarkPanel_default, {
					open: panelOpen.value,
					onClose: _cache[1] || (_cache[1] = ($event) => panelOpen.value = false)
				}, null, 8, ["open"])], 64)) : (0, vue.createCommentVNode)("", true);
			};
		}
	});
	_css(":host,:root{--c-accent:#c68345;--c-panel:#151515;--c-input:#1a1a1a;--c-surface:#18181b;--c-row:#16131c;--c-border:#ffffff1a;--c-border-accent:#c6834580}");
	var w = window;
	var host = document.createElement("div");
	host.id = "any-bookmark-host";
	document.body.append(host);
	var shadow = host.attachShadow({ mode: "open" });
	var shadowStyle = document.createElement("style");
	shadow.append(shadowStyle);
	var propStyle = document.createElement("style");
	propStyle.id = "any-bookmark-properties";
	document.head.append(propStyle);
	var PROPERTY_RE = /@property\s[^{]+\{[^}]*\}/g;
	w.__anyBookmarkApplyCss = () => {
		const all = (w.__anyBookmarkCss ?? []).join("\n");
		propStyle.textContent = (all.match(PROPERTY_RE) ?? []).join("\n");
		shadowStyle.textContent = all.replace(PROPERTY_RE, "");
	};
	w.__anyBookmarkApplyCss();
	var mountPoint = document.createElement("div");
	shadow.append(mountPoint);
	(0, vue.createApp)(App_default).mount(mountPoint);
})(Vue);
