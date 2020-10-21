import React from 'react';

// This is a function that will allow projects to be copied given a user.

function CopyData(user, user2, path, key) {
    // Required to use firebase tools such as auth, storage, and database
    const firebase = require('firebase');
    require('firebase/database');
    const database = firebase.database();

    database.ref(user +'/' + path + '/' + key).once('value', (snapshot) => {
        let data = snapshot.val()
        data.Project_Name.Project_Name = snapshot.val().Project_Name.Project_Name + ' Copy'
        const ref = database.ref(user2 +'/'+ path).push( data,
            function(error) {
                if (error) {
                    alert('The data did not submit properly');
                }
            });
    });
}

export default CopyData;