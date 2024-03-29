import packageJson from './package.json'

import FieldCombo from './component/field-combo/index.js'
import FieldComboAsync from './component/field-combo-async/index.js'
import FieldDate from './component/field-date/index.js'
import FieldDropdown from './component/field-dropdown/index.js'
import FieldNumber from './component/field-number/index.js'
import FieldNumberSpin from './component/field-number-spin/index.js'
import FieldTag from './component/field-tag/index.js'
import FieldText from './component/field-text/index.js'
import StackDraggable from './component/stack-draggable/index.js'

import * as entity from './composable/entity/index.js'
import * as fetchGet from './composable/fetch-get.js'
import * as optionsLoader from './composable/options-loader.js'
import * as url from './composable/url.js'
import * as validations from './composable/validations.js'
import * as odata from './utils/odata.js'
import * as object from './utils/object.js'

export const component = {
  FieldCombo,
  FieldComboAsync,
  FieldDate,
  FieldDropdown,
  FieldNumber,
  FieldNumberSpin,
  FieldTag,
  FieldText,
  StackDraggable
}

export function install (app, { prefix = 'llesca' } = {}) {
  for (const name in component) {
    const kebabName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    app.component('llesca-' + kebabName, component[name])
  }
}

export * from './composable/entity/index.js'
export * from './composable/fetch-get.js'
export * from './composable/options-loader.js'
export * from './composable/url.js'
export * from './composable/validations.js'

export * as odata from './utils/odata.js'
export * as object from './utils/object.js'

export default {
  install,
  Llesca: component,
  version: packageJson.version,
  ...entity,
  ...fetchGet,
  ...optionsLoader,
  ...url,
  ...validations,
  odata,
  object
}
