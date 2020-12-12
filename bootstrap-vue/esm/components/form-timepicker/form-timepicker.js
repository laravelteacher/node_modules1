function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from '../../vue';
import { NAME_FORM_TIMEPICKER } from '../../constants/components';
import { BVFormBtnLabelControl, props as BVFormBtnLabelControlProps } from '../../utils/bv-form-btn-label-control';
import { makePropsConfigurable } from '../../utils/config';
import { attemptBlur, attemptFocus } from '../../utils/dom';
import { isUndefinedOrNull } from '../../utils/inspect';
import { omit } from '../../utils/object';
import { pluckProps } from '../../utils/props';
import idMixin from '../../mixins/id';
import { BButton } from '../button/button';
import { BTime, props as BTimeProps } from '../time/time';
import { BIconClock, BIconClockFill } from '../../icons/icons'; // --- Main component ---
// @vue/component

export var BFormTimepicker = /*#__PURE__*/Vue.extend({
  name: NAME_FORM_TIMEPICKER,
  // The mixins order determines the order of appearance in the props reference section
  mixins: [idMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: makePropsConfigurable(_objectSpread(_objectSpread(_objectSpread({}, BTimeProps), omit(BVFormBtnLabelControlProps, ['id', 'value', 'formattedValue', 'rtl', 'lang'])), {}, {
    resetValue: {
      type: String,
      default: ''
    },
    buttonOnly: {
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Applicable in button only mode
      type: String,
      default: 'secondary'
    },
    nowButton: {
      type: Boolean,
      default: false
    },
    labelNowButton: {
      type: String,
      default: 'Select now'
    },
    nowButtonVariant: {
      type: String,
      default: 'outline-primary'
    },
    resetButton: {
      type: Boolean,
      default: false
    },
    labelResetButton: {
      type: String,
      default: 'Reset'
    },
    resetButtonVariant: {
      type: String,
      default: 'outline-danger'
    },
    noCloseButton: {
      type: Boolean,
      default: false
    },
    labelCloseButton: {
      type: String,
      default: 'Close'
    },
    closeButtonVariant: {
      type: String,
      default: 'outline-secondary'
    }
  }), NAME_FORM_TIMEPICKER),
  data: function data() {
    return {
      // We always use `HH:mm:ss` value internally
      localHMS: this.value || '',
      // Context data from BTime
      localLocale: null,
      isRTL: false,
      formattedValue: '',
      // If the menu is opened
      isVisible: false
    };
  },
  computed: {
    computedLang: function computedLang() {
      return (this.localLocale || '').replace(/-u-.*$/i, '') || null;
    }
  },
  watch: {
    value: function value(newVal) {
      this.localHMS = newVal || '';
    },
    localHMS: function localHMS(newVal) {
      // We only update the v-model value when the timepicker
      // is open, to prevent cursor jumps when bound to a
      // text input in button only mode
      if (this.isVisible) {
        this.$emit('input', newVal || '');
      }
    }
  },
  methods: {
    // Public methods
    focus: function focus() {
      if (!this.disabled) {
        attemptFocus(this.$refs.control);
      }
    },
    blur: function blur() {
      if (!this.disabled) {
        attemptBlur(this.$refs.control);
      }
    },
    // Private methods
    setAndClose: function setAndClose(value) {
      var _this = this;

      this.localHMS = value;
      this.$nextTick(function () {
        _this.$refs.control.hide(true);
      });
    },
    onInput: function onInput(hms) {
      if (this.localHMS !== hms) {
        this.localHMS = hms;
      }
    },
    onContext: function onContext(ctx) {
      var isRTL = ctx.isRTL,
          locale = ctx.locale,
          value = ctx.value,
          formatted = ctx.formatted;
      this.isRTL = isRTL;
      this.localLocale = locale;
      this.formattedValue = formatted;
      this.localHMS = value || ''; // Re-emit the context event

      this.$emit('context', ctx);
    },
    onNowButton: function onNowButton() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = this.showSeconds ? now.getSeconds() : 0;
      var value = [hours, minutes, seconds].map(function (v) {
        return "00".concat(v || '').slice(-2);
      }).join(':');
      this.setAndClose(value);
    },
    onResetButton: function onResetButton() {
      this.setAndClose(this.resetValue);
    },
    onCloseButton: function onCloseButton() {
      this.$refs.control.hide(true);
    },
    onShow: function onShow() {
      this.isVisible = true;
    },
    onShown: function onShown() {
      var _this2 = this;

      this.$nextTick(function () {
        attemptFocus(_this2.$refs.time);

        _this2.$emit('shown');
      });
    },
    onHidden: function onHidden() {
      this.isVisible = false;
      this.$emit('hidden');
    },
    // Render function helpers
    defaultButtonFn: function defaultButtonFn(_ref) {
      var isHovered = _ref.isHovered,
          hasFocus = _ref.hasFocus;
      return this.$createElement(isHovered || hasFocus ? BIconClockFill : BIconClock, {
        attrs: {
          'aria-hidden': 'true'
        }
      });
    }
  },
  render: function render(h) {
    var localHMS = this.localHMS,
        disabled = this.disabled,
        readonly = this.readonly,
        $props = this.$props;
    var placeholder = isUndefinedOrNull(this.placeholder) ? this.labelNoTimeSelected : this.placeholder; // Footer buttons

    var $footer = [];

    if (this.nowButton) {
      var label = this.labelNowButton;
      $footer.push(h(BButton, {
        key: 'now-btn',
        props: {
          size: 'sm',
          disabled: disabled || readonly,
          variant: this.nowButtonVariant
        },
        attrs: {
          'aria-label': label || null
        },
        on: {
          click: this.onNowButton
        }
      }, label));
    }

    if (this.resetButton) {
      if ($footer.length > 0) {
        // Add a "spacer" between buttons ('&nbsp;')
        $footer.push(h('span', "\xA0"));
      }

      var _label = this.labelResetButton;
      $footer.push(h(BButton, {
        key: 'reset-btn',
        props: {
          size: 'sm',
          disabled: disabled || readonly,
          variant: this.resetButtonVariant
        },
        attrs: {
          'aria-label': _label || null
        },
        on: {
          click: this.onResetButton
        }
      }, _label));
    }

    if (!this.noCloseButton) {
      if ($footer.length > 0) {
        // Add a "spacer" between buttons ('&nbsp;')
        $footer.push(h('span', "\xA0"));
      }

      var _label2 = this.labelCloseButton;
      $footer.push(h(BButton, {
        key: 'close-btn',
        props: {
          size: 'sm',
          disabled: disabled,
          variant: this.closeButtonVariant
        },
        attrs: {
          'aria-label': _label2 || null
        },
        on: {
          click: this.onCloseButton
        }
      }, _label2));
    }

    if ($footer.length > 0) {
      $footer = [h('div', {
        staticClass: 'b-form-date-controls d-flex flex-wrap',
        class: {
          'justify-content-between': $footer.length > 1,
          'justify-content-end': $footer.length < 2
        }
      }, $footer)];
    }

    var $time = h(BTime, {
      ref: 'time',
      staticClass: 'b-form-time-control',
      props: _objectSpread(_objectSpread({}, pluckProps(BTimeProps, $props)), {}, {
        value: localHMS,
        hidden: !this.isVisible
      }),
      on: {
        input: this.onInput,
        context: this.onContext
      }
    }, $footer);
    return h(BVFormBtnLabelControl, {
      ref: 'control',
      staticClass: 'b-form-timepicker',
      props: _objectSpread(_objectSpread({}, pluckProps(BVFormBtnLabelControlProps, $props)), {}, {
        id: this.safeId(),
        value: localHMS,
        formattedValue: localHMS ? this.formattedValue : '',
        placeholder: placeholder,
        rtl: this.isRTL,
        lang: this.computedLang
      }),
      on: {
        show: this.onShow,
        shown: this.onShown,
        hidden: this.onHidden
      },
      scopedSlots: {
        'button-content': this.$scopedSlots['button-content'] || this.defaultButtonFn
      }
    }, [$time]);
  }
});