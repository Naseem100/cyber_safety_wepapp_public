import React from 'react';

// This is a function that will delete multiple pieces of data from the database
// Mostly used for things that rely on each other, like the Hazards and their tags, or possible sub-hazards

function DeleteDataMultiple(user, project, path, path2, key, tag) {
    // Required to use firebase tools such as auth, storage, and database
    const firebase = require('firebase');
    require('firebase/database');
    const database = firebase.database();

    database.ref(user+'/Projects/' + project + path).once('value', (snapshot) => {
            database.ref(user+'/Projects/' + project + path + key).remove();

            database.ref(user+'/Projects/' + project + path2).once('value', (snapshot2) => {
                for(const keys in snapshot2.val()){
                    database.ref(user + '/Projects/' + project + path2 + keys + path + tag).remove();
                }
            });
    });
}

export default DeleteDataMultiple;