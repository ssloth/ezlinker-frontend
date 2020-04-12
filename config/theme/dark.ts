export default {
  '@light': '#ffffff',
  '@dark': '#101425',
  '@white': '@light',

  '@dark-0': '#2b2c3c',
  '@dark-0+': '#2b2c3c',
  '@dark-1': '#313244',
  '@dark-1+': '#313244',
  '@dark-2': '#36374B',
  '@dark-2+': '#36374B',
  '@dark-3': '#515266',
  '@dark-3+': '#515266',
  '@dark-4': '#333344',
  '@dark-4+': '#333344',
  '@dark-5': '#585769',
  '@dark-5+': '#585769',

  '@light-0': '#cccccc',
  '@light-0+': '#ffffff',
  '@light-1': '#797f8f',
  '@light-1+': '#797f8f',
  '@light-2': '#607080',
  '@light-2+': '#607080',

  '@green': '#01cea2',
  '@orange': '#f0684b',
  '@red': '#EA3465',

  '@item-hover-bg': '@dark-2',

  // body
  '@body-background': '@dark-3',
  '@layout-body-background': '@body-background',
  '@component-background': '@dark-1',
  '@component-background-light': '@dark-0',
  '@background-color-light': '@dark-2',

  '@text-color': 'fade(@light, 65%)',
  '@text-color-secondary': 'fade(@light, 45%)',
  '@text-color-inverse': '@dark',
  '@icon-color': 'inherit',
  '@icon-color-hover': 'fade(@light, 75%)',
  '@heading-color': 'fade(@light, 85%)',
  '@heading-color-dark': 'fade(@light, 100%)',
  '@text-color-dark': 'fade(@dark, 85%)',
  '@text-color-secondary-dark': 'fade(@dark, 65%)',

  '@border-color-base': 'fade(@light-2, 75%)', // base border outline a component
  '@border-color-split': 'fade(@dark, 25%)', // split border inside a component
  '@border-color-inverse': '@dark',
  '@border-width-base': '1px', // width of the border for a component
  '@border-style-base': 'solid', // style of a components border

  /// === button === ///
  '@btn-default-ghost-border': 'fade(@light, 75%)',

  /// === table === ///
  '@table-bg': '@component-background',
  '@table-header-bg': '@component-background-light',
  '@table-header-color': '@heading-color',
  '@table-body-sort-bg': '@dark-1',
  '@table-row-hover-bg': '@dark-2',
  '@table-selected-row-color': 'inherit',
  '@table-expanded-row-bg': '@dark-1',
  '@table-padding-vertical': '16px',
  '@table-padding-horizontal': '16px',
  '@table-footer-bg': '@background-color-light',
  '@table-footer-color': '@heading-color',
  '@table-header-bg-sm': '@table-header-bg',
  // '@table-header-sort-bg': '@background-color-base',
  // '@table-selected-row-bg': '@primary-1',
  // '@table-body-selected-sort-bg': '@table-selected-row-bg',
  // '@table-selected-row-hover-bg': '@table-selected-row-bg',

  /// === input === ///
  '@input-border-color': '@light-1',
  '@input-bg': '@component-background',
  '@input-placeholder-color': '@light-1',

  /// === select === ///
  '@select-border-color': '@light-1',
  '@select-item-selected-bg': '@dark-2+',
  '@select-item-active-bg': '@dark-2+',
  '@select-selection-item-bg': '@dark-2+',

  /// === form === ///
  '@label-color': '@light-1',
  '@form-warning-input-bg': '@input-bg',
  '@form-error-input-bg': '@input-bg',
};
