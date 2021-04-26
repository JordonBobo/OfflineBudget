const request = window.indexedDB.open("storedItems", 1);

// Create schema
request.onupgradeneeded = event => {
  const db = event.target.result;
  
  // Creates an object store with a listID keypath that can be used to query on.
  const storedItemsStore = db.createObjectStore("storedItems", {keyPath: "_id"});
  // Creates a statusIndex that we can query on.
  storedItemsStore.createIndex("statusIndex", "status"); 
}

// Opens a transaction, accesses the storedItems objectStore and statusIndex.
request.onsuccess = () => {
  const db = request.result;
  const transaction = db.transaction(["storedItems"], "readwrite");
  const storedItemsStore = transaction.objectStore("storedItems");
  const statusIndex = storedItemsStore.index("statusIndex");

  // Adds data to our objectStore
  const saveRecord = (response) => {
      storedItemsStore.add( { response } );
  }
//   storedItemsStore.add({ listID: "2", status: "in-progress" });
//   storedItemsStore.add({ listID: "3", status: "complete" });
//   storedItemsStore.add({ listID: "4", status: "backlog" });
 
const updateThis = (response) => {
      storedItemsStore.getAll( {} )
  }

  // Return an item by keyPath
  const getRequest = storedItemsStore.get("1");
  getRequest.onsuccess = () => {
    console.log(getRequest.result);
  };

  // Return an item by index
  const getRequestIdx = statusIndex.getAll("complete");
  getRequestIdx.onsuccess = () => {
    console.log(getRequestIdx.result); 
  }; 
};


module.exports = {
      saveRecord,
      updateThis
}

