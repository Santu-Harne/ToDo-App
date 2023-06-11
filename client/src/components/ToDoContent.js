import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const initial = {
    task: ''
}

const ToDoContent = () => {
    const [todo, setTodo] = useState(initial)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [allTasks, setAllTasks] = useState([])

    setInterval(() => {
        setDate(new Date().toLocaleDateString())
        setTime(new Date().toLocaleString("en-us", {
            hour: "2-digit", minute: "2-digit", second: "numeric", hour12: true
        }))
    }, 1000);

    const changeHandler = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setTodo({ ...todo, [name]: value })
    }
    const clearHandler = () => {
        if (window.confirm('Are you sure to clear..?'))
            setTodo(initial)
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/todo/addTask', todo)
                .then(res => {
                    // console.log(res.data.data);
                    setTodo(initial)
                    toast.success(res.data.msg)
                }).catch(err => console.log(err.response.data.msg))

        } catch (error) {
            // console.log(error.message);
        }

    }

    const iniFetch = async () => {
        await axios.get('/todo/getAll')
            .then(res => {
                // console.log(res.data.data);
                setAllTasks(res.data.data)
            }).catch(err => console.log(err.response.data.msg))
    }
    const completeHandler = async (id, task) => {
        if (window.confirm('Have you completed the task..?')) {
            await axios.patch(`/todo/completedTask/${id}`)
                .then(res => {
                    toast.success(res.data.msg)
                    // console.log(res.data.data);
                }).catch(err => console.log(err.response.data.msg))
        }
    }
    const deleteHandler = async (id) => {
        if (window.confirm('Are your sure to delete..?')) {
            await axios.delete(`/todo/deleteTask/${id}`)
                .then(res => {
                    toast.success(res.data.msg)
                }).catch(err => console.log(err.response.data.msg))
        }
    }

    useEffect(() => {
        iniFetch()
    }, [allTasks])

    return (
        <div className='container'>
            <h1 className='text-light display-3 fw-semibold mt-5 text-center'>Just Do It..!</h1>
            <div className="row my-5">
                <div className="col-md-6 offset-md-3 text-center">
                    <form onSubmit={submitHandler} autoComplete='off'>
                        <div className="inp-group">
                            <input type="text" placeholder='Add a task...' name="task" id="task" className='' value={todo.task} onChange={changeHandler} />
                            <i className="bi bi-x-lg clear-icon" type='button' onClick={clearHandler}></i>
                            <input type="submit" value={'I Got This!'} className=' submit-button' />
                        </div>
                    </form>
                    <h5 className='mt-3 text-light'>{date} , {time}</h5>
                </div>
            </div>
            <div className="row">
                {
                    allTasks && allTasks.map((item, index) => {
                        return (
                            <div className='col-md-6 mb-3 ' key={index}>
                                <div className=" task-item">
                                    <div className='' style={{ textDecoration: item.completed === 'yes' ? "line-through" : 'none', textDecorationThickness: "2px", }}>{item.task}</div>
                                    <div className="update-task">
                                        <i className="bi bi-check-circle-fill" type='button' onClick={() => completeHandler(item._id, item.task)}> <span className='completed-popup'>Completed..?</span> </i>
                                        <i className="bi bi-trash-fill" type='button' onClick={() => deleteHandler(item._id)}><span className='delete-popup'>Delete..?</span></i>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div >
    )
}

export default ToDoContent