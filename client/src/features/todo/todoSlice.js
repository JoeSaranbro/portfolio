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
            //console.log('state:', JSON.stringify(state.todos, null, 2));
            // state.todos.push(action.payload)
            return {
                ...state, todos: [...state.todos, action.payload]
            }
        },
        addTodo: (state, action) => {
            
            return {
                ...state, todos: [...state.todos[0].todos, action.payload]
            }
            //state.todos[0].todos.push(action.payload)
        },
        updateTodo: (state, action) => {
            
            const findIndex = state.todos[0].todos.findIndex((obj) => obj.todo_id === action.payload.todo_id)
            //console.log("clg from todoslice",JSON.stringify(state.todos[0].todos[findIndex], null, 2))
            console.log("clg todo action.pay",action.payload)
            state.todos[0].todos[findIndex] = action.payload
            
        },
        removeTodo: (state, action) => {
            const findIndex = state.todos[0].todos.findIndex((obj) => obj.todo_id === action.payload)
            console.log("action.payload", action.payload)

            if (findIndex !== -1) {
                state.todos[0].todos.splice(findIndex , 1)
            }
            
            
        }
    }
})

export const { fetchTodo, addTodo, updateTodo, removeTodo  } = todoSlice.actions
export default todoSlice.reducer

