const firebase = require('../db/db');
const jwt = require('jsonwebtoken');
const firestore = firebase.firestore();
const { response } = require('express');

const adduser = async (req, res) => {
    try {
        const data = req.body;
        await firestore.collection('users').doc().set(data);
        return  res.status(200).json({
            ok : true,
            msg : 'se creo con exito'
        });
    } catch (error) {
        return  res.status(500).json({
            ok : false,
            msg : error.message
        });
    }
}

const generarToken = async(req, res = response) => {
    const expiresIn = 24 * 60 *60;
    const accessToken = jwt.sign(req.body, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', { expiresIn: expiresIn});
    return res.status(200).json({
        ok : true,
        _token : accessToken,
    });
}
 
const getUser = async(req, res) => {

    try {
        const __users_data = firestore.collection('users');
        const response = await __users_data.where('uid', '==', 'uEbdQtGpUDT3x82QHjjdLfyg1ID3').get();
        const users = [];

        if (response.empty) {
            return res.status(404).json({
                ok : false,
                msg : 'no se encontro informacion'
            });
        }

        response.forEach(doc => {
            users.push(doc.data().email);
        });

        return res.status(200).json({
            ok : false,
            users: users
        });
        
    } catch (error) {
        return res.status(500).json({
            ok : false,
            msg : error.message
        });
    }
}


async function get_userfirebase(uid) {

    try {
        const __users_data = firestore.collection('users');
        const response = await __users_data.where('uid', '==', uid).get();
        const user = [];

        if (response.empty) {
            return {
                type: false,
                msg :  'no se encontro informacion'
            };
        }

        response.forEach(doc => {
            user.push( { 
                email : doc.data().email,
                firstname : doc.data().firstname,
                lastname : doc.data().lastname,
                phone : doc.data().phone,
                uid : doc.data().uid
            } );
        });

        return {
            type: true,
            user: user
        };
        
    } catch (error) {
        return {
            type : 'error',
            msg : error.message
        };
    }



}


/*
const get_userfirebase = async(uid) =>  {

    try {
        const __users_data = firestore.collection('users');
        const response = await __users_data.where('uid', '==', uid).get();
        const users = [];

        if (response.empty) {
            return {
                ok : false,
                msg :  'no se encontro informacion'
            };
        }

        response.forEach(doc => {
            users.push(doc.data().email);
        });

        return {
            ok : false,
            users: users
        };
        
    } catch (error) {
        return {
            ok : false,
            msg : error.message
        };
    }




}*/

module.exports = { adduser, getUser, generarToken, get_userfirebase };