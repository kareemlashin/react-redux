import React, { PureComponent } from 'react'
import List from './../../component/List/List'
import i18next from 'i18next'
import { withTranslation } from 'react-i18next'
import Nav from '../../component/Nav/Nav'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTodo } from '../../core/action/action'
import Loading from '../../component/Loading'

class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      mode: 'light',
      dir: 'ltr',
    }
  }
  addPage() {
    this.props.history.push('/Add')
  }
  componentDidMount = () => {
    document.title = i18next.t('home')
    this.props.allTodo()
    let modeStorage = localStorage.getItem('mode') || 'light'
    let direction = localStorage.getItem('dir') || 'ltr'

    this.setState({
      ...this.state,
      mode: modeStorage,
      dir: direction,
    })
  }

  directionPage = (dir) => {
    this.setState({
      ...this.state,
      dir: dir,
    })
  }
  modePage = (mode) => {
    let checked = false
    if (mode == 'dark') {
      checked = true
    }
    this.setState({
      ...this.state,
      mode: mode,
      checked: checked,
    })
  }

  render() {
    const { t, i18n } = this.props

    return (
      <div dir={this.state.dir} className={('IndexWrapper', this.state.mode)}>
          <Loading></Loading>
        <Nav dir={this.directionPage} mode={this.modePage}></Nav>
        <div className="container">
          <div className="row py-5">
            <div className="col-md-6">
              <div className=" ">
                {this.props.children}
                <div className="text-center">
                  <button className="px-5 py-2 btn btn-warning  rounded-pill">
                    <Link to="/Add" className="d-block h-100 w-100">
                      {t('AddPage')}
                      <i className="fas mx-2 fa-plus"></i>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 ">
              <List></List>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    allTodo: () => {
      dispatch(getTodo())
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Home))
