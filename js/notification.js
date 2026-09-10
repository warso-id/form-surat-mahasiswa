async function loadNotifications(){try{const r=await api("notifications");const b=document.getElementById("notifBadge");b.textContent=r.unread?String(r.unread):""}catch(e){}}
