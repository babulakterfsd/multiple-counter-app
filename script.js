//initial state
const initialState = [
    {
        id: 1,
        value: 0,
        incrementBy: 1,
        decrementBy: 1
    }
]

//action identifiers
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const ADD_COUNTER = 'addCounter'
const RESET_COUNTER = 'resetCounter'

//action creators
const addCounter = () => {
    return {
        type: ADD_COUNTER
    }
}
const resetCounter = () => {
    return {
        type: RESET_COUNTER
    }
}
const increment = (counterID, value) => {
    return {
        type: INCREMENT,
        payload: {
            counterID,
            value
        }
    }
}
const decrement = (counterID, value) => {
    return {
        type: DECREMENT,
        payload: {
            counterID,
            value
        }
    }
}

//helpper functions
const nextCounterID = (counters) => {
   const maxID = counters.reduce((maxID, counter) => {
         return Math.max(counter.id, maxID)
   }, -1)
   return maxID + 1
}

const incrementHandler = (id, incrementBy) => {
   store.dispatch(increment(id, incrementBy))
}

const decrementHandler = (id, decrementBy) => {
    store.dispatch(decrement(id, decrementBy))
}

//reducer
const counterReducer = (state = initialState, action) => {
    if(action.type === ADD_COUNTER){
        return [...state, {
            id: nextCounterID(state),
            value: 0,
            incrementBy: Math.floor(Math.random() * 10) + 1,
            decrementBy: Math.floor(Math.random() * 10) + 1
        }]
    }
    if(action.type === RESET_COUNTER){
        return state.map(counter => {
            return {
                ...counter,
                value: 0
            }
        })
    }
    if(action.type === INCREMENT){
        const {counterID, value} = action.payload

        return state.map(counter => {
            if(counter.id === counterID){
                return {
                    ...counter,
                    value: counter.value + value
                }
            }
            return {...counter}
        })
    }
    if(action.type === DECREMENT){
        const {counterID, value} = action.payload

        return state.map(counter => {
            if(counter.id === counterID){
                return {
                    ...counter,
                    value: counter.value - value
                }
            }
            return {...counter}
        })
    }
    return state
}  

//store
const store = Redux.createStore(counterReducer)


//dom elements
const countersContainer = document.getElementById('counters-container')
const addCounterBtn = document.getElementById('add-counter')
const resetCounterBtn = document.getElementById('reset-counter')

//render
const render = () => {
    const state = store.getState()
    let countersMarkup = ''
    
    state.forEach((counter) => {
        countersMarkup += `
        <div class="counter flex justify-center items-center flex-col bg-white px-3 py-6 rounded-md shadow-md w-72 lg:w-96 mb-6 mx-3">
            <h1 class="text-xl font-bold text-slate-400 mb-3">${counter.value}</h1>
            <div class="button-container flex w-full justify-around">
                <div>
                <button class="increment bg-indigo-400 text-white p-2 rounded-md" onclick="incrementHandler(${counter.id}, ${counter.incrementBy})">Increment by ${counter.incrementBy}</button>
                </div>
                <div>
                <button class="decrement bg-red-400 text-white p-2 rounded-md" onclick="decrementHandler(${counter.id}, ${counter.decrementBy})">Decrement by ${counter.decrementBy}</button>
                </div>
            </div>
        </div>
        `
    })
    countersContainer.innerHTML = countersMarkup
}

//update ui initially
render()

//subscribe to store
store.subscribe(render)

//event listeners
addCounterBtn.addEventListener('click', () => {
    store.dispatch(addCounter())
})
resetCounterBtn.addEventListener('click', () => {
    store.dispatch(resetCounter())
})