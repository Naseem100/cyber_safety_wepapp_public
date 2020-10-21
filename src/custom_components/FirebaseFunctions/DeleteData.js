import React from 'react';

// This is a function that will delete data from the database given a user, path, and key.
// The user is just the email, and the path is the database path to the key, which is the item being deleted

function DeleteData(user, path, key) {
    // Required to use firebase tools such as auth, storage, and database
    const firebase = require('firebase');
    require('firebase/database');
    const database = firebase.database();

    database.ref(user+'/' + path).once('value', (snapshot) => {
        database.ref(user+'/' + path + '/' + key).remove();
    });
}

export default DeleteData;