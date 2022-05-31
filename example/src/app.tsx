import loadable from '@loadable/component'

const AsyncComponent = loadable(() => import('./async-component'))

export const App = () => {
  return (
    <div>
      <h1>App root</h1>
      <h2>AsyncComponent below here:</h2>
      <AsyncComponent />
    </div>
  )
}
