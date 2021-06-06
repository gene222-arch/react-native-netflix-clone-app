/**
 * Create a new cookie
 * 
 * @param { string } name 
 * @param { string } value 
 * @param { int } days 
 */
export const set = (name, value, expirationDate) => 
{
    const expiresAt = new Date(expirationDate).toUTCString();
    
    document.cookie = `${ name } = ${ value };expires=${ expiresAt }; path=/`
}

/**
 * Get a cookie
 * 
 * @param { string } name 
 */
export const get = (name) =>
{
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');

    for(let i = 0; i < cookies.length; i++) 
    {
        let cookie = cookies[i];

        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);

        if (cookie.indexOf(cookieName) === 0) 
        {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    
    return null;
}

/**
 * Checks if a cookie with the given name exists
 * 
 * @param { string } name 
 * @returns { boolean }
 */
export const has = (name) => get(name) ? true : false;


/**
 * Delete a cookie
 * 
 * @param { string } name 
 * @returns void
 */
export const remove = (name) => document.cookie = name +'=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';