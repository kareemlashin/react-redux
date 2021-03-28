import React, { PureComponent } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {withTranslation} from 'react-i18next'
import { connect } from 'react-redux'
import { updateName } from './../../core/action/action';

class Edit extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
    }
  }
  componentDidMount=()=> {
    this.setState({
      name:this.props.update.name
    })
  }
  
  
  print = (values) => {
    this.props.updateName(values,this.props.update.id);
  }
  render() {
    const validation = Yup.object({
      title: Yup.string()
        .min(5, this.props.t('minLength'))
        .max(25, this.props.t('maxLength'))
        .required(this.props.t('required')),
    })
    return (
      
      <div className="EditWrapper mb-5">
        <Formik
          initialValues={{
            title: this.props.update.title,
          }}
          onSubmit={this.print}
          validationSchema={validation}
        >
          <Form>
            <div>
              <Field type="text" placeholder={this.props.t('placeholder')} className="w-100 rounded " name="title" />
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

            <button className="rounded-pill btn btn-primary mt-2 px-5 py-1" type="submit">
              {this.props.t('Edit')}</button>
              </div>
          </Form>
        </Formik>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    update: state.reducers.update,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateName:(todo,id)=>{
      dispatch(updateName(todo,id))
    }
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Edit))