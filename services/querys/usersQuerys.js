export const usersAllWithRole = () => {
    return `SELECT u.id, u.roleid, r.name, u.firstname,
                u.lastname, u.email, u.username, u.password,
                    u.accesstoken, u.refreshtoken, u.status,
                        u.createdat, u.updatedat
                            FROM users u
                                INNER JOIN roles r ON u.roleid = r.id
                                    ORDER BY u.id ASC`;
}
export const usersAllWithRoleById = () => {
    return `SELECT u.id, u.roleid, r.name, u.firstname,
                u.lastname, u.email, u.username, u.password,
                    u.accesstoken, u.refreshtoken, u.status,
                        u.createdat, u.updatedat
                            FROM users u
                                INNER JOIN roles r ON u.roleid = r.id
                                    WHERE u.id = $1`;
}
export const usersLogin = () => {
    return `SELECT u.id, u.roleid, r.name, u.firstname,
                u.lastname, u.email, u.username, u.password,
                    u.accesstoken, u.refreshtoken, u.status,
                        u.createdat, u.updatedat
                            FROM users u
                                INNER JOIN roles r ON u.roleid = r.id
                                    WHERE u.username = $1`;
}
export const usersLoginRefresh = () => {
    return `SELECT id, roleid, username, accesstoken FROM users WHERE refreshtoken = $1`;
}
export const usersCreate = () => {
    return `INSERT INTO users (roleid, firstname, lastname, email, username, password, accesstoken, refreshtoken)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
}
export const usersUpdate = () => {
    return `UPDATE users SET roleid = $1, firstname = $2, lastname = $3,
                                email = $4, username = $5, password = $6,
                                    accesstoken = $7, refreshtoken = $8
                                        WHERE id = $9`;
}
export const usersLoginUpdate = () => {
    return `UPDATE users SET accesstoken = $1, refreshtoken = $2 WHERE id = $3`;
}
export const usersLoginRefreshUpdate = () => {
    return `UPDATE users SET accesstoken = $1 WHERE id = $2`;
}
export const usersDelete = () => {
    return `DELETE FROM users WHERE id = $1`;
}