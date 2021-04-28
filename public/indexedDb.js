const request = window.indexedDB.open("storedItems", 1);
let db;

request.onupgradeneeded = event => {
  db = event.target.result;
  const storedItemsStore = db.createObjectStore("storedItems", {autoIncrement: true});
}

request.onsuccess = (event) => {
  db = event.target.result;
  if (navigator.onLine) {
      isOnline()
  }
}

request.onerror = (event) => {
      console.log('error', event.target.errorCode)
}

const saveRecord = (response) => {
      const transaction = db.transaction(["storedItems"], "readwrite");
      const storedItemsStore = transaction.objectStore("storedItems");
      
      storedItemsStore.add(response);
}

function isOnline() {
      const transaction = db.transaction(["storedItems"], "readwrite");
      const storedItemsStore = transaction.objectStore("storedItems");
      const pushRecords = storedItemsStore.getAll()
      pushRecords.onsuccess = () => {
            if (pushRecords.result.length > 0) {
                  fetch("/api/transaction/bulk", { 
                        method: "POST",
                        body: JSON.stringify(pushRecords.result),
                        headers: {
                              Accept: "application/json, text/plain, */*",
                                     "Content-Type": "application/json"}
                  })
                  .then( response => response.json())
                  .then( () => {
                        const transaction = db.transaction(["storedItems"], "readwrite");
                        const storedItemsStore = transaction.objectStore("storedItems");
                        storedItemsStore.clear()
                  })
            }
      }
      
}

window.addEventListener(
      'online', isOnline
)

