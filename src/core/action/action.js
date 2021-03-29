import axios from 'axios'
import {  toast } from 'react-toastify';
import i18next from 'i18next'

const Types = {
    get: '',
    create: 'CREATE_DATA',
    remove: 'REMOVE_DATA',
    one: 'SINGLE_DATA',
    upd: 'UPDATE_DATA',
    spinner:'spinner',
    message:'message',
    loadingPage:'loadingPage'
}
export const getTodo = () => {

    return (dispatch) => {
        
        axios.get("https://5ea6f79384f6290016ba78c2.mockapi.io/api/todo").then(res => {
            dispatch({
                type: 'GET_DATA',
                toDo:res.data
            })
            dispatch({
                type: 'spinner',
                spinner:false
            })
            dispatch({
                type: 'loadingPage',
                loadingPage:false
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: 'loadingPage',
                loadingPage:false
            })
        })
    }
}

export const createUser = (data) => {
    return (dispatch) => {
        dispatch({
            type:Types.spinner,
            spinner:true
        });
        var message='';
        axios.post("https://5ea6f79384f6290016ba78c2.mockapi.io/api/todo", data).then(res => {
            const users = res.data;
            dispatch({
                type: Types.create,
                toDo: users
            });
            dispatch({
                type:Types.spinner,
                spinner:false
            });
            
            toast.success(i18next.t('messageSuccess'))
            dispatch({
                type:Types.message,
                message:'',

            });
            
        }).catch(err => {
            let errors=err;
            dispatch({
                type:Types.spinner,
                spinner:false
            });
            toast.error(i18next.t('messageError'))

            
            
        })
        
    }
}
export const remove = (id) => {
    return (dispatch) => {
        axios.delete(`https://5ea6f79384f6290016ba78c2.mockapi.io/api/todo/${id}`).then(res => {
            dispatch({
                type: Types.remove,
                users: id
            })
            toast.success(i18next.t('messageSuccess'))

        }).catch(err => {
            console.log(err);
            toast.error(i18next.t('messageError'))

        })

    }
}

export const oneToDo = (todo) => {
    return (dispatch) => {
        dispatch({
            type: Types.one,
            update: todo
        })
    }
}
export const updateName = (data, id) => {
    return (dispatch) => {
        axios.put(`https://5ea6f79384f6290016ba78c2.mockapi.io/api/todo/${id}`, data).then(res => {
            const news = res.data;
            dispatch({
                type: Types.upd,
                users: id,
                news: news
            })
            toast.success(i18next.t('messageSuccess'))

        }).catch(err => {
            console.log(err);
            toast.error(i18next.t('messageError'))

        })

    }
}