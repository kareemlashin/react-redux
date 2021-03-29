import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Loading extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="LoadingWrapper">
        {this.props.loadingPage ? (
          <div>
            <div id="loading-wrapper">
              <div id="loading-text">LOADING </div>
              <div id="loading-content"></div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loadingPage: state.reducers.loadingPage,
  
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Loading)
