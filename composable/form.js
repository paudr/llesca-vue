import { ref, reactive, computed, unref, isRef } from 'vue'

export function useForm () {
  const fields = reactive(new Map())

  const formValues = computed(() => Object.fromEntries(
    [...fields.entries()].map(([name, { value }]) =>
      [name, unref(value)]
    )
  ))

  function createField (name, value, { rules, skip } = {}) {
    const errorMessage = ref(null)

    async function validate () {
      errorMessage.value = null
      const rulesUnref = unref(rules)
      if (rulesUnref && !unref(skip)) {
        for (const rule of rulesUnref) {
          const maybePromise = rule(unref(value), unref(formValues))
          const result = maybePromise instanceof Promise
            ? await maybePromise
            : maybePromise
          if (result && typeof result === 'string') {
            errorMessage.value = result
            return false
          }
        }
      }
      return true
    }

    function destroy () {
      fields.delete(name)
    }

    fields.set(name, { value, validate })

    return {
      errorMessage: isRef(skip)
        ? computed(() => skip.value ? null : unref(errorMessage))
        : errorMessage,
      destroy,
      validate
    }
  }

  async function validate () {
    let isValid = true
    for (const { validate } of fields.values()) {
      isValid = await validate() && isValid
    }
    return isValid
  }

  return {
    fields: computed(() => [...fields.keys()]),
    values: formValues,
    createField,
    validate
  }
}
