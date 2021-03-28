import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTodo } from './../../core//action/action'
import { remove, oneToDo } from './../../core/action/action'
import i18next from 'i18next'
import { withTranslation } from 'react-i18next';

class List extends PureComponent {
  constructor(props) {
    super(props)
  }
  componentWillMount = () => {
    // Legacy
    this.props.allTodo()
  }

  remove = (id) => {
    this.props.remove(id)
  }
  single = (todo) => {
    this.props.singleTodo(todo)
  }
  render() {
    return (
      <div className="ListWrapper ">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              {this.props.toDos.map((item) => (
                <div key={'id-' + item.id}>
                  <div className="shadow rounded card__base p-3 mb-3 rounded position-relative">
                    <p className="py-2">{item.title}</p>
                    <div className="tool__bar">
                      <i
                        onClick={() => {
                          this.remove(item.id)
                        }}
                        className="far mx-2 fa-trash-alt delete "
                      ></i>
                      <Link to="/Edit">
                        <i
                          className="far mx-2 fa-edit edit"
                          onClick={() => this.single(item)}
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {(() => {
                if (this.props.toDos.length == 0) {
                  return <div>
                    <div className="w-100  rounded shadow p-5 card__base no-data text-center">
                    <i className="far fa-folder-open"></i>
                    <div>
                    {
                    this.props.t('NoData')

                    }

                    </div>
                    </div>

                  </div>
                }
              })()}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    toDos: state.reducers.toDo,
    update: state.reducers.update,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    allTodo: () => {
      dispatch(getTodo())
    },
    remove: (id) => {
      dispatch(remove(id))
    },
    singleTodo: (todo) => {
      dispatch(oneToDo(todo))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps
)(withTranslation()(List))
