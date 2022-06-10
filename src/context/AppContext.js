import {createContext, useEffect, useReducer, useState} from 'react';
import useBooks from '../hooks/useBooks';
import { bookActionReducer, listActions } from '../reducers/bookActionReducer';
import {sortAlpha} from '../helpers'

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    // Context for USER
    const getUserFromLS = () => {
        let user = localStorage.getItem('user')
        if (user){
            return JSON.parse(user)
        }
    }

    const [user, _setUser] = useState(getUserFromLS())

    const setUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        _setUser(user)
    }

    // Context for BOOKS
    let {error, books} = useBooks()
    books = books?.sort(sortAlpha)
    const bookSubs = new Set(books?.map(book => book.subject))

    // Context for READING LIST
    const getListFromLS = () => {
        let readingList = localStorage.getItem('readingList')
        if (readingList){
            return JSON.parse(readingList)
        }
    }

    const [readingList, dispatch] = useReducer(bookActionReducer, getListFromLS()??[])

    useEffect(
        () => {
            localStorage.setItem('readingList', JSON.stringify(readingList))
        },
        [readingList]
    )

    // Values AppContext is providing
    const values = {
        user, 
        setUser, 
        books,
        bookSubs, 
        error, 
        readingList,
        addToList: (book)=>{
            dispatch({type: listActions.addToList, book})
        },
        addMultipleToList: (book)=>{
            dispatch({type: listActions.addMultipleToList, book})
        },
        removeOneFromList: (book)=>{
            dispatch({type: listActions.removeOneFromList, book})
        },
        removeBookFromList: (book)=>{
            dispatch({type: listActions.removeBookFromList, book})
        },
        emptyList: ()=>{
            dispatch({type: listActions.emptyList})
        }
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider