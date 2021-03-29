import './assets/styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Home from './layout/Home/Home'
import Edit from './component/Edit/Edit'
import Add from './component/Add/Add'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import './i18n'
import { Suspense } from 'react'
import {Provider} from 'react-redux'
import store from './core/store/store.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
    <Suspense fallback={<></>}>

    <div >
    <ToastContainer />

      <Router>
        <Route path={['/Add', '/Edit',"/","*"]}>
          <Switch>
            <Route exact path="/" component={Home} />

            <Home>
              <Switch>
                <Route exact path="/Add" component={Add} />
                <Route path="/Edit" component={Edit} />
                <Redirect path="*" to="/" />

              </Switch>
            </Home>
            <Redirect path="*" to="/" />

          </Switch>
        </Route>
      </Router>
    </div>
    </Suspense>
    </Provider>

  )
}

export default App
