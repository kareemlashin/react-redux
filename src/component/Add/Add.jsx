import React, { PureComponent } from 'react'
//import { Test } from './Add.styles';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { createUser } from '../../core/action/action'
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Add extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      mas:0
    }
  }
  not=(news,msg)=>{
    if(news=='success'){
    NotificationManager.success(msg);
  }
    else if(news=='error'){
      NotificationManager.error(msg);}
    }
  
  print = (values) => {
    this.props.addTodo(values)
  }
  render() {
    
    const validation = Yup.object({
      name: Yup.string()
        .min(5, this.props.t('minLength'))
        .max(25, this.props.t('maxLength'))
        .required(this.props.t('required')),
    })
    return (
      <div className="AddWrapper mb-5">
        <Formik
          initialValues={{
            name: '',
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
                name="name"
              />
            </div>
            <div>
              <div>
                <ErrorMessage name="name" className="mt-2">
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
                <div class="spinner-border text-light" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              }
            </button>
            </div>
          </Form>
        </Formik>
        {this.props.message=='success'?this.not('success','success'):this.props.message=='error'?this.not('error','error'):''}

        <NotificationContainer/>

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
