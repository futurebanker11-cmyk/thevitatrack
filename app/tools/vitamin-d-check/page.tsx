'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function VitaminDCheckPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `(adsbygoogle = window.adsbygoogle || []).push({});
(adsbygoogle = window.adsbygoogle || []).push({});
document.write(new Date().getFullYear())
function sel(el){
  el.closest('.q-options').querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected')});
  el.classList.add('selected');
  el.querySelector('input').checked=true;
}

function scoreRisk(){
  var cats=[
    {q:'q1',label:'Sun exposure'},
    {q:'q2',label:'D3 supplementation'},
    {q:'q3',label:'Dietary vitamin D'},
    {q:'q4',label:'Geographic latitude'},
    {q:'q5',label:'Fatigue & muscle weakness'},
    {q:'q6',label:'Bone pain / osteoporosis'},
    {q:'q7',label:'Immune function'},
    {q:'q8',label:'Mood / seasonal depression'},
    {q:'q9',label:'Body weight (obesity traps D)'},
    {q:'q10',label:'Blood testing status'}
  ];

  var total=0,scores=[];
  for(var i=0;i<cats.length;i++){
    var checked=document.querySelector('input[name="'+cats[i].q+'"]:checked');
    if(!checked){alert('Please answer all 10 questions (question '+(i+1)+' is missing)');return;}
    var val=parseInt(checked.value);
    total+=val;
    scores.push({label:cats[i].label,val:val,max:3});
  }

  var riskPct=Math.round((total/30)*100);

  var cls,emoji,label,sub;
  if(riskPct<=15){cls='low';emoji='☀️';label='Low Deficiency Risk';sub='Your vitamin D habits are excellent. Continue supplementing and get levels checked annually.';}
  else if(riskPct<=35){cls='low';emoji='🌤️';label='Low-to-Moderate Risk';sub='Some risk factors present. Consider increasing your D3 intake and getting blood levels tested.';}
  else if(riskPct<=55){cls='moderate';emoji='⚠️';label='Moderate Deficiency Risk';sub='Multiple factors suggest your vitamin D may be low. Get a 25-hydroxyvitamin D blood test and start supplementing.';}
  else if(riskPct<=75){cls='high';emoji='🟠';label='High Deficiency Risk';sub='Strong likelihood of vitamin D deficiency. Get tested and start 2000-4000 IU D3+K2 daily.';}
  else{cls='high';emoji='🔴';label='Very High Deficiency Risk';sub='Your profile strongly suggests deficiency. See your doctor for testing and consider a loading dose to restore levels quickly.';}

  document.getElementById('risk-result').className='risk-result '+cls;
  document.getElementById('r-emoji').textContent=emoji;
  document.getElementById('r-score').textContent=riskPct;
  document.getElementById('r-label').textContent=label;
  document.getElementById('r-sub').textContent=sub;

  var bd=document.getElementById('bd-list');bd.innerHTML='';
  scores.forEach(function(s){
    var riskBar=Math.round((s.val/s.max)*100);
    var barCls=riskBar<=33?'high':riskBar<=66?'mid':'low';
    var d=document.createElement('div');d.className='bd-item';
    d.innerHTML='<span class="bd-cat">'+s.label+'</span><div class="bd-bar-wrap"><div class="bd-bar '+barCls+'" style="width:0%"></div></div><span class="bd-score">'+s.val+'/3</span>';
    bd.appendChild(d);
    setTimeout(function(){d.querySelector('.bd-bar').style.width=riskBar+'%';},100);
  });

  var ap=document.getElementById('ap-list');ap.innerHTML='';
  var plan=[];
  var apEl=document.getElementById('action-plan');

  if(riskPct>55){
    apEl.className='action-plan urgent';
    document.getElementById('ap-title').textContent='Action needed — optimize your vitamin D';
    plan.push({ic:'🔬',t:'<strong>Get your vitamin D level tested now.</strong> Ask your doctor for a "25-hydroxyvitamin D" blood test. Optimal is 40-60 ng/mL. Below 20 is deficient. Below 30 is insufficient. This single test can explain many of the symptoms you reported.'});
    plan.push({ic:'💊',t:'<strong>Start 2000-4000 IU vitamin D3 + K2 daily.</strong> Choose D3 (not D2). Take with your fattiest meal for absorption. Add K2 MK-7 (100-200mcg) to direct calcium to bones not arteries. <a href="/longevity/" style="color:var(--green);font-weight:700">See our longevity supplement guide →</a>'});
  }else if(riskPct>30){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your vitamin D optimization plan';
    plan.push({ic:'📋',t:'<strong>You have some risk factors.</strong> Consider increasing D3 to 2000+ IU daily and getting blood levels checked at your next doctor visit.'});
  }else{
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your vitamin D maintenance plan';
    plan.push({ic:'✅',t:'<strong>Your vitamin D habits look strong!</strong> Continue current supplementation and retest annually to confirm levels stay at 40-60 ng/mL.'});
  }

  if(scores[0].val>=2) plan.push({ic:'☀️',t:'<strong>Low sun exposure is your biggest risk.</strong> Try 15-20 min of midday sunlight on exposed skin when possible. But after 60, sun alone won\\'t provide enough — supplementation is essential regardless of sun exposure.'});
  if(scores[1].val>=2) plan.push({ic:'💊',t:'<strong>You need a dedicated D3 supplement.</strong> Multivitamins typically contain only 400-800 IU — far below the 2000-4000 IU seniors need. A standalone D3+K2 costs about $10/month and is the single most cost-effective supplement for seniors.'});
  if(scores[5].val>=2) plan.push({ic:'🦴',t:'<strong>Bone pain + low vitamin D = likely bone weakening.</strong> D deficiency is a major cause of osteoporosis. Getting levels up can reduce bone pain and slow loss. <a href="/tools/bone-check/" style="color:var(--green);font-weight:700">Bone Health Quiz →</a>'});
  if(scores[4].val>=2) plan.push({ic:'💪',t:'<strong>Muscle weakness from low D increases fall risk.</strong> D deficiency weakens the fast-twitch fibers you need to catch yourself when stumbling. Correcting it improves strength in 8-12 weeks. <a href="/tools/fall-risk/" style="color:var(--green);font-weight:700">Fall Risk →</a> | <a href="/tools/muscle-loss-risk/" style="color:var(--green);font-weight:700">Muscle Loss Quiz →</a>'});
  if(scores[7].val>=2) plan.push({ic:'😟',t:'<strong>Low vitamin D is linked to depression.</strong> D plays a role in serotonin production. Supplementing shows mood improvement in deficient individuals, especially in winter. <a href="/tools/mood-check/" style="color:var(--green);font-weight:700">Mood Check →</a>'});
  if(scores[6].val>=2) plan.push({ic:'🛡️',t:'<strong>Frequent infections suggest weakened immunity.</strong> Vitamin D activates immune T-cells. Deficient seniors have 2-3x higher rates of respiratory infections. Correcting deficiency strengthens immune defense.'});
  if(scores[8].val>=2) plan.push({ic:'⚖️',t:'<strong>Obesity traps vitamin D in fat tissue.</strong> You may need 3000-4000 IU to achieve optimal levels. Get tested and dose based on actual blood levels. <a href="/tools/bmi-senior/" style="color:var(--green);font-weight:700">BMI Calculator →</a>'});

  plan.forEach(function(p){
    var d=document.createElement('div');d.className='ap-item';
    d.innerHTML='<span class="ic">'+p.ic+'</span><span>'+p.t+'</span>';
    ap.appendChild(d);
  });

  document.getElementById('results').classList.add('show');
  setTimeout(function(){document.getElementById('risk-result').scrollIntoView({behavior:'smooth',block:'center'});},100);
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
/* QUIZ QUESTION */
.quiz-q{background:#F5F3FF;border:1px solid #DDD6FE;border-radius:12px;padding:20px 22px;margin-bottom:14px}
.quiz-q h3{font-size:17px;font-weight:700;color:var(--green);margin-bottom:12px}
.quiz-q .q-num{font-size:13px;font-weight:700;color:#4ADE80;margin-bottom:4px}
.q-options{display:flex;flex-direction:column;gap:6px}
.q-opt{display:flex;align-items:center;gap:10px;padding:12px 16px;border:1.5px solid #E9E5FF;border-radius:10px;cursor:pointer;transition:all .15s;background:var(--white)}
.q-opt:hover{border-color:#4ADE80;background:#FAF5FF}
.q-opt.selected{border-color:var(--green);background:#EDE9FE}
.q-opt input{display:none}
.q-radio{width:20px;height:20px;border-radius:50%;border:2px solid #C4B5FD;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .15s}
.q-opt.selected .q-radio{border-color:var(--green);background:var(--green)}
.q-opt.selected .q-radio::after{content:'';width:8px;height:8px;background:#fff;border-radius:50%}
.q-text{font-size:16px;color:var(--text)}
.calc-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,#1A5632,#22703F);color:#fff;border:none;padding:18px 32px;border-radius:12px;font:inherit;font-size:20px;font-weight:700;cursor:pointer;width:100%;min-height:60px;box-shadow:0 4px 14px rgba(26,86,50,.3);transition:transform .1s}.calc-btn:hover{transform:translateY(-1px)}
.results{display:none;margin-top:28px}.results.show{display:block;animation:fadeIn .5s}
@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
/* SCORE RESULT */
.sleep-result{border-radius:14px;padding:32px 24px;text-align:center;margin-bottom:24px;border:2px solid var(--border)}
.sleep-result.excellent{background:#F0FAF3;border-color:#A7D8B8}
.sleep-result.good{background:#EFF6FF;border-color:#93C5FD}
.sleep-result.fair{background:#FFFBEB;border-color:#E8D48B}
.sleep-result.poor{background:#FEF2F2;border-color:#F87171}
.score-emoji{font-size:48px;margin-bottom:8px}
.score-num{font-size:64px;font-weight:700;line-height:1}.score-of{font-size:22px;font-weight:600;color:var(--t2)}.score-label{font-size:22px;font-weight:700;margin-top:6px}.score-sub{font-size:16px;color:var(--t2);margin-top:8px}
.sleep-result.excellent .score-num,.sleep-result.excellent .score-label{color:#1A5632}
.sleep-result.good .score-num,.sleep-result.good .score-label{color:#2563EB}
.sleep-result.fair .score-num,.sleep-result.fair .score-label{color:#B8860B}
.sleep-result.poor .score-num,.sleep-result.poor .score-label{color:#C62828}
/* BREAKDOWN */
.breakdown{margin:20px 0}.breakdown h3{font-size:19px;font-weight:700;margin-bottom:14px}
.bd-item{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:10px;margin-bottom:8px;background:var(--white);border:1px solid var(--border)}
.bd-cat{flex:1;font-size:15px;font-weight:600;color:var(--text)}.bd-bar-wrap{flex:2;height:10px;background:#E8E6E1;border-radius:5px;overflow:hidden}
.bd-bar{height:100%;border-radius:5px;transition:width .6s}.bd-bar.high{background:#22C55E}.bd-bar.mid{background:#EAB308}.bd-bar.low{background:#EF4444}
.bd-score{font-size:14px;font-weight:700;min-width:40px;text-align:right}
/* TIPS */
.tips{background:#F5F3FF;border:2px solid #DDD6FE;border-radius:14px;padding:24px;margin:20px 0}
.tips h3{font-size:19px;font-weight:700;color:var(--green);margin-bottom:14px}
.tip-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px}
.tip-item .ic{font-size:18px;flex-shrink:0;line-height:1.4}.tip-item span{font-size:15px;color:var(--t2);line-height:1.5}
/* STANDARD SECTIONS */
.content-section{margin:32px 0}.content-section h2{font-size:24px;font-weight:700;margin-bottom:14px}.content-section h3{font-size:20px;font-weight:700;color:var(--green);margin:20px 0 10px}.content-section p{font-size:17px;color:var(--t2);line-height:1.7;margin-bottom:14px}
.faq{margin:36px 0}.faq h2{font-size:24px;font-weight:700;margin-bottom:20px;text-align:center}.faq-item{background:var(--white);border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px}.faq-q{padding:16px 22px;font-size:18px;font-weight:600;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:none;width:100%;text-align:left;font-family:inherit;line-height:1.4}.faq-q:hover{background:#FAFAF8}.faq-icon{font-size:22px;color:var(--muted);flex-shrink:0;transition:transform .2s}.faq-q.active .faq-icon{transform:rotate(45deg)}.faq-a{padding:0 22px 16px;font-size:16px;color:var(--t2);line-height:1.65;display:none}.faq-a.show{display:block}
.related{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin:32px 0}.related h3{font-size:20px;font-weight:700;margin-bottom:16px}.r-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.r-link{display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid var(--border);border-radius:10px;text-decoration:none;color:var(--green);font-weight:600;font-size:16px}.r-link:hover{border-color:#c5c3be}
.disc{background:#F5F4F1;border-radius:var(--r);padding:24px;margin:0 0 40px}.disc h4{font-size:16px;font-weight:700;margin-bottom:8px}.disc p{font-size:14px;color:var(--muted);line-height:1.7}.disc p+p{margin-top:8px}
.sidebar{width:240px;flex-shrink:0;position:sticky;top:70px;display:none}.sidebar-inner{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:18px}.sidebar h4{font-size:15px;font-weight:700;margin-bottom:14px}.sb-link{display:block;padding:8px 10px;border-radius:8px;text-decoration:none;background:#F8FAF8;font-size:14px;font-weight:600;color:var(--green);margin-bottom:6px}.sb-link:hover{background:#E8F5E9}.sb-div{border:none;border-top:1px solid var(--border);margin:12px 0}.sb-sub{font-size:13px;color:var(--muted);margin-top:12px}.sb-sub a{color:var(--green);text-decoration:none;display:block;padding:5px 0;font-weight:600}
@media(min-width:1000px){.sidebar{display:block}}@media(max-width:999px){.main-wrap{max-width:800px}}
.ftr{border-top:1px solid var(--border);background:linear-gradient(180deg,#FAFDFB,#F7F6F3);padding:36px 20px 20px;text-align:center}.ftr-inner{max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px}.ftr-logo{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--text)}.ftr-logo svg{width:22px;height:22px}.ftr-logo span{font-size:22px;font-weight:700}.ftr-logo:hover span{color:var(--green)}.ftr-links{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 20px;list-style:none}.ftr-links a{display:inline-block;padding:8px 4px;text-decoration:none;color:var(--text);font-weight:600;font-size:15px;min-height:44px}.ftr-links a:hover{color:var(--green)}.ftr-btm{max-width:700px;margin:0 auto;padding:14px 20px 8px;text-align:center;border-top:1px dashed #E0DDD8}.ftr-btm p{margin:0 0 4px;color:var(--muted);font-size:14px}
@media(max-width:700px){.page-hero{padding:28px 20px 24px}.page-hero h1{font-size:26px}.calc-card{padding:24px 18px}.score-num{font-size:48px}.r-grid{grid-template-columns:1fr}.faq-q{font-size:17px;padding:14px 18px}}
      `}</style>
<div className="main-wrap">
<div className="main">

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="8981383031" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="intro-note"><p><strong>The "sunshine vitamin" most seniors don't get enough of.</strong> Vitamin D is essential for bone strength, muscle function, immune defense, and mood regulation. After 60, your skin produces 75% less vitamin D from sunlight, and most diets provide barely 10% of what you need. This quiz identifies whether you're likely deficient — and what to do about it.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Assess Your Vitamin D Risk</h2>
<div className="calc-sub">Based on deficiency risk factors identified by the Endocrine Society</div>

<div className="quiz-q"><div className="q-num">Question 1 of 10</div><h3>☀️ How much time do you spend outdoors in sunlight?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">30+ minutes daily with exposed skin</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">15-30 minutes daily, some exposed skin</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">Brief time outdoors, mostly covered up</span></label>
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Rarely go outdoors or homebound</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 2 of 10</div><h3>💊 Do you take a vitamin D3 supplement?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">Yes — 2000+ IU D3 daily</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">Yes — but lower dose (400-1000 IU) or not daily</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">Only in a multivitamin (usually 400-800 IU)</span></label>
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">No — I don't take any vitamin D supplement</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 3 of 10</div><h3>🐟 How often do you eat vitamin D-rich foods?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">Frequently — fatty fish, eggs, fortified milk regularly</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Sometimes — fish 1-2 times per week, some dairy</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">Rarely — very little fish, dairy, or fortified foods</span></label>
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Almost never — vegan diet or no fish/dairy at all</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 4 of 10</div><h3>🌍 Where do you live?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">Southern US (south of Atlanta/Dallas latitude)</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Central US (roughly Chicago/Denver latitude)</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Northern US or Canada (north of Chicago)</span></label>
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Far north AND it's currently fall/winter</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 5 of 10</div><h3>😴 Do you experience fatigue or muscle weakness?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">No — good energy and normal strength</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">Mild — occasional fatigue, slightly weaker</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">Moderate — frequent tiredness and noticeable weakness</span></label>
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">Severe — exhausted constantly, legs feel weak</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 6 of 10</div><h3>🦴 Do you have bone pain or osteoporosis?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">No bone pain, no osteoporosis</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">Occasional bone or back pain</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">Frequent bone pain or diagnosed osteopenia</span></label>
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">Diagnosed osteoporosis or history of fractures</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 7 of 10</div><h3>😷 How often do you get colds, flu, or infections?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">Rarely — 1-2 colds per year at most</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Average — 2-3 per year</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Frequently — 4+ per year, take longer to recover</span></label>
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">Very often — seem to catch everything, slow recovery</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 8 of 10</div><h3>😟 Do you experience low mood or seasonal depression?</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">No — mood is stable throughout the year</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">Slightly lower mood in winter months</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">Noticeable depression or low mood, especially fall/winter</span></label>
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">Persistent depression or significant seasonal mood changes</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 9 of 10</div><h3>⚖️ What is your body weight?</h3><div className="q-options" id="q9">
<label className="q-opt"><input type="radio" name="q9" value="0" /><span className="q-radio"></span><span className="q-text">Normal weight (BMI under 30)</span></label>
<label className="q-opt"><input type="radio" name="q9" value="1" /><span className="q-radio"></span><span className="q-text">Overweight (BMI 30-35)</span></label>
<label className="q-opt"><input type="radio" name="q9" value="2" /><span className="q-radio"></span><span className="q-text">Obese (BMI 35-40)</span></label>
<label className="q-opt"><input type="radio" name="q9" value="3" /><span className="q-radio"></span><span className="q-text">Severely obese (BMI over 40)</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 10 of 10</div><h3>🔬 When was your vitamin D level last tested?</h3><div className="q-options" id="q10">
<label className="q-opt"><input type="radio" name="q10" value="0" /><span className="q-radio"></span><span className="q-text">Within past year — level was 40+ ng/mL</span></label>
<label className="q-opt"><input type="radio" name="q10" value="1" /><span className="q-radio"></span><span className="q-text">Within past year — level was 20-39 ng/mL</span></label>
<label className="q-opt"><input type="radio" name="q10" value="2" /><span className="q-radio"></span><span className="q-text">More than 2 years ago or don't remember</span></label>
<label className="q-opt"><input type="radio" name="q10" value="3" /><span className="q-radio"></span><span className="q-text">Never tested</span></label>
</div></div>

<button className="calc-btn">☀️ Get My Vitamin D Risk Score →</button>

<div className="results" id="results">
<div className="risk-result" id="risk-result">
<div className="risk-emoji" id="r-emoji">☀️</div>
<div><span className="risk-score" id="r-score">55</span><span className="risk-of"> / 100</span></div>
<div className="risk-label" id="r-label">Moderate Risk</div>
<div className="risk-sub" id="r-sub">Several factors suggest your vitamin D may be low</div>
</div>
<div className="breakdown"><h3>Your vitamin D risk breakdown</h3><div id="bd-list"></div></div>
<div className="action-plan" id="action-plan"><h3 id="ap-title">Your vitamin D optimization plan</h3><div id="ap-list"></div></div>
</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Why vitamin D matters more after 60</h2>
<p>Vitamin D is not just a vitamin — it's a hormone precursor that affects virtually every system in your body. It regulates calcium absorption for bones, powers muscle contraction for strength and balance, modulates immune function, influences mood through serotonin production, and may protect against cognitive decline. For seniors, it is arguably the single most important supplement.</p>

<h3>Why seniors are at highest risk of deficiency</h3>
<p><strong>Aging skin produces 75% less vitamin D</strong> from sunlight compared to younger skin. <strong>Kidney function declines</strong>, reducing the conversion of vitamin D to its active form. <strong>Indoor lifestyles</strong> limit sun exposure further. <strong>Medications</strong> like steroids, anticonvulsants, and some weight-loss drugs reduce vitamin D levels. <strong>Fat tissue traps vitamin D</strong>, making obese seniors more likely to be deficient even with supplementation. The result: over half of all seniors have levels below what doctors consider adequate.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: Holick MF, New England Journal of Medicine, 2007. Endocrine Society Clinical Practice Guidelines on Vitamin D, 2024. Vitamin D Council.</em></p>

<h3>The cascade of harm from low vitamin D</h3>
<p>Vitamin D deficiency doesn't cause one problem — it creates a cascade. Weak bones (osteoporosis) leads to weak muscles (sarcopenia), then poor balance, then increased falls, then fractures. Simultaneously, weakened immunity means more infections. And reduced serotonin leads to depression, isolation, and further inactivity. Optimizing vitamin D addresses the root cause of multiple connected problems at once.</p>
<p><strong>Related:</strong> <a href="/tools/bone-check/" style={{"color":"var(--green)","fontWeight":"700"}}>Bone Health Quiz →</a> | <a href="/tools/fall-risk/" style={{"color":"var(--green)","fontWeight":"700"}}>Fall Risk →</a> | <a href="/tools/mood-check/" style={{"color":"var(--green)","fontWeight":"700"}}>Mood Check →</a> | <a href="/tools/muscle-loss-risk/" style={{"color":"var(--green)","fontWeight":"700"}}>Muscle Loss Quiz →</a></p>

<h3>Optimal dosing for seniors</h3>
<p>The RDA of 600-800 IU is widely considered inadequate for seniors. The Endocrine Society recommends 1500-2000 IU as a minimum and up to 4000 IU for adults at risk. Most geriatric experts now recommend 2000-4000 IU daily. Always choose D3 (not D2 — D3 is 87% more effective at raising blood levels). Take with a meal containing fat for best absorption. Pair with vitamin K2 (MK-7 form, 100-200mcg) to direct calcium to bones, not arteries. Get blood levels tested and target 40-60 ng/mL.</p>

<h3>Vitamin D connects to nearly every tool on this site</h3>
<p>D3 appears in the recommendations of nearly every VitaTrack health tool — bone health, fall prevention, mood, muscle preservation, immunity, and more. That's because vitamin D deficiency is the most foundational nutrient gap in seniors, affecting the most body systems simultaneously. Correcting it first creates a platform for all other health improvements to build on.</p>
<p><strong>See our complete guide:</strong> <a href="/longevity/" style={{"color":"var(--green)","fontWeight":"700"}}>Longevity supplements for healthy aging →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">How common is vitamin D deficiency in seniors?<span className="faq-icon">+</span></button><div className="faq-a">40-60% of adults over 65 are deficient. Among homebound seniors, rates exceed 80%. Aging skin produces 75% less vitamin D from sunlight.</div></div>
<div className="faq-item"><button className="faq-q">What are symptoms of low vitamin D?<span className="faq-icon">+</span></button><div className="faq-a">Often NO obvious symptoms. Subtle signs: fatigue, muscle weakness, bone pain, frequent infections, low mood, slow wound healing, muscle cramps. Many seniors blame aging when it's treatable deficiency.</div></div>
<div className="faq-item"><button className="faq-q">How much vitamin D should seniors take?<span className="faq-icon">+</span></button><div className="faq-a">2000-4000 IU of D3 daily — far more than the outdated 600-800 IU RDA. Pair with K2 (100-200mcg MK-7). Take with a fatty meal. Get blood tested — optimal is 40-60 ng/mL.</div></div>
<div className="faq-item"><button className="faq-q">D2 vs D3 — which is better?<span className="faq-icon">+</span></button><div className="faq-a">D3 is 87% more effective at raising blood levels than D2. D3 is the same form your skin makes from sunlight. Always choose D3 (cholecalciferol), not D2 (ergocalciferol).</div></div>
<div className="faq-item"><button className="faq-q">Can I get enough vitamin D from sunlight?<span className="faq-icon">+</span></button><div className="faq-a">Very difficult after 60. You'd need 20-30 min of midday sun on exposed arms/legs several times weekly — impractical for most. Supplementation is essential for virtually all seniors.</div></div>
<div className="faq-item"><button className="faq-q">Why take K2 with vitamin D3?<span className="faq-icon">+</span></button><div className="faq-a">D3 increases calcium absorption. Without K2, calcium may go to arteries instead of bones. K2 (MK-7) activates proteins directing calcium to bones. Always take D3+K2 together.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/longevity/" className="r-link"><span>🧬</span> Longevity supplements</a>
<a href="/tools/bone-check/" className="r-link"><span>🦴</span> Bone Health Quiz</a>
<a href="/tools/fall-risk/" className="r-link"><span>🛡️</span> Fall Risk Quiz</a>
<a href="/tools/mood-check/" className="r-link"><span>🌤️</span> Mood Check</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz assesses vitamin D deficiency risk factors — it is NOT a blood test. Only a 25-hydroxyvitamin D blood test can confirm your actual level. If your score suggests high risk, ask your doctor to check your vitamin D level. Do not exceed 4000 IU daily without medical guidance.</p></div>

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
