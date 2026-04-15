'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function Glp1CalculatorPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `var weightUnit='lbs', heightUnit='imperial';
var ws=document.getElementById('weight'), gs=document.getElementById('goal');
var wd=document.getElementById('wt-display'), gd=document.getElementById('goal-display');

function updateSliderBg(s){var p=((s.value-s.min)/(s.max-s.min))*100;s.style.background='linear-gradient(90deg,#1A5632 '+p+'%,#E8E6E1 '+p+'%)';}
ws.oninput=function(){wd.textContent=this.value;updateSliderBg(this);};
gs.oninput=function(){gd.textContent=this.value;updateSliderBg(this);};
updateSliderBg(ws);updateSliderBg(gs);

function setWeightUnit(u){
  weightUnit=u;
  document.querySelectorAll('#wt-toggle .unit-btn').forEach(function(b){b.classList.remove('active');});
  event.target.classList.add('active');
  if(u==='kg'){ws.min=55;ws.max=180;ws.value=91;wd.textContent='91';gs.min=45;gs.max=160;gs.value=77;gd.textContent='77';
    document.getElementById('wt-unit').textContent='kg';document.getElementById('goal-unit').textContent='kg';
  }else{ws.min=120;ws.max=400;ws.value=200;wd.textContent='200';gs.min=100;gs.max=350;gs.value=170;gd.textContent='170';
    document.getElementById('wt-unit').textContent='lbs';document.getElementById('goal-unit').textContent='lbs';
  }
  updateSliderBg(ws);updateSliderBg(gs);
}
function setHeightUnit(u){
  heightUnit=u;
  document.querySelectorAll('#ht-toggle .unit-btn').forEach(function(b){b.classList.remove('active');});
  event.target.classList.add('active');
  document.getElementById('ht-imperial').style.display=u==='imperial'?'grid':'none';
  document.getElementById('ht-metric').style.display=u==='metric'?'block':'none';
}

var medData={
  ozempic:{name:'Ozempic',pct:12,wk:68,doses:[{w:'1-4',mg:'0.25 mg/wk',n:'Starting — body adjusts'},{w:'5-8',mg:'0.5 mg/wk',n:'Appetite suppression begins'},{w:'9-12',mg:'1.0 mg/wk',n:'Standard maintenance'},{w:'13+',mg:'1.0-2.0 mg/wk',n:'Max dose per your doctor'}]},
  wegovy:{name:'Wegovy',pct:15,wk:68,doses:[{w:'1-4',mg:'0.25 mg/wk',n:'Starting dose'},{w:'5-8',mg:'0.5 mg/wk',n:'Appetite changes begin'},{w:'9-12',mg:'1.0 mg/wk',n:'Moderate weight loss'},{w:'13-16',mg:'1.7 mg/wk',n:'Strong appetite reduction'},{w:'17+',mg:'2.4 mg/wk',n:'Full maintenance — peak effect'}]},
  mounjaro:{name:'Mounjaro',pct:22,wk:72,doses:[{w:'1-4',mg:'2.5 mg/wk',n:'GI adjustment phase'},{w:'5-8',mg:'5.0 mg/wk',n:'Appetite changes noticeable'},{w:'9-12',mg:'7.5 mg/wk',n:'Steady weight loss'},{w:'13-16',mg:'10.0 mg/wk',n:'Strong suppression'},{w:'17-20',mg:'12.5 mg/wk',n:'Near-max effectiveness'},{w:'21+',mg:'15.0 mg/wk',n:'Full maintenance'}]},
  zepbound:{name:'Zepbound',pct:20,wk:72,doses:[{w:'1-4',mg:'2.5 mg/wk',n:'Starting dose'},{w:'5-8',mg:'5.0 mg/wk',n:'Appetite changes begin'},{w:'9-12',mg:'7.5 mg/wk',n:'Consistent weight loss'},{w:'13-16',mg:'10.0 mg/wk',n:'Strong results'},{w:'17-20',mg:'12.5 mg/wk',n:'Approaching peak'},{w:'21+',mg:'15.0 mg/wk',n:'Full maintenance'}]}
};

