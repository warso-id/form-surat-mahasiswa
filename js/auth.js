let CURRENT_USER=null;
async function login(identity,password){const r=await api("login",{identity,password});sessionStorage.setItem("fikom_token",r.token);CURRENT_USER=r.user;return r}
function logout(){sessionStorage.clear();localStorage.removeItem("fikom_user");location.reload()}
async function restoreSession(){if(!sessionStorage.getItem("fikom_token"))return false;try{const r=await api("me");CURRENT_USER=r.user;return true}catch(e){sessionStorage.clear();return false}}
