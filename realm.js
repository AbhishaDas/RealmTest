import Realm from 'realm';

class Books extends Realm.Object { }

Books.schema = {
    name: "Books",
    properties: {
        recordID: 'int',
        bookName: 'string',
        autherName: 'string',
        details: 'string'
    },
    primaryKey: "recordID",
};
let realm = new Realm({ schema: [Books], schemaVersion: 4 });

let getAllBooks = () => {
    return realm.objects("Books");
}

let addBooks = (_recordID, _bookName, _autherName, _details ) => {
    realm.write(() => {
        const books = realm.create("Books", {
            recordID: _recordID,
            bookName: _bookName,
            autherName: _autherName,
            details: _details
        });
    })
}

let deleteAllBooks= () => {
    realm.write(() => {
        realm.deleteAll()
    })
}
let deleteBooks = (recordID) => {
    realm.write(() => {
        realm.delete(
            realm.objects('Books').filter(contObj => contObj.recordID == recordID)
        )
    })
          realm.write(() => {
            realm.objects('Books').map((contObj, index) => contObj.recordID = (index + 1));
});
}
export default realm;

export {
    getAllBooks, addBooks, deleteAllBooks, deleteBooks}