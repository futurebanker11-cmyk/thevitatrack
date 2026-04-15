'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function HydrationPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `(adsbygoogle = window.adsbygoogle || []).push({});
(adsbygoogle = window.adsbygoogle || []).push({});
document.write(new Date().getFullYear())
var wUnit='lbs';
function setWU(u){wUnit=u;document.querySelectorAll('#wt-toggle .unit-btn').forEach(function(b){b.classList.remove('active')});event.target.classList.add('active');var w=document.getElementById('weight');if(u==='kg'){w.value=Math.round(parseFloat(w.value)*0.4536);w.min=30;w.max=230;document.getElementById('wt-hint').textContent='Enter weight in kilograms';}else{w.value=Math.round(parseFloat(w.value)*2.205);w.min=60;w.max=500;document.getElementById('wt-hint').textContent='Enter weight in pounds';}}

function calcHydration(){
  var wt=parseFloat(document.getElementById('weight').value);
  var age=parseInt(document.getElementById('age').value);
  var act=document.getElementById('activity').value;
  var climate=document.getElementById('climate').value;
  if(!wt){alert('Please enter your weight');return;}

  var wtLbs=wUnit==='kg'?wt*2.205:wt;

  // Base: 0.5 oz per pound of body weight
  var baseOz=wtLbs*0.5;

  // Age adjustment: seniors need slightly less but lose more easily
  if(age>=80) baseOz*=0.88;
  else if(age>=75) baseOz*=0.92;
  else if(age>=70) baseOz*=0.95;

  // Activity adjustment
  if(act==='sedentary') baseOz*=0.9;
  else if(act==='moderate') baseOz*=1.1;
  else if(act==='active') baseOz*=1.2;

  // Climate adjustment
  if(climate==='hot') baseOz*=1.15;
  else if(climate==='dry') baseOz*=1.2;
  else if(climate==='cold') baseOz*=1.05; // heated indoor air is dry

  // Medication adjustments
  var hasDiuretic=document.getElementById('diuretic').parentElement.classList.contains('selected');
  var hasGLP1=document.getElementById('glp1med').parentElement.classList.contains('selected');
  var hasHF=document.getElementById('heartfail').parentElement.classList.contains('selected');
  var hasKidney=document.getElementById('kidney').parentElement.classList.contains('selected');
  var hasCoffee=document.getElementById('coffee').parentElement.classList.contains('selected');

  if(hasDiuretic) baseOz*=1.1;
  if(hasGLP1) baseOz*=1.1;
  if(hasCoffee) baseOz*=1.05;

  // Safety caps
  var targetOz=Math.round(baseOz);
  var minOz=48; // 6 cups minimum
  var maxOz=100; // Don't recommend more than ~12 cups for seniors
  if(targetOz<minOz) targetOz=minOz;
  if(targetOz>maxOz) targetOz=maxOz;

  var cups=Math.round(targetOz/8);
  var liters=(targetOz*0.02957).toFixed(1);
  var bottles=Math.round(targetOz/16.9*10)/10;
  var fromFood=Math.round(targetOz*0.2);

  // Result styling
  var resultCls='';
  var resultEl=document.getElementById('hydra-result');

  // Update display
  document.getElementById('r-oz').textContent=targetOz;
  document.getElementById('r-unit').textContent='ounces per day ('+Math.round(targetOz*29.57)+' ml)';
  document.getElementById('r-cups').textContent="That's about "+cups+' cups (8 oz each)';
  document.getElementById('s-liters').textContent=liters+' L';
  document.getElementById('s-bottles').textContent=bottles;
  document.getElementById('s-pct').textContent=fromFood+' oz';

  // Glass visualization
  var gg=document.getElementById('glass-grid');gg.innerHTML='';
  for(var i=0;i<12;i++){
    var g=document.createElement('div');
    g.className='glass'+(i<cups?'':' empty');
    var fillPct=i<cups?100:(i===cups?(targetOz%8)/8*100:0);
    g.innerHTML='<div class="glass-fill" style="height:'+fillPct+'%"></div>';
    gg.appendChild(g);
    if(i<cups)(function(gl){setTimeout(function(){gl.querySelector('.glass-fill').style.height='100%';},100+i*80);})(g);
  }

  // Warnings
  var wa=document.getElementById('warn-area');wa.innerHTML='';
  if(hasHF){
    resultEl.className='hydra-result warning';
    var w=document.createElement('div');w.className='warn-card';
    w.innerHTML='<h4>⚠️ Heart Failure — Fluid Restriction May Apply</h4><p>Seniors with heart failure often need to LIMIT fluid to 1.5-2 liters (48-64 oz) per day. Your calculated target may be too high. <strong>Follow your cardiologist\\'s specific fluid guidelines</strong> — they override this calculator. Too much fluid with heart failure can cause dangerous fluid buildup.</p>';
    wa.appendChild(w);
  }
  if(hasKidney){
    var w=document.createElement('div');w.className='warn-card';
    w.innerHTML='<h4>⚠️ Kidney Disease — Talk to Your Nephrologist</h4><p>Advanced kidney disease may require fluid restrictions depending on your stage and dialysis status. This calculator provides a general target — your nephrologist\\'s guidance takes priority. <a href="/kidney/" style="color:#991B1B;font-weight:700">See kidney supplements →</a></p>';
    wa.appendChild(w);
  }
  if(!hasHF&&!hasKidney) resultEl.className='hydra-result';

  // Schedule
  var sc=document.getElementById('sched-items');sc.innerHTML='';
  var ozPerSlot=Math.round(targetOz/7);
  var schedule=[
    {time:'7:00 AM',what:'Wake up — glass of water before anything else',oz:8},
    {time:'8:00 AM',what:'With breakfast (counts: coffee/tea + water)',oz:ozPerSlot},
    {time:'10:00 AM',what:'Mid-morning — water or herbal tea',oz:8},
    {time:'12:00 PM',what:'With lunch (include soup if possible)',oz:ozPerSlot},
    {time:'2:30 PM',what:'Afternoon — water with a snack',oz:8},
    {time:'5:00 PM',what:'With dinner (water, not soda)',oz:ozPerSlot},
    {time:'7:00 PM',what:'Evening — small sips only (stop 2-3 hrs before bed)',oz:Math.min(4,ozPerSlot)}
  ];
  var totalSched=0;
  schedule.forEach(function(s){
    totalSched+=s.oz;
    var d=document.createElement('div');d.className='sched-item';
    d.innerHTML='<span class="sched-time">'+s.time+'</span><span class="sched-what">'+s.what+'</span><span class="sched-amt">'+s.oz+' oz</span>';
    sc.appendChild(d);
  });
  // Total row
  var tot=document.createElement('div');tot.className='sched-item';tot.style.cssText='background:#F0FAF3;border:2px solid #A7D8B8;font-weight:700';
  tot.innerHTML='<span class="sched-time">TOTAL</span><span class="sched-what">Spread evenly — don\\'t chug large amounts at once</span><span class="sched-amt" style="font-size:18px">'+targetOz+' oz</span>';
  sc.appendChild(tot);

  document.getElementById('results').classList.add('show');
  setTimeout(function(){document.getElementById('hydra-result').scrollIntoView({behavior:'smooth',block:'center'});},100);
}`;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <>
      <Header />
      <style>{`
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--hdr:#14442A;--hero:#1E6B3E;--green:#1A5632;--gh:#134225;--bg:#F7F6F3;--white:#FFF;--border:#E8E6E1;--text:#2C2C2A;--t2:#555550;--muted:#717170;--badge:#E8F5E9;--r:12px}
html{scroll-behavior:smooth}body{font-family:'Source Sans 3',-apple-system,sans-serif;font-size:18px;line-height:1.6;color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased}
.hdr{background:var(--hdr);position:sticky;top:0;z-index:1000}.hdr-inner{max-width:1100px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;justify-content:space-between}.hdr-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff}.hdr-logo svg{width:32px;height:32px}.hdr-logo span{font-size:22px;font-weight:700}.hdr-nav{display:flex;gap:6px}.hdr-nav a{color:rgba(255,255,255,.85);text-decoration:none;font-size:15px;font-weight:500;padding:8px 16px;border-radius:8px}.hdr-nav a:hover{background:rgba(255,255,255,.1)}.hdr-toggle{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:8px;min-height:44px;min-width:44px}.hdr-toggle svg{width:26px;height:26px}
.mob{display:none;position:fixed;inset:0;background:var(--hdr);z-index:9999;flex-direction:column}.mob.open{display:flex}.mob-top{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;border-bottom:1px solid rgba(255,255,255,.1)}.mob-logo{display:flex;align-items:center;gap:8px;color:#fff;text-decoration:none}.mob-logo svg{width:28px;height:28px}.mob-logo span{font-size:20px;font-weight:700}.mob-x{background:rgba(255,255,255,.1);border:none;color:#fff;width:44px;height:44px;border-radius:50%;cursor:pointer;font-size:22px;display:flex;align-items:center;justify-content:center}.mob-links a{color:#fff;text-decoration:none;font-size:18px;font-weight:500;padding:16px 28px;display:block;border-bottom:1px solid rgba(255,255,255,.1)}
@media(max-width:768px){.hdr-nav{display:none}.hdr-toggle{display:flex}}
.page-hero{background:linear-gradient(135deg,#1E6B3E,#14442A);color:#fff;padding:40px 24px 36px}.page-hero-inner{max-width:800px;margin:0 auto}.breadcrumb{font-size:15px;color:rgba(255,255,255,.7);margin-bottom:12px}.breadcrumb a{color:rgba(255,255,255,.85);text-decoration:none}.page-hero h1{font-size:32px;font-weight:700;line-height:1.2;margin-bottom:10px}.page-hero p{font-size:18px;color:rgba(255,255,255,.9);max-width:640px}.hero-badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.hero-badge{font-size:13px;background:rgba(255,255,255,.15);color:#fff;padding:5px 14px;border-radius:20px;font-weight:600}
.main-wrap{max-width:1100px;margin:0 auto;padding:0 20px;display:flex;gap:28px;align-items:flex-start}.main{flex:1;max-width:800px;min-width:0}
.ad-slot{text-align:center;margin:24px 0;min-height:90px;border-radius:8px}
.intro-note{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:20px 24px;margin:28px 0 0;border-left:4px solid var(--green)}.intro-note p{font-size:16px;color:var(--t2);line-height:1.6;margin:0}.intro-note strong{color:var(--green)}
.calc-card{background:var(--white);border:2px solid var(--green);border-radius:16px;padding:32px 28px;margin:20px 0 28px;position:relative;overflow:hidden}
.calc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#1A5632,#4ADE80,#1A5632)}
.calc-title{font-size:22px;font-weight:700;color:var(--green);margin-bottom:4px}.calc-sub{font-size:15px;color:var(--t2);margin-bottom:24px}
.form-group{margin-bottom:20px}.form-label{display:block;font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px}.form-hint{font-size:13px;color:var(--muted);margin-bottom:6px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-select,.form-input{width:100%;padding:14px 16px;border:1.5px solid var(--border);border-radius:10px;font:inherit;font-size:17px;color:var(--text);background:var(--white);min-height:50px;-webkit-appearance:none;appearance:none}
.form-select{background-image:url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23717170' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center;padding-right:40px}
.form-select:focus,.form-input:focus{outline:none;border-color:var(--green);box-shadow:0 0 0 3px rgba(26,86,50,.15)}
.unit-toggle{display:flex;gap:0;margin-bottom:10px;background:#F5F4F1;border-radius:8px;padding:3px;width:fit-content}
.unit-btn{padding:7px 16px;border:none;background:none;font:inherit;font-size:14px;font-weight:600;color:var(--muted);cursor:pointer;border-radius:6px;transition:all .15s}
.unit-btn.active{background:var(--green);color:#fff}
.calc-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,#1A5632,#22703F);color:#fff;border:none;padding:18px 32px;border-radius:12px;font:inherit;font-size:20px;font-weight:700;cursor:pointer;width:100%;min-height:60px;box-shadow:0 4px 14px rgba(26,86,50,.3);transition:transform .1s}.calc-btn:hover{transform:translateY(-1px)}
.results{display:none;margin-top:28px}.results.show{display:block;animation:fadeIn .5s}
@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.prot-result{background:#F0FAF3;border:2px solid #A7D8B8;border-radius:14px;padding:28px 24px;text-align:center;margin-bottom:24px}
.prot-big{font-size:56px;font-weight:700;color:var(--green);line-height:1.1}.prot-unit{font-size:22px;font-weight:600;color:var(--green)}.prot-label{font-size:16px;color:var(--t2);margin-top:4px}.prot-sub{font-size:15px;color:var(--muted);margin-top:8px}
.stats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:20px 0}
.stat-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}
.stat-num{font-size:24px;font-weight:700;line-height:1.2;color:var(--green)}.stat-label{font-size:13px;color:var(--muted);margin-top:4px}
.meal-plan{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:24px;margin:20px 0}
.meal-plan h3{font-size:19px;font-weight:700;margin-bottom:16px;color:var(--green)}
.meal-row{display:grid;grid-template-columns:auto 1fr auto;gap:12px;padding:14px 0;border-bottom:1px solid var(--border);align-items:center}
.meal-row:last-child{border:none}
.meal-icon{font-size:24px}.meal-name{font-weight:600}.meal-foods{font-size:14px;color:var(--t2)}.meal-g{font-size:18px;font-weight:700;color:var(--green);text-align:right;white-space:nowrap}
.food-list{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:24px;margin:20px 0}
.food-list h3{font-size:19px;font-weight:700;margin-bottom:16px}
.food-item{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #F5F4F1}
.food-item:last-child{border:none}
.food-name{font-size:16px;font-weight:600;color:var(--text)}.food-serving{font-size:13px;color:var(--muted)}.food-g{font-size:16px;font-weight:700;color:var(--green)}
.compare-note{background:#FFFBEB;border:2px solid #E8D48B;border-radius:14px;padding:24px;margin:20px 0}
.compare-note h4{font-size:19px;font-weight:700;color:#7A5F00;margin-bottom:12px}
.compare-note p{font-size:15px;color:#6D4C00;line-height:1.6;margin-bottom:8px}
.content-section{margin:32px 0}.content-section h2{font-size:24px;font-weight:700;margin-bottom:14px}.content-section h3{font-size:20px;font-weight:700;color:var(--green);margin:20px 0 10px}.content-section p{font-size:17px;color:var(--t2);line-height:1.7;margin-bottom:14px}
.faq{margin:36px 0}.faq h2{font-size:24px;font-weight:700;margin-bottom:20px;text-align:center}.faq-item{background:var(--white);border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px}.faq-q{padding:16px 22px;font-size:18px;font-weight:600;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:none;width:100%;text-align:left;font-family:inherit;line-height:1.4}.faq-q:hover{background:#FAFAF8}.faq-icon{font-size:22px;color:var(--muted);flex-shrink:0;transition:transform .2s}.faq-q.active .faq-icon{transform:rotate(45deg)}.faq-a{padding:0 22px 16px;font-size:16px;color:var(--t2);line-height:1.65;display:none}.faq-a.show{display:block}
.related{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin:32px 0}.related h3{font-size:20px;font-weight:700;margin-bottom:16px}.r-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.r-link{display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid var(--border);border-radius:10px;text-decoration:none;color:var(--green);font-weight:600;font-size:16px}.r-link:hover{border-color:#c5c3be}
.disc{background:#F5F4F1;border-radius:var(--r);padding:24px;margin:0 0 40px}.disc h4{font-size:16px;font-weight:700;margin-bottom:8px}.disc p{font-size:14px;color:var(--muted);line-height:1.7}.disc p+p{margin-top:8px}
.sidebar{width:240px;flex-shrink:0;position:sticky;top:70px;display:none}.sidebar-inner{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:18px}.sidebar h4{font-size:15px;font-weight:700;margin-bottom:14px}.sb-link{display:block;padding:8px 10px;border-radius:8px;text-decoration:none;background:#F8FAF8;font-size:14px;font-weight:600;color:var(--green);margin-bottom:6px}.sb-link:hover{background:#E8F5E9}.sb-div{border:none;border-top:1px solid var(--border);margin:12px 0}.sb-sub{font-size:13px;color:var(--muted);margin-top:12px}.sb-sub a{color:var(--green);text-decoration:none;display:block;padding:5px 0;font-weight:600}
@media(min-width:1000px){.sidebar{display:block}}@media(max-width:999px){.main-wrap{max-width:800px}}
.ftr{border-top:1px solid var(--border);background:linear-gradient(180deg,#FAFDFB,#F7F6F3);padding:36px 20px 20px;text-align:center}.ftr-inner{max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px}.ftr-logo{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--text)}.ftr-logo svg{width:22px;height:22px}.ftr-logo span{font-size:22px;font-weight:700}.ftr-logo:hover span{color:var(--green)}.ftr-links{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 20px;list-style:none}.ftr-links a{display:inline-block;padding:8px 4px;text-decoration:none;color:var(--text);font-weight:600;font-size:15px;min-height:44px}.ftr-links a:hover{color:var(--green)}.ftr-btm{max-width:700px;margin:0 auto;padding:14px 20px 8px;text-align:center;border-top:1px dashed #E0DDD8}.ftr-btm p{margin:0 0 4px;color:var(--muted);font-size:14px}
@media(max-width:700px){.page-hero{padding:28px 20px 24px}.page-hero h1{font-size:26px}.calc-card{padding:24px 18px}.form-row{grid-template-columns:1fr}.stats-grid{grid-template-columns:1fr}.prot-big{font-size:42px}.meal-row{grid-template-columns:auto 1fr;gap:8px}.meal-g{grid-column:1/-1;text-align:left}.r-grid{grid-template-columns:1fr}.faq-q{font-size:17px;padding:14px 18px}}
      `}</style>
<div className="main-wrap">
<div className="main">

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="8981383031" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="intro-note"><p><strong>Critical for seniors:</strong> Dehydration is one of the most common reasons adults over 65 end up in the emergency room. Confusion caused by dehydration is frequently misdiagnosed as dementia. Your kidneys become less efficient with age, your thirst response weakens, and many common medications increase fluid loss. This calculator accounts for all of these senior-specific factors.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Calculate Your Daily Water Needs</h2>
<div className="calc-sub">Personalized for your weight, age, activity, and medications</div>

<div className="form-group">
<label className="form-label">Your weight</label>
<div className="unit-toggle" id="wt-toggle">
<button className="unit-btn active">lbs</button>
<button className="unit-btn">kg</button>
</div>
<input type="number" className="form-input" id="weight" value="170" min="60" max="500" style={{"fontSize":"24px","fontWeight":"700","color":"var(--green)","textAlign":"center"}} />
<div id="wt-hint" style={{"fontSize":"13px","color":"var(--muted)","marginTop":"4px","textAlign":"center"}}>Enter weight in pounds</div>
</div>

<div className="form-row">
<div className="form-group"><label className="form-label">Age</label>
<select className="form-select" id="age"><option value="57">55-59</option><option value="62">60-64</option><option value="67" selected>65-69</option><option value="72">70-74</option><option value="77">75-79</option><option value="82">80+</option></select></div>
<div className="form-group"><label className="form-label">Activity level</label>
<select className="form-select" id="activity"><option value="sedentary">Sedentary (mostly sitting)</option><option value="light" selected>Light (daily walking)</option><option value="moderate">Moderate (exercise 2-3x/week)</option><option value="active">Active (exercise 4-5x/week)</option></select></div>
</div>

<div className="form-group"><label className="form-label">Climate / season</label>
<select className="form-select" id="climate"><option value="mild" selected>Mild / temperate</option><option value="hot">Hot and humid (summer, warm climate)</option><option value="dry">Hot and dry (desert, arid)</option><option value="cold">Cold / winter (indoor heating dries air)</option></select></div>

<div className="form-group"><label className="form-label">Do any of these apply to you? (select all)</label>
<div style={{"display":"flex","flexDirection":"column","gap":"8px"}} id="meds">
<label className="q-opt" style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 16px","border":"1.5px solid var(--border)","borderRadius":"10px","cursor":"pointer","background":"var(--white)"}}><input type="checkbox" id="diuretic" style={{"display":"none"}} /><span style={{"fontSize":"16px","color":"var(--text)"}}>💊 I take diuretics (water pills)</span></label>
<label className="q-opt" style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 16px","border":"1.5px solid var(--border)","borderRadius":"10px","cursor":"pointer","background":"var(--white)"}}><input type="checkbox" id="glp1med" style={{"display":"none"}} /><span style={{"fontSize":"16px","color":"var(--text)"}}>💉 I take GLP-1 medication (Ozempic, Wegovy, Mounjaro)</span></label>
<label className="q-opt" style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 16px","border":"1.5px solid var(--border)","borderRadius":"10px","cursor":"pointer","background":"var(--white)"}}><input type="checkbox" id="heartfail" style={{"display":"none"}} /><span style={{"fontSize":"16px","color":"var(--text)"}}>❤️ I have heart failure (fluid-restricted)</span></label>
<label className="q-opt" style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 16px","border":"1.5px solid var(--border)","borderRadius":"10px","cursor":"pointer","background":"var(--white)"}}><input type="checkbox" id="kidney" style={{"display":"none"}} /><span style={{"fontSize":"16px","color":"var(--text)"}}>💧 I have kidney disease</span></label>
<label className="q-opt" style={{"display":"flex","alignItems":"center","gap":"10px","padding":"12px 16px","border":"1.5px solid var(--border)","borderRadius":"10px","cursor":"pointer","background":"var(--white)"}}><input type="checkbox" id="coffee" style={{"display":"none"}} /><span style={{"fontSize":"16px","color":"var(--text)"}}>☕ I drink 3+ cups of coffee daily</span></label>
</div></div>

<button className="calc-btn">💧 Calculate My Daily Water Target →</button>

<div className="results" id="results">

<div className="hydra-result" id="hydra-result">
<div className="hydra-big" id="r-oz">72</div>
<div className="hydra-unit" id="r-unit">ounces per day</div>
<div className="hydra-label" id="r-cups">That's about 9 cups (8 oz each)</div>
</div>

<div className="glass-grid" id="glass-grid"></div>
<div style={{"textAlign":"center","fontSize":"14px","color":"var(--muted)","marginBottom":"20px"}}>Each glass = 8 oz (1 cup) — filled glasses show your daily target</div>

<div id="warn-area"></div>

<div className="stats-grid">
<div className="stat-card"><div className="stat-num" id="s-liters">—</div><div className="stat-label">Liters per day</div></div>
<div className="stat-card"><div className="stat-num" id="s-bottles">—</div><div className="stat-label">Water bottles (16.9oz)</div></div>
<div className="stat-card"><div className="stat-num" id="s-pct">—</div><div className="stat-label">From food (~20%)</div></div>
</div>

<div className="meal-plan"><h3>Your daily hydration schedule</h3><div id="sched-items"></div></div>

<div className="compare-note">
<h4>Signs you're not drinking enough</h4>
<p><strong>Check your urine color:</strong> Pale yellow = well hydrated. Dark yellow/amber = dehydrated. Clear = possibly overhydrating. This is the simplest daily hydration test for seniors.</p>
<p><strong>Other warning signs:</strong> Dry mouth, headache, fatigue, dizziness when standing up, constipation, confusion, or dark-colored urine. If you experience confusion alongside dehydration, seek medical attention — it may be mistaken for dementia.</p>
</div>

</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Why hydration is different after 60</h2>
<p>Your body is approximately 60% water at age 30 — but only about 50% water by age 70. This means you have less fluid reserve to begin with. Combined with a weakened thirst response, less efficient kidneys, and medications that increase fluid loss, seniors are at constant risk of dehydration without realizing it.</p>

<h3>The thirst gap — why you can't trust "drink when thirsty"</h3>
<p>The hypothalamus regulates your thirst sensation. After 60, this mechanism becomes less sensitive — you may be significantly dehydrated before you feel any thirst at all. Studies show seniors experience thirst at a higher level of dehydration than younger adults. This is why a scheduled drinking pattern (rather than waiting until thirsty) is essential for older adults.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Source: Kenney WL, Chiu P. "Influence of age on thirst and fluid intake," Medicine and Science in Sports and Exercise, 2001. Institute of Medicine Dietary Reference Intakes for Water, 2004.</em></p>

<h3>Medications that increase dehydration risk</h3>
<p><strong>Diuretics</strong> (furosemide, hydrochlorothiazide) directly increase fluid loss through urination. <strong>Laxatives</strong> pull water into the intestines. <strong>Blood pressure medications</strong> can cause fluid shifts. <strong>GLP-1 medications</strong> (Ozempic, Wegovy, Mounjaro) cause nausea that reduces fluid intake. <strong>SSRIs and antihistamines</strong> can cause dry mouth, masking dehydration. If you take any of these, proactive hydration is critical.</p>

<h3>Hydration and kidney health in seniors</h3>
<p>Adequate hydration is one of the simplest ways to protect aging kidneys. Dehydration concentrates waste products in the blood, forcing kidneys to work harder. Chronic mild dehydration accelerates kidney decline. However, seniors with advanced kidney disease or heart failure may need to LIMIT fluids — always follow your doctor's guidance in these cases.</p>
<p><strong>See our guide:</strong> <a href="/kidney/" style={{"color":"var(--green)","fontWeight":"700"}}>Kidney health supplements for seniors →</a></p>

<h3>Does coffee and tea count?</h3>
<p>Yes — moderate coffee and tea intake (2-3 cups daily) counts toward your fluid target. Despite the mild diuretic effect, your body retains most of the fluid. Soups, fruits (watermelon, oranges), and vegetables (cucumber, celery) also contribute about 20% of daily fluid intake. The key is total fluid from ALL sources — not just plain water.</p>

<h3>Hydration on GLP-1 medications</h3>
<p>Seniors taking Ozempic, Wegovy, or Mounjaro face increased dehydration risk because nausea reduces fluid intake, and the drugs can cause vomiting and diarrhea. If you're on GLP-1 medications, aim for the higher end of your hydration target and sip water throughout the day rather than drinking large amounts at once.</p>
<p><strong>Related:</strong> <a href="/tools/glp1-calculator/" style={{"color":"var(--green)","fontWeight":"700"}}>GLP-1 Weight Loss Calculator →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">How much water should a 70 year old drink?<span className="faq-icon">+</span></button><div className="faq-a">Most seniors need 6-8 cups (48-64 oz) daily, but individual needs vary by weight, activity, medications, and climate. A general rule is half your body weight in ounces. A 160 lb senior needs about 80 oz (10 cups). Seniors on diuretics or with heart failure may need different amounts.</div></div>
<div className="faq-item"><button className="faq-q">Why do seniors get dehydrated easily?<span className="faq-icon">+</span></button><div className="faq-a">Thirst mechanism weakens with age (you don't feel thirsty when dehydrated), kidneys conserve water less efficiently, and medications like diuretics and blood pressure drugs increase fluid loss. Seniors also have less total body water than younger adults.</div></div>
<div className="faq-item"><button className="faq-q">What are signs of dehydration in seniors?<span className="faq-icon">+</span></button><div className="faq-a">Dark yellow urine, dry mouth, headache, fatigue, dizziness when standing, constipation. Advanced: confusion, rapid heartbeat, sunken eyes. Confusion from dehydration is often misdiagnosed as dementia — hydration should always be checked first.</div></div>
<div className="faq-item"><button className="faq-q">Does coffee count toward water intake?<span className="faq-icon">+</span></button><div className="faq-a">Yes — 2-3 cups of coffee/tea count. Despite the mild diuretic effect, you retain most of the fluid. But avoid caffeine after noon as it disrupts sleep. Soups and water-rich fruits also count (about 20% of daily intake).</div></div>
<div className="faq-item"><button className="faq-q">Should I drink more water on diuretics?<span className="faq-icon">+</span></button><div className="faq-a">Depends on WHY you take them. For high blood pressure: possibly increase slightly. For heart failure: your doctor may RESTRICT fluids. Never change fluid intake on diuretics without your doctor's guidance — the balance is critical.</div></div>
<div className="faq-item"><button className="faq-q">Can seniors drink too much water?<span className="faq-icon">+</span></button><div className="faq-a">Yes — overhydration (hyponatremia) is dangerous, especially for seniors on certain medications. It dilutes blood sodium, causing confusion, nausea, seizures. Seniors with heart failure or kidney disease are at highest risk. Follow your calculated target — don't force excess.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/kidney/" className="r-link"><span>💧</span> Kidney supplements</a>
<a href="/tools/glp1-calculator/" className="r-link"><span>⚖️</span> GLP-1 Calculator</a>
<a href="/tools/calorie-calculator/" className="r-link"><span>🔢</span> Calorie Calculator</a>
<a href="/tools/bp-checker/" className="r-link"><span>💓</span> BP Checker</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This calculator provides general hydration estimates. Seniors with heart failure, kidney disease, or those on diuretics may need fluid RESTRICTIONS — always follow your doctor's specific fluid guidelines. This tool does not replace medical advice.</p>
<p>If you experience confusion, rapid heartbeat, or significantly reduced urination, seek medical attention immediately — these are signs of severe dehydration.</p></div>

</div>

<aside className="sidebar"><div className="sidebar-inner">
<h4>On this page</h4>
<a href="#calculator" className="sb-link">Take the Quiz</a>
<a href="#results" className="sb-link">Your Score</a>
<hr className="sb-div" />
<div className="sb-sub"><strong>All health tools</strong>
<a href="/tools/longevity-score/">Biological Age ★</a>
<a href="/tools/heart-age/">Heart Age</a>
<a href="/tools/bp-checker/">BP Checker</a>
<a href="/tools/bone-check/">Bone Health</a>
<a href="/tools/vitamin-d-check/">Vitamin D</a>
<a href="/tools/muscle-loss-risk/">Muscle Loss</a>
<a href="/tools/fall-risk/">Fall Risk</a>
<a href="/tools/memory-check/">Memory Check</a>
<a href="/tools/sleep-score/">Sleep Quiz</a>
<a href="/tools/diabetes-risk/">Diabetes Risk</a>
<a href="/tools/bmi-senior/">BMI for Seniors</a>
<a href="/tools/mood-check/">Mood Check</a>
<a href="/tools/prostate-check/">Prostate Check</a>
<a href="/tools/kidney-check/">Kidney Check</a>
<a href="/tools/eye-check/">Eye Check</a>
<a href="/tools/digestion-check/">Digestion Quiz</a>
<a href="/tools/protein-calculator/">Protein Calc</a>
<a href="/tools/calorie-calculator/">Calorie Calc</a>
<a href="/tools/hydration/">Hydration</a>
<a href="/tools/glp1-calculator/">GLP-1 Calc</a>
<a href="/tools/supplement-budget/">Budget Planner</a>
</div>
<hr className="sb-div" />
<div className="sb-sub"><strong>Supplement guides</strong>
<a href="/longevity/">Longevity</a>
<a href="/heart/">Heart health</a>
<a href="/brain/">Brain &amp; memory</a>
<a href="/joints/">Joints &amp; bones</a>
<a href="/prostate/">Prostate</a>
<a href="/sleep/">Sleep</a>
<a href="/digestion/">Digestion</a>
<a href="/eyes/">Eye health</a>
<a href="/kidney/">Kidney</a>
<a href="/blood-pressure/">Blood pressure</a>
<a href="/skin-hair/">Skin &amp; hair</a>
<a href="/liver/">Liver</a>
</div>
</div></aside>
</div>


    </>
  );
}
