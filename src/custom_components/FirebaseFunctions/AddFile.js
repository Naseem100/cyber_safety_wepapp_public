import React from 'react';

// This is a function that will let you add a file to a user's storage folder
// Not currently in use right now

function AddFile(user, project) {
    // Required to use firebase tools such as auth, storage, and database
    const firebase = require('firebase');
    require('firebase/storage');
    const storage = firebase.storage();

    storage.ref().child('Users/' + user + '/' + project + '/diagram.xml').put(document.getElementById('file').files[0]).then(function succeed() {
        alert('Upload Successful')
    });
}

export default AddFile;