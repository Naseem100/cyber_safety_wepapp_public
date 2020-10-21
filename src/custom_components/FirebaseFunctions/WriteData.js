import React from 'react';

// This function just writes data to a specific path given a user and data.
// If back is also given as True, it will return the key of the data.

function WriteData(user, path, data, back=false) {
    // Required to use firebase tools such as auth, storage, and database
    const firebase = require('firebase');
    require('firebase/database');
    const database = firebase.database();

    const ref = database.ref(user+'/'+ path).push( (path==='Projects/')? {Project_Name: {Project_Name: data}} : data,
        function(error) {
            if (error) {
                alert('The data did not submit properly');
            }
        });
    if(back)
        return ref.key;
}

export default WriteData;