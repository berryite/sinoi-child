const rules = {}

export const get = (type, uid, route, router, field) => {
  const params = route.query
  for (const i in params) {
    if (`${type}.${uid}` === i) {
      return field ? rules[type].parse(params[i])[field] : rules[type].parse(params[i])
    }
  }
  return null
}
export const clear = (type, uid, route, router) => {
  const query = JSON.parse(JSON.stringify(route.query))
  delete query[`${type}.${uid}`]
  if (JSON.stringify(query) !== JSON.stringify(route.query) || '{}' === JSON.stringify(route.query)) {
    router.replace({
      query
    })
  }
}

export const set = (type, uid, route, router, params) => {
  const newQuery = { [`${type}.${uid}`]: rules[type].componentization(params) }
  return new Promise(resolve => {

    if (Object.keys(newQuery).every(v => route.query[v] === newQuery[v])) {
      resolve(params)
    } else {
      router.replace({
        query: {
          ...route.query,
          ...newQuery
        }
      }, resolve(params))
    }
  })
}



export const addRule = (type, rule) => {
  rules[type] = rule
}

export default class {
  constructor(type, uid, route, router) {
    this.type = type
    this.uid = uid
    this.route = route
    this.router = router
  }
  get(field) {
    return get(this.type, this.uid, this.route, this.router, field)
  }
  set(params) {
    return set(this.type, this.uid, this.route, this.router, params)
  }
  clear() {
    return clear(this.type, this.uid, this.route, this.router,)
  }
}
