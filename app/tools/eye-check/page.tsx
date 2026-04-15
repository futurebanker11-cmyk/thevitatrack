'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function EyeCheckPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `function sel(el){
  el.closest('.q-options').querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected')});
  el.classList.add('selected');
  el.querySelector('input').checked=true;
}

function scoreRisk(){
  var cats=[
    {q:'q1',label:'Overall vision quality'},
    {q:'q2',label:'Night vision'},
    {q:'q3',label:'Distortion / blind spots (AMD risk)'},
    {q:'q4',label:'Peripheral vision (glaucoma risk)'},
    {q:'q5',label:'Eye exam recency'},
    {q:'q6',label:'Diabetes (retinopathy risk)'},
    {q:'q7',label:'Family history'},
    {q:'q8',label:'Smoking history'},
    {q:'q9',label:'UV protection habits'},
    {q:'q10',label:'Eye-healthy diet'}
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

  // Symptom score (Q1-4) vs risk factors (Q5-10)
  var symptomTotal=0;for(var i=0;i<4;i++) symptomTotal+=scores[i].val;
  var symptomPct=Math.round((symptomTotal/12)*100);

  var cls,emoji,label,sub;
  if(riskPct<=15){cls='low';emoji='✅';label='Low Vision Risk';sub='Your eye health habits are strong and you have minimal risk factors. Continue annual exams.';}
  else if(riskPct<=35){cls='low';emoji='👁️';label='Low-to-Moderate Risk';sub='Some risk factors present. Make sure you are getting regular dilated eye exams.';}
  else if(riskPct<=55){cls='moderate';emoji='⚠️';label='Moderate Vision Risk';sub='Several risk factors for age-related eye disease. Schedule a comprehensive dilated eye exam if overdue.';}
  else if(riskPct<=75){cls='high';emoji='🟠';label='High Vision Risk';sub='Multiple significant risk factors and possible symptoms. See an eye doctor soon.';}
  else{cls='high';emoji='🔴';label='Very High Vision Risk';sub='Your symptoms and risk profile need urgent evaluation. Schedule an ophthalmology appointment within 1-2 weeks.';}

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

  if(symptomPct>50){
    apEl.className='action-plan urgent';
    document.getElementById('ap-title').textContent='Urgent — see an eye doctor';
    plan.push({ic:'🩺',t:'<strong>Your vision symptoms need professional evaluation.</strong> Schedule a comprehensive dilated eye exam with an ophthalmologist (not just an optician). Dilated exams can detect glaucoma, AMD, and diabetic retinopathy before severe damage occurs. Many eye conditions are treatable when caught early.'});
  }else if(riskPct>40){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your vision protection plan';
    plan.push({ic:'📋',t:'<strong>You have modifiable risk factors.</strong> Schedule a dilated eye exam if you haven\\'t had one recently, and focus on the lifestyle changes below to protect your vision long-term.'});
  }else{
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your eye health maintenance plan';
    plan.push({ic:'✅',t:'<strong>Your eye health profile looks good!</strong> Continue protecting your vision with the habits below and maintain annual or biennial dilated eye exams.'});
  }

  if(scores[1].val>=2) plan.push({ic:'🌙',t:'<strong>Night vision problems may indicate cataracts.</strong> Difficulty with night driving, halos around lights, and glare sensitivity are classic cataract symptoms. Cataract surgery has a 98% success rate and can restore clear vision. Discuss with your eye doctor.'});
  if(scores[2].val>=2) plan.push({ic:'📖',t:'<strong>Visual distortion is a key sign of macular degeneration (AMD).</strong> Wavy lines, dark spots, or blank areas in your central vision need urgent evaluation. Wet AMD can progress rapidly but is treatable with injections if caught early. Use an Amsler grid at home for weekly self-monitoring.'});
  if(scores[3].val>=2) plan.push({ic:'👀',t:'<strong>Peripheral vision loss may indicate glaucoma.</strong> Glaucoma damages the optic nerve silently — you don\\'t feel it happening. Once lost, peripheral vision cannot be restored. Eye pressure checks and optic nerve imaging during a dilated exam are the only way to detect it. <a href="/tools/fall-risk/" style="color:var(--green);font-weight:700">Poor vision increases fall risk →</a>'});
  if(scores[4].val>=2) plan.push({ic:'📅',t:'<strong>You\\'re overdue for a dilated eye exam.</strong> The AAO recommends comprehensive exams every 1-2 years after 65. Many eye diseases are symptomless until advanced — only dilation detects them early. This is the single most important thing you can do for your vision.'});
  if(scores[5].val>=2) plan.push({ic:'🩸',t:'<strong>Diabetes dramatically increases eye disease risk.</strong> Diabetic retinopathy affects nearly all long-term diabetics. Annual dilated exams are essential. Tight blood sugar control slows retinal damage. <a href="/tools/diabetes-risk/" style="color:var(--green);font-weight:700">Diabetes Risk Quiz →</a>'});
  if(scores[7].val>=2) plan.push({ic:'🚬',t:'<strong>Smoking doubles your risk of cataracts and AMD.</strong> If you still smoke, quitting is one of the most effective things you can do for your eyes. Even after decades of smoking, quitting slows further eye damage.'});
  if(scores[8].val>=2) plan.push({ic:'🕶️',t:'<strong>UV damage accumulates over a lifetime.</strong> Start wearing UV-400 blocking sunglasses every time you go outside — even on cloudy days. UV exposure accelerates cataracts and AMD. Wraparound styles provide the best protection.'});
  if(scores[9].val>=2) plan.push({ic:'🥗',t:'<strong>Diet directly affects eye health.</strong> Eat leafy greens (kale, spinach — richest source of lutein), colorful vegetables, and fish 2-3x/week for omega-3. The MIND and Mediterranean diets are associated with lower AMD risk.'});

  plan.push({ic:'🌿',t:'<strong>Eye-protective supplements:</strong> Lutein+Zeaxanthin (10mg/2mg — filters blue light), AREDS2 formula for intermediate AMD, Omega-3 DHA (retinal health), and Bilberry Extract (night vision). <a href="/eyes/" style="color:var(--green);font-weight:700">See our eye supplement guide →</a>'});

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

<div className="intro-note"><p><strong>Vision loss is not inevitable.</strong> While some age-related eye changes are normal (needing reading glasses, mild glare sensitivity), the major eye diseases — cataracts, glaucoma, macular degeneration, and diabetic retinopathy — are all detectable early and treatable. The tragedy is that millions of seniors lose vision that could have been saved with timely screening.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Screen Your Eye Health</h2>
<div className="calc-sub">Covers the 4 major age-related eye diseases and key risk factors</div>

<div className="quiz-q"><div className="q-num">Question 1 of 10</div><h3>👁️ How is your overall vision quality?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">Good — clear vision with current glasses/contacts</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">Fair — some blurriness, may need updated prescription</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">Poor — difficulty reading, watching TV, or seeing faces</span></label>
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Very poor — significant vision loss affecting daily life</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 2 of 10</div><h3>🌙 How well can you see at night or in dim light?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">Fine — comfortable driving at night</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">Slightly harder — halos around headlights</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">Difficult — avoid night driving when possible</span></label>
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">Cannot drive at night — very poor night vision</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 3 of 10</div><h3>📖 Do you see wavy, distorted, or missing areas in your vision?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">No — straight lines look straight, no blind spots</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Occasionally — mild waviness when reading</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">Yes — noticeable distortion or dark spots in center</span></label>
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Significant — large distorted or blank areas in vision</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 4 of 10</div><h3>👀 Have you noticed loss of side (peripheral) vision?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">No — full side vision intact</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Not sure — haven't noticed anything</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Possibly — sometimes bump into things on one side</span></label>
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Yes — noticeable narrowing of side vision</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 5 of 10</div><h3>📅 When was your last comprehensive dilated eye exam?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">Within the past year</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">1-2 years ago</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">3-5 years ago</span></label>
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">Never, or more than 5 years ago</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 6 of 10</div><h3>🩸 Do you have diabetes?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">No diabetes</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">Pre-diabetic</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">Type 2 diabetes, well-managed</span></label>
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">Diabetes for 10+ years or poorly controlled</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 7 of 10</div><h3>👨‍👩‍👦 Does glaucoma or macular degeneration run in your family?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">No family history of eye disease</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Extended family member had eye disease</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Parent or sibling has/had glaucoma or AMD</span></label>
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">Multiple close relatives with eye disease</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 8 of 10</div><h3>🚬 Have you ever smoked?</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">Never smoked</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">Former smoker, quit 10+ years ago</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">Former smoker, quit within past 10 years</span></label>
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">Current smoker</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 9 of 10</div><h3>🕶️ Do you regularly wear UV-protective sunglasses outdoors?</h3><div className="q-options" id="q9">
<label className="q-opt"><input type="radio" name="q9" value="0" /><span className="q-radio"></span><span className="q-text">Always — UV-blocking sunglasses whenever outside</span></label>
<label className="q-opt"><input type="radio" name="q9" value="1" /><span className="q-radio"></span><span className="q-text">Usually — most of the time on sunny days</span></label>
<label className="q-opt"><input type="radio" name="q9" value="2" /><span className="q-radio"></span><span className="q-text">Rarely — only occasionally wear sunglasses</span></label>
<label className="q-opt"><input type="radio" name="q9" value="3" /><span className="q-radio"></span><span className="q-text">Never — don't own UV-protective sunglasses</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 10 of 10</div><h3>🥗 Do you regularly eat leafy greens, colorful vegetables, and fish?</h3><div className="q-options" id="q10">
<label className="q-opt"><input type="radio" name="q10" value="0" /><span className="q-radio"></span><span className="q-text">Yes — daily leafy greens and fish 2-3x/week</span></label>
<label className="q-opt"><input type="radio" name="q10" value="1" /><span className="q-radio"></span><span className="q-text">Sometimes — a few times per week</span></label>
<label className="q-opt"><input type="radio" name="q10" value="2" /><span className="q-radio"></span><span className="q-text">Rarely — mostly eat meat, bread, and processed foods</span></label>
<label className="q-opt"><input type="radio" name="q10" value="3" /><span className="q-radio"></span><span className="q-text">Very rarely — almost no vegetables or fish in my diet</span></label>
</div></div>

<button className="calc-btn">👁️ Get My Eye Health Score →</button>

<div className="results" id="results">
<div className="risk-result" id="risk-result">
<div className="risk-emoji" id="r-emoji">👁️</div>
<div><span className="risk-score" id="r-score">35</span><span className="risk-of"> / 100</span></div>
<div className="risk-label" id="r-label">Moderate Risk</div>
<div className="risk-sub" id="r-sub">Some vision risk factors detected</div>
</div>
<div className="breakdown"><h3>Your eye health breakdown</h3><div id="bd-list"></div></div>
<div className="action-plan" id="action-plan"><h3 id="ap-title">Your vision protection plan</h3><div id="ap-list"></div></div>
</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Understanding eye health after 60</h2>
<p>Your eyes undergo significant changes with age. The lens stiffens (presbyopia), the pupil shrinks (less light enters), and cells in the retina gradually decline. These are normal. What's not normal — and not inevitable — are the four major eye diseases that cause preventable vision loss in millions of seniors every year.</p>

<h3>The 4 major eye diseases in seniors</h3>
<p><strong>Cataracts:</strong> Clouding of the lens. Affects 50% of seniors by age 75. Symptoms: blurry vision, halos around lights, faded colors, poor night vision. Treatment: surgery replaces the clouded lens — one of the most successful surgeries in medicine (98% success rate).</p>
<p><strong>Age-related macular degeneration (AMD):</strong> Damage to the central retina (macula). Leading cause of severe vision loss in seniors. Two types: dry (gradual, 85-90% of cases) and wet (rapid, more severe). Early signs: wavy lines, dark spots in center of vision. AREDS2 supplements slow progression of intermediate AMD.</p>
<p><strong>Glaucoma:</strong> Damage to the optic nerve, usually from elevated eye pressure. Called the "silent thief of sight" because peripheral vision is lost gradually without symptoms until advanced. Affects 6% of adults over 60. Screening via dilated eye exam is the only way to catch it early.</p>
<p><strong>Diabetic retinopathy:</strong> High blood sugar damages retinal blood vessels. Affects nearly all Type 2 diabetics after 20 years. Annual dilated exams are critical. Laser treatment and injections can prevent vision loss if caught early.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: National Eye Institute (NEI), 2024. AREDS2 Study (Age-Related Eye Disease Study 2), NIH. American Academy of Ophthalmology Preferred Practice Patterns, 2023.</em></p>

<h3>Vision loss and fall risk — the dangerous connection</h3>
<p>Poor vision is the #4 risk factor for falls in seniors. You can't avoid what you can't see — uneven surfaces, steps, clutter, and curbs all become fall hazards with impaired vision. Correcting vision (updated glasses, cataract surgery) is one of the most effective fall prevention interventions.</p>
<p><strong>Related:</strong> <a href="/tools/fall-risk/" style={{"color":"var(--green)","fontWeight":"700"}}>Fall Risk Assessment →</a> | <a href="/tools/diabetes-risk/" style={{"color":"var(--green)","fontWeight":"700"}}>Diabetes Risk Quiz →</a></p>

<h3>The AREDS2 formula — the gold standard for eye protection</h3>
<p>The NIH-funded AREDS2 study proved that a specific supplement formula slows AMD progression by 25% in intermediate cases. The formula: Lutein (10mg), Zeaxanthin (2mg), Vitamin C (500mg), Vitamin E (400 IU), Zinc (80mg), and Copper (2mg). This is the single most evidence-backed supplement formula for eye health in seniors. Note: it slows progression — it does not prevent AMD from developing.</p>

<h3>Supplements that protect vision in seniors</h3>
<p>Beyond the AREDS2 formula: Lutein and Zeaxanthin (filter damaging blue light in the retina — found in kale, spinach, egg yolks), Omega-3 DHA (structural component of retinal cells), Bilberry Extract (anthocyanins support night vision and retinal blood flow), and Astaxanthin (powerful antioxidant that crosses the blood-retinal barrier). A diet rich in colorful vegetables and fish provides many of these naturally.</p>
<p><strong>See our guide:</strong> <a href="/eyes/" style={{"color":"var(--green)","fontWeight":"700"}}>Doctor-reviewed eye health supplements →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">What are the most common eye diseases in seniors?<span className="faq-icon">+</span></button><div className="faq-a">The four major ones: cataracts (50% by age 75), macular degeneration (leading cause of severe vision loss), glaucoma (the "silent thief" — no early symptoms), and diabetic retinopathy (affects nearly all diabetics over 20 years). All four are treatable when caught early.</div></div>
<div className="faq-item"><button className="faq-q">How often should seniors get eye exams?<span className="faq-icon">+</span></button><div className="faq-a">Every 1-2 years for adults over 65. Annually if you have diabetes, family history of glaucoma, or existing eye disease. Must be a comprehensive DILATED exam — only dilation can detect glaucoma and retinal problems before symptoms appear.</div></div>
<div className="faq-item"><button className="faq-q">Can vision loss be prevented?<span className="faq-icon">+</span></button><div className="faq-a">Partially — UV sunglasses, not smoking (doubles cataract/AMD risk), managing diabetes and BP, eating leafy greens and omega-3 fish, AREDS2 supplements for intermediate AMD, and regular dilated exams for early detection all significantly reduce risk.</div></div>
<div className="faq-item"><button className="faq-q">What supplements protect eyesight?<span className="faq-icon">+</span></button><div className="faq-a">AREDS2 formula: Lutein (10mg), Zeaxanthin (2mg), Vitamin C (500mg), Vitamin E (400 IU), Zinc (80mg), Copper (2mg). Also: Omega-3 DHA, Bilberry Extract. Most important for intermediate AMD. For general eye health, Lutein+Zeaxanthin alone are key.</div></div>
<div className="faq-item"><button className="faq-q">Does diabetes affect eyesight?<span className="faq-icon">+</span></button><div className="faq-a">Yes — diabetic retinopathy damages retinal blood vessels. After 20 years, nearly all Type 2 patients show some changes. Annual dilated exams and tight blood sugar control are essential. Laser treatment prevents vision loss if caught early.</div></div>
<div className="faq-item"><button className="faq-q">What are warning signs of vision problems?<span className="faq-icon">+</span></button><div className="faq-a">Difficulty reading, poor night vision, blurry/distorted vision, halos around lights, loss of side vision, floaters or flashes, difficulty with colors, needing brighter light. Any SUDDEN vision change — especially loss of peripheral vision or new floaters — requires immediate medical attention.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/eyes/" className="r-link"><span>👁️</span> Eye supplements</a>
<a href="/tools/diabetes-risk/" className="r-link"><span>🩸</span> Diabetes Risk</a>
<a href="/tools/fall-risk/" className="r-link"><span>🛡️</span> Fall Risk Quiz</a>
<a href="/tools/supplement-budget/" className="r-link"><span>💊</span> Supplement Budget</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz is a risk screening tool — it is NOT a vision test or eye exam. Only a comprehensive dilated eye exam by an ophthalmologist or optometrist can diagnose cataracts, glaucoma, macular degeneration, or diabetic retinopathy. If you experience any sudden vision changes, seek immediate medical attention.</p></div>

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
