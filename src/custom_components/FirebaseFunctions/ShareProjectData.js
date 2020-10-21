import React from 'react';

// This is a function that will share from the database given two users, a path, and a key.
// The users are just the emails of the sender and the recipient, the path is the database path to the key,
// which is the name of the project being shared.

function ShareProjectData(user, user2, path, key) {
    // Required to use firebase tools such as auth, storage, and database
    const firebase = require('firebase');
    require('firebase/database');
    const database = firebase.database();

    database.ref(user+'/' + path + '/' + key).once('value', (snapshot1) => {
        database.ref().once('value', (snapshot2) => {
            console.log(snapshot1.val())
            console.log(Object.keys(snapshot2.val()))
            if(Object.keys(snapshot2.val()).includes(user2)){
                const ref = database.ref(user2 +'/'+ path).push( snapshot1.val(),
                    function(error) {
                        if (error) {
                            alert('The data did not submit properly');
                        }
                    });
            }else{
                alert('The user ' + user2 + ' does not exist');
            }
        });
    });
}

export default ShareProjectData;