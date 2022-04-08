

const api = 'http://localhost:8080/api/auth/'

export function signUp (payload) {

    let ok = false;
    return fetch(api + 'signup', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    // Converting to JSON
    .then((response) => {
        ok = response.ok;
        if(response.status === 200){
            return response.json()
        }
    })
     
    // Displaying results to console
    .then((json) => {
        if(!ok) {
            return json;
        }
        return json;
    });
};

export function signIn(payload) {
    let ok = false;
    return fetch(api + 'signin', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            Accept: 'applcation/json',
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    // Converting to JSON
    .then((response) => {
        ok = response.ok;
        if(response.status === 200){
            return response.json()
        }
    })
     
    // Displaying results to console
    .then((json) => {
        if(!ok) {
            return json;
        }
        return json;
    });

};

export function logout() {
    localStorage.removeItem("user");
    return;
};