const target = new Date("2026-10-17T10:00:00+07:00").getTime();

function countdown(){
  const d=target-Date.now();
  if(d<=0){
    ["days","hours","minutes","seconds"].forEach(id=>document.getElementById(id).textContent="0");
    return;
  }
  document.getElementById("days").textContent=Math.floor(d/86400000);
  document.getElementById("hours").textContent=Math.floor(d/3600000)%24;
  document.getElementById("minutes").textContent=Math.floor(d/60000)%60;
  document.getElementById("seconds").textContent=Math.floor(d/1000)%60;
}
setInterval(countdown,1000);
countdown();

const opening=document.getElementById("opening");
const music=document.getElementById("music");

document.getElementById("openBtn").onclick=()=>{
  opening.classList.add("hide");
  music.play().catch(()=>{});
};

document.getElementById("musicBtn").onclick=()=>{
  if(music.paused) music.play();
  else music.pause();
};

function copyRekening(){
  navigator.clipboard.writeText("8030677383");
  alert("Nomor rekening BCA berhasil disalin.");
}

document.getElementById("rsvpForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const attendance=document.getElementById("attendance").value;
  const guests=document.getElementById("guests").value;
  const message=document.getElementById("message").value.trim();

  const box=document.createElement("div");
  box.className="message";
  box.innerHTML=`<b>${escapeHtml(name)}</b><br>
  <small>${escapeHtml(attendance)} • ${escapeHtml(guests)} tamu</small>
  <p>${escapeHtml(message)}</p>`;

  document.getElementById("messages").prepend(box);
  e.target.reset();
  document.getElementById("guests").value=1;
});

function escapeHtml(s){
  return s.replace(/[&<>"']/g,m=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}