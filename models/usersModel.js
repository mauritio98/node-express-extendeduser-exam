import users from '../data/user.js';

class User {

    createUser(user) {
        console.log(`---> userModel::createUser ${user.username}`);
        
        users.push(user);
        return users.find(element => element.username == user.username);


    }

    loginUser(user) {
        console.log(`---> userModel::loginUser ${user.username}`);

        return users.find(element => (element.username == user.username))
    }

    getUser(user) {
        console.log(`---> userModel::getUser ${user.username}`);

        return users.find(element => (element.username == user))
    }

    addGrant(user){
        console.log(`---> userModel::addGrant ${user.username}`);

        const found = users.find(element => (element.username == user.username))
        found.grants = user.grants;

        return found;    
    }

    deleteGrant(user, grants){
        const found = users.find(element => (element.username == user));

        grants.forEach(element => {

            const i = found.grants.indexOf(element);
            if (i !== -1) {
                found.grants.splice(i, 1);
            }    
        });
        return found;
    }

    updateGrant(req){
        const found = users.find(element => (element.username == req.body.username))

        req.body.grants.forEach(element => {
            found.grants.push(element);
        });
        return found;
    }
}

export default new User();