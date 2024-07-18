import React from "react"

export function lazyImport(factory, name) {
  return Object.create({
    [name]: React.lazy(() =>
      factory().then((module) => ({ default: module[name] }))
    ),
  })
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}
