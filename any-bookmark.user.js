// ==UserScript==
// @name         Any Bookmark
// @namespace    https://github.com/Lu-Jiejie/any-bookmark
// @version      0.0.5
// @author       Lu-Jiejie
// @description  为每个网站提供独立的快速收藏夹功能，按照域名各自管理，适用于各种图站、论坛等。
// @license      MIT
// @icon         https://cdn.jsdmirror.com/gh/Lu-Jiejie/any-bookmark@main/assets/ico.svg
// @homepage     https://github.com/Lu-Jiejie/any-bookmark
// @homepageURL  https://github.com/Lu-Jiejie/any-bookmark
// @source       https://github.com/Lu-Jiejie/any-bookmark.git
// @downloadURL  https://github.com/Lu-Jiejie/any-bookmark/raw/gh-pages/any-bookmark.user.js
// @updateURL    https://github.com/Lu-Jiejie/any-bookmark/raw/gh-pages/any-bookmark.user.js
// @match        *://*/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.5.38/dist/vue.global.prod.js
// @connect      *
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
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
			const formatted = css.replace(/\}/g, "}\n");
			(w.__anyBookmarkCss ||= []).push(formatted);
			w.__anyBookmarkApplyCss?.();
		})(t);
	};
	_css(" .trigger-btn[data-v-a20ea2d1]{box-shadow:0 0 6px color-mix(in srgb, var(--c-accent) 65%, transparent),  0 0 12px color-mix(in srgb, var(--c-accent) 40%, transparent),  0 0 24px color-mix(in srgb, var(--c-accent) 0%, transparent),  inset 0 0 0 1.5px color-mix(in srgb, var(--c-accent) 40%, transparent);transition:box-shadow .3s ease-in-out}.trigger-btn[data-v-a20ea2d1]:hover{box-shadow:0 0 8px color-mix(in srgb, var(--c-accent) 95%, transparent),  0 0 16px color-mix(in srgb, var(--c-accent) 75%, transparent),  0 0 24px color-mix(in srgb, var(--c-accent) 40%, transparent),  inset 0 0 0 1.5px color-mix(in srgb, var(--c-accent) 75%, transparent)}.icon-wrapper[data-v-a20ea2d1]{justify-content:center;align-items:center;transition:transform .3s cubic-bezier(.34,1.56,.64,1);display:flex}@font-face{font-family:DM Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYthSQBK6PYK3EXw.woff2)format(\"woff2\");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:DM Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYthqQBK6PYK0.woff2)format(\"woff2\");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:DM Sans;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxRR232RmYJp8I5zzw.woff2)format(\"woff2\");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:DM Sans;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxRSW32RmYJp8I5.woff2)format(\"woff2\");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:DM Serif Display;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmserifdisplay/v17/-nFnOHM81r4j6k0gjAW3mujVU2B2G_5x0vrx52jJ3Q.woff2)format(\"woff2\");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:DM Serif Display;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmserifdisplay/v17/-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0vrx52g.woff2)format(\"woff2\");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--un-ease:initial;--un-bg-opacity:100%;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-text-opacity:100%;--un-border-opacity:100%;--un-translate-x:initial;--un-translate-y:initial;--un-translate-z:initial;--un-from-opacity:100%;--un-via-opacity:100%;--un-border-bottom-opacity:100%;--un-placeholder-opacity:100%}}@property --un-text-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --un-border-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --un-border-bottom-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --un-bg-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --un-translate-x{syntax:\"*\";inherits:false;initial-value:0}@property --un-translate-y{syntax:\"*\";inherits:false;initial-value:0}@property --un-translate-z{syntax:\"*\";inherits:false;initial-value:0}@property --un-scale-x{syntax:\"*\";inherits:false;initial-value:1}@property --un-scale-y{syntax:\"*\";inherits:false;initial-value:1}@property --un-scale-z{syntax:\"*\";inherits:false;initial-value:1}@property --un-ease{syntax:\"*\";inherits:false}@property --un-from-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --un-gradient-from{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --un-gradient-from-position{syntax:\"<length-percentage>\";inherits:false;initial-value:0%}@property --un-gradient-position{syntax:\"*\";inherits:false}@property --un-gradient-stops{syntax:\"*\";inherits:false}@property --un-gradient-to{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --un-gradient-to-position{syntax:\"<length-percentage>\";inherits:false;initial-value:100%}@property --un-gradient-via{syntax:\"<color>\";inherits:false;initial-value:#0000}@property --un-gradient-via-position{syntax:\"<length-percentage>\";inherits:false;initial-value:50%}@property --un-gradient-via-stops{syntax:\"*\";inherits:false}@property --un-via-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --un-placeholder-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%}:root,:host{--spacing:.25rem;--default-transition-timingFunction:cubic-bezier(.4, 0, .2, 1);--default-transition-duration:.15s;--ease-in-out:cubic-bezier(.4, 0, .2, 1);--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in:cubic-bezier(.4, 0, 1, 1);--radius-2xl:1rem;--tracking-wider:.05em;--fontWeight-bold:700;--radius-lg:.5rem;--radius-DEFAULT:.25rem;--font-mono:\"DM Mono\",ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace;--font-sans:\"DM Sans\",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";--font-serif:\"DM Serif Display\",ui-serif,Georgia,Cambria,\"Times New Roman\",Times,serif;--colors-red-900:oklch(39.6% .141 25.723);--colors-green-900:oklch(39.3% .095 152.535);--colors-yellow-900:oklch(42.1% .095 57.708);--colors-black:#000;--colors-white:#fff;--colors-red-400:oklch(70.4% .191 22.216);--colors-red-300:oklch(80.8% .114 19.571);--colors-yellow-400:oklch(85.2% .199 91.936);--colors-green-400:oklch(79.2% .209 151.711);--text-lg-fontSize:1.125rem;--text-lg-lineHeight:1.75rem;--text-base-fontSize:1rem;--text-base-lineHeight:1.5rem;--text-xs-fontSize:.75rem;--text-xs-lineHeight:1rem;--text-sm-fontSize:.875rem;--text-sm-lineHeight:1.25rem;--text-4xl-fontSize:2.25rem;--text-4xl-lineHeight:2.5rem;--container-sm:24rem;--text-2xl-fontSize:1.5rem;--text-2xl-lineHeight:2rem;--default-font-family:var(--font-sans);--default-monoFont-family:var(--font-mono)}*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-featureSettings,normal);font-variation-settings:var(--default-font-variationSettings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-monoFont-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-monoFont-featureSettings,normal);font-variation-settings:var(--default-monoFont-variationSettings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden~=until-found])){display:none!important}.i-mdi-bookmark-off-outline,[i-mdi-bookmark-off-outline=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M3.28 4L2 5.27l3 3V21l7-3l4.78 2.05L18.73 22L20 20.72zM7 18v-7.73l6 5.98l-1-.43zM7 5.16L5.5 3.67C5.88 3.26 6.41 3 7 3h10a2 2 0 0 1 2 2v12.16l-2-2V5H7z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-bookmark-outline,[i-mdi-bookmark-outline=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m17 18l-5-2.18L7 18V5h10m0-2H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-bookmark-plus,[i-mdi-bookmark-plus=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M17 3a2 2 0 0 1 2 2v16l-7-3l-7 3V5a2 2 0 0 1 2-2zm-6 4v2H9v2h2v2h2v-2h2V9h-2V7z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-chevron-left,[i-mdi-chevron-left=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-chevron-right,[i-mdi-chevron-right=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-chevron-up{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-close,[i-mdi-close=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-cog,[i-mdi-cog=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-database{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4s8-1.79 8-4s-3.58-4-8-4M4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4m0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-delete-outline,[i-mdi-delete-outline=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-download,[i-mdi-download=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-eye{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-eye-off{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-loading,[i-mdi-loading=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-magnify,[i-mdi-magnify=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.52 6.52 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-pencil,[i-mdi-pencil=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-plus{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-regex,[i-mdi-regex=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M16 16.92c-.33.05-.66.08-1 .08s-.67-.03-1-.08v-3.51l-2.5 2.48c-.5-.39-1-.89-1.39-1.39l2.48-2.5H9.08c-.05-.33-.08-.66-.08-1s.03-.67.08-1h3.51l-2.48-2.5c.19-.25.39-.5.65-.74c.24-.26.49-.46.74-.65L14 8.59V5.08c.33-.05.66-.08 1-.08s.67.03 1 .08v3.51l2.5-2.48c.5.39 1 .89 1.39 1.39L17.41 10h3.51c.05.33.08.66.08 1s-.03.67-.08 1h-3.51l2.48 2.5c-.19.25-.39.5-.65.74c-.24.26-.49.46-.74.65L16 13.41zM5 19a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-sort,[i-mdi-sort=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m18 21l-4-4h3V7h-3l4-4l4 4h-3v10h3M2 19v-2h10v2M2 13v-2h7v2M2 7V5h4v2z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-sync{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M12 18a6 6 0 0 1-6-6c0-1 .25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12a8 8 0 0 0 8 8v3l4-4l-4-4m0-11V1L8 5l4 4V6a6 6 0 0 1 6 6c0 1-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12a8 8 0 0 0-8-8'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-upload,[i-mdi-upload=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M9 16v-6H5l7-7l7 7h-4v6zm-4 4v-2h14v2z'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-web,[i-mdi-web=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2s.06-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.92 7.92 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8 8 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.7 15.7 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.i-mdi-web-off,[i-mdi-web-off=\"\"]{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M9.4 4.44c-.21.39-.4.79-.56 1.2l1.53 1.53c.41-1.12.96-2.17 1.63-3.14c.83 1.2 1.5 2.54 1.91 3.97H11.2l2 2h1.14c.06.41.1.84.13 1.27l1.97 1.97c.03-.41.06-.82.06-1.24c0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2H17.2l3.3 3.28c.94-1.53 1.5-3.34 1.5-5.28c0-5.5-4.5-10-10-10c-1.94 0-3.75.56-5.28 1.5L8.18 5c.39-.23.82-.42 1.22-.56M18.92 8h-2.95a15.7 15.7 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M2.39 1.73L1.11 3l2.95 2.95A9.9 9.9 0 0 0 2 12c0 5.5 4.5 10 10 10c2.28 0 4.37-.77 6.06-2.05l2.78 2.78l1.27-1.27zM5.5 7.37l.61.63H5.08c.12-.22.26-.42.42-.63M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2zm.82 2H8c.35 1.25.8 2.45 1.4 3.56A8 8 0 0 1 5.08 16m4.42-4c0-.2 0-.39.03-.58L12.11 14H9.66c-.1-.66-.16-1.32-.16-2m2.5 7.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96m2.59-.4c.37-.68.67-1.41.91-2.15l1.12 1.09c-.62.45-1.3.81-2.03 1.06'/%3E%3C/svg%3E\");-webkit-mask:var(--un-icon) no-repeat;-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;color:inherit;background-color:currentColor;width:1.2em;height:1.2em;-webkit-mask-size:100% 100%;mask-size:100% 100%}.text-4xl,[text-4xl=\"\"]{font-size:var(--text-4xl-fontSize);line-height:var(--un-leading,var(--text-4xl-lineHeight))}.text-base,[text-base=\"\"]{font-size:var(--text-base-fontSize);line-height:var(--un-leading,var(--text-base-lineHeight))}.text-lg,[text-lg=\"\"]{font-size:var(--text-lg-fontSize);line-height:var(--un-leading,var(--text-lg-lineHeight))}.text-sm,[text-sm=\"\"],[text~=sm],[un-text~=sm]{font-size:var(--text-sm-fontSize);line-height:var(--un-leading,var(--text-sm-lineHeight))}.text-xs,[text-xs=\"\"],[text~=xs]{font-size:var(--text-xs-fontSize);line-height:var(--un-leading,var(--text-xs-lineHeight))}[text~=\"2xl\"]{font-size:var(--text-2xl-fontSize);line-height:var(--un-leading,var(--text-2xl-lineHeight))}.text-accent,[text-accent=\"\"]{color:color-mix(in srgb, var(--c-accent) var(--un-text-opacity), transparent) }.text-accent\\/90{color:color-mix(in srgb, var(--c-accent) 90%, transparent) }.text-red-300{color:color-mix(in srgb, var(--colors-red-300) var(--un-text-opacity), transparent) }.text-red-400\\/60{color:color-mix(in srgb, var(--colors-red-400) 60%, transparent) }.text-white,[text-white=\"\"],[text~=white]{color:color-mix(in srgb, var(--colors-white) var(--un-text-opacity), transparent) }.text-white\\/30,[text~=white\\/30]{color:color-mix(in srgb, var(--colors-white) 30%, transparent) }.text-white\\/35{color:color-mix(in srgb, var(--colors-white) 35%, transparent) }.text-white\\/40\\!{color:color-mix(in srgb, var(--colors-white) 40%, transparent) !important}.text-white\\/70{color:color-mix(in srgb, var(--colors-white) 70%, transparent) }[text~=\\#a6926d]{color:color-mix(in oklab, #a6926d var(--un-text-opacity), transparent) }[text~=green-400]{color:color-mix(in srgb, var(--colors-green-400) var(--un-text-opacity), transparent) }[text~=red-400]{color:color-mix(in srgb, var(--colors-red-400) var(--un-text-opacity), transparent) }[text~=white\\/25]{color:color-mix(in srgb, var(--colors-white) 25%, transparent) }[text~=white\\/40]{color:color-mix(in srgb, var(--colors-white) 40%, transparent) }[text~=white\\/60]{color:color-mix(in srgb, var(--colors-white) 60%, transparent) }[text~=\"white/60!\"]{color:color-mix(in srgb, var(--colors-white) 60%, transparent) !important}[text~=\"white/90!\"],[un-text~=\"white/90!\"]{color:color-mix(in srgb, var(--colors-white) 90%, transparent) !important}.group:hover .group-hover\\:text-\\[var\\(--c-accent\\)\\]\\!{color:color-mix(in oklab, var(--c-accent) var(--un-text-opacity), transparent) !important}.hover\\:text-accent:hover{color:color-mix(in srgb, var(--c-accent) var(--un-text-opacity), transparent) }.hover\\:text-accent\\!:hover{color:color-mix(in srgb, var(--c-accent) var(--un-text-opacity), transparent) !important}.hover\\:text-red-400\\!:hover{color:color-mix(in srgb, var(--colors-red-400) var(--un-text-opacity), transparent) !important}.hover\\:text-white:hover{color:color-mix(in srgb, var(--colors-white) var(--un-text-opacity), transparent) }.hover\\:text-white\\/40\\!:hover{color:color-mix(in srgb, var(--colors-white) 40%, transparent) !important}.hover\\:text-white\\/60:hover{color:color-mix(in srgb, var(--colors-white) 60%, transparent) }.hover\\:text-white\\/90:hover{color:color-mix(in srgb, var(--colors-white) 90%, transparent) }[hover\\:text-accent=\"\"]:hover{color:color-mix(in srgb, var(--c-accent) var(--un-text-opacity), transparent) }[hover\\:text-white=\"\"]:hover{color:color-mix(in srgb, var(--colors-white) var(--un-text-opacity), transparent) }[text~=\"hover:white/70\"]:hover{color:color-mix(in srgb, var(--colors-white) 70%, transparent) }.tracking-wider,[tracking-wider=\"\"]{--un-tracking:var(--tracking-wider);letter-spacing:var(--tracking-wider)}.font-bold,[font-bold=\"\"]{--un-font-weight:var(--fontWeight-bold);font-weight:var(--fontWeight-bold)}.font-bold\\!,[font-bold\\!=\"\"]{--un-font-weight:var(--fontWeight-bold)!important;font-weight:var(--fontWeight-bold)!important}.font-mono,[font-mono=\"\"]{font-family:var(--font-mono)}.font-sans,[font-sans=\"\"]{font-family:var(--font-sans)}.font-serif,[font-serif=\"\"]{font-family:var(--font-serif)}.tab,[tab=\"\"]{tab-size:4}.mb-1,[mb-1=\"\"]{margin-bottom:calc(var(--spacing) * 1)}.mb-2,[mb-2=\"\"]{margin-bottom:calc(var(--spacing) * 2)}.mb-3,[mb-3=\"\"]{margin-bottom:calc(var(--spacing) * 3)}.ml-1,[ml-1=\"\"]{margin-left:calc(var(--spacing) * 1)}.ml-1\\.5,[ml-1\\.5=\"\"]{margin-left:calc(var(--spacing) * 1.5)}.ml-2,[ml-2=\"\"]{margin-left:calc(var(--spacing) * 2)}.mt-1,[mt-1=\"\"]{margin-top:calc(var(--spacing) * 1)}.mt-2,[mt-2=\"\"]{margin-top:calc(var(--spacing) * 2)}.mt-4,[mt-4=\"\"]{margin-top:calc(var(--spacing) * 4)}.p-0\\.5{padding:calc(var(--spacing) * .5)}.p-1,[p-1=\"\"]{padding:calc(var(--spacing) * 1)}.p-3,[p-3=\"\"]{padding:calc(var(--spacing) * 3)}.px-2,[p~=x-2],[px-2=\"\"]{padding-inline:calc(var(--spacing) * 2)}.px-3,[p~=x-3],[px-3=\"\"]{padding-inline:calc(var(--spacing) * 3)}.px-4,[p~=x-4],[px-4=\"\"]{padding-inline:calc(var(--spacing) * 4)}.py-1,[py-1=\"\"]{padding-block:calc(var(--spacing) * 1)}.py-2,[p~=y-2]{padding-block:calc(var(--spacing) * 2)}.py-2\\.5,[py-2\\.5=\"\"]{padding-block:calc(var(--spacing) * 2.5)}.py-8,[py-8=\"\"]{padding-block:calc(var(--spacing) * 8)}[p~=y-3]{padding-block:calc(var(--spacing) * 3)}.pl-9,[pl-9=\"\"]{padding-left:calc(var(--spacing) * 9)}[p~=t-3]{padding-top:calc(var(--spacing) * 3)}.text-left{text-align:left}.outline-none,[outline-none=\"\"]{--un-outline-style:none;outline-style:none}.border,[border~=\"1\"]{border-width:1px}[border~=\"0\"]{border-width:0}.border-b,[border-b~=\"1\"]{border-bottom-width:1px}.border-\\[var\\(--c-border\\)\\]{border-color:color-mix(in oklab, var(--c-border) var(--un-border-opacity), transparent) }.border-accent{border-color:color-mix(in srgb, var(--c-accent) var(--un-border-opacity), transparent) }.border-accent\\/30{border-color:color-mix(in srgb, var(--c-accent) 30%, transparent) }.border-border\\!{border-color:color-mix(in srgb, var(--c-border) var(--un-border-opacity), transparent) !important}.border-red-400\\/50{border-color:color-mix(in srgb, var(--colors-red-400) 50%, transparent) }[border~=border]{border-color:color-mix(in srgb, var(--c-border) var(--un-border-opacity), transparent) }[border~=transparent]{border-color:#0000}.hover\\:border-accent:hover{border-color:color-mix(in srgb, var(--c-accent) var(--un-border-opacity), transparent) }[border~=hover\\:border-accent]:hover{border-color:color-mix(in srgb, var(--c-border-accent) var(--un-border-opacity), transparent) }.focus\\:border-accent:focus{border-color:color-mix(in srgb, var(--c-accent) var(--un-border-opacity), transparent) }[border~=focus\\:border-accent]:focus{border-color:color-mix(in srgb, var(--c-border-accent) var(--un-border-opacity), transparent) }[border-b~=border]{border-bottom-color:color-mix(in srgb, var(--c-border) var(--un-border-bottom-opacity), transparent) ;--un-border-bottom-opacity:var(--un-border-opacity)}.rounded,[rounded=\"\"]{border-radius:var(--radius-DEFAULT)}.rounded-2xl,[rounded-2xl=\"\"]{border-radius:var(--radius-2xl)}.rounded-full,[border~=rounded-full],[rounded-full=\"\"]{border-radius:3.40282e38px}.rounded-lg,[border~=rounded-lg],[rounded-lg=\"\"]{border-radius:var(--radius-lg)}.border-none,[border-none=\"\"]{--un-border-style:none;border-style:none}.border-solid,[border~=solid]{--un-border-style:solid;border-style:solid}[border-b~=solid]{--un-border-style:solid;border-bottom-style:solid}.bg-accent,[bg-accent=\"\"]{background-color:color-mix(in srgb, var(--c-accent) var(--un-bg-opacity), transparent) }.bg-accent\\/10\\!{background-color:color-mix(in srgb, var(--c-accent) 10%, transparent) !important}.bg-accent\\/5{background-color:color-mix(in srgb, var(--c-accent) 5%, transparent) }.bg-black,[bg-black=\"\"]{background-color:color-mix(in srgb, var(--colors-black) var(--un-bg-opacity), transparent) }.bg-green-400{background-color:color-mix(in srgb, var(--colors-green-400) var(--un-bg-opacity), transparent) }.bg-green-900\\/20{background-color:color-mix(in srgb, var(--colors-green-900) 20%, transparent) }.bg-input,[bg-input=\"\"]{background-color:color-mix(in srgb, var(--c-input) var(--un-bg-opacity), transparent) }.bg-panel,[bg-panel=\"\"]{background-color:color-mix(in srgb, var(--c-panel) var(--un-bg-opacity), transparent) }.bg-red-400{background-color:color-mix(in srgb, var(--colors-red-400) var(--un-bg-opacity), transparent) }.bg-red-900\\/10{background-color:color-mix(in srgb, var(--colors-red-900) 10%, transparent) }.bg-red-900\\/20{background-color:color-mix(in srgb, var(--colors-red-900) 20%, transparent) }.bg-transparent,[bg-transparent=\"\"]{background-color:#0000}.bg-transparent\\!{background-color:#0000!important}.bg-yellow-400{background-color:color-mix(in srgb, var(--colors-yellow-400) var(--un-bg-opacity), transparent) }.bg-yellow-900\\/20{background-color:color-mix(in srgb, var(--colors-yellow-900) 20%, transparent) }.important-bg-input{background-color:color-mix(in srgb, var(--c-input) var(--un-bg-opacity), transparent) !important}.hover\\:bg-accent\\!:hover{background-color:color-mix(in srgb, var(--c-accent) var(--un-bg-opacity), transparent) !important}.hover\\:bg-red-900\\/30:hover{background-color:color-mix(in srgb, var(--colors-red-900) 30%, transparent) }.op-0,.opacity-0,[op-0=\"\"]{opacity:0}.op-100,.group:hover .group-hover\\:op-100{opacity:1}.op-20,[op-20=\"\"]{opacity:.2}.op-30,[op-30=\"\"]{opacity:.3}.op-40,[op-40=\"\"]{opacity:.4}.op-60,[op-60=\"\"]{opacity:.6}.op-80,[op-80=\"\"]{opacity:.8}.opacity-10\\!,[opacity-10\\!=\"\"]{opacity:.1!important}.hover\\:op-100:hover{opacity:1}.hover\\:op-100\\!:hover{opacity:1!important}.hover\\:op-80:hover{opacity:.8}.hover\\:op-90:hover{opacity:.9}[hover\\:op-100=\"\"]:hover{opacity:1}[hover\\:op-80=\"\"]:hover{opacity:.8}.no-underline,[no-underline=\"\"]{text-decoration:none}.flex,[flex=\"\"],[flex~=\\~]{display:flex}.flex-1,[flex-1=\"\"]{flex:1}.flex-shrink-0,.shrink-0,[flex-shrink-0=\"\"],[shrink-0=\"\"]{flex-shrink:0}.flex-shrink-0\\>{flex-shrink:1}[flex~=col]{flex-direction:column}.gap-0\\.5,[flex~=gap-0\\.5]{gap:calc(var(--spacing) * .5)}.gap-1,[flex~=gap-1]{gap:calc(var(--spacing) * 1)}.gap-1\\.5,[flex~=gap-1\\.5],[gap-1\\.5=\"\"]{gap:calc(var(--spacing) * 1.5)}.gap-2,[flex~=gap-2]{gap:calc(var(--spacing) * 2)}.gap-2\\.5,[flex~=gap-2\\.5],[gap-2\\.5=\"\"]{gap:calc(var(--spacing) * 2.5)}.gap-3,[gap-3=\"\"]{gap:calc(var(--spacing) * 3)}.size-14,[size-14=\"\"]{width:calc(var(--spacing) * 14);height:calc(var(--spacing) * 14)}.size-6,[size-6=\"\"]{width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}[size~=sm]{width:var(--container-sm);height:var(--container-sm)}.h-0\\.5,[h-0\\.5=\"\"]{height:calc(var(--spacing) * .5)}.h-2\\.5,[h-2\\.5=\"\"]{height:calc(var(--spacing) * 2.5)}.h-6,[h-6=\"\"]{height:calc(var(--spacing) * 6)}.h-px,[h-px=\"\"]{height:1px}.min-w-\\[4\\.5rem\\]{min-width:4.5rem}.min-w-0,[min-w-0=\"\"]{min-width:calc(var(--spacing) * 0)}.w-130,[w-130=\"\"]{width:calc(var(--spacing) * 130)}.w-2\\.5,[w-2\\.5=\"\"]{width:calc(var(--spacing) * 2.5)}.w-6,[w-6=\"\"]{width:calc(var(--spacing) * 6)}.w-7{width:calc(var(--spacing) * 7)}.w-full,[w-full=\"\"]{width:100%}[max-h~=\"[90vh]\"]{max-height:90vh}[max-w~=\"[95vw]\"]{max-width:95vw}.inline-block{display:inline-block}.hidden,[hidden=\"\"]{display:none}.cursor-pointer,[cursor-pointer=\"\"]{cursor:pointer}.cursor-not-allowed,[cursor-not-allowed=\"\"]{cursor:not-allowed}.pointer-events-none,[pointer-events-none=\"\"]{pointer-events:none}.select-none,[select-none=\"\"]{-webkit-user-select:none;user-select:none}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.uppercase,[uppercase=\"\"]{text-transform:uppercase}.-translate-y-1\\/2{--un-translate-y:-50%;translate:var(--un-translate-x) var(--un-translate-y)}.scale-100{--un-scale-x:100%;--un-scale-y:100%;scale:var(--un-scale-x) var(--un-scale-y)}.scale-x-50{--un-scale-x:50%;scale:var(--un-scale-x) var(--un-scale-y)}.transform{transform:var(--un-rotate-x) var(--un-rotate-y) var(--un-rotate-z) var(--un-skew-x) var(--un-skew-y)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter;transition-timing-function:var(--un-ease,var(--default-transition-timingFunction));transition-duration:var(--un-duration,var(--default-transition-duration))}.transition-200,[transition-200=\"\"]{--un-duration:.2s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter;transition-timing-function:var(--un-ease,var(--default-transition-timingFunction));transition-duration:var(--un-duration,var(--default-transition-duration))}.transition-250,[transition-250=\"\"]{--un-duration:.25s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter;transition-timing-function:var(--un-ease,var(--default-transition-timingFunction));transition-duration:var(--un-duration,var(--default-transition-duration))}.transition-all,[transition-all=\"\"]{transition-property:all;transition-timing-function:var(--un-ease,var(--default-transition-timingFunction));transition-duration:var(--un-duration,var(--default-transition-duration))}.transition-colors,[transition-colors=\"\"]{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,--un-gradient-from,--un-gradient-via,--un-gradient-to;transition-timing-function:var(--un-ease,var(--default-transition-timingFunction));transition-duration:var(--un-duration,var(--default-transition-duration))}.duration-150{--un-duration:.15s;transition-duration:.15s}.duration-200,[duration-200=\"\"]{--un-duration:.2s;transition-duration:.2s}.ease-in{--un-ease:var(--ease-in);transition-timing-function:var(--ease-in)}.ease-in-out{--un-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-out{--un-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.items-center,[flex~=items-center],[items-center=\"\"]{align-items:center}.justify-center,[flex~=justify-center],[justify-center=\"\"]{justify-content:center}.justify-between,[flex~=justify-between]{justify-content:space-between}.inset-0,[inset-0=\"\"]{inset:calc(var(--spacing) * 0)}.bottom-0,[bottom-0=\"\"]{bottom:calc(var(--spacing) * 0)}.left-0,[left-0=\"\"]{left:calc(var(--spacing) * 0)}.left-3{left:calc(var(--spacing) * 3)}.right-0,[right-0=\"\"]{right:calc(var(--spacing) * 0)}.right-2\\.5{right:calc(var(--spacing) * 2.5)}.top-1\\/2{top:50%}.absolute,[absolute=\"\"]{position:absolute}.fixed,[fixed=\"\"]{position:fixed}.relative,[relative=\"\"]{position:relative}.z-0,[z-0=\"\"]{z-index:0}.z-1,[z-1=\"\"]{z-index:1}.z-2{z-index:2}.z-999999,[z-999999=\"\"]{z-index:999999}.overflow-x-hidden,[overflow-x-hidden=\"\"]{overflow-x:hidden}.overflow-y-auto,[overflow-y-auto=\"\"]{overflow-y:auto}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.animate-spin,[animate-spin=\"\"]{animation:1s linear infinite spin}.to-transparent,[to-transparent=\"\"]{--un-gradient-to:transparent;--un-gradient-stops:var(--un-gradient-via-stops,var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))}[from~=\"[var(--border-dark)]\"]{--un-gradient-from:color-mix(in oklab, var(--border-dark) var(--un-from-opacity), transparent);--un-gradient-stops:var(--un-gradient-via-stops,var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-to) var(--un-gradient-to-position))}[via~=\"[var(--c-accent)]\"]{--un-gradient-via:color-mix(in oklab, var(--c-accent) var(--un-via-opacity), transparent);--un-gradient-via-stops:var(--un-gradient-position), var(--un-gradient-from) var(--un-gradient-from-position), var(--un-gradient-via) var(--un-gradient-via-position), var(--un-gradient-to) var(--un-gradient-to-position);--un-gradient-stops:var(--un-gradient-via-stops)}.bg-gradient-to-r,[bg-gradient-to-r=\"\"]{--un-gradient-position:to right in oklab;background-image:linear-gradient(var(--un-gradient-stops))}.placeholder-white\\/20\\!::placeholder{color:color-mix(in srgb, var(--colors-white) 20%, transparent) !important}.placeholder-white\\/30\\!::placeholder{color:color-mix(in srgb, var(--colors-white) 30%, transparent) !important}.touch-none,[touch-none=\"\"]{touch-action:none}@media print{.print\\:hidden,[print\\:hidden=\"\"]{display:none}}@supports (color:color-mix(in lab, red, red)){.text-red-300{color:color-mix(in oklab, var(--colors-red-300) var(--un-text-opacity), transparent) }.text-red-400\\/60{color:color-mix(in oklab, var(--colors-red-400) 60%, transparent) }.text-white{color:color-mix(in oklab, var(--colors-white) var(--un-text-opacity), transparent) }.text-white\\/30{color:color-mix(in oklab, var(--colors-white) 30%, transparent) }.text-white\\/35{color:color-mix(in oklab, var(--colors-white) 35%, transparent) }.text-white\\/40\\!{color:color-mix(in oklab, var(--colors-white) 40%, transparent) !important}.text-white\\/70{color:color-mix(in oklab, var(--colors-white) 70%, transparent) }[text-white=\"\"]{color:color-mix(in oklab, var(--colors-white) var(--un-text-opacity), transparent) }[text~=green-400]{color:color-mix(in oklab, var(--colors-green-400) var(--un-text-opacity), transparent) }[text~=red-400]{color:color-mix(in oklab, var(--colors-red-400) var(--un-text-opacity), transparent) }[text~=white]{color:color-mix(in oklab, var(--colors-white) var(--un-text-opacity), transparent) }[text~=white\\/25]{color:color-mix(in oklab, var(--colors-white) 25%, transparent) }[text~=white\\/30]{color:color-mix(in oklab, var(--colors-white) 30%, transparent) }[text~=white\\/40]{color:color-mix(in oklab, var(--colors-white) 40%, transparent) }[text~=white\\/60]{color:color-mix(in oklab, var(--colors-white) 60%, transparent) }[text~=\"white/60!\"]{color:color-mix(in oklab, var(--colors-white) 60%, transparent) !important}[text~=\"white/90!\"],[un-text~=\"white/90!\"]{color:color-mix(in oklab, var(--colors-white) 90%, transparent) !important}.hover\\:text-red-400\\!:hover{color:color-mix(in oklab, var(--colors-red-400) var(--un-text-opacity), transparent) !important}.hover\\:text-white:hover{color:color-mix(in oklab, var(--colors-white) var(--un-text-opacity), transparent) }.hover\\:text-white\\/40\\!:hover{color:color-mix(in oklab, var(--colors-white) 40%, transparent) !important}.hover\\:text-white\\/60:hover{color:color-mix(in oklab, var(--colors-white) 60%, transparent) }.hover\\:text-white\\/90:hover{color:color-mix(in oklab, var(--colors-white) 90%, transparent) }[hover\\:text-white=\"\"]:hover{color:color-mix(in oklab, var(--colors-white) var(--un-text-opacity), transparent) }[text~=\"hover:white/70\"]:hover{color:color-mix(in oklab, var(--colors-white) 70%, transparent) }.border-red-400\\/50{border-color:color-mix(in oklab, var(--colors-red-400) 50%, transparent) }.bg-black{background-color:color-mix(in oklab, var(--colors-black) var(--un-bg-opacity), transparent) }.bg-green-400{background-color:color-mix(in oklab, var(--colors-green-400) var(--un-bg-opacity), transparent) }.bg-green-900\\/20{background-color:color-mix(in oklab, var(--colors-green-900) 20%, transparent) }.bg-red-400{background-color:color-mix(in oklab, var(--colors-red-400) var(--un-bg-opacity), transparent) }.bg-red-900\\/10{background-color:color-mix(in oklab, var(--colors-red-900) 10%, transparent) }.bg-red-900\\/20{background-color:color-mix(in oklab, var(--colors-red-900) 20%, transparent) }.bg-yellow-400{background-color:color-mix(in oklab, var(--colors-yellow-400) var(--un-bg-opacity), transparent) }.bg-yellow-900\\/20{background-color:color-mix(in oklab, var(--colors-yellow-900) 20%, transparent) }[bg-black=\"\"]{background-color:color-mix(in oklab, var(--colors-black) var(--un-bg-opacity), transparent) }.hover\\:bg-red-900\\/30:hover{background-color:color-mix(in oklab, var(--colors-red-900) 30%, transparent) }.placeholder-white\\/20\\!::placeholder{color:color-mix(in oklab, var(--colors-white) 20%, transparent) !important}.placeholder-white\\/30\\!::placeholder{color:color-mix(in oklab, var(--colors-white) 30%, transparent) !important}}\n/*$vite$:1*/ ");
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
	function createFilterWrapper(filter, fn) {
		function wrapper(...args) {
			return new Promise((resolve, reject) => {
				Promise.resolve(filter(() => fn.apply(this, args), {
					fn,
					thisArg: this,
					args
				})).then(resolve).catch(reject);
			});
		}
		return wrapper;
	}
	var bypassFilter = (invoke) => {
		return invoke();
	};
	function pausableFilter(extendFilter = bypassFilter, options = {}) {
		const { initialState = "active" } = options;
		const isActive = toRef$1(initialState === "active");
		function pause() {
			isActive.value = false;
		}
		function resume() {
			isActive.value = true;
		}
		const eventFilter = (...args) => {
			if (isActive.value) extendFilter(...args);
		};
		return {
			isActive: (0, vue.shallowReadonly)(isActive),
			pause,
			resume,
			eventFilter
		};
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
	function watchWithFilter(source, cb, options = {}) {
		const { eventFilter = bypassFilter, ...watchOptions } = options;
		return (0, vue.watch)(source, createFilterWrapper(eventFilter, cb), watchOptions);
	}
	function watchPausable(source, cb, options = {}) {
		const { eventFilter: filter, initialState = "active", ...watchOptions } = options;
		const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
		return {
			stop: watchWithFilter(source, cb, {
				...watchOptions,
				eventFilter
			}),
			pause,
			resume,
			isActive
		};
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
	var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
	var globalKey = "__vueuse_ssr_handlers__";
	var handlers = getHandlers();
	function getHandlers() {
		if (!(globalKey in _global)) _global[globalKey] = _global[globalKey] || {};
		return _global[globalKey];
	}
	function getSSRHandler(key, fallback) {
		return handlers[key] || fallback;
	}
	function guessSerializerType(rawInit) {
		return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
	}
	var StorageSerializers = {
		boolean: {
			read: (v) => v === "true",
			write: (v) => String(v)
		},
		object: {
			read: (v) => JSON.parse(v),
			write: (v) => JSON.stringify(v)
		},
		number: {
			read: (v) => Number.parseFloat(v),
			write: (v) => String(v)
		},
		any: {
			read: (v) => v,
			write: (v) => String(v)
		},
		string: {
			read: (v) => v,
			write: (v) => String(v)
		},
		map: {
			read: (v) => new Map(JSON.parse(v)),
			write: (v) => JSON.stringify(Array.from(v.entries()))
		},
		set: {
			read: (v) => new Set(JSON.parse(v)),
			write: (v) => JSON.stringify(Array.from(v))
		},
		date: {
			read: (v) => new Date(v),
			write: (v) => v.toISOString()
		}
	};
	var customStorageEventName = "vueuse-storage";
	function useStorage(key, defaults, storage, options = {}) {
		var _options$serializer;
		const { flush = "pre", deep = true, listenToStorageChanges = true, writeDefaults = true, mergeDefaults = false, shallow, window = defaultWindow, eventFilter, onError = (e) => {
			console.error(e);
		}, initOnMounted } = options;
		const data = (shallow ? vue.shallowRef : vue.ref)(typeof defaults === "function" ? defaults() : defaults);
		const keyComputed = (0, vue.computed)(() => (0, vue.toValue)(key));
		if (!storage) try {
			storage = getSSRHandler("getDefaultStorage", () => defaultWindow === null || defaultWindow === void 0 ? void 0 : defaultWindow.localStorage)();
		} catch (e) {
			onError(e);
		}
		if (!storage) return data;
		const rawInit = (0, vue.toValue)(defaults);
		const type = guessSerializerType(rawInit);
		const serializer = (_options$serializer = options.serializer) !== null && _options$serializer !== void 0 ? _options$serializer : StorageSerializers[type];
		const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, (newValue) => write(newValue), {
			flush,
			deep,
			eventFilter
		});
		(0, vue.watch)(keyComputed, () => update(), { flush });
		let firstMounted = false;
		const onStorageEvent = (ev) => {
			if (initOnMounted && !firstMounted) return;
			update(ev);
		};
		const onStorageCustomEvent = (ev) => {
			if (initOnMounted && !firstMounted) return;
			updateFromCustomEvent(ev);
		};
		if (window && listenToStorageChanges) if (storage instanceof Storage) useEventListener(window, "storage", onStorageEvent, { passive: true });
		else useEventListener(window, customStorageEventName, onStorageCustomEvent);
		if (initOnMounted) tryOnMounted(() => {
			firstMounted = true;
			update();
		});
		else update();
		function dispatchWriteEvent(oldValue, newValue) {
			if (window) {
				const payload = {
					key: keyComputed.value,
					oldValue,
					newValue,
					storageArea: storage
				};
				window.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, { detail: payload }));
			}
		}
		function write(v) {
			try {
				const oldValue = storage.getItem(keyComputed.value);
				if (v == null) {
					dispatchWriteEvent(oldValue, null);
					storage.removeItem(keyComputed.value);
				} else {
					const serialized = serializer.write(v);
					if (oldValue !== serialized) {
						storage.setItem(keyComputed.value, serialized);
						dispatchWriteEvent(oldValue, serialized);
					}
				}
			} catch (e) {
				onError(e);
			}
		}
		function read(event) {
			const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
			if (rawValue == null) {
				if (writeDefaults && rawInit != null) storage.setItem(keyComputed.value, serializer.write(rawInit));
				return rawInit;
			} else if (!event && mergeDefaults) {
				const value = serializer.read(rawValue);
				if (typeof mergeDefaults === "function") return mergeDefaults(value, rawInit);
				else if (type === "object" && !Array.isArray(value)) return {
					...rawInit,
					...value
				};
				return value;
			} else if (typeof rawValue !== "string") return rawValue;
			else return serializer.read(rawValue);
		}
		function update(event) {
			if (event && event.storageArea !== storage) return;
			if (event && event.key == null) {
				data.value = rawInit;
				return;
			}
			if (event && event.key !== keyComputed.value) return;
			pauseWatch();
			try {
				const serializedData = serializer.write(data.value);
				if (event === void 0 || (event === null || event === void 0 ? void 0 : event.newValue) !== serializedData) data.value = read(event);
			} catch (e) {
				onError(e);
			} finally {
				if (event) (0, vue.nextTick)(resumeWatch);
				else resumeWatch();
			}
		}
		function updateFromCustomEvent(event) {
			update(event.detail);
		}
		return data;
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
	var _GM_xmlhttpRequest = (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
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
	var LAST_MODIFIED_KEY = "any-bookmark-last-modified";
	function loadLastModified() {
		try {
			const raw = gmGetValue(LAST_MODIFIED_KEY, "{}");
			return JSON.parse(raw);
		} catch {
			return {};
		}
	}
	function saveLastModified(data) {
		gmSetValue(LAST_MODIFIED_KEY, JSON.stringify(data));
	}
	function touchDomain(domain) {
		const data = loadLastModified();
		data[domain] = Date.now();
		saveLastModified(data);
	}
	var DOMAIN_REGEX_KEY = "any-bookmark-domain-regex";
	function loadDomainRegexes() {
		try {
			const raw = gmGetValue(DOMAIN_REGEX_KEY, "{}");
			return JSON.parse(raw);
		} catch {
			return {};
		}
	}
	function saveDomainRegex(domain, pattern) {
		const data = loadDomainRegexes();
		if (pattern) data[domain] = pattern;
		else delete data[domain];
		gmSetValue(DOMAIN_REGEX_KEY, JSON.stringify(data));
	}
	function getDomainRegex(domain) {
		return loadDomainRegexes()[domain] || null;
	}
	var LAST_SYNC_KEY = "any-bookmark-last-sync-time";
	function loadLastSyncTime() {
		try {
			const raw = gmGetValue(LAST_SYNC_KEY, "0");
			return Number(raw) || 0;
		} catch {
			return 0;
		}
	}
	function saveLastSyncTime(ts) {
		gmSetValue(LAST_SYNC_KEY, String(ts));
	}
	var SETTINGS_VERSION = 2;
	function exportAllData() {
		const data = {
			version: SETTINGS_VERSION,
			bookmarks: loadBookmarks(),
			enabledDomains: loadEnabledDomains(),
			lastModified: loadLastModified(),
			domainRegexes: loadDomainRegexes()
		};
		return JSON.stringify(data, null, 2);
	}
	function importSettings(json) {
		const data = JSON.parse(json);
		if (!data || typeof data !== "object") throw new TypeError("无效的设置文件");
		if (data.bookmarks && typeof data.bookmarks === "object") saveBookmarks(data.bookmarks);
		if (Array.isArray(data.enabledDomains)) saveEnabledDomains(data.enabledDomains);
		if (data.lastModified && typeof data.lastModified === "object") saveLastModified(data.lastModified);
		if (data.domainRegexes && typeof data.domainRegexes === "object") Object.entries(data.domainRegexes).forEach(([domain, pattern]) => {
			if (typeof pattern === "string" && pattern) saveDomainRegex(domain, pattern);
		});
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
		let isExternalChange = false;
		function onExternalChange() {
			isExternalChange = true;
			allBookmarks.value = loadBookmarks();
			(0, vue.nextTick)(() => {
				isExternalChange = false;
			});
		}
		(0, vue.onMounted)(() => window.addEventListener("any-bookmark:data-changed", onExternalChange));
		(0, vue.onUnmounted)(() => window.removeEventListener("any-bookmark:data-changed", onExternalChange));
		(0, vue.watch)(allBookmarks, (val) => {
			saveBookmarks(val);
			if (!isExternalChange) window.dispatchEvent(new CustomEvent("any-bookmark:local-changed"));
		}, { deep: true });
		function add(name, url = location.href) {
			const trimmed = name.trim();
			const trimmedUrl = url.trim();
			if (!trimmed || !trimmedUrl) return;
			const entry = {
				name: trimmed,
				url: trimmedUrl
			};
			const data = { ...allBookmarks.value };
			if (!data[hostname.value]) data[hostname.value] = [];
			data[hostname.value] = [entry, ...data[hostname.value]];
			allBookmarks.value = data;
			touchDomain(hostname.value);
		}
		function remove(index) {
			const data = { ...allBookmarks.value };
			data[hostname.value].splice(index, 1);
			if (data[hostname.value].length === 0) delete data[hostname.value];
			allBookmarks.value = data;
			touchDomain(hostname.value);
		}
		function updateBookmark(index, newName, newUrl) {
			const trimmedName = newName.trim();
			const trimmedUrl = newUrl.trim();
			if (!trimmedName || !trimmedUrl) return;
			const data = { ...allBookmarks.value };
			data[hostname.value] = [...data[hostname.value]];
			data[hostname.value][index] = {
				...data[hostname.value][index],
				name: trimmedName,
				url: trimmedUrl
			};
			allBookmarks.value = data;
			touchDomain(hostname.value);
		}
		return {
			allBookmarks,
			hostname,
			currentBookmarks,
			add,
			remove,
			updateBookmark
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
	var _hoisted_1$6 = {
		p: "x-4 t-3",
		flex: "~ gap-1 items-center justify-center"
	};
	var _hoisted_2$4 = ["disabled"];
	var _hoisted_3$4 = {
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
	var _hoisted_4$4 = {
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
	var _hoisted_5$4 = ["disabled", "onClick"];
	var _hoisted_6$4 = ["disabled"];
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
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_1$6, [
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
					}, null, -1)])], 10, _hoisted_2$4),
					__props.total === 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", _hoisted_3$4, " 1 ")) : ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, (0, vue.renderList)(visiblePages.value, (p, idx) => {
						return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: idx }, [p === "..." ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_4$4, " ... ")) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
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
						}, (0, vue.toDisplayString)(p), 11, _hoisted_5$4))], 64);
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
					}, null, -1)])], 10, _hoisted_6$4)
				]);
			};
		}
	});
	var currentDomain = location.hostname;
	var enabledDomains = (0, vue.ref)(loadEnabledDomains());
	var currentDomainEnabled = (0, vue.computed)(() => enabledDomains.value.includes(currentDomain));
	function removeEnabledDomain(domain) {
		enabledDomains.value = enabledDomains.value.filter((d) => d !== domain);
		saveEnabledDomains(enabledDomains.value);
		const timestamps = loadLastModified();
		timestamps.__enabled__ = Date.now();
		saveLastModified(timestamps);
	}
	function toggleCurrentDomain() {
		const next = new Set(enabledDomains.value);
		if (next.has(currentDomain)) next.delete(currentDomain);
		else next.add(currentDomain);
		enabledDomains.value = [...next];
		saveEnabledDomains(enabledDomains.value);
		const timestamps = loadLastModified();
		timestamps.__enabled__ = Date.now();
		saveLastModified(timestamps);
	}
	var initialized = false;
	var TOGGLE_MENU_ID = "any-bookmark-toggle-domain";
	var EXPORT_MENU_ID = "any-bookmark-export";
	var IMPORT_MENU_ID = "any-bookmark-import";
	function registerMenu() {
		if (typeof _GM_registerMenuCommand !== "function") return;
		_GM_registerMenuCommand(enabledDomains.value.includes(currentDomain) ? `在 ${currentDomain} 隐藏收藏按钮` : `在 ${currentDomain} 显示收藏按钮`, () => toggleCurrentDomain(), { id: TOGGLE_MENU_ID });
	}
	function downloadSettings() {
		const blob = new Blob([exportAllData()], { type: "application/json" });
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
			_GM_registerMenuCommand("导出收藏设置", () => downloadSettings(), { id: EXPORT_MENU_ID });
			_GM_registerMenuCommand("导入收藏设置", () => promptImportSettings(), { id: IMPORT_MENU_ID });
		}
		(0, vue.watch)(currentDomainEnabled, registerMenu);
	}
	var _hoisted_1$5 = ["disabled"];
	var BaseButton_default = (0, vue.defineComponent)({
		__name: "BaseButton",
		props: {
			variant: {},
			size: {},
			disabled: { type: Boolean }
		},
		setup(__props) {
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
					disabled: __props.disabled,
					class: (0, vue.normalizeClass)({
						"rounded-lg border-solid text-sm flex justify-center items-center gap-1 cursor-pointer transition-200": __props.variant !== "ghost",
						"px-3 py-2": __props.variant !== "ghost" && (!__props.size || __props.size === "md"),
						"px-2 py-1 text-xs": __props.variant !== "ghost" && __props.size === "sm",
						"border border-accent bg-accent/10! text-accent/90 hover:bg-accent! hover:text-white/90": __props.variant === "primary" || !__props.variant,
						"border border-[var(--c-border)] bg-input text-white/70 hover:text-white": __props.variant === "default",
						"border border-red-400/50 bg-red-900/10 text-red-300 hover:bg-red-900/30": __props.variant === "danger",
						"text-white p-0.5 border-none bg-transparent op-40 hover:op-90 cursor-pointer transition-200": __props.variant === "ghost",
						"border-border! cursor-not-allowed text-white/40! bg-transparent! hover:text-white/40!": __props.disabled
					})
				}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 10, _hoisted_1$5);
			};
		}
	});
	var _hoisted_1$4 = { flex: "~ col" };
	var _hoisted_2$3 = {
		flex: "~ items-center justify-between",
		"mb-3": ""
	};
	var _hoisted_3$3 = {
		key: 1,
		flex: "~ col items-center",
		text: "sm white/30",
		"py-8": ""
	};
	var _hoisted_4$3 = {
		flex: "~ col gap-1",
		"p-1": "",
		border: "1 solid border rounded-lg"
	};
	var _hoisted_5$3 = ["href", "title"];
	var _hoisted_6$3 = { class: "truncate" };
	var _hoisted_7$3 = {
		text: "xs white/25",
		"ml-1.5": "",
		"flex-shrink-0": ""
	};
	var _hoisted_8$3 = ["title", "onClick"];
	var _hoisted_9$2 = ["onClick"];
	var PAGE_SIZE$1 = 10;
	var DomainManager_default = (0, vue.defineComponent)({
		__name: "DomainManager",
		props: { embedded: { type: Boolean } },
		emits: ["back"],
		setup(__props, { emit: __emit }) {
			const emit = __emit;
			const { current, paged, total } = usePagination(() => enabledDomains.value, PAGE_SIZE$1);
			const emptyRowsCount = (0, vue.computed)(() => PAGE_SIZE$1 - paged.value.length);
			(0, vue.watch)(paged, (val) => {
				if (val.length === 0 && current.value > 1) current.value--;
			});
			function editRegex(domain) {
				const current = getDomainRegex(domain) || "";
				const result = prompt(`为 ${domain} 设置正则表达式：`, current);
				if (result !== null) saveDomainRegex(domain, result.trim());
			}
			function handleRemove(domain) {
				if (!confirm(`确定要移除域名 "${domain}" 吗？\n该域名下的收藏不会被删除，但将不再显示收藏按钮。`)) return;
				removeEnabledDomain(domain);
			}
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_1$4, [!__props.embedded ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createElementVNode)("div", _hoisted_2$3, [_cache[3] || (_cache[3] = (0, vue.createElementVNode)("div", {
					flex: "",
					"gap-2.5": "",
					"items-center": ""
				}, [(0, vue.createElementVNode)("div", {
					"i-mdi-web": "",
					"text-lg": "",
					"text-accent": ""
				}), (0, vue.createElementVNode)("span", {
					"text-base": "",
					"text-white": "",
					"tracking-wider": "",
					"font-bold": "",
					"font-serif": ""
				}, "已启用的域名")], -1)), (0, vue.createVNode)(BaseButton_default, {
					variant: "ghost",
					onClick: _cache[0] || (_cache[0] = ($event) => emit("back"))
				}, {
					default: (0, vue.withCtx)(() => [..._cache[2] || (_cache[2] = [(0, vue.createElementVNode)("div", {
						"i-mdi-close": "",
						"text-lg": ""
					}, null, -1)])]),
					_: 1
				})]), _cache[4] || (_cache[4] = (0, vue.createElementVNode)("div", {
					"mb-3": "",
					"h-px": "",
					"to-transparent": "",
					"bg-gradient-to-r": "",
					from: "[var(--border-dark)]",
					via: "[var(--c-accent)]"
				}, null, -1))], 64)) : (0, vue.createCommentVNode)("", true), (0, vue.unref)(enabledDomains).length === 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_3$3, [..._cache[5] || (_cache[5] = [
					(0, vue.createElementVNode)("div", {
						"i-mdi-web-off": "",
						"text-4xl": "",
						"mb-2": "",
						"op-30": ""
					}, null, -1),
					(0, vue.createElementVNode)("p", null, "暂无已启用的域名", -1),
					(0, vue.createElementVNode)("p", {
						"text-xs": "",
						"mt-1": ""
					}, " 在任意网站点击收藏按钮，该域名即自动启用并出现在此列表中。 ", -1)
				])])) : ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 2 }, [(0, vue.createElementVNode)("div", _hoisted_4$3, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(paged), (domain) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: domain,
						border: "1 solid transparent hover:border-accent",
						flex: "~ items-center",
						"px-3": "",
						"rounded-lg": "",
						"bg-input": "",
						"transition-250": "",
						class: "group"
					}, [
						(0, vue.createElementVNode)("a", {
							href: `https://${domain}`,
							target: "_blank",
							rel: "noopener noreferrer",
							title: domain,
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
						}, [(0, vue.createElementVNode)("span", _hoisted_6$3, (0, vue.toDisplayString)(domain), 1), (0, vue.createElementVNode)("span", _hoisted_7$3, (0, vue.toDisplayString)(((0, vue.unref)(loadBookmarks)()[domain] || []).length), 1)], 8, _hoisted_5$3),
						(0, vue.createElementVNode)("button", {
							"text-white": "",
							"ml-1": "",
							"p-1": "",
							"border-none": "",
							"bg-transparent": "",
							"op-40": "",
							flex: "",
							"shrink-0": "",
							"cursor-pointer": "",
							"items-center": "",
							class: "transition-all duration-200 hover:text-accent! hover:op-100!",
							title: (0, vue.unref)(getDomainRegex)(domain) ? `正则: ${(0, vue.unref)(getDomainRegex)(domain)}` : "设置正则",
							onClick: ($event) => editRegex(domain)
						}, [..._cache[6] || (_cache[6] = [(0, vue.createElementVNode)("div", {
							"i-mdi-regex": "",
							"text-xs": ""
						}, null, -1)])], 8, _hoisted_8$3),
						(0, vue.createElementVNode)("button", {
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
							onClick: ($event) => handleRemove(domain)
						}, [..._cache[7] || (_cache[7] = [(0, vue.createElementVNode)("div", {
							"i-mdi-delete-outline": "",
							"text-sm": ""
						}, null, -1)])], 8, _hoisted_9$2)
					]);
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
					}, [..._cache[8] || (_cache[8] = [(0, vue.createElementVNode)("span", {
						"text-sm": "",
						"op-0": ""
					}, "\xA0", -1)])]);
				}), 128))]), (0, vue.createVNode)(Pagination_default, {
					current: (0, vue.unref)(current),
					"onUpdate:current": _cache[1] || (_cache[1] = ($event) => (0, vue.isRef)(current) ? current.value = $event : null),
					total: (0, vue.unref)(total)
				}, null, 8, ["current", "total"])], 64))]);
			};
		}
	});
	var SYNC_DATA_VERSION = 2;
	var DATA_FILENAME = "any-bookmark.json";
	function getFileUrl(config) {
		return `${config.url.replace(/\/+$/, "")}/${DATA_FILENAME}`;
	}
	var SYNC_CONFIG_KEY = "any-bookmark-sync-config";
	function getSyncConfig() {
		if (typeof _GM_getValue === "undefined") return null;
		try {
			const raw = _GM_getValue(SYNC_CONFIG_KEY, "");
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	}
	function saveSyncConfig(config) {
		if (typeof _GM_setValue === "undefined") return;
		_GM_setValue(SYNC_CONFIG_KEY, JSON.stringify(config));
	}
	function clearSyncConfig() {
		if (typeof _GM_setValue === "undefined") return;
		_GM_setValue(SYNC_CONFIG_KEY, "");
	}
	function basicAuth(config) {
		const str = `${config.username}:${config.password}`;
		const bytes = new TextEncoder().encode(str);
		let binary = "";
		for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
		return `Basic ${btoa(binary)}`;
	}
	function request(method, config, body) {
		return new Promise((resolve, reject) => {
			if (typeof _GM_xmlhttpRequest === "undefined") {
				reject(new Error("GM_xmlhttpRequest 不可用，请在 Tampermonkey 中运行"));
				return;
			}
			const headers = {
				Authorization: basicAuth(config),
				Accept: "application/json"
			};
			if (body) headers["Content-Type"] = "application/json; charset=utf-8";
			_GM_xmlhttpRequest({
				method,
				url: getFileUrl(config),
				headers,
				data: body || void 0,
				timeout: 15e3,
				onload(resp) {
					let lastModified = null;
					const match = (resp.responseHeaders || "").match(/last-modified:\s*(.+)/i);
					if (match) lastModified = match[1];
					resolve({
						status: resp.status,
						body: resp.responseText || "",
						lastModified
					});
				},
				onerror(err) {
					reject(new Error(`请求失败: ${err || "未知错误"}`));
				},
				ontimeout() {
					reject(new Error("请求超时"));
				}
			});
		});
	}
	async function pull(config) {
		const result = await request("GET", config);
		if (result.status === 404) return null;
		if (result.status < 200 || result.status >= 300) throw new Error(`下载失败 (HTTP ${result.status})`);
		if (!result.body || !result.body.trim()) return null;
		try {
			const data = JSON.parse(result.body);
			return {
				version: SYNC_DATA_VERSION,
				bookmarks: data.bookmarks || {},
				enabledDomains: data.enabledDomains || [],
				lastModified: data.lastModified || {}
			};
		} catch {
			throw new Error("远程数据格式错误，无法解析 JSON");
		}
	}
	async function push(config, data) {
		const result = await request("PUT", config, JSON.stringify(data, null, 2));
		if (result.status >= 400) throw new Error(`上传失败 (HTTP ${result.status})`);
	}
	function mergeData(local, remote) {
		const mergedBookmarks = {};
		const mergedTimestamps = {};
		const allDomains = new Set([...Object.keys(local.bookmarks), ...Object.keys(remote.bookmarks)]);
		for (const domain of allDomains) {
			const localTime = local.lastModified[domain] ?? 0;
			const remoteTime = remote.lastModified[domain] ?? 0;
			if (localTime >= remoteTime) {
				if (local.bookmarks[domain]?.length) {
					mergedBookmarks[domain] = local.bookmarks[domain];
					mergedTimestamps[domain] = localTime;
				}
			} else if (remote.bookmarks[domain]?.length) {
				mergedBookmarks[domain] = remote.bookmarks[domain];
				mergedTimestamps[domain] = remoteTime;
			}
		}
		const enabledKey = "__enabled__";
		const localEnabledTime = local.lastModified[enabledKey] ?? 0;
		const remoteEnabledTime = remote.lastModified[enabledKey] ?? 0;
		const mergedEnabled = localEnabledTime >= remoteEnabledTime ? local.enabledDomains : remote.enabledDomains;
		mergedTimestamps[enabledKey] = Math.max(localEnabledTime, remoteEnabledTime);
		return {
			version: SYNC_DATA_VERSION,
			bookmarks: mergedBookmarks,
			enabledDomains: mergedEnabled,
			lastModified: mergedTimestamps
		};
	}
	function loadAllData() {
		return {
			version: SYNC_DATA_VERSION,
			bookmarks: loadBookmarks(),
			enabledDomains: loadEnabledDomains(),
			lastModified: loadLastModified()
		};
	}
	var SYNC_INTERVAL = 3e5;
	var MAX_RETRY_DELAY = 6e4;
	var status = (0, vue.ref)("not_configured");
	var lastSyncTime = (0, vue.ref)(null);
	var error = (0, vue.ref)(null);
	var pollTimer = null;
	var retryTimer = null;
	var retryCount = 0;
	function shouldPullOnStartup() {
		const last = loadLastSyncTime();
		if (!last) return true;
		return Date.now() - last > SYNC_INTERVAL;
	}
	function useSync() {
		const isConfigured = (0, vue.ref)(getSyncConfig() !== null);
		if (isConfigured.value && status.value === "not_configured") status.value = "idle";
		function setStatus(s) {
			status.value = s;
			if (s !== "error") error.value = null;
		}
		function markSynced() {
			const now = new Date();
			lastSyncTime.value = now;
			saveLastSyncTime(now.getTime());
			retryCount = 0;
			clearRetry();
		}
		function clearRetry() {
			if (retryTimer !== null) {
				clearTimeout(retryTimer);
				retryTimer = null;
			}
		}
		function scheduleRetry(fn) {
			clearRetry();
			const delay = Math.min(1e3 * 2 ** retryCount, MAX_RETRY_DELAY);
			retryCount++;
			retryTimer = setTimeout(async () => {
				try {
					await fn();
					setStatus("idle");
					markSynced();
				} catch {
					scheduleRetry(fn);
				}
			}, delay);
		}
		function applyData(merged) {
			saveBookmarks(merged.bookmarks);
			saveEnabledDomains(merged.enabledDomains);
			window.dispatchEvent(new CustomEvent("any-bookmark:data-changed"));
		}
		async function pullAndMerge() {
			if (status.value === "syncing") return;
			const config = getSyncConfig();
			if (!config) return;
			setStatus("syncing");
			try {
				const remote = await pull(config);
				if (remote) applyData(mergeData(loadAllData(), remote));
				markSynced();
				setStatus("idle");
			} catch (e) {
				setStatus("error");
				error.value = e instanceof Error ? e.message : "同步失败";
				scheduleRetry(pullAndMerge);
				throw e;
			}
		}
		async function doSync(silent = false) {
			if (status.value === "syncing") return;
			const config = getSyncConfig();
			if (!config) return;
			setStatus("syncing");
			try {
				const remote = await pull(config);
				const local = loadAllData();
				const merged = remote ? mergeData(local, remote) : local;
				await push(config, merged);
				applyData(merged);
				markSynced();
				setStatus("idle");
			} catch (e) {
				setStatus("error");
				error.value = e instanceof Error ? e.message : "同步失败";
				scheduleRetry(() => doSync(true));
				if (!silent) throw e;
			}
		}
		async function setupSync(config) {
			saveSyncConfig(config);
			isConfigured.value = true;
			setStatus("syncing");
			try {
				const remote = await pull(config);
				if (remote) applyData(mergeData(loadAllData(), remote));
				else await push(config, loadAllData());
				markSynced();
				setStatus("idle");
				startAutoSync();
			} catch (e) {
				setStatus("error");
				error.value = e instanceof Error ? e.message : "配置失败";
				scheduleRetry(() => setupSync(config));
				throw e;
			}
		}
		const autoSyncEnabled = (0, vue.ref)(false);
		function disconnectSync() {
			clearSyncConfig();
			isConfigured.value = false;
			autoSyncEnabled.value = false;
			stopAutoSync();
			clearRetry();
			setStatus("not_configured");
			lastSyncTime.value = null;
		}
		function toggleAutoSync() {
			if (autoSyncEnabled.value) {
				stopAutoSync();
				autoSyncEnabled.value = false;
			} else {
				startAutoSync();
				autoSyncEnabled.value = true;
			}
		}
		function startAutoSync(intervalMs = SYNC_INTERVAL) {
			stopAutoSync();
			autoSyncEnabled.value = true;
			pollTimer = setInterval(async () => {
				if (status.value === "syncing") return;
				try {
					await pullAndMerge();
				} catch {}
			}, intervalMs);
		}
		function stopAutoSync() {
			if (pollTimer !== null) {
				clearInterval(pollTimer);
				pollTimer = null;
			}
		}
		return {
			status: (0, vue.readonly)(status),
			lastSyncTime: (0, vue.readonly)(lastSyncTime),
			error: (0, vue.readonly)(error),
			isConfigured,
			pullAndMerge,
			sync: doSync,
			setupSync,
			disconnectSync,
			toggleAutoSync,
			autoSyncEnabled: (0, vue.readonly)(autoSyncEnabled),
			startAutoSync,
			stopAutoSync
		};
	}
	var _hoisted_1$3 = [
		"value",
		"type",
		"placeholder"
	];
	var BaseInput_default = (0, vue.defineComponent)({
		__name: "BaseInput",
		props: {
			modelValue: {},
			placeholder: {},
			type: {}
		},
		emits: ["update:modelValue"],
		setup(__props, { expose: __expose, emit: __emit }) {
			const emit = __emit;
			const inputEl = (0, vue.ref)();
			function onInput(e) {
				emit("update:modelValue", e.target.value);
			}
			__expose({ focus: () => inputEl.value?.focus() });
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("input", {
					ref_key: "inputEl",
					ref: inputEl,
					value: __props.modelValue,
					type: __props.type || "text",
					placeholder: __props.placeholder,
					border: "1 solid border focus:border-accent",
					p: "x-3 y-2",
					class: "important-bg-input",
					text: "sm white/90! placeholder-white/30!",
					"outline-none": "",
					"rounded-lg": "",
					"w-full": "",
					"transition-200": "",
					onInput
				}, null, 40, _hoisted_1$3);
			};
		}
	});
	var _hoisted_1$2 = { flex: "~ col" };
	var _hoisted_2$2 = {
		flex: "~ items-center justify-between",
		"mb-3": ""
	};
	var _hoisted_3$2 = {
		flex: "~ col gap-2.5",
		"mb-3": ""
	};
	var _hoisted_4$2 = { relative: "" };
	var _hoisted_5$2 = {
		key: 0,
		"i-mdi-loading": "",
		"text-sm": "",
		"animate-spin": ""
	};
	var _hoisted_6$2 = {
		key: 0,
		text: "red-400 text-xs",
		"mt-2": ""
	};
	var _hoisted_7$2 = {
		key: 1,
		text: "red-400 text-xs",
		"mt-2": ""
	};
	var _hoisted_8$2 = { flex: "~ col gap-0.5" };
	var _hoisted_9$1 = {
		"text-sm": "",
		"text-white": ""
	};
	var _hoisted_10$1 = {
		key: 0,
		text: "white/40",
		"text-xs": ""
	};
	var _hoisted_11$1 = {
		key: 0,
		text: "red-400 text-xs",
		"mb-2": ""
	};
	var _hoisted_12$1 = {
		key: 1,
		text: "red-400 text-xs",
		"mb-2": ""
	};
	var _hoisted_13$1 = {
		key: 0,
		"i-mdi-loading": "",
		"text-sm": "",
		"animate-spin": ""
	};
	var _hoisted_14$1 = {
		flex: "~ col gap-2.5",
		"mb-3": "",
		"mt-2": ""
	};
	var _hoisted_15$1 = { relative: "" };
	var _hoisted_16$1 = { flex: "~ gap-2" };
	var SyncSettings_default = (0, vue.defineComponent)({
		__name: "SyncSettings",
		props: { embedded: { type: Boolean } },
		emits: ["back"],
		setup(__props, { emit: __emit }) {
			const emit = __emit;
			const { status, lastSyncTime, error, isConfigured, setupSync, toggleAutoSync, autoSyncEnabled } = useSync();
			const existing = getSyncConfig();
			const url = (0, vue.ref)(existing?.url ?? "");
			const username = (0, vue.ref)(existing?.username ?? "");
			const password = (0, vue.ref)(existing?.password ?? "");
			const showPassword = (0, vue.ref)(false);
			const localError = (0, vue.ref)(null);
			const connecting = (0, vue.ref)(false);
			const canConnect = (0, vue.computed)(() => url.value.trim() && username.value.trim() && password.value.trim());
			const canUpdate = (0, vue.computed)(() => url.value.trim() && username.value.trim());
			const statusText = (0, vue.computed)(() => {
				switch (status.value) {
					case "syncing": return "同步中…";
					case "error": return "同步失败";
					case "idle": return "同步正常";
					default: return "";
				}
			});
			const statusDotClass = (0, vue.computed)(() => {
				switch (status.value) {
					case "syncing": return "bg-yellow-400";
					case "error": return "bg-red-400";
					case "idle": return "bg-green-400";
					default: return "";
				}
			});
			function formatTime(date) {
				if (!date) return "—";
				return date.toLocaleString("zh-CN", {
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit"
				});
			}
			function effectiveConfig() {
				return {
					url: url.value.trim(),
					username: username.value.trim(),
					password: password.value
				};
			}
			async function handleConnect() {
				if (!canConnect.value || connecting.value) return;
				connecting.value = true;
				localError.value = null;
				try {
					await setupSync({
						url: url.value.trim(),
						username: username.value.trim(),
						password: password.value
					});
				} catch (e) {
					localError.value = e instanceof Error ? e.message : "连接失败";
				} finally {
					connecting.value = false;
				}
			}
			async function handleUpdate() {
				if (!canUpdate.value || connecting.value) return;
				connecting.value = true;
				localError.value = null;
				try {
					await setupSync(effectiveConfig());
				} catch (e) {
					localError.value = e instanceof Error ? e.message : "更新失败";
				} finally {
					connecting.value = false;
				}
			}
			async function handleSyncNow() {
				const { sync } = useSync();
				connecting.value = true;
				localError.value = null;
				try {
					await sync();
				} catch (e) {
					localError.value = e instanceof Error ? e.message : "同步失败";
				} finally {
					connecting.value = false;
				}
			}
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_1$2, [!__props.embedded ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createElementVNode)("div", _hoisted_2$2, [_cache[14] || (_cache[14] = (0, vue.createElementVNode)("div", {
					flex: "",
					"gap-2.5": "",
					"items-center": ""
				}, [(0, vue.createElementVNode)("div", {
					"i-mdi-cog": "",
					"text-lg": "",
					"text-accent": ""
				}), (0, vue.createElementVNode)("span", {
					"text-base": "",
					"text-white": "",
					"tracking-wider": "",
					"font-bold": "",
					"font-serif": ""
				}, "同步设置")], -1)), (0, vue.createVNode)(BaseButton_default, {
					variant: "ghost",
					onClick: _cache[0] || (_cache[0] = ($event) => emit("back"))
				}, {
					default: (0, vue.withCtx)(() => [..._cache[13] || (_cache[13] = [(0, vue.createElementVNode)("div", {
						"i-mdi-close": "",
						"text-lg": ""
					}, null, -1)])]),
					_: 1
				})]), _cache[15] || (_cache[15] = (0, vue.createElementVNode)("div", {
					"mb-3": "",
					"h-px": "",
					"to-transparent": "",
					"bg-gradient-to-r": "",
					from: "[var(--border-dark)]",
					via: "[var(--c-accent)]"
				}, null, -1))], 64)) : (0, vue.createCommentVNode)("", true), !(0, vue.unref)(isConfigured) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, [
					_cache[16] || (_cache[16] = (0, vue.createElementVNode)("p", {
						text: "white/60",
						"text-xs": "",
						"mb-3": ""
					}, " 配置 WebDAV 同步后，收藏将在所有登录同一账号的设备间自动同步。 ", -1)),
					(0, vue.createElementVNode)("div", _hoisted_3$2, [
						(0, vue.createVNode)(BaseInput_default, {
							modelValue: url.value,
							"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => url.value = $event),
							type: "url",
							placeholder: "WebDAV 目录地址，如 https://nas.lan/dav/any-bookmark"
						}, null, 8, ["modelValue"]),
						(0, vue.createVNode)(BaseInput_default, {
							modelValue: username.value,
							"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => username.value = $event),
							placeholder: "用户名"
						}, null, 8, ["modelValue"]),
						(0, vue.createElementVNode)("div", _hoisted_4$2, [(0, vue.createVNode)(BaseInput_default, {
							modelValue: password.value,
							"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => password.value = $event),
							type: showPassword.value ? "text" : "password",
							placeholder: "密码"
						}, null, 8, ["modelValue", "type"]), (0, vue.createElementVNode)("button", {
							class: "text-sm text-white/30 p-0.5 border-none bg-transparent cursor-pointer transition-200 right-2.5 top-1/2 absolute hover:text-white/60 -translate-y-1/2",
							onClick: _cache[4] || (_cache[4] = ($event) => showPassword.value = !showPassword.value)
						}, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)(showPassword.value ? "i-mdi-eye-off" : "i-mdi-eye") }, null, 2)])])
					]),
					(0, vue.createVNode)(BaseButton_default, {
						variant: "primary",
						disabled: !canConnect.value || connecting.value,
						onClick: _cache[5] || (_cache[5] = ($event) => handleConnect())
					}, {
						default: (0, vue.withCtx)(() => [connecting.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_5$2)) : (0, vue.createCommentVNode)("", true), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(connecting.value ? "连接中…" : "连接并同步"), 1)]),
						_: 1
					}, 8, ["disabled"]),
					localError.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", _hoisted_6$2, (0, vue.toDisplayString)(localError.value), 1)) : (0, vue.createCommentVNode)("", true),
					(0, vue.unref)(error) && !localError.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", _hoisted_7$2, (0, vue.toDisplayString)((0, vue.unref)(error)), 1)) : (0, vue.createCommentVNode)("", true)
				], 64)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 2 }, [
					(0, vue.createElementVNode)("div", {
						flex: "~ items-center gap-2",
						"mb-3": "",
						"p-3": "",
						"rounded-lg": "",
						class: (0, vue.normalizeClass)({
							"bg-green-900/20": (0, vue.unref)(status) === "idle",
							"bg-yellow-900/20": (0, vue.unref)(status) === "syncing",
							"bg-red-900/20": (0, vue.unref)(status) === "error"
						})
					}, [(0, vue.createElementVNode)("div", {
						"rounded-full": "",
						"flex-shrink-0": "",
						"h-2.5": "",
						"w-2.5": "",
						class: (0, vue.normalizeClass)(statusDotClass.value)
					}, null, 2), (0, vue.createElementVNode)("div", _hoisted_8$2, [(0, vue.createElementVNode)("span", _hoisted_9$1, (0, vue.toDisplayString)(statusText.value), 1), (0, vue.unref)(lastSyncTime) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_10$1, " 上次同步：" + (0, vue.toDisplayString)(formatTime((0, vue.unref)(lastSyncTime))), 1)) : (0, vue.createCommentVNode)("", true)])], 2),
					_cache[18] || (_cache[18] = (0, vue.createElementVNode)("p", {
						text: "xs white/30",
						"mb-3": ""
					}, " 每 5 分钟自动检查一次远程更新，添加或删除收藏后 3 秒内自动推送。 ", -1)),
					localError.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", _hoisted_11$1, (0, vue.toDisplayString)(localError.value), 1)) : (0, vue.createCommentVNode)("", true),
					(0, vue.unref)(error) && !localError.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", _hoisted_12$1, (0, vue.toDisplayString)((0, vue.unref)(error)), 1)) : (0, vue.createCommentVNode)("", true),
					(0, vue.createVNode)(BaseButton_default, {
						variant: "primary",
						disabled: connecting.value,
						onClick: _cache[6] || (_cache[6] = ($event) => handleSyncNow())
					}, {
						default: (0, vue.withCtx)(() => [connecting.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_13$1)) : (0, vue.createCommentVNode)("", true), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(connecting.value ? "同步中…" : "立即同步"), 1)]),
						_: 1
					}, 8, ["disabled"]),
					_cache[19] || (_cache[19] = (0, vue.createElementVNode)("div", {
						text: "white/40",
						"text-xs": "",
						"tracking-wider": "",
						"font-bold": "",
						"mb-1": "",
						"mt-4": "",
						uppercase: ""
					}, " 服务器配置 ", -1)),
					(0, vue.createElementVNode)("div", _hoisted_14$1, [
						(0, vue.createVNode)(BaseInput_default, {
							modelValue: url.value,
							"onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => url.value = $event),
							type: "url",
							placeholder: "WebDAV 目录地址"
						}, null, 8, ["modelValue"]),
						(0, vue.createVNode)(BaseInput_default, {
							modelValue: username.value,
							"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => username.value = $event),
							placeholder: "用户名"
						}, null, 8, ["modelValue"]),
						(0, vue.createElementVNode)("div", _hoisted_15$1, [(0, vue.createVNode)(BaseInput_default, {
							modelValue: password.value,
							"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => password.value = $event),
							type: showPassword.value ? "text" : "password",
							placeholder: "密码"
						}, null, 8, ["modelValue", "type"]), (0, vue.createElementVNode)("button", {
							class: "text-sm text-white/30 p-0.5 border-none bg-transparent cursor-pointer transition-200 right-2.5 top-1/2 absolute hover:text-white/60 -translate-y-1/2",
							onClick: _cache[10] || (_cache[10] = ($event) => showPassword.value = !showPassword.value)
						}, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)(showPassword.value ? "i-mdi-eye-off" : "i-mdi-eye") }, null, 2)])])
					]),
					(0, vue.createElementVNode)("div", _hoisted_16$1, [(0, vue.createVNode)(BaseButton_default, {
						variant: "default",
						class: "flex-1",
						disabled: !canUpdate.value || connecting.value,
						onClick: _cache[11] || (_cache[11] = ($event) => handleUpdate())
					}, {
						default: (0, vue.withCtx)(() => [..._cache[17] || (_cache[17] = [(0, vue.createTextVNode)(" 更新配置 ", -1)])]),
						_: 1
					}, 8, ["disabled"]), (0, vue.createVNode)(BaseButton_default, {
						variant: (0, vue.unref)(autoSyncEnabled) ? "default" : "primary",
						onClick: _cache[12] || (_cache[12] = ($event) => (0, vue.unref)(toggleAutoSync)())
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(autoSyncEnabled) ? "关闭自动同步" : "开启自动同步"), 1)]),
						_: 1
					}, 8, ["variant"])])
				], 64))]);
			};
		}
	});
	var _hoisted_1$1 = { flex: "~ col" };
	var _hoisted_2$1 = {
		flex: "~ items-center justify-between",
		"mb-3": ""
	};
	var _hoisted_3$1 = {
		"border-b": "1 solid border",
		"mb-3": "",
		flex: ""
	};
	var _hoisted_4$1 = ["onClick"];
	var _hoisted_5$1 = {
		flex: "",
		"gap-1.5": "",
		"items-center": ""
	};
	var _hoisted_6$1 = {
		key: 2,
		flex: "~ col"
	};
	var _hoisted_7$1 = { flex: "~ gap-2" };
	var _hoisted_8$1 = {
		key: 0,
		text: "green-400 text-xs",
		"mt-2": ""
	};
	var SettingsPage_default = (0, vue.defineComponent)({
		__name: "SettingsPage",
		emits: ["back"],
		setup(__props, { emit: __emit }) {
			const emit = __emit;
			const tabs = [
				{
					id: "sync",
					label: "同步",
					icon: "i-mdi-sync"
				},
				{
					id: "domains",
					label: "域名",
					icon: "i-mdi-web"
				},
				{
					id: "data",
					label: "数据",
					icon: "i-mdi-database"
				}
			];
			const activeTab = (0, vue.ref)("sync");
			const importInput = (0, vue.ref)();
			const importMessage = (0, vue.ref)(null);
			function handleExport() {
				const blob = new Blob([exportAllData()], { type: "application/json" });
				const u = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = u;
				a.download = `any-bookmark-${new Date().toISOString().replace(/:/g, "-").replace(/\..+/, "")}.json`;
				document.body.append(a);
				a.click();
				a.remove();
				URL.revokeObjectURL(u);
			}
			function handleImportClick() {
				importInput.value?.click();
			}
			async function handleImportFile(e) {
				const input = e.target;
				const file = input.files?.[0];
				if (!file) return;
				importMessage.value = null;
				try {
					importSettings(await file.text());
					importMessage.value = "导入成功，即将刷新页面…";
					setTimeout(() => location.reload(), 800);
				} catch {
					importMessage.value = "导入失败：文件格式无效";
				} finally {
					input.value = "";
				}
			}
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_1$1, [
					(0, vue.createElementVNode)("div", _hoisted_2$1, [_cache[4] || (_cache[4] = (0, vue.createElementVNode)("div", {
						flex: "",
						"gap-2.5": "",
						"items-center": ""
					}, [(0, vue.createElementVNode)("div", {
						"i-mdi-cog": "",
						"text-lg": "",
						"text-accent": ""
					}), (0, vue.createElementVNode)("span", {
						"text-base": "",
						"text-white": "",
						"tracking-wider": "",
						"font-bold": "",
						"font-serif": ""
					}, "设置")], -1)), (0, vue.createVNode)(BaseButton_default, {
						variant: "ghost",
						onClick: _cache[0] || (_cache[0] = ($event) => emit("back"))
					}, {
						default: (0, vue.withCtx)(() => [..._cache[3] || (_cache[3] = [(0, vue.createElementVNode)("div", {
							"i-mdi-close": "",
							"text-lg": ""
						}, null, -1)])]),
						_: 1
					})]),
					_cache[8] || (_cache[8] = (0, vue.createElementVNode)("div", {
						"mb-3": "",
						"h-px": "",
						"to-transparent": "",
						"bg-gradient-to-r": "",
						from: "[var(--border-dark)]",
						via: "[var(--c-accent)]"
					}, null, -1)),
					(0, vue.createElementVNode)("div", _hoisted_3$1, [((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(tabs, (tab) => {
						return (0, vue.createElementVNode)("button", {
							key: tab.id,
							"text-sm": "",
							"px-4": "",
							"py-2.5": "",
							"border-none": "",
							"bg-transparent": "",
							"cursor-pointer": "",
							"transition-200": "",
							relative: "",
							class: (0, vue.normalizeClass)(activeTab.value === tab.id ? "text-accent" : "text-white/35 hover:text-white/60"),
							onClick: ($event) => activeTab.value = tab.id
						}, [(0, vue.createElementVNode)("div", _hoisted_5$1, [(0, vue.createElementVNode)("div", {
							class: (0, vue.normalizeClass)(tab.icon),
							"text-sm": ""
						}, null, 2), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(tab.label), 1)]), (0, vue.createElementVNode)("div", {
							"rounded-full": "",
							"bg-accent": "",
							"h-0.5": "",
							"transition-200": "",
							"bottom-0": "",
							"left-0": "",
							"right-0": "",
							absolute: "",
							class: (0, vue.normalizeClass)(activeTab.value === tab.id ? "op-100 scale-100" : "op-0 scale-x-50")
						}, null, 2)], 10, _hoisted_4$1);
					}), 64))]),
					activeTab.value === "sync" ? ((0, vue.openBlock)(), (0, vue.createBlock)(SyncSettings_default, {
						key: 0,
						embedded: ""
					})) : (0, vue.createCommentVNode)("", true),
					activeTab.value === "domains" ? ((0, vue.openBlock)(), (0, vue.createBlock)(DomainManager_default, {
						key: 1,
						embedded: ""
					})) : (0, vue.createCommentVNode)("", true),
					activeTab.value === "data" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_6$1, [
						_cache[7] || (_cache[7] = (0, vue.createElementVNode)("p", {
							text: "white/60",
							"text-xs": "",
							"mb-3": ""
						}, " 导出全部数据（收藏、域名、正则模式、时间戳），或从之前导出的文件中恢复。 ", -1)),
						(0, vue.createElementVNode)("div", _hoisted_7$1, [
							(0, vue.createVNode)(BaseButton_default, {
								variant: "primary",
								class: "flex-1",
								onClick: _cache[1] || (_cache[1] = ($event) => handleExport())
							}, {
								default: (0, vue.withCtx)(() => [..._cache[5] || (_cache[5] = [(0, vue.createElementVNode)("div", {
									"i-mdi-download": "",
									"text-sm": ""
								}, null, -1), (0, vue.createElementVNode)("span", null, "导出全部数据", -1)])]),
								_: 1
							}),
							(0, vue.createVNode)(BaseButton_default, {
								variant: "default",
								class: "flex-1",
								onClick: _cache[2] || (_cache[2] = ($event) => handleImportClick())
							}, {
								default: (0, vue.withCtx)(() => [..._cache[6] || (_cache[6] = [(0, vue.createElementVNode)("div", {
									"i-mdi-upload": "",
									"text-sm": ""
								}, null, -1), (0, vue.createElementVNode)("span", null, "导入数据", -1)])]),
								_: 1
							}),
							(0, vue.createElementVNode)("input", {
								ref_key: "importInput",
								ref: importInput,
								type: "file",
								accept: ".json",
								hidden: "",
								onChange: handleImportFile
							}, null, 544)
						]),
						importMessage.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", _hoisted_8$1, (0, vue.toDisplayString)(importMessage.value), 1)) : (0, vue.createCommentVNode)("", true)
					])) : (0, vue.createCommentVNode)("", true)
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
		flex: "~ items-center justify-between",
		"mb-3": ""
	};
	var _hoisted_3 = {
		flex: "",
		"gap-3": "",
		"items-center": ""
	};
	var _hoisted_4 = {
		text: "#a6926d",
		"text-xs": "",
		"font-mono": ""
	};
	var _hoisted_5 = {
		flex: "~ gap-2",
		"mb-2": ""
	};
	var _hoisted_6 = {
		"flex-1": "",
		relative: ""
	};
	var _hoisted_7 = { class: "text-left w-7 inline-block" };
	var _hoisted_8 = {
		key: 0,
		flex: "~ col gap-2",
		"mb-3": "",
		"p-3": "",
		"rounded-lg": "",
		class: "border border-accent/30 border-solid bg-accent/5"
	};
	var _hoisted_9 = { flex: "~ col gap-1.5" };
	var _hoisted_10 = { flex: "~ gap-2" };
	var _hoisted_11 = { flex: "~ gap-2 items-center" };
	var _hoisted_12 = ["title"];
	var _hoisted_13 = { flex: "~ col gap-1.5" };
	var _hoisted_14 = { flex: "~ col gap-1.5" };
	var _hoisted_15 = ["value"];
	var _hoisted_16 = {
		key: 1,
		flex: "~ col items-center",
		text: "white/25",
		"text-sm": "",
		"py-8": ""
	};
	var _hoisted_17 = {
		key: 0,
		"text-xs": "",
		"mt-1": ""
	};
	var _hoisted_18 = {
		key: 2,
		flex: "~ col items-center",
		text: "white/25",
		"text-sm": "",
		"py-8": ""
	};
	var _hoisted_19 = {
		flex: "~ col gap-1",
		"p-1": "",
		border: "1 solid border rounded-lg"
	};
	var _hoisted_20 = ["href", "title"];
	var _hoisted_21 = { class: "truncate" };
	var _hoisted_22 = ["onClick"];
	var _hoisted_23 = ["onClick"];
	var PAGE_SIZE = 10;
	var STORAGE_KEY = "bookmark-current-page";
	var BookmarkPanel_default = (0, vue.defineComponent)({
		__name: "BookmarkPanel",
		props: { open: { type: Boolean } },
		emits: ["close"],
		setup(__props, { emit: __emit }) {
			const props = __props;
			const emit = __emit;
			const currentView = (0, vue.ref)("bookmarks");
			const isLocked = useScrollLock(document.body);
			(0, vue.watch)(() => props.open, (val) => {
				isLocked.value = val;
			}, { immediate: true });
			const { hostname, currentBookmarks, add, remove, updateBookmark } = useBookmarks();
			const searchQuery = (0, vue.ref)("");
			const sortOrder = (0, vue.ref)("recent");
			const filteredBookmarks = (0, vue.computed)(() => {
				let list = currentBookmarks.value;
				const q = searchQuery.value.trim().toLowerCase();
				if (q) list = list.filter((b) => b.name.toLowerCase().includes(q));
				if (sortOrder.value !== "recent") {
					list = [...list];
					if (sortOrder.value === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
					else if (sortOrder.value === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));
					else if (sortOrder.value === "oldest") list.reverse();
				}
				return list;
			});
			function cycleSort() {
				const order = [
					"recent",
					"oldest",
					"name-asc",
					"name-desc"
				];
				sortOrder.value = order[(order.indexOf(sortOrder.value) + 1) % order.length];
			}
			const sortLabel = (0, vue.computed)(() => {
				switch (sortOrder.value) {
					case "oldest": return "最旧";
					case "name-asc": return "A-Z";
					case "name-desc": return "Z-A";
					default: return "最新";
				}
			});
			const { current, paged, total } = usePagination(() => filteredBookmarks.value, PAGE_SIZE);
			const showAddForm = (0, vue.ref)(false);
			const newName = (0, vue.ref)("");
			const newUrl = (0, vue.ref)("");
			const inputRef = (0, vue.ref)();
			const hasNewName = (0, vue.computed)(() => newName.value.trim().length > 0 && newUrl.value.trim().length > 0);
			const domainRegex = (0, vue.computed)(() => getDomainRegex(hostname.value));
			function startEdit(index, name, url) {
				const nextName = prompt("编辑收藏名称", name);
				if (nextName === null) return;
				const nextUrl = prompt("编辑收藏地址", url);
				if (nextUrl === null) return;
				if (nextName.trim() && nextUrl.trim()) updateBookmark((current.value - 1) * PAGE_SIZE + index, nextName.trim(), nextUrl.trim());
			}
			const emptyRowsCount = (0, vue.computed)(() => {
				return PAGE_SIZE - paged.value.length;
			});
			(0, vue.watch)(current, (val) => {
				localStorage.setItem(STORAGE_KEY, String(val));
			});
			(0, vue.watch)(() => props.open, (val) => {
				if (val) {
					currentView.value = "bookmarks";
					showAddForm.value = false;
					searchQuery.value = "";
					newName.value = document.title || "";
					newUrl.value = location.href;
					const savedPage = localStorage.getItem(STORAGE_KEY);
					const targetPage = savedPage ? Number(savedPage) : 1;
					(0, vue.nextTick)(() => {
						const maxPage = Math.max(total.value, 1);
						current.value = Math.min(targetPage, maxPage);
					});
				}
			});
			(0, vue.watch)([searchQuery, filteredBookmarks], () => {
				current.value = 1;
			});
			function handleAdd() {
				add(newName.value, newUrl.value);
				newName.value = "";
				newUrl.value = location.href;
				searchQuery.value = "";
				current.value = 1;
				inputRef.value?.focus();
			}
			function handleRemove(index) {
				remove((current.value - 1) * PAGE_SIZE + index);
				if (paged.value.length === 0 && current.value > 1) current.value--;
			}
			function fillOriginalTitle() {
				newName.value = document.title || "";
				inputRef.value?.focus();
			}
			function applyRegex() {
				const pattern = domainRegex.value;
				if (!pattern) return;
				try {
					const re = new RegExp(pattern);
					const title = document.title || "";
					const match = title.match(re);
					newName.value = match ? match[1] ?? match[0] : title;
				} catch {}
				inputRef.value?.focus();
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
					}), (0, vue.createElementVNode)("div", {
						"max-w": "[95vw]",
						"max-h": "[90vh]",
						flex: "~ col",
						border: "1 solid border",
						"rounded-2xl": "",
						"bg-panel": "",
						"w-130": "",
						relative: "",
						"z-1": "",
						"overflow-x-hidden": "",
						"overflow-y-auto": "",
						p: "x-4 y-3",
						onKeydown: _cache[14] || (_cache[14] = (0, vue.withModifiers)(() => {}, ["stop"])),
						onKeyup: _cache[15] || (_cache[15] = (0, vue.withModifiers)(() => {}, ["stop"]))
					}, [
						(0, vue.createElementVNode)("div", _hoisted_2, [_cache[18] || (_cache[18] = (0, vue.createElementVNode)("div", {
							flex: "",
							"gap-2.5": "",
							"items-center": ""
						}, [(0, vue.createElementVNode)("div", {
							"i-mdi-bookmark-outline": "",
							"text-lg": "",
							"text-accent": ""
						}), (0, vue.createElementVNode)("span", {
							"text-base": "",
							"text-white": "",
							"tracking-wider": "",
							"font-bold": "",
							"font-serif": ""
						}, "收藏夹")], -1)), (0, vue.createElementVNode)("div", _hoisted_3, [
							(0, vue.createElementVNode)("span", _hoisted_4, (0, vue.toDisplayString)((0, vue.unref)(hostname)), 1),
							(0, vue.createVNode)(BaseButton_default, {
								variant: "ghost",
								title: "设置",
								onClick: _cache[1] || (_cache[1] = ($event) => currentView.value = "settings")
							}, {
								default: (0, vue.withCtx)(() => [..._cache[16] || (_cache[16] = [(0, vue.createElementVNode)("div", {
									"i-mdi-cog": "",
									"text-lg": ""
								}, null, -1)])]),
								_: 1
							}),
							(0, vue.createVNode)(BaseButton_default, {
								variant: "ghost",
								onClick: _cache[2] || (_cache[2] = ($event) => emit("close"))
							}, {
								default: (0, vue.withCtx)(() => [..._cache[17] || (_cache[17] = [(0, vue.createElementVNode)("div", {
									"i-mdi-close": "",
									"text-lg": ""
								}, null, -1)])]),
								_: 1
							})
						])]),
						_cache[30] || (_cache[30] = (0, vue.createElementVNode)("div", {
							"mb-3": "",
							"h-px": "",
							"to-transparent": "",
							"bg-gradient-to-r": "",
							from: "[var(--border-dark)]",
							via: "[var(--c-accent)]"
						}, null, -1)),
						currentView.value === "bookmarks" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [
							(0, vue.createElementVNode)("div", _hoisted_5, [
								(0, vue.createElementVNode)("div", _hoisted_6, [_cache[19] || (_cache[19] = (0, vue.createElementVNode)("div", {
									"i-mdi-magnify": "",
									class: "text-sm text-white/30 pointer-events-none left-3 top-1/2 absolute -translate-y-1/2"
								}, null, -1)), (0, vue.withDirectives)((0, vue.createElementVNode)("input", {
									"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => searchQuery.value = $event),
									type: "search",
									placeholder: "搜索收藏…",
									border: "1 solid border focus:border-accent",
									p: "x-3 y-2",
									"pl-9": "",
									class: "important-bg-input",
									text: "sm white/90! placeholder-white/30!",
									"outline-none": "",
									"rounded-lg": "",
									"w-full": "",
									"transition-200": ""
								}, null, 512), [[vue.vModelText, searchQuery.value]])]),
								(0, vue.createVNode)(BaseButton_default, {
									variant: "default",
									size: "sm",
									class: "min-w-[4.5rem]",
									title: `排序：${sortLabel.value}`,
									onClick: _cache[4] || (_cache[4] = ($event) => cycleSort())
								}, {
									default: (0, vue.withCtx)(() => [_cache[20] || (_cache[20] = (0, vue.createElementVNode)("div", {
										"i-mdi-sort": "",
										"text-sm": "",
										"flex-shrink-0": ""
									}, null, -1)), (0, vue.createElementVNode)("span", _hoisted_7, (0, vue.toDisplayString)(sortLabel.value), 1)]),
									_: 1
								}, 8, ["title"]),
								(0, vue.createVNode)(BaseButton_default, {
									variant: "default",
									size: "sm",
									onClick: _cache[5] || (_cache[5] = ($event) => showAddForm.value = !showAddForm.value)
								}, {
									default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
										class: (0, vue.normalizeClass)(showAddForm.value ? "i-mdi-chevron-up" : "i-mdi-plus"),
										"text-sm": ""
									}, null, 2), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(showAddForm.value ? "收起" : "添加"), 1)]),
									_: 1
								})
							]),
							showAddForm.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_8, [
								(0, vue.createElementVNode)("div", _hoisted_9, [(0, vue.createElementVNode)("div", _hoisted_10, [(0, vue.createVNode)(BaseInput_default, {
									ref_key: "inputRef",
									ref: inputRef,
									modelValue: newName.value,
									"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => newName.value = $event),
									placeholder: "为当前页面命名…",
									class: "flex-1",
									onKeydown: _cache[7] || (_cache[7] = (0, vue.withKeys)(($event) => handleAdd(), ["enter"]))
								}, null, 8, ["modelValue"]), (0, vue.createVNode)(BaseButton_default, {
									variant: "primary",
									disabled: !hasNewName.value,
									onClick: _cache[8] || (_cache[8] = ($event) => handleAdd())
								}, {
									default: (0, vue.withCtx)(() => [..._cache[21] || (_cache[21] = [(0, vue.createTextVNode)(" 收藏 ", -1)])]),
									_: 1
								}, 8, ["disabled"])]), (0, vue.createElementVNode)("div", _hoisted_11, [(0, vue.createElementVNode)("button", {
									text: "xs white/40 hover:white/70",
									border: "1 solid border",
									"px-2": "",
									"py-1": "",
									rounded: "",
									"bg-transparent": "",
									"cursor-pointer": "",
									"transition-200": "",
									onClick: fillOriginalTitle
								}, " 原标题 "), (0, vue.createElementVNode)("button", {
									text: "xs white/40 hover:white/70",
									border: "1 solid border",
									"px-2": "",
									"py-1": "",
									rounded: "",
									"bg-transparent": "",
									"cursor-pointer": "",
									"transition-200": "",
									title: domainRegex.value ? `正则: ${domainRegex.value}` : "未设置正则，请在域名管理中配置",
									onClick: applyRegex
								}, " 正则提取原标题 ", 8, _hoisted_12)])]),
								(0, vue.createElementVNode)("div", _hoisted_13, [_cache[22] || (_cache[22] = (0, vue.createElementVNode)("span", { text: "xs white/30" }, "地址", -1)), (0, vue.withDirectives)((0, vue.createElementVNode)("input", {
									"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => newUrl.value = $event),
									type: "text",
									placeholder: "收藏的地址…",
									border: "1 solid border focus:border-accent",
									p: "x-2 y-2",
									class: "w-full important-bg-input",
									text: "xs white/60! placeholder-white/20!",
									"font-mono": "",
									"outline-none": "",
									"rounded-lg": "",
									"transition-200": "",
									onKeydown: _cache[10] || (_cache[10] = (0, vue.withKeys)(($event) => handleAdd(), ["enter"]))
								}, null, 544), [[vue.vModelText, newUrl.value]])]),
								(0, vue.createElementVNode)("div", _hoisted_14, [_cache[23] || (_cache[23] = (0, vue.createElementVNode)("span", { text: "xs white/30" }, "正则表达式", -1)), (0, vue.createElementVNode)("input", {
									value: domainRegex.value || "",
									type: "text",
									placeholder: "未设置，如 ^(.+?)\\s*\\|\\s*Example.com$",
									border: "1 solid border focus:border-accent",
									p: "x-2 y-2",
									class: "w-full important-bg-input",
									text: "xs white/60! placeholder-white/20!",
									"outline-none": "",
									"rounded-lg": "",
									"transition-200": "",
									onChange: _cache[11] || (_cache[11] = ($event) => (0, vue.unref)(saveDomainRegex)((0, vue.unref)(hostname), $event.target.value.trim()))
								}, null, 40, _hoisted_15)])
							])) : (0, vue.createCommentVNode)("", true),
							(0, vue.unref)(currentBookmarks).length === 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_16, [
								_cache[24] || (_cache[24] = (0, vue.createElementVNode)("div", {
									"i-mdi-bookmark-off-outline": "",
									"text-4xl": "",
									"mb-2": "",
									"op-30": ""
								}, null, -1)),
								_cache[25] || (_cache[25] = (0, vue.createElementVNode)("p", null, "暂无收藏", -1)),
								!showAddForm.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", _hoisted_17, " 点击「添加」开始收藏 ")) : (0, vue.createCommentVNode)("", true)
							])) : filteredBookmarks.value.length === 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_18, [..._cache[26] || (_cache[26] = [
								(0, vue.createElementVNode)("div", {
									"i-mdi-magnify": "",
									"text-4xl": "",
									"mb-2": "",
									"op-30": ""
								}, null, -1),
								(0, vue.createElementVNode)("p", null, "无匹配收藏", -1),
								(0, vue.createElementVNode)("p", {
									"text-xs": "",
									"mt-1": ""
								}, " 试试其他关键词 ", -1)
							])])) : ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 3 }, [(0, vue.createElementVNode)("div", _hoisted_19, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(paged), (bm, i) => {
								return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
									key: `${(0, vue.unref)(current)}-${i}`,
									border: "1 solid transparent hover:border-accent",
									flex: "~ items-center",
									"px-3": "",
									"rounded-lg": "",
									"bg-input": "",
									"transition-250": "",
									class: "group"
								}, [
									(0, vue.createElementVNode)("a", {
										href: bm.url,
										title: bm.url,
										target: "_blank",
										rel: "noopener noreferrer",
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
									}, [(0, vue.createElementVNode)("span", _hoisted_21, (0, vue.toDisplayString)(bm.name), 1)], 8, _hoisted_20),
									(0, vue.createElementVNode)("button", {
										"text-white": "",
										"ml-1": "",
										"p-1": "",
										"border-none": "",
										"bg-transparent": "",
										"op-40": "",
										flex: "",
										"shrink-0": "",
										"cursor-pointer": "",
										"items-center": "",
										class: "transition-all duration-200 hover:text-accent! hover:op-100!",
										title: "编辑名称与地址",
										onClick: ($event) => startEdit(i, bm.name, bm.url)
									}, [..._cache[27] || (_cache[27] = [(0, vue.createElementVNode)("div", {
										"i-mdi-pencil": "",
										"text-xs": ""
									}, null, -1)])], 8, _hoisted_22),
									(0, vue.createElementVNode)("button", {
										"p-1": "",
										"border-none": "",
										"bg-transparent": "",
										flex: "",
										"shrink-0": "",
										"cursor-pointer": "",
										"items-center": "",
										class: "text-red-400/60 transition-all duration-200 relative z-2 hover:text-red-400! hover:op-100!",
										onClick: ($event) => handleRemove(i)
									}, [..._cache[28] || (_cache[28] = [(0, vue.createElementVNode)("div", {
										"i-mdi-delete-outline": "",
										"text-sm": ""
									}, null, -1)])], 8, _hoisted_23)
								]);
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
								}, [..._cache[29] || (_cache[29] = [(0, vue.createElementVNode)("span", {
									"text-sm": "",
									"op-0": ""
								}, "\xA0", -1)])]);
							}), 128))]), (0, vue.createVNode)(Pagination_default, {
								current: (0, vue.unref)(current),
								"onUpdate:current": _cache[12] || (_cache[12] = ($event) => (0, vue.isRef)(current) ? current.value = $event : null),
								total: (0, vue.unref)(total)
							}, null, 8, ["current", "total"])], 64))
						], 64)) : (0, vue.createCommentVNode)("", true),
						currentView.value === "settings" ? ((0, vue.openBlock)(), (0, vue.createBlock)(SettingsPage_default, {
							key: 1,
							onBack: _cache[13] || (_cache[13] = ($event) => currentView.value = "bookmarks")
						})) : (0, vue.createCommentVNode)("", true)
					], 32)])) : (0, vue.createCommentVNode)("", true)]),
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
			const savedX = useStorage("any-bookmark-btn-x", null);
			const savedY = useStorage("any-bookmark-btn-y", null);
			const defaultX = () => Math.max(0, width.value - btnSize - margin);
			const defaultY = () => Math.max(0, height.value - btnSize - margin);
			const { x, y, style } = useDraggable(btnRef, {
				initialValue: () => ({
					x: savedX.value ?? defaultX(),
					y: savedY.value ?? defaultY()
				}),
				preventDefault: true,
				onMove() {
					x.value = Math.max(margin, Math.min(x.value, width.value - btnSize - margin));
					y.value = Math.max(margin, Math.min(y.value, height.value - btnSize - margin));
				}
			});
			(0, vue.watch)([x, y], () => {
				savedX.value = x.value;
				savedY.value = y.value;
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
					"aria-label": "打开收藏",
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
	var TriggerButton_default = _plugin_vue_export_helper_default(TriggerButton_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a20ea2d1"]]);
	var App_default = (0, vue.defineComponent)({
		__name: "App",
		setup(__props) {
			setupSettings();
			const panelOpen = (0, vue.ref)(false);
			const { pullAndMerge, sync, startAutoSync, stopAutoSync, isConfigured } = useSync();
			(0, vue.onMounted)(async () => {
				if (!isConfigured.value) return;
				startAutoSync(3e5);
				if (!shouldPullOnStartup()) return;
				try {
					await pullAndMerge();
				} catch {}
			});
			let pushDebounce = null;
			function onLocalChange() {
				if (!isConfigured.value) return;
				if (pushDebounce) clearTimeout(pushDebounce);
				pushDebounce = setTimeout(() => {
					sync(true).catch(() => {});
				}, 3e3);
			}
			(0, vue.onMounted)(() => window.addEventListener("any-bookmark:local-changed", onLocalChange));
			(0, vue.onUnmounted)(() => {
				stopAutoSync();
				if (pushDebounce) clearTimeout(pushDebounce);
				window.removeEventListener("any-bookmark:local-changed", onLocalChange);
			});
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
