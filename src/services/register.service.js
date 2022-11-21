let DB_UUID = "531e3f71-e742-43e6-a77f-b6293484949c"
let URL_MDB = "https://leaflet.propzdev3.name//v1/databases/" + DB_UUID;

const getOrCreateUser = (userData) => {
    return getUserByCpfNumber(userData.customerId.value).then((user) => {
        console.log('user here: ', user);
        if (user) {
            console.log('update user')
            const url = URL_MDB + "/users/" + user.uuid + "?expand=properties";
            const requestParams = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
            fetch(url, requestParams);
            for (const [key, value] of Object.entries(userData)) {
                const reqBody = createRequestBody(key, value);
                const existingProperty = getUserProperty(user, key);
                const url = URL_MDB + "/users/" + user.uuid + "/properties/" + existingProperty.uuid;
                const requestParams = {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reqBody)
                }
                fetch(url, requestParams)
            };
            
        } else {
            console.log('create new user ')
            const newUserUuid = generateUuid();
            const url = URL_MDB + "/users/" + newUserUuid;
            const requestParams = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ properties: { items: [] } }),
            }
            fetch(url, requestParams); 
            for (const [key, value] of Object.entries(userData)) {
                const reqBody = createRequestBody(key, value);
                console.log('reqBody: ', reqBody)
                const url = URL_MDB + "/users/" + newUserUuid + "/properties/" + generateUuid();
                const requestParams = {
                    method: 'PUT', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reqBody)
                }
                fetch(url, requestParams).then(res => {
                    console.log('put new property: ', res);
                });
            };
        }
    });
}

const getUserByCpfNumber = (cpf) => {
    const url = URL_MDB + "/users/?expand=properties&property=customerId&value=" + cpf;
    const requestParams = {
        method: 'GET',
        headers: { 
            'Accept': 'application/json, text/javascript',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
    return fetch(url, requestParams)
    .then((response) => {
        return response.json()
    }).then(data => {
        return data.items.length ? data.items[0] : null;
    })
}

export const getAddressInfoByZipCode = (zipCode) => {
    console.log('zipCode: ', zipCode)
    const url = "https://viacep.com.br/ws/" + zipCode + "/json/";
    const requestParams = {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/javascript',
            'Content-Type': 'application/json',
        }
    }

    return fetch(url, requestParams).then((response) => {
        return response.json()
    }).then(data => {
        return data;
    })
}

const generateUuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const getUserProperty = (user, propName) => {
    for (var i = 0; i < user.properties.items.length; i++) {
        if (user.properties.items[i].name == propName) {
        return user.properties.items[i];
        }
    }
    return null;
}

const createRequestBody = (propName, propValue) => {
    console.log('propName: ', propName, 'propVal: ', propValue);
    let reqType = null;
    switch (propValue.type) {
        case 'text': 
        case 'tel': 
        case 'select-one':
            reqType = 'STRING';
            break;
        case 'date': 
            reqType = 'DATE';
            break;
        case 'checkbox':
            reqType = 'INTEGER';
            break;    
    }
    return {
        dataType: reqType,
        name: propName,
        securityLevel: 'PRIVATE',
        ...( reqType === 'STRING' && {stringValue: propValue.value}),
        ...( reqType === 'DATE' && {dateValue: propValue.value}),
        ...( reqType === 'INTEGER' && {integerValue: propValue.value}),
    } 
}



export default {
    getOrCreateUser,
    getUserByCpfNumber
}