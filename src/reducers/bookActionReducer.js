// ##############################################################
// Reducer for all reading list actions (add, remove, etc.)
// ##############################################################

const listActions = {
    addToList: 'addToList',
    addMultipleToList: 'addMultipleToList',
    removeOneFromList: 'removeFromList',
    removeBookFromList: 'removeItemFromList',
    emptyList: 'emptyList',
}

function bookActionReducer(readingList=[], {type, book}){
    switch(type){
        case listActions.addToList:
            return [...readingList, book];
        case listActions.addMultipleToList:
            return [...readingList, ...book];
        case listActions.removeOneFromList:
            let newList = readingList.slice()
            for (let listBook of newList){
                if (listBook.title === book.title){
                    newList.splice(newList.indexOf(listBook), 1)
                    return newList;
                }
            }
            return newList;
        case listActions.removeBookFromList:
            return readingList.filter((listBook) => book.title !== listBook.title);
        case listActions.emptyList:
            return []
        default:
            throw new Error('Invalid action.')
    }   
}

export {bookActionReducer, listActions}