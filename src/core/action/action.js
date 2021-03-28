import axios from 'axios'

const Types = {
    get: '',
    create: 'CREATE_DATA',
    remove: 'REMOVE_DATA',
    one: 'SINGLE_DATA',
    upd: 'UPDATE_DATA',
    spinner:'spinner',
    message:'message'
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
        }).catch(err => {
            console.log(err)
            dispatch({
                type: 'spinner',
                spinner:false
            })
        })
    }
}

export const createUser = (data) => {
    return (dispatch) => {
        
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
            message='success';
            dispatch({
                type:Types.message,
                message:message,

            });
            dispatch({
                type:Types.message,
                message:''
            });
            
        }).catch(err => {
            let errors=err;
            dispatch({
                type:Types.spinner,
                spinner:false
            });
            message='error';
            dispatch({
                type:Types.message,
                message:message
            });
            
            dispatch({
                type:Types.message,
                message:''
            });
            
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

        }).catch(err => {
            console.log(err)
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

        }).catch(err => {
            console.log(err)
        })

    }
}