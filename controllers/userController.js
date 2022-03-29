import HttpError from "http-errors";
import userModel from '../models/usersModel.js'
import bcrypt from 'bcrypt';
import messageapp from '../data/messages.js';

const register = (req, res, next) => {
    console.log(`---> userController::register`);

    try {
        const body = req.body;
        let result;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: messageapp.parameter_not_especified }))
        } else {


            console.log(`---> userController::register ${body.password}`);
            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) };

            result = userModel.loginUser(user);
            if (result != undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));

            } else {

                result = userModel.createUser(user);

                if (result < 0)
                    next(HttpError(400, { message: messageapp.user_error_register }))

                res.status(201).json(result);

            }

        }

    } catch (error) {
        next(error);
    }

};

const login = (req, res, next) => {
    console.log(`---> userController::login`);

    try {
        const body = req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, {  message: messageapp.parameter_not_especified }))
        } else {

            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) };
            const result = userModel.loginUser(user);

            if (result === undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));
            } else {
                console.log(`---> userController::login ${result.password}`);
                console.log(`---> userController::login ${body.password}`);

                if (!bcrypt.compareSync(body.password, result.password))
                    next(HttpError(400, { message: messageapp.user_error_login  }));
                else
                    res.status(200).json(result);
            }
        }

    } catch (error) {
        next(error);
    }
};

const userReturn = (req, res, next)=>{
    const result = userModel.getUser(req.params.username);
    const found = JSON.parse(JSON.stringify(result));
    if (found==undefined){
        next(HttpError(400, { message: "not found" }));
    }else{
        delete userFound.password;
        res.status(200).json(userFound);
    }

}

const addGrant = (req, res, next)=>{
    const user = { username: req.body.username, password: req.body.password, grants: req.body.grants};
    const result = userModel.addGrant(user);
    res.status(200).json(result);
}

const deleteGrant = (req, res, next)=>{
    const user = req.body.username;
    const grants = req.body.grants;
    const result = userModel.deleteGrant(user, grants);
    res.status(200).json(result);
}

const updateGrant = (req, res, next)=>{
    const result = userModel.updateGrant(req);
    res.status(200).json(result);
}

export default {
    register,
    login,
    userReturn,
    addGrant,
    deleteGrant,
    updateGrant
}