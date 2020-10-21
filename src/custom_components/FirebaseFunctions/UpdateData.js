import React from 'react';

// This function just updates the data at a certain path given a user and the new data in the form of an object

function UpdateData(user, path, data) {
    // Required to use firebase tools such as auth, storage, and database
    const firebase = require('firebase');
    require('firebase/database');
    const database = firebase.database();

    database.ref(user+'/').child(path).update(data,
        function (error) {
            if (error) {
                alert('The data did not submit properly');
            }
        });
}

export default UpdateData;