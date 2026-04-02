const camelize = (str) => str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
const snakelize = (str) => str.replace(/([A-Z])/g, (c) => `_${c.toLowerCase()}`)

function transformKeys(obj, transform) {
	if (Array.isArray(obj)) return obj.map(v => transformKeys(v, transform))
	if (obj !== null && typeof obj === 'object') {
		return Object.fromEntries(
			Object.entries(obj).map(([k, v]) => [transform(k), transformKeys(v, transform)])
		)
	}
	return obj
}

export const camelizeKeys  = (obj) => transformKeys(obj, camelize)
export const snakelizeKeys = (obj) => transformKeys(obj, snakelize)
