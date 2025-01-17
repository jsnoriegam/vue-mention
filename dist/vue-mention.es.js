var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { options, Dropdown } from "floating-vue";
import { defineComponent, ref, watch, computed, onMounted, onUpdated, onUnmounted, nextTick, resolveComponent, openBlock, createElementBlock, normalizeClass, renderSlot, createVNode, mergeProps, withCtx, Fragment, renderList, createTextVNode, toDisplayString, createElementVNode, normalizeStyle } from "vue";
var textareaCaret = { exports: {} };
(function(module) {
  (function() {
    var properties = [
      "direction",
      "boxSizing",
      "width",
      "height",
      "overflowX",
      "overflowY",
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
      "borderStyle",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "fontStyle",
      "fontVariant",
      "fontWeight",
      "fontStretch",
      "fontSize",
      "fontSizeAdjust",
      "lineHeight",
      "fontFamily",
      "textAlign",
      "textTransform",
      "textIndent",
      "textDecoration",
      "letterSpacing",
      "wordSpacing",
      "tabSize",
      "MozTabSize"
    ];
    var isBrowser = typeof window !== "undefined";
    var isFirefox = isBrowser && window.mozInnerScreenX != null;
    function getCaretCoordinates(element, position, options2) {
      if (!isBrowser) {
        throw new Error("textarea-caret-position#getCaretCoordinates should only be called in a browser");
      }
      var debug = options2 && options2.debug || false;
      if (debug) {
        var el = document.querySelector("#input-textarea-caret-position-mirror-div");
        if (el)
          el.parentNode.removeChild(el);
      }
      var div = document.createElement("div");
      div.id = "input-textarea-caret-position-mirror-div";
      document.body.appendChild(div);
      var style = div.style;
      var computed2 = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;
      var isInput = element.nodeName === "INPUT";
      style.whiteSpace = "pre-wrap";
      if (!isInput)
        style.wordWrap = "break-word";
      style.position = "absolute";
      if (!debug)
        style.visibility = "hidden";
      properties.forEach(function(prop) {
        if (isInput && prop === "lineHeight") {
          style.lineHeight = computed2.height;
        } else {
          style[prop] = computed2[prop];
        }
      });
      if (isFirefox) {
        if (element.scrollHeight > parseInt(computed2.height))
          style.overflowY = "scroll";
      } else {
        style.overflow = "hidden";
      }
      div.textContent = element.value.substring(0, position);
      if (isInput)
        div.textContent = div.textContent.replace(/\s/g, "\xA0");
      var span = document.createElement("span");
      span.textContent = element.value.substring(position) || ".";
      div.appendChild(span);
      var coordinates = {
        top: span.offsetTop + parseInt(computed2["borderTopWidth"]),
        left: span.offsetLeft + parseInt(computed2["borderLeftWidth"]),
        height: parseInt(computed2["lineHeight"])
      };
      if (debug) {
        span.style.backgroundColor = "#aaa";
      } else {
        document.body.removeChild(div);
      }
      return coordinates;
    }
    {
      module.exports = getCaretCoordinates;
    }
  })();
})(textareaCaret);
var getCaretPosition = textareaCaret.exports;
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
options.themes.mentionable = {
  $extend: "dropdown",
  placement: "top-start",
  arrowPadding: 6,
  arrowOverflow: false
};
const _sfc_main = defineComponent({
  components: {
    VDropdown: Dropdown
  },
  inheritAttrs: false,
  props: {
    keys: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    },
    omitKey: {
      type: Boolean,
      default: false
    },
    filteringDisabled: {
      type: Boolean,
      default: false
    },
    insertSpace: {
      type: Boolean,
      default: false
    },
    mapInsert: {
      type: Function,
      default: null
    },
    limit: {
      type: Number,
      default: 8
    },
    theme: {
      type: String,
      default: "mentionable"
    },
    caretHeight: {
      type: Number,
      default: 0
    }
  },
  emits: ["search", "open", "close", "apply"],
  setup(props, { emit }) {
    const currentKey = ref(null);
    let currentKeyIndex;
    const oldKey = ref(null);
    const searchText = ref(null);
    watch(searchText, (value, oldValue) => {
      if (value) {
        emit("search", value, oldValue);
      }
    });
    const filteredItems = computed(() => {
      if (!searchText.value || props.filteringDisabled) {
        return props.items;
      }
      const finalSearchText = searchText.value.toLowerCase();
      return props.items.filter((item) => {
        let text;
        if (item.searchText) {
          text = item.searchText;
        } else if (item.label) {
          text = item.label;
        } else {
          text = "";
          for (const key in item) {
            text += item[key];
          }
        }
        return text.toLowerCase().includes(finalSearchText);
      });
    });
    const displayedItems = computed(() => filteredItems.value.slice(0, props.limit));
    const selectedIndex = ref(0);
    watch(displayedItems, () => {
      selectedIndex.value = 0;
    }, {
      deep: true
    });
    let input;
    const el = ref(null);
    function getInput() {
      var _a, _b;
      return (_b = (_a = el.value.querySelector("input")) != null ? _a : el.value.querySelector("textarea")) != null ? _b : el.value.querySelector('[contenteditable="true"]');
    }
    onMounted(() => {
      input = getInput();
      attach();
    });
    onUpdated(() => {
      const newInput = getInput();
      if (newInput !== input) {
        detach();
        input = newInput;
        attach();
      }
    });
    onUnmounted(() => {
      detach();
    });
    function attach() {
      if (input) {
        input.addEventListener("input", onInput);
        input.addEventListener("keydown", onKeyDown);
        input.addEventListener("keyup", onKeyUp);
        input.addEventListener("scroll", onScroll);
        input.addEventListener("blur", onBlur);
      }
    }
    function detach() {
      if (input) {
        input.removeEventListener("input", onInput);
        input.removeEventListener("keydown", onKeyDown);
        input.removeEventListener("keyup", onKeyUp);
        input.removeEventListener("scroll", onScroll);
        input.removeEventListener("blur", onBlur);
      }
    }
    function onInput() {
      checkKey();
    }
    function onBlur() {
      closeMenu();
    }
    function onKeyDown(e) {
      if (currentKey.value) {
        if (e.key === "ArrowDown") {
          selectedIndex.value++;
          if (selectedIndex.value >= displayedItems.value.length) {
            selectedIndex.value = 0;
          }
          cancelEvent(e);
        }
        if (e.key === "ArrowUp") {
          selectedIndex.value--;
          if (selectedIndex.value < 0) {
            selectedIndex.value = displayedItems.value.length - 1;
          }
          cancelEvent(e);
        }
        if ((e.key === "Enter" || e.key === "Tab") && displayedItems.value.length > 0) {
          applyMention(selectedIndex.value);
          cancelEvent(e);
        }
        if (e.key === "Escape") {
          closeMenu();
          cancelEvent(e);
        }
      }
    }
    let cancelKeyUp = null;
    function onKeyUp(e) {
      if (cancelKeyUp && e.key === cancelKeyUp) {
        cancelEvent(e);
      }
      cancelKeyUp = null;
    }
    function cancelEvent(e) {
      e.preventDefault();
      e.stopPropagation();
      cancelKeyUp = e.key;
    }
    function onScroll() {
      updateCaretPosition();
    }
    function getSelectionStart() {
      return input.isContentEditable ? window.getSelection().anchorOffset : input.selectionStart;
    }
    function setCaretPosition(index) {
      nextTick(() => {
        input.selectionEnd = index;
      });
    }
    function getValue() {
      return input.isContentEditable ? window.getSelection().anchorNode.textContent : input.value;
    }
    function setValue(value) {
      input.value = value;
      emitInputEvent("input");
    }
    function emitInputEvent(type) {
      input.dispatchEvent(new Event(type));
    }
    let lastSearchText = null;
    function checkKey() {
      const index = getSelectionStart();
      if (index >= 0) {
        const { key, keyIndex } = getLastKeyBeforeCaret(index);
        const text = lastSearchText = getLastSearchText(index, keyIndex);
        if (text != null) {
          openMenu(key, keyIndex);
          searchText.value = text;
          return true;
        }
      }
      closeMenu();
      return false;
    }
    function getLastKeyBeforeCaret(caretIndex) {
      const [keyData] = props.keys.map((key) => ({
        key,
        keyIndex: getValue().lastIndexOf(key, caretIndex - 1)
      })).sort((a, b) => b.keyIndex - a.keyIndex);
      return keyData;
    }
    function getLastSearchText(caretIndex, keyIndex) {
      if (keyIndex !== -1) {
        const text = getValue().substring(keyIndex + 1, caretIndex);
        if (!/[\s\(\)\{\}\[\]]/.test(text)) {
          return text;
        }
      }
      return null;
    }
    const caretPosition = ref(null);
    function updateCaretPosition() {
      if (currentKey.value) {
        if (input.isContentEditable) {
          const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
          const inputRect = input.getBoundingClientRect();
          caretPosition.value = {
            left: rect.left - inputRect.left,
            top: rect.top - inputRect.top,
            height: rect.height
          };
        } else {
          caretPosition.value = getCaretPosition(input, currentKeyIndex);
        }
        caretPosition.value.top -= input.scrollTop;
        if (props.caretHeight) {
          caretPosition.value.height = props.caretHeight;
        } else if (isNaN(caretPosition.value.height)) {
          caretPosition.value.height = 16;
        }
      }
    }
    function openMenu(key, keyIndex) {
      if (currentKey.value !== key) {
        currentKey.value = key;
        currentKeyIndex = keyIndex;
        updateCaretPosition();
        selectedIndex.value = 0;
        emit("open", currentKey.value);
      }
    }
    function closeMenu() {
      if (currentKey.value != null) {
        oldKey.value = currentKey.value;
        currentKey.value = null;
        emit("close", oldKey.value);
      }
    }
    function applyMention(itemIndex) {
      const item = displayedItems.value[itemIndex];
      const value = (props.omitKey ? "" : currentKey.value) + String(props.mapInsert ? props.mapInsert(item, currentKey.value) : item.value) + (props.insertSpace ? " " : "");
      if (input.isContentEditable) {
        const range = window.getSelection().getRangeAt(0);
        range.setStart(range.startContainer, range.startOffset - currentKey.value.length - (lastSearchText ? lastSearchText.length : 0));
        range.deleteContents();
        range.insertNode(document.createTextNode(value));
        range.setStart(range.endContainer, range.endOffset);
        emitInputEvent("input");
      } else {
        setValue(replaceText(getValue() || "", searchText.value, value, currentKeyIndex));
        setCaretPosition(currentKeyIndex + value.length);
      }
      emit("apply", item, currentKey.value, value);
      closeMenu();
    }
    function replaceText(text, searchString, newText, index) {
      return text.slice(0, index) + newText + text.slice(index + searchString.length + 1, text.length);
    }
    return {
      el,
      currentKey,
      oldKey,
      caretPosition,
      displayedItems,
      selectedIndex,
      applyMention
    };
  }
});
const _hoisted_1 = { key: 0 };
const _hoisted_2 = /* @__PURE__ */ createTextVNode(" No result ");
const _hoisted_3 = ["onMouseover", "onMousedown"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VDropdown = resolveComponent("VDropdown");
  return openBlock(), createElementBlock("div", {
    ref: "el",
    class: normalizeClass(["mentionable", _ctx.$attrs.class]),
    style: { "position": "relative" }
  }, [
    renderSlot(_ctx.$slots, "default"),
    createVNode(_component_VDropdown, mergeProps({ ref: "popper" }, __spreadProps(__spreadValues({}, _ctx.$attrs), { class: void 0 }), {
      shown: !!_ctx.currentKey,
      triggers: [],
      "auto-hide": false,
      theme: _ctx.theme,
      class: "popper",
      style: [
        { "position": "absolute" },
        _ctx.caretPosition ? {
          top: `${_ctx.caretPosition.top}px`,
          left: `${_ctx.caretPosition.left}px`
        } : {}
      ]
    }), {
      popper: withCtx(() => [
        !_ctx.displayedItems.length ? (openBlock(), createElementBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "no-result", {}, () => [
            _hoisted_2
          ])
        ])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.displayedItems, (item, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: normalizeClass(["mention-item", {
              "mention-selected": _ctx.selectedIndex === index
            }]),
            onMouseover: ($event) => _ctx.selectedIndex = index,
            onMousedown: ($event) => _ctx.applyMention(index)
          }, [
            renderSlot(_ctx.$slots, `item-${_ctx.currentKey || _ctx.oldKey}`, {
              item,
              index
            }, () => [
              renderSlot(_ctx.$slots, "item", {
                item,
                index
              }, () => [
                createTextVNode(toDisplayString(item.label || item.value), 1)
              ])
            ])
          ], 42, _hoisted_3);
        }), 128))
      ]),
      default: withCtx(() => [
        createElementVNode("div", {
          style: normalizeStyle(_ctx.caretPosition ? {
            height: `${_ctx.caretPosition.height}px`
          } : {})
        }, null, 4)
      ]),
      _: 3
    }, 16, ["shown", "theme", "style"])
  ], 2);
}
var Mentionable = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
function registerComponents(app, prefix) {
  app.component(`${prefix}mentionable`, Mentionable);
  app.component(`${prefix}Mentionable`, Mentionable);
}
function install(app, options2) {
  const finalOptions = Object.assign({}, {
    installComponents: true,
    componentsPrefix: ""
  }, options2);
  if (finalOptions.installComponents) {
    registerComponents(app, finalOptions.componentsPrefix);
  }
}
const plugin = {
  version: "2.0.0-alpha.4",
  install
};
export { Mentionable, plugin as default, install };