function calculate(){
  var med=document.getElementById('medication').value;
  var age=parseInt(document.getElementById('age').value);
  var sex=document.getElementById('sex').value;
  var wt=parseInt(ws.value);
  var gl=parseInt(gs.value);
  var act=document.getElementById('activity').value;
  if(!med){alert('Please select your GLP-1 medication');return;}
  if(!age){alert('Please select your age range');return;}

  // Convert to lbs internally
  var wtLbs=weightUnit==='kg'?Math.round(wt*2.205):wt;
  var glLbs=weightUnit==='kg'?Math.round(gl*2.205):gl;
  if(glLbs>=wtLbs){alert('Goal weight must be less than current weight');return;}

  // Height in inches
  var htIn;
  if(heightUnit==='metric'){htIn=Math.round(parseInt(document.getElementById('cm').value)/2.54);}
  else{htIn=parseInt(document.getElementById('feet').value)*12+parseInt(document.getElementById('inches').value);}

  var d=medData[med];
  // Age adjustment
  var am=age>=75?0.72:age>=70?0.78:age>=65?0.84:age>=60?0.90:0.95;
  var sm=sex==='male'?1.05:0.95;
  var xm=act==='sedentary'?0.88:act==='light'?1.0:act==='moderate'?1.1:1.18;

  var adjPct=(d.pct/100)*am*sm*xm;
  var projLoss=Math.round(wtLbs*adjPct);
  var actualLoss=Math.min(projLoss,wtLbs-glLbs);
  var finalWt=wtLbs-actualLoss;
  var bmi=((finalWt/(htIn*htIn))*703).toFixed(1);
  var weeklyRate=projLoss/d.wk;
  var weeksToGoal=Math.min(Math.ceil(actualLoss/weeklyRate),d.wk+20);
  var months=Math.ceil(weeksToGoal/4.33);

  // Display in user's unit
  var dispLoss=weightUnit==='kg'?Math.round(actualLoss/2.205):actualLoss;
  var dispFinal=weightUnit==='kg'?Math.round(finalWt/2.205):finalWt;
  var unitLabel=weightUnit==='kg'?'kg':'lbs';

  // Protein target (1.0-1.2g per kg)
  var finalKg=finalWt*0.4536;
  var pLow=Math.round(finalKg*1.0),pHigh=Math.round(finalKg*1.2);
  document.getElementById('protein-target').textContent=pLow+'-'+pHigh;

  // Update display
  document.getElementById('r-total').textContent='-'+dispLoss+' '+unitLabel;
  document.getElementById('r-weeks').textContent=weeksToGoal;
  document.getElementById('r-pct').textContent='~'+Math.round((actualLoss/wtLbs)*100)+'% of your body weight with '+d.name;
  document.getElementById('s-final').textContent=dispFinal;
  document.getElementById('s-final-unit').textContent=unitLabel;
  document.getElementById('s-bmi').textContent=bmi;
  document.getElementById('s-months').textContent=months;

  buildChart(wtLbs,actualLoss,weeksToGoal,unitLabel);
  buildDoses(d);

  document.getElementById('results').classList.add('show');
  setTimeout(function(){document.getElementById('results').scrollIntoView({behavior:'smooth',block:'start'});},100);
}

