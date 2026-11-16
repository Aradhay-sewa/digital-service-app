const services = [
 {name:"रहिवासी स्वयंघोषणापत्र",desc:"मराठी फॉर्म व प्रिंट मसुदा",icon:"🏠",type:"document",target:"documents"},
 {name:"जात प्रतिज्ञापत्र",desc:"माहिती फॉर्मची पुढील आवृत्ती",icon:"📜",type:"document",target:"documents"},
 {name:"पीकपेरा स्वयंघोषणापत्र",desc:"शेतकरी फॉर्मची पुढील आवृत्ती",icon:"🌱",type:"document",target:"documents"},
 {name:"अर्ज लेखन",desc:"कार्यालयीन अर्जांचे नमुने",icon:"✍️",type:"document",target:"documents"},
 {name:"PDF Merge",desc:"अनेक PDF एकत्र करा — लवकरच",icon:"📚",type:"pdf",target:""},
 {name:"PDF Compress",desc:"PDF आकार कमी करा — लवकरच",icon:"🗜️",type:"pdf",target:""},
 {name:"JPG to PDF",desc:"फोटोचे PDF करा — लवकरच",icon:"🖼️",type:"pdf",target:""},
 {name:"Passport Photo",desc:"फोटो साधने — लवकरच",icon:"📸",type:"photo",target:""},
 {name:"Photo Crop & Resize",desc:"फोटो आकार बदला — लवकरच",icon:"✂️",type:"photo",target:""},
 {name:"Background Remove",desc:"पार्श्वभूमी काढा — लवकरच",icon:"🎨",type:"photo",target:""},
 {name:"PM Kisan",desc:"अधिकृत सरकारी पोर्टल",icon:"🌾",type:"government",url:"https://pmkisan.gov.in/"},
 {name:"Ayushman Bharat",desc:"अधिकृत सरकारी पोर्टल",icon:"🩺",type:"government",url:"https://beneficiary.nha.gov.in/"},
 {name:"Maha e-Seva",desc:"महाराष्ट्र शासन सेवा",icon:"🏛️",type:"government",url:"https://aaplesarkar.mahaonline.gov.in/"}
];
const grid=document.getElementById("serviceGrid"), search=document.getElementById("serviceSearch"), empty=document.getElementById("emptyState");
let activeFilter="all";
function render(){
 const q=search.value.trim().toLowerCase();
 const list=services.filter(s=>(activeFilter==="all"||s.type===activeFilter)&&(s.name+" "+s.desc).toLowerCase().includes(q));
 grid.innerHTML=list.map((s)=>`<button class="service-card" data-name="${s.name.replaceAll('"','&quot;')}" data-target="${s.target||""}" data-url="${s.url||""}"><span class="service-icon">${s.icon}</span><b>${s.name}</b><small>${s.desc}</small></button>`).join("");
 empty.classList.toggle("hidden",list.length!==0);
}
render();search.addEventListener("input",render);
document.querySelectorAll(".quick-tags button").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;document.querySelectorAll(".quick-tags button").forEach(x=>x.classList.toggle("active",x===b));render()}));
grid.addEventListener("click",e=>{const card=e.target.closest(".service-card");if(!card)return;if(card.dataset.target){document.getElementById(card.dataset.target).scrollIntoView({behavior:"smooth"})}else if(card.dataset.url){window.open(card.dataset.url,"_blank","noopener,noreferrer")}else{alert("ही सेवा पुढील आवृत्तीत जोडली जाईल.")}});
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("topNav").classList.toggle("open"));
document.getElementById("year").textContent=new Date().getFullYear();
const form=document.getElementById("residenceForm"), panel=document.getElementById("previewPanel"), output=document.getElementById("documentPreview");
form.addEventListener("submit",e=>{e.preventDefault();const d=Object.fromEntries(new FormData(form).entries());const safe=x=>String(x||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));output.innerHTML=`<h2>रहिवासी स्वयंघोषणापत्र</h2><p>मी, <b>${safe(d.name)}</b>, वडील / पतीचे नाव <b>${safe(d.guardian)}</b>, वय <b>${safe(d.age)}</b> वर्षे, व्यवसाय <b>${safe(d.occupation)||"नमूद नाही"}</b>, राहणार <b>${safe(d.address)}, ${safe(d.village)}, ता. ${safe(d.taluka)}, जि. ${safe(d.district)}</b>, याद्वारे स्वयंघोषणा करतो / करते की वरील माहिती माझ्या माहितीनुसार खरी व बरोबर आहे.</p><p>सदर माहिती खोटी आढळल्यास लागू कायद्यानुसार होणाऱ्या कारवाईस मी जबाबदार राहीन.</p><p>मोबाईल क्रमांक: ${safe(d.mobile)||"नमूद नाही"}</p><div class="sign"><span>ठिकाण: ${safe(d.village)}</span><span>अर्जदाराची सही: __________</span></div><p>दिनांक: ____ / ____ / ______</p><p style="font-size:11px;text-align:center;margin-top:35px">हा स्वयंघोषणापत्राचा मसुदा आहे. अधिकृत प्रमाणपत्र किंवा शासनाची मंजुरी नाही.</p>`;panel.classList.remove("hidden");panel.scrollIntoView({behavior:"smooth"})});
document.getElementById("printBtn").addEventListener("click",()=>window.print());
form.addEventListener("reset",()=>{panel.classList.add("hidden")});
if("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("./sw.js").catch(()=>{});
