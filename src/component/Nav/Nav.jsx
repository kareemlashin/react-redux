import React, { PureComponent } from 'react';
import i18next from 'i18next'
import {withTranslation} from 'react-i18next'

class Nav extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hNav: 0,
      checked: false,
      mode:'dark',
      dir:'ltr'

    };
  }

  changeMode = (e) => {
    let checked = e.target.checked

    if (checked) {
      this.setState({
        ...this.state,
        mode: 'dark',
        checked: true,
    })
        this.props.mode('dark')

        localStorage.setItem('mode', 'dark')
    } else {
      this.setState({
        ...this.state,
        mode: 'light',
        checked: false,
    })
        this.props.mode('light')
        localStorage.setItem('mode', 'light')
    }
}
  componentDidMount = () => {

    let nav = document.querySelector('nav')
    let height = nav.clientHeight;
    let modeStorage = localStorage.getItem('mode')||'light';
    let direction = localStorage.getItem('dir') || 'ltr';
    if(direction=='rtl'){
        this.props.i18n.changeLanguage('ar');
    }else{
        this.props.i18n.changeLanguage('en');
    }

    let checked = false;
    if (modeStorage == 'dark') {
        checked = true;
    }
    this.setState({
        ...this.state,
        hNav: height,
        mode: modeStorage,
        checked: checked,
        dir:direction
    })
  }


  render () {
    
    const {t, i18n} = this.props
    const change = (lang) => {
        if (lang == 'ar') {
            localStorage.setItem('dir', 'rtl')

            this.setState({
                ...this.state,
                dir: 'rtl'
            })
            this.props.dir('rtl')

        } else if (lang == 'en') {
            localStorage.setItem('dir', 'ltr')

            this.setState({
                ...this.state,
                dir: 'ltr'
            })
            this.props.dir('ltr')

        } else {
            localStorage.setItem('dir', 'ltr')

            this.setState({
                ...this.state,
                dir: 'ltr'
            })
            this.props.dir('ltr')

        }
        i18n.changeLanguage(lang)
        document.title = i18next.t('home');
    }
    return (
      <div className="NavWrapper">
                <nav className=" d-flex py-3 align-items-center shadow fixed-top ">
                    <div className="brand mx-2 font-weight-bold font-s-25">
                         {
                        t('title')
                    } </div>
                    <div></div>

                    <div className={
                        ('position-relative d-flex ', this.state.dir == 'ltr' ? 'ml-auto' : 'mr-auto')
                    }>
                        <div className="d-inline-block">
                            <div> {
                                i18n.language === 'en' ? <button className="lang-btn rounded-pill "
                                    onClick={
                                        () => change('ar')
                                }>العربيه</button> : <button className="lang-btn rounded-pill "
                                    onClick={
                                        () => change('en')
                                }>English</button>
                            } </div>
                        </div>

                        <div className="d-inline-block h-100">
                            <div className="d-flex justify-content-center align-items-center">

                                <label className="switch ">
                                    <input type="checkbox"
                                        onChange={
                                            (e) => {
                                                this.changeMode(e)
                                            }
                                        }
                                        checked={
                                            this.state.checked
                                        }
                                        className="switch__state"/>
                                    <span className="switch__toggle"></span>
                                </label>
                            </div>
                        </div>

                    </div>
                </nav>

                <div style={
                    {marginBottom: this.state.hNav}
                }></div>

      </div>
    );
  }
}


export default withTranslation()(Nav)