function buildChart(startWt,totalLoss,totalWk,unit){
  var c=document.getElementById('chart'),lb=document.getElementById('chart-labels'),yl=document.getElementById('y-labels');
  c.innerHTML='';lb.innerHTML='';yl.innerHTML='';
  var n=Math.min(totalWk,20);var iv=Math.max(1,Math.floor(totalWk/n));
  var cw=c.offsetWidth||500;var bw=Math.max(10,Math.floor((cw-20)/n)-4);

  for(var i=0;i<=4;i++){var s=document.createElement('span');
    var v=Math.round((totalLoss/4)*(4-i));
    s.textContent=unit==='kg'?'-'+Math.round(v/2.205):'-'+v;yl.appendChild(s);}

  for(var i=0;i<=n;i++){
    var wk=Math.min(i*iv,totalWk);
    var t=wk/totalWk;var sc=1/(1+Math.exp(-10*(t-0.35)));
    var lost=Math.round(totalLoss*sc);var hPct=(lost/totalLoss)*100;
    var bar=document.createElement('div');bar.className='chart-bar';
    bar.style.left=(i*(bw+4)+4)+'px';bar.style.width=bw+'px';bar.style.height='0px';
    var dispLost=unit==='kg'?Math.round(lost/2.205):lost;
    bar.innerHTML='<span class="tip">Week '+wk+': -'+dispLost+' '+unit+'</span>';
    c.appendChild(bar);
    (function(b,h){setTimeout(function(){b.style.height=Math.max(2,h)+'%';},100+i*60);})(bar,hPct);
    if(i%Math.max(1,Math.floor(n/5))===0||i===n){var l=document.createElement('span');l.textContent='Wk '+wk;lb.appendChild(l);}
  }
}

