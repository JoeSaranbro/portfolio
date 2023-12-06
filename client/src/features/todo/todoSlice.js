import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    todos: [],
}
//ทำต่อ หาทางแยก fetchTodo ( data from fetch => {username: "test", data:[{todo_id: 1, title: 'test', details: 'test message', date_start: null, date_end: null, user_id: 1 }]} )
// กับ addTodo 
//fetch todo ได้แล้ว
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        fetchTodo: (state, action) => {
            //console.log('state:', JSON.stringify(state, null, 2));
            //console.log("action",action)
            //console.log("state", state)
            state.todos.push(action.payload)
        },
        addTodo: (state, action) => {
            //bug redux addกับupdate
            state.todos[0].todos.push(action.payload)
        },
        updateTodo: (state, action) => {
            
            const findIndex = state.todos[0].todos.findIndex((obj) => obj.todo_id === action.payload.todo_id)
            console.log(JSON.stringify(state.todos[0].todos[findIndex], null, 2))
            
            state.todos[0].todos[findIndex] = action.payload
            
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        }
    }
})

export const { fetchTodo, addTodo, updateTodo, removeTodo  } = todoSlice.actions
export default todoSlice.reducer

