import bcrypt from 'bcryptjs';
import database from '../config/database.js';
import { sign, signrefresh } from '../helpers/jwt.js';
import { usersAllWithRole, usersAllWithRoleById, usersCreate, usersDelete, usersLogin, usersLoginRefresh, usersLoginRefreshUpdate, usersLoginUpdate, usersUpdate } from "./querys/usersQuerys.js";

export const getUsersAll = async() => {
    try{
        const users = await database.query(usersAllWithRole());
        return users.rows;
    }catch(error){
        return error;
    }
};

export const getUserById = async(id) => {
    try{
        const user = await database.query(usersAllWithRoleById(), [id]);
        return user.rows;
    }catch(error){
        return error;
    }
};

export const postUser = async(req) => {
    try{
        const { roleid, firstname, lastname, email, username, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const accesstoken = await sign({'roleid': roleid, 'username': username});
        const refreshtoken = await signrefresh({'roleid': roleid, 'username': username});

        const user = [
            roleid,
            firstname,
            lastname,
            email.toLowerCase(),
            username,
            encryptedPassword,
            accesstoken,
            refreshtoken
        ];

        const userCreate = await database.query(usersCreate(), user);

        return userCreate.rows[0].id;

    }catch(error){
        return error;
    }
};

export const putUser = async(req) => {
    try{
        const { id } = req.params;
        const { roleid, firstname, lastname, email, username, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const accesstoken = await sign({'roleid': roleid, 'username': username});
        const refreshtoken = await signrefresh({'roleid': roleid, 'username': username});

        const newUser = [ roleid, firstname, lastname, email, username, encryptedPassword, accesstoken, refreshtoken, id];
        await database.query(usersUpdate(), newUser);

        return id;

    }catch(error){
        return error;
    }
};

export const loginUser = async(req) => {
    try{
        const { username, password } = req.body;

        const user = await database.query(usersLogin(), [username]);

        if (user.rows && (await bcrypt.compare(password, user.rows[0].password))) {
            const accesstoken = await sign({'roleid': user.rows[0].roleid, 'username': username});
            const refreshtoken = await signrefresh({'roleid': user.rows[0].roleid, 'username': username});
            const newUserLogin = [ accesstoken, refreshtoken, user.rows[0].id ];
            await database.query(usersLoginUpdate(), newUserLogin);

            return {
                userId: user.rows[0].id,
                roleid: user.rows[0].roleid,
                firstname: user.rows[0].firstname,
                lastname: user.rows[0].lastname,
                username: user.rows[0].username,
                email: user.rows[0].email,
                status: user.rows[0].status,
                accesstoken: user.rows[0].accesstoken,
                refreshtoken: user.rows[0].refreshtoken
            };
        }
        return "Invalid Credentials";

      } catch (error) {
        return error;
      }
}

export const loginRefreshUser = async (refreshtoken) => {
    try {
        const user = await database.query(usersLoginRefresh(), [refreshtoken]);

        if (user !== null) {
            const accesstoken = await sign({ 'roleid': user.rows[0].roleid, 'username': user.rows[0].username });
            const newAccessToken = [ accesstoken ];

            await database.query(usersLoginRefreshUpdate(), newAccessToken);
            return { accesstoken: newAccessToken };
        }

        return "Invalid Refresh Token";

    } catch (error) {
        return error;
    }
}

export const delUser = async(id) => {
    try{
        await database.query(usersDelete(), [id]);
        return id;
    }catch(error){
        return error;
    }
};