function buildDoses(d){
  var c=document.getElementById('dose-timeline');c.innerHTML='';
  d.doses.forEach(function(dose,i){
    var div=document.createElement('div');
    div.className='dose-phase'+(i===d.doses.length-1?' active':'');
    div.innerHTML='<span class="dose-week">Weeks '+dose.w+'</span><div><div class="dose-mg">'+dose.mg+'</div><div class="dose-note">'+dose.n+'</div></div>';
    c.appendChild(div);
  });
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
.ad-slot{text-align:center;margin:24px 0;min-height:90px;background:#F5F4F1;border:1px dashed #D3D1C7;border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:14px}
.calc-card{background:var(--white);border:2px solid var(--green);border-radius:16px;padding:32px 28px;margin:28px 0;position:relative;overflow:hidden}
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
.slider-wrap{margin-top:8px}.slider-val{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.slider-num{font-size:28px;font-weight:700;color:var(--green)}.slider-unit{font-size:15px;color:var(--muted)}
input[type="range"]{-webkit-appearance:none;width:100%;height:8px;border-radius:4px;background:#E8E6E1;outline:none;cursor:pointer}
input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:28px;height:28px;border-radius:50%;background:var(--green);border:3px solid var(--white);box-shadow:0 2px 6px rgba(0,0,0,.2)}
input[type="range"]::-moz-range-thumb{width:28px;height:28px;border-radius:50%;background:var(--green);border:3px solid var(--white);box-shadow:0 2px 6px rgba(0,0,0,.2)}
.calc-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,#1A5632,#22703F);color:#fff;border:none;padding:18px 32px;border-radius:12px;font:inherit;font-size:20px;font-weight:700;cursor:pointer;width:100%;min-height:60px;box-shadow:0 4px 14px rgba(26,86,50,.3);transition:transform .1s}
.calc-btn:hover{transform:translateY(-1px)}.calc-btn:active{transform:translateY(0)}
.results{display:none;margin-top:28px}.results.show{display:block;animation:fadeIn .5s}
@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.result-hero{background:linear-gradient(135deg,#F0FAF3,#E8F5E9);border:2px solid #A7D8B8;border-radius:14px;padding:28px 24px;text-align:center;margin-bottom:24px}
.result-big{font-size:52px;font-weight:700;color:var(--green);line-height:1.1}.result-label{font-size:16px;color:var(--t2);margin-top:4px}.result-sub{font-size:15px;color:var(--muted);margin-top:8px}
.stats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:24px}
.stat-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:18px 16px;text-align:center}
.stat-num{font-size:26px;font-weight:700;line-height:1.2}.stat-label{font-size:13px;color:var(--muted);margin-top:4px}
.stat-green .stat-num{color:#1A5632}.stat-blue .stat-num{color:#2563EB}.stat-amber .stat-num{color:#D97706}
.timeline-card{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:24px;margin-bottom:24px}
.timeline-card h3{font-size:19px;font-weight:700;margin-bottom:16px}
.chart-area{position:relative;height:260px;border-left:2px solid var(--border);border-bottom:2px solid var(--border);margin:0 0 12px 44px}
.chart-bar{position:absolute;bottom:0;background:linear-gradient(180deg,#4ADE80,#1A5632);border-radius:4px 4px 0 0;transition:height .6s ease-out;cursor:pointer}
.chart-bar .tip{display:none;position:absolute;top:-38px;left:50%;transform:translateX(-50%);background:#2C2C2A;color:#fff;font-size:12px;padding:4px 10px;border-radius:6px;white-space:nowrap;font-weight:600;z-index:10}
.chart-bar:hover .tip{display:block}
.chart-labels{display:flex;justify-content:space-between;margin-left:44px;font-size:12px;color:var(--muted)}
.y-labels{position:absolute;left:0;top:0;bottom:0;width:44px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;padding-right:8px;font-size:11px;color:var(--muted)}
.dose-phase{display:flex;align-items:center;gap:12px;padding:14px 16px;background:#F8FAF8;border-radius:10px;border-left:4px solid var(--green);margin-bottom:8px}
.dose-phase.active{background:#F0FAF3;border-left-color:#4ADE80}
.dose-week{font-size:13px;font-weight:700;color:var(--green);min-width:70px}.dose-mg{font-size:16px;font-weight:700;color:var(--text)}.dose-note{font-size:13px;color:var(--muted)}
.senior-warn{background:#FFF8E8;border:2px solid #E8D48B;border-radius:14px;padding:24px;margin-bottom:24px}
.senior-warn h3{font-size:19px;font-weight:700;color:#7A5F00;margin-bottom:12px}
.warn-chk{display:flex;align-items:flex-start;gap:9px;margin-bottom:8px}.warn-chk .tick{color:#B8860B;font-size:18px;flex-shrink:0;line-height:1.3}.warn-chk span{font-size:15px;color:#6D4C00;line-height:1.45}
.med-table{width:100%;border-collapse:collapse;margin:20px 0;font-size:15px}
.med-table th{background:var(--green);color:#fff;padding:12px 14px;text-align:left;font-size:14px}.med-table td{padding:11px 14px;border-bottom:1px solid var(--border)}
.med-table tr:nth-child(even) td{background:#FAFAF8}.med-table .hl td{background:#F0FAF3;font-weight:600}
.content-section{margin:32px 0}.content-section h2{font-size:24px;font-weight:700;margin-bottom:14px}.content-section h3{font-size:20px;font-weight:700;color:var(--green);margin:20px 0 10px}.content-section p{font-size:17px;color:var(--t2);line-height:1.7;margin-bottom:14px}
.faq{margin:36px 0}.faq h2{font-size:24px;font-weight:700;margin-bottom:20px;text-align:center}.faq-item{background:var(--white);border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px}.faq-q{padding:16px 22px;font-size:18px;font-weight:600;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:none;width:100%;text-align:left;font-family:inherit;line-height:1.4}.faq-q:hover{background:#FAFAF8}.faq-icon{font-size:22px;color:var(--muted);flex-shrink:0;transition:transform .2s}.faq-q.active .faq-icon{transform:rotate(45deg)}.faq-a{padding:0 22px 16px;font-size:16px;color:var(--t2);line-height:1.65;display:none}.faq-a.show{display:block}
.related{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin:32px 0}.related h3{font-size:20px;font-weight:700;margin-bottom:16px}.r-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.r-link{display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid var(--border);border-radius:10px;text-decoration:none;color:var(--green);font-weight:600;font-size:16px}.r-link:hover{border-color:#c5c3be}
.disc{background:#F5F4F1;border-radius:var(--r);padding:24px;margin:0 0 40px}.disc h4{font-size:16px;font-weight:700;margin-bottom:8px}.disc p{font-size:14px;color:var(--muted);line-height:1.7}.disc p+p{margin-top:8px}
.sidebar{width:240px;flex-shrink:0;position:sticky;top:70px;display:none}.sidebar-inner{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:18px}.sidebar h4{font-size:15px;font-weight:700;margin-bottom:14px}.sb-link{display:block;padding:8px 10px;border-radius:8px;text-decoration:none;background:#F8FAF8;font-size:14px;font-weight:600;color:var(--green);margin-bottom:6px}.sb-link:hover{background:#E8F5E9}.sb-div{border:none;border-top:1px solid var(--border);margin:12px 0}.sb-sub{font-size:13px;color:var(--muted);margin-top:12px}.sb-sub a{color:var(--green);text-decoration:none;display:block;padding:5px 0;font-weight:600}
@media(min-width:1000px){.sidebar{display:block}}@media(max-width:999px){.main-wrap{max-width:800px}}
.ftr{border-top:1px solid var(--border);background:linear-gradient(180deg,#FAFDFB,#F7F6F3);padding:36px 20px 20px;text-align:center}.ftr-inner{max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px}.ftr-logo{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--text)}.ftr-logo svg{width:22px;height:22px}.ftr-logo span{font-size:22px;font-weight:700}.ftr-logo:hover span{color:var(--green)}.ftr-links{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 20px;list-style:none}.ftr-links a{display:inline-block;padding:8px 4px;text-decoration:none;color:var(--text);font-weight:600;font-size:15px;min-height:44px;border-bottom:2px solid transparent}.ftr-links a:hover{color:var(--green)}.ftr-btm{max-width:700px;margin:0 auto;padding:14px 20px 8px;text-align:center;border-top:1px dashed #E0DDD8}.ftr-btm p{margin:0 0 4px;color:var(--muted);font-size:14px}
@media(max-width:700px){.page-hero{padding:28px 20px 24px}.page-hero h1{font-size:26px}.calc-card{padding:24px 18px}.form-row{grid-template-columns:1fr}.stats-grid{grid-template-columns:1fr}.result-big{font-size:40px}.chart-area{height:200px;margin-left:34px}.y-labels{width:34px;font-size:10px}.chart-labels{margin-left:34px;font-size:10px}.r-grid{grid-template-columns:1fr}.faq-q{font-size:17px;padding:14px 18px}.med-table{font-size:13px}.med-table th,.med-table td{padding:8px 10px}}
      `}</style>
<div className="main-wrap">
<div className="main">

<div className="ad-slot">
<ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="8981383031" data-ad-format="auto" data-full-width-responsive="true"></ins>

</div>

<div className="calc-card" id="calculator">
<div className="calc-title">Calculate Your GLP-1 Weight Loss Projection</div>
<div className="calc-sub">Enter your details — calculations based on published clinical trial data</div>

<div className="form-group">
<label className="form-label">Select your GLP-1 medication</label>
<select className="form-select" id="medication">
<option value="">Choose your medication...</option>
<option value="ozempic">Ozempic (semaglutide 0.25–2.0 mg)</option>
<option value="wegovy">Wegovy (semaglutide 0.25–2.4 mg)</option>
<option value="mounjaro">Mounjaro (tirzepatide 2.5–15 mg)</option>
<option value="zepbound">Zepbound (tirzepatide 2.5–15 mg)</option>
</select>
</div>

<div className="form-row">
<div className="form-group"><label className="form-label">Your age</label>
<select className="form-select" id="age"><option value="">Select...</option><option value="55">55–59</option><option value="62" selected>60–64</option><option value="67">65–69</option><option value="72">70–74</option><option value="77">75+</option></select></div>
<div className="form-group"><label className="form-label">Biological sex</label>
<select className="form-select" id="sex"><option value="female">Female</option><option value="male">Male</option></select></div>
</div>

<div className="form-group">
<label className="form-label">Your current weight</label>
<div className="unit-toggle" id="wt-toggle">
<button className="unit-btn active">lbs</button>
<button className="unit-btn">kg</button>
</div>
<div className="slider-wrap">
<div className="slider-val"><span className="slider-num" id="wt-display">200</span><span className="slider-unit" id="wt-unit">lbs</span></div>
<input type="range" id="weight" min="120" max="400" value="200" step="1" />
</div>
</div>

<div className="form-group">
<label className="form-label">Your height</label>
<div className="unit-toggle" id="ht-toggle">
<button className="unit-btn active">ft / in</button>
<button className="unit-btn">cm</button>
</div>
<div id="ht-imperial" className="form-row">
<div><label className="form-hint">Feet</label><select className="form-select" id="feet"><option value="4">4 ft</option><option value="5" selected>5 ft</option><option value="6">6 ft</option></select></div>
<div><label className="form-hint">Inches</label><select className="form-select" id="inches"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6" selected>6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></select></div>
</div>
<div id="ht-metric" style={{"display":"none"}}>
<label className="form-hint">Centimeters</label>
<input type="number" className="form-input" id="cm" value="168" min="120" max="220" step="1" />
</div>
</div>

<div className="form-group">
<label className="form-label">Your goal weight</label>
<div className="slider-wrap">
<div className="slider-val"><span className="slider-num" id="goal-display">170</span><span className="slider-unit" id="goal-unit">lbs</span></div>
<input type="range" id="goal" min="100" max="350" value="170" step="1" />
</div>
</div>

<div className="form-group">
<label className="form-label">Activity level</label>
<select className="form-select" id="activity">
<option value="sedentary">Sedentary (little or no exercise)</option>
<option value="light" selected>Light activity (walking, light chores)</option>
<option value="moderate">Moderate (exercise 2-3 times/week)</option>
<option value="active">Active (exercise 4-5 times/week)</option>
</select>
</div>

<button className="calc-btn">Calculate My Projected Weight Loss →</button>

<div className="results" id="results">
<div className="result-hero">
<div className="result-big" id="r-total">-30 lbs</div>
<div className="result-label">Projected weight loss over <span id="r-weeks">68</span> weeks</div>
<div className="result-sub" id="r-pct">~15% of your body weight</div>
</div>
<div className="stats-grid">
<div className="stat-card stat-green"><div className="stat-num" id="s-final">170</div><div className="stat-label">Final weight (<span id="s-final-unit">lbs</span>)</div></div>
<div className="stat-card stat-blue"><div className="stat-num" id="s-bmi">26.2</div><div className="stat-label">Projected BMI</div></div>
<div className="stat-card stat-amber"><div className="stat-num" id="s-months">17</div><div className="stat-label">Months to goal</div></div>
</div>

<div className="timeline-card"><h3>Your projected weight loss timeline</h3>
<div style={{"position":"relative"}}><div className="y-labels" id="y-labels"></div><div className="chart-area" id="chart"></div></div>
<div className="chart-labels" id="chart-labels"></div></div>

<div className="timeline-card"><h3>Your dosing schedule</h3><div id="dose-timeline"></div></div>

<div className="senior-warn"><h3>Important for adults over 60</h3>
<div className="warn-chk"><span className="tick">⚠</span><span><strong>Muscle loss:</strong> Up to 40% of weight lost can be muscle. Do resistance training 2-3x/week and eat <strong id="protein-target">80-96</strong>g protein daily.</span></div>
<div className="warn-chk"><span className="tick">⚠</span><span><strong>Dehydration:</strong> GLP-1 drugs reduce fluid intake via nausea. Drink 8+ glasses of water daily. Watch for dizziness.</span></div>
<div className="warn-chk"><span className="tick">⚠</span><span><strong>Medications:</strong> Tell your doctor about ALL medications — especially insulin, sulfonylureas, and blood thinners.</span></div>
<div className="warn-chk"><span className="tick">⚠</span><span><strong>Bone density:</strong> Rapid weight loss reduces bone density. Take Vitamin D3+K2 and ask about a DEXA scan.</span></div>
<div className="warn-chk"><span className="tick">⚠</span><span><strong>Kidneys:</strong> Monitor kidney function (GFR/creatinine) regularly while on GLP-1 therapy.</span></div>
</div>
</div>
</div>

<div className="ad-slot">
<ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins>

</div>

<div className="content-section">
<h2>What your GLP-1 results mean after age 60</h2>
<p>GLP-1 medications like Ozempic, Wegovy, and Mounjaro are transforming weight management for older adults. But the results — and the risks — are different for seniors. Here's what clinical evidence says specifically about adults over 60.</p>
<h3>How GLP-1 medications work</h3>
<p>GLP-1 receptor agonists mimic a natural gut hormone that signals your brain to feel full. They slow stomach emptying, reduce appetite, and regulate blood sugar. Tirzepatide (Mounjaro/Zepbound) targets two receptors (GLP-1 and GIP) for even greater effects. All are administered as once-weekly injections.</p>
<h3>Why seniors may lose slightly less weight</h3>
<p>Clinical trials primarily enrolled adults aged 18-65. Seniors over 65 typically lose 10-15% of body weight compared to 15-22% in younger participants. Metabolism naturally slows with age, and seniors often have less excess fat to lose. However, even 10% weight loss produces significant health improvements — lower blood pressure, better blood sugar, less joint pain, and improved mobility.</p>
<h3>The muscle loss problem — critical for seniors</h3>
<p>This is the biggest concern. Research from 2024 found that 20-40% of weight lost on semaglutide can be lean muscle. Seniors already lose muscle naturally (sarcopenia), so GLP-1 drugs can accelerate frailty, increase fall risk, and reduce independence. The solution: strength training 2-3 times per week and eating 1.0-1.2g protein per kg of body weight daily.</p>
<h3>Cardiovascular benefit</h3>
<p>The SELECT trial showed semaglutide 2.4mg reduced heart attack, stroke, and cardiovascular death risk — even in people without diabetes. A 2026 analysis estimated a 1.9-year life expectancy gain. For seniors with heart risk factors, GLP-1 medications offer benefits beyond weight loss alone.</p>
</div>

<div className="content-section">
<h2>GLP-1 medication comparison for seniors</h2>
<table className="med-table">
<thead><tr><th>Medication</th><th>Ingredient</th><th>Avg. Loss</th><th>Titration</th><th>Senior Data</th></tr></thead>
<tbody>
<tr><td><strong>Ozempic</strong></td><td>Semaglutide</td><td>~12%</td><td>16 wk</td><td>Most studied</td></tr>
<tr className="hl"><td><strong>Wegovy</strong></td><td>Semaglutide</td><td>~15%</td><td>16 wk</td><td>Good safety</td></tr>
<tr><td><strong>Mounjaro</strong></td><td>Tirzepatide</td><td>~22%</td><td>20 wk</td><td>Less data</td></tr>
<tr><td><strong>Zepbound</strong></td><td>Tirzepatide</td><td>~20%</td><td>20 wk</td><td>Less data</td></tr>
</tbody></table>
<p style={{"fontSize":"14px","color":"var(--muted)"}}>Averages from clinical trials. Individual results vary. This is not medical advice.</p>
</div>

<div className="ad-slot">
<ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins>

</div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">How much weight will I lose on Ozempic at age 60+?<span className="faq-icon">+</span></button><div className="faq-a">Clinical trials show 12-15% body weight loss with semaglutide over 68 weeks. For a 200 lb senior, that's roughly 24-30 lbs. Seniors may lose slightly less than younger adults due to slower metabolism, but results are still clinically significant.</div></div>
<div className="faq-item"><button className="faq-q">Is Ozempic safe for seniors over 65?<span className="faq-icon">+</span></button><div className="faq-a">Generally safe but requires careful monitoring for muscle loss (sarcopenia), dehydration, medication interactions, and kidney function changes. Always work with your doctor to adjust dosing.</div></div>
<div className="faq-item"><button className="faq-q">How do I prevent muscle loss on GLP-1 medications?<span className="faq-icon">+</span></button><div className="faq-a">Eat 1.0-1.2g protein per kg of body weight daily, resistance train 2-3x/week, take Vitamin D3+K2, and consider creatine. Up to 40% of weight lost can be muscle — protecting it is critical for seniors.</div></div>
<div className="faq-item"><button className="faq-q">Which GLP-1 works best for seniors?<span className="faq-icon">+</span></button><div className="faq-a">Ozempic/Wegovy (semaglutide) have the most long-term senior safety data. Mounjaro (tirzepatide) produces greater weight loss but less senior-specific data. Your doctor will choose based on your health profile.</div></div>
<div className="faq-item"><button className="faq-q">Does Medicare cover Ozempic for weight loss?<span className="faq-icon">+</span></button><div className="faq-a">As of 2025-2026, Medicare does not cover GLP-1 medications for weight loss. If you have Type 2 diabetes, Medicare Part D may cover Ozempic for blood sugar management. Coverage expansion is being debated in Congress.</div></div>
<div className="faq-item"><button className="faq-q">How long until I see results?<span className="faq-icon">+</span></button><div className="faq-a">Appetite suppression starts within the first week. Measurable weight loss begins by week 4-8. The drug reaches steady state after ~5 weeks. Maximum results at 12-18 months of continuous use.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/heart/" className="r-link"><span>❤️</span> Heart supplements</a>
<a href="/blood-pressure/" className="r-link"><span>💓</span> Blood pressure supplements</a>
<a href="/digestion/" className="r-link"><span>🍃</span> Digestion supplements</a>
<a href="/longevity/" className="r-link"><span>🧬</span> Longevity supplements</a>
</div></div>

<div className="content-section">
<h3>Why GLP-1 weight loss is different for seniors</h3>
<p>GLP-1 receptor agonists like Ozempic, Wegovy, and Mounjaro have transformed weight management, but seniors face unique challenges that younger users don't. The biggest concern: up to 40% of weight lost on GLP-1 medications can be muscle, not just fat. For seniors already losing muscle naturally (3-8% per decade after 30), this accelerated muscle loss can trigger a dangerous cascade — weakness, balance problems, falls, and fractures.</p>

<h3>The muscle preservation protocol</h3>
<p>Protecting muscle while on GLP-1 medications requires three strategies working together. First, protein intake must increase to 1.0-1.2g per kilogram of body weight daily — spread across at least 3 meals with 25-30g per meal to maximize muscle protein synthesis. Second, resistance training (weight lifting, bands, bodyweight exercises) 2-3 times per week directly signals muscles to stay. Third, adequate Vitamin D3 (2000-4000 IU daily) supports the fast-twitch muscle fibers most vulnerable to loss.</p>
<p><strong>Related tools:</strong> <a href="/tools/protein-calculator/" style={{"color":"var(--green)","fontWeight":"700"}}>Calculate your exact protein needs →</a> | <a href="/tools/muscle-loss-risk/" style={{"color":"var(--green)","fontWeight":"700"}}>Muscle loss risk quiz →</a> | <a href="/tools/calorie-calculator/" style={{"color":"var(--green)","fontWeight":"700"}}>Calorie needs on GLP-1 →</a></p>

<h3>Medicare coverage and costs in 2025-2026</h3>
<p>As of early 2026, Medicare does not cover GLP-1 medications for weight loss alone. If you have a Type 2 diabetes diagnosis, Medicare Part D may cover Ozempic for blood sugar management (the weight loss is a secondary benefit). Without insurance, monthly costs range from $900-1,300 for brand-name GLP-1 medications. Compounded semaglutide from specialized pharmacies may cost $200-400 monthly but is not FDA-approved. The Inflation Reduction Act may expand coverage — check with your Medicare plan for the latest status.</p>

<h3>Which GLP-1 medication is right for seniors?</h3>
<p>Semaglutide (Ozempic/Wegovy) has the most long-term safety data in adults over 65 and produces 12-15% body weight loss over 68 weeks. Tirzepatide (Mounjaro/Zepbound) produces greater weight loss (15-22%) but has less senior-specific safety data. Liraglutide (Saxenda) produces more modest results (5-8%) but has the longest track record. Your doctor should consider your kidney function, gastroparesis risk, and medication interactions when choosing. Never start or change GLP-1 medications without medical supervision.</p>
</div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This calculator provides ESTIMATES based on STEP-1 and SURMOUNT-1 clinical trial data. Individual results vary significantly. This is NOT medical advice. GLP-1 medications are prescription-only — never start, stop, or change dosage without consulting your doctor.</p>
<p>If you experience severe side effects (severe nausea, pancreatitis symptoms, vision changes), contact your healthcare provider immediately.</p></div>

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
