import React from 'react';

// This function is used for the components in Step 1.
// Will swap two item positions given a user, path, key, and a second key.

function SwapItemOrder(user, path, key, key2) {
    // Required to use firebase tools such as auth, storage, and database
    const firebase = require('firebase');
    require('firebase/database');
    const database = firebase.database();

    database.ref(user+'/' + path + '/' + key).once('value', (snapshot) => {
        database.ref(user+'/' + path + '/' + key2).once('value', (snapshot2) => {
            console.log(snapshot2)
            database.ref(user+'/'+ path).update({[key]: snapshot2.val()},
                function(error) {
                    if (error) {
                        alert('The data did not submit properly');
                    }
                });
            database.ref(user+'/'+ path).update({[key2]: snapshot.val()},
                function(error) {
                    if (error) {
                        alert('The data did not submit properly');
                    }
                });
        });
    });
}

export default SwapItemOrder;