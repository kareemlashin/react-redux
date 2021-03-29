import React, { PureComponent } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { createUser } from '../../core/action/action'

class Add extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
    }
  }
  
  print = (values) => {
    this.props.addTodo(values);
  }
  render() {
    
    const validation = Yup.object({
      title: Yup.string()
        .min(5, this.props.t('minLength'))
        .max(25, this.props.t('maxLength'))
        .required(this.props.t('required')),
    })

    return (
      
      <div className="AddWrapper mb-5">
        <Formik
          initialValues={{
            title: '',
          }}
          onSubmit={this.print}
          validationSchema={validation}
        >
          <Form>
            <div>
              <div>
              <label >{this.props.t('Name')}:</label>

              </div>
              <Field
                type="text"
                placeholder={this.props.t('placeholder')}
                className="w-100 rounded "
                name="title"
              />
            </div>
            <div>
              <div>
                <ErrorMessage name="title" className="mt-2">
                  {(msg) => (
                    <div className="alert alert-danger mt-2" role="alert">
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>
            </div>
            <div className="text-center">

            <button
              className="rounded-pill btn btn-primary mt-2 px-5 py-1"
              type="submit"
            >
              {
                !this.props.spinner?this.props.t('Add'):
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              }
            </button>
            </div>
          </Form>
        </Formik>


      </div>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    spinner:state.reducers.spinner,
    message:state.reducers.message,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (values) => {
      dispatch(createUser(values))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Add))
