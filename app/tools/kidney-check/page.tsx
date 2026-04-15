'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function KidneyCheckPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `function sel(el){
  el.closest('.q-options').querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected')});
  el.classList.add('selected');
  el.querySelector('input').checked=true;
}

function scoreRisk(){
  var cats=[
    {q:'q1',label:'Blood pressure'},
    {q:'q2',label:'Diabetes status'},
    {q:'q3',label:'NSAID use'},
    {q:'q4',label:'Family history'},
    {q:'q5',label:'Hydration habits'},
    {q:'q6',label:'Kidney testing status'},
    {q:'q7',label:'Swelling (edema)'},
    {q:'q8',label:'Urination changes'},
    {q:'q9',label:'Fatigue / brain fog'},
    {q:'q10',label:'Polypharmacy'}
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
  if(riskPct<=20){cls='low';emoji='💚';label='Low Kidney Risk';sub='Your kidney risk factors are minimal. Continue healthy hydration and annual screening.';}
  else if(riskPct<=40){cls='low';emoji='💧';label='Low-to-Moderate Risk';sub='A few risk factors present. Request a GFR/creatinine test at your next blood work.';}
  else if(riskPct<=60){cls='moderate';emoji='⚠️';label='Moderate Kidney Risk';sub='Several significant risk factors. Ask your doctor for kidney function tests (GFR, creatinine, urine albumin) soon.';}
  else if(riskPct<=80){cls='high';emoji='🟠';label='High Kidney Risk';sub='Multiple strong risk factors detected. Schedule kidney testing with your doctor promptly.';}
  else{cls='high';emoji='🔴';label='Very High Kidney Risk';sub='Your risk profile plus symptoms warrant urgent kidney evaluation. See your doctor within 1-2 weeks.';}

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

  if(riskPct>60){
    apEl.className='action-plan urgent';
    document.getElementById('ap-title').textContent='Urgent — get your kidneys tested';
    plan.push({ic:'🩺',t:'<strong>Request kidney function tests from your doctor.</strong> Ask specifically for: GFR (glomerular filtration rate), serum creatinine, and urine albumin-to-creatinine ratio (UACR). These three tests together give a complete picture of kidney health. Early CKD is treatable — don\\'t wait for symptoms.'});
  }else if(riskPct>35){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your kidney protection plan';
    plan.push({ic:'🔬',t:'<strong>Get kidney function checked at your next blood work.</strong> If you haven\\'t had GFR and creatinine tested recently, add it to your next lab order. Early detection makes the biggest difference in kidney disease outcomes.'});
  }else{
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your kidney health maintenance plan';
    plan.push({ic:'✅',t:'<strong>Your kidney risk is low — keep it that way!</strong> Continue healthy hydration, annual blood work, and the prevention habits below.'});
  }

  if(scores[0].val>=2) plan.push({ic:'💓',t:'<strong>Blood pressure control is critical for kidney protection.</strong> Target under 130/80 mmHg — this is even more important for kidneys than heart. Uncontrolled hypertension is the #2 cause of kidney failure. <a href="/tools/bp-checker/" style="color:var(--green);font-weight:700">Check your blood pressure →</a>'});
  if(scores[1].val>=2) plan.push({ic:'🩸',t:'<strong>Diabetes is the #1 cause of kidney failure.</strong> Tight blood sugar control (A1C under 7%) dramatically slows kidney damage. Every 1% reduction in A1C reduces kidney disease risk by 30-40%. <a href="/tools/diabetes-risk/" style="color:var(--green);font-weight:700">Diabetes Risk Quiz →</a>'});
  if(scores[2].val>=2) plan.push({ic:'💊',t:'<strong>Regular NSAID use damages kidneys.</strong> Ibuprofen, naproxen, and high-dose aspirin reduce kidney blood flow. Switch to acetaminophen (Tylenol) for pain when possible. If you need NSAIDs for arthritis, ask about topical versions (gels/patches) that bypass the kidneys.'});
  if(scores[4].val>=2) plan.push({ic:'💧',t:'<strong>Dehydration forces your kidneys to work harder.</strong> Aim for 6-8 cups of water daily. Set reminders if you forget. Dark yellow urine means you need more water. <a href="/tools/hydration/" style="color:var(--green);font-weight:700">Calculate your water target →</a>'});
  if(scores[5].val>=2) plan.push({ic:'📅',t:'<strong>You\\'re overdue for kidney testing.</strong> Adults over 60 with ANY risk factor (diabetes, hypertension, family history) should have GFR and creatinine tested annually. This is a simple blood test — ask your doctor to add it at your next visit.'});
  if(scores[6].val>=2||scores[7].val>=2) plan.push({ic:'⚠️',t:'<strong>Swelling or urination changes may indicate kidney problems.</strong> Foamy urine can mean protein leakage (albuminuria). Persistent swelling suggests fluid retention. These symptoms should be evaluated promptly — they may indicate CKD that needs treatment.'});
  if(scores[8].val>=2) plan.push({ic:'😴',t:'<strong>Fatigue and brain fog can be kidney-related.</strong> When kidneys can\\'t filter waste efficiently, toxins build up in the blood, causing fatigue, nausea, and mental fog. If these symptoms persist, kidney function should be checked.'});
  if(scores[9].val>=2) plan.push({ic:'💊',t:'<strong>Multiple medications stress the kidneys.</strong> Many drugs are processed through the kidneys. Ask your doctor or pharmacist for a kidney-focused medication review to identify any drugs that may need dose adjustment or alternatives.'});

  plan.push({ic:'🌿',t:'<strong>Kidney-protective supplements:</strong> Omega-3 (reduces inflammation), CoQ10 (cell protection), Alpha-Lipoic Acid, and Vitamin D3. AVOID high-dose Vitamin C and excess potassium if you have CKD. <a href="/kidney/" style="color:var(--green);font-weight:700">See kidney supplements →</a>'});

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

<div className="intro-note"><p><strong>The silent organ failure:</strong> Your kidneys can lose up to 75% of their function before you notice ANY symptoms. By that point, the damage is often irreversible. The only way to catch CKD early is through blood tests (GFR and creatinine). This quiz helps you understand whether you should be asking your doctor for kidney screening — which could save your kidneys and your life.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Assess Your Kidney Health Risk</h2>
<div className="calc-sub">Based on major CKD risk factors identified by the National Kidney Foundation</div>

<div className="quiz-q"><div className="q-num">Question 1 of 10</div><h3>💓 Do you have high blood pressure?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">No — blood pressure is normal</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">Controlled with medication</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">Yes — not always well controlled</span></label>
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Yes — difficult to control even with medication</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 2 of 10</div><h3>🩸 Do you have diabetes or pre-diabetes?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">No — blood sugar is normal</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">Pre-diabetic / borderline</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">Type 2 diabetes, well-managed</span></label>
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">Type 2 diabetes, poorly controlled (A1C above 8)</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 3 of 10</div><h3>💊 Do you regularly use NSAIDs (ibuprofen, naproxen, aspirin)?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">Rarely or never</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Occasionally (a few times per month)</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">Frequently (several times per week)</span></label>
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Daily use for chronic pain</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 4 of 10</div><h3>👨‍👩‍👦 Does kidney disease run in your family?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">No family history of kidney problems</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Extended family (uncle, grandparent)</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Parent or sibling with kidney disease</span></label>
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Multiple close relatives, or family member on dialysis</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 5 of 10</div><h3>💧 How much water do you drink daily?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">6-8+ cups daily — I stay well hydrated</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">4-5 cups — could drink more</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">2-3 cups — I often forget to drink</span></label>
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">Very little — mainly coffee/tea, rarely plain water</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 6 of 10</div><h3>🔬 When did you last have kidney function tested (GFR/creatinine)?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">Within the past year — results were normal</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">1-2 years ago</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">3+ years ago or I don't remember</span></label>
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">Never tested, or results were abnormal</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 7 of 10</div><h3>🦵 Do you experience swelling in your ankles, feet, or hands?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">No swelling</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Occasional mild swelling (end of day)</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Frequent swelling that doesn't resolve overnight</span></label>
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">Persistent swelling — shoes don't fit, rings are tight</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 8 of 10</div><h3>🚽 Have you noticed changes in urination?</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">Normal — no changes</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">Slightly more or less frequent than before</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">Foamy urine, or noticeably different color</span></label>
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">Blood in urine, very dark, or significantly reduced output</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 9 of 10</div><h3>😴 Do you experience persistent fatigue or difficulty concentrating?</h3><div className="q-options" id="q9">
<label className="q-opt"><input type="radio" name="q9" value="0" /><span className="q-radio"></span><span className="q-text">No — energy and focus are normal for my age</span></label>
<label className="q-opt"><input type="radio" name="q9" value="1" /><span className="q-radio"></span><span className="q-text">Mild fatigue — more tired than I used to be</span></label>
<label className="q-opt"><input type="radio" name="q9" value="2" /><span className="q-radio"></span><span className="q-text">Significant fatigue and brain fog</span></label>
<label className="q-opt"><input type="radio" name="q9" value="3" /><span className="q-radio"></span><span className="q-text">Severe — exhausted constantly, nausea, loss of appetite</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 10 of 10</div><h3>💊 How many medications do you take daily?</h3><div className="q-options" id="q10">
<label className="q-opt"><input type="radio" name="q10" value="0" /><span className="q-radio"></span><span className="q-text">0-3 medications</span></label>
<label className="q-opt"><input type="radio" name="q10" value="1" /><span className="q-radio"></span><span className="q-text">4-6 medications</span></label>
<label className="q-opt"><input type="radio" name="q10" value="2" /><span className="q-radio"></span><span className="q-text">7-9 medications</span></label>
<label className="q-opt"><input type="radio" name="q10" value="3" /><span className="q-radio"></span><span className="q-text">10+ medications</span></label>
</div></div>

<button className="calc-btn">💧 Get My Kidney Health Score →</button>

<div className="results" id="results">
<div className="risk-result" id="risk-result">
<div className="risk-emoji" id="r-emoji">💧</div>
<div><span className="risk-score" id="r-score">40</span><span className="risk-of"> / 100</span></div>
<div className="risk-label" id="r-label">Moderate Risk</div>
<div className="risk-sub" id="r-sub">Several risk factors for kidney disease detected</div>
</div>
<div className="breakdown"><h3>Your kidney risk factor breakdown</h3><div id="bd-list"></div></div>
<div className="action-plan" id="action-plan"><h3 id="ap-title">Your kidney protection plan</h3><div id="ap-list"></div></div>
</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Understanding kidney health after 60</h2>
<p>Your kidneys filter about 200 quarts of blood daily, removing waste and excess fluid. After age 40, kidney function declines naturally at about 1% per year. By age 70, many seniors have lost 30-40% of their original kidney function. This natural decline combined with diabetes, hypertension, and medication use means nearly half of all adults over 70 have some degree of chronic kidney disease.</p>

<h3>The two biggest kidney killers in seniors</h3>
<p><strong>Diabetes</strong> is the #1 cause of kidney failure — high blood sugar damages the tiny blood vessels in the kidneys over years. Approximately 40% of people with diabetes develop some degree of kidney disease. <strong>Hypertension</strong> is #2 — high blood pressure forces kidneys to work harder, gradually wearing them out. Together, diabetes and hypertension account for about 70% of all CKD cases.</p>
<p><strong>Related:</strong> <a href="/tools/diabetes-risk/" style={{"color":"var(--green)","fontWeight":"700"}}>Diabetes Risk Quiz →</a> | <a href="/tools/bp-checker/" style={{"color":"var(--green)","fontWeight":"700"}}>Blood Pressure Checker →</a></p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: National Kidney Foundation, "CKD in the Elderly," 2023. KDIGO Clinical Practice Guidelines for CKD Evaluation and Management, 2024. CDC Chronic Kidney Disease Surveillance System.</em></p>

<h3>NSAIDs — the hidden kidney danger</h3>
<p>Ibuprofen (Advil, Motrin), naproxen (Aleve), and even high-dose aspirin reduce blood flow to the kidneys. Occasional use is fine for healthy kidneys, but regular daily use — common in seniors with arthritis — can cause or accelerate kidney damage. If you take NSAIDs regularly, ask your doctor about kidney-safer alternatives like acetaminophen (Tylenol) or topical treatments.</p>

<h3>Hydration and kidney health</h3>
<p>Adequate water intake is one of the simplest ways to protect your kidneys. Dehydration concentrates waste products, forcing kidneys to work harder. Chronic mild dehydration — common in seniors due to weakened thirst sensation — accelerates kidney decline. However, seniors with heart failure or advanced CKD may need to LIMIT fluids. Check your personal hydration target.</p>
<p><strong>Related:</strong> <a href="/tools/hydration/" style={{"color":"var(--green)","fontWeight":"700"}}>Hydration Calculator →</a></p>

<h3>CKD stages — what the numbers mean</h3>
<p><strong>Stage 1 (GFR 90+):</strong> Kidney damage with normal function — usually detected by protein in urine. <strong>Stage 2 (GFR 60-89):</strong> Mild decrease — common in seniors, may not need treatment if stable. <strong>Stage 3 (GFR 30-59):</strong> Moderate decrease — this is where most CKD is diagnosed. Requires monitoring and lifestyle management. <strong>Stage 4 (GFR 15-29):</strong> Severe decrease — nephrologist involvement essential, prepare for possible dialysis. <strong>Stage 5 (GFR under 15):</strong> Kidney failure — dialysis or transplant needed.</p>

<h3>Supplements for kidney health</h3>
<p>For seniors with HEALTHY kidneys: Omega-3 Fish Oil (2000mg — reduces kidney inflammation), CoQ10 (200mg — protects kidney cells), Alpha-Lipoic Acid (600mg — antioxidant protection), and adequate Vitamin D3. <strong>Critical warning:</strong> Seniors with existing CKD must avoid high-dose Vitamin C (oxalate risk), excess potassium, phosphorus supplements, and many herbal products. Always consult your nephrologist before starting any supplement if you have kidney disease.</p>
<p><strong>See our guide:</strong> <a href="/kidney/" style={{"color":"var(--green)","fontWeight":"700"}}>Kidney health supplements →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">How common is kidney disease in seniors?<span className="faq-icon">+</span></button><div className="faq-a">CKD affects approximately 40% of adults over 70. Most people in early stages have no symptoms. Diabetes and high blood pressure are the two leading causes, accounting for about 70% of all CKD cases.</div></div>
<div className="faq-item"><button className="faq-q">What are early signs of kidney disease?<span className="faq-icon">+</span></button><div className="faq-a">Early CKD usually has NO symptoms. As it progresses: swollen ankles/feet, fatigue, decreased appetite, nausea, foamy urine, urinating more or less, muscle cramps, difficulty concentrating, and itchy skin. By the time symptoms appear, significant function is often lost.</div></div>
<div className="faq-item"><button className="faq-q">What is a normal GFR for seniors?<span className="faq-icon">+</span></button><div className="faq-a">Normal GFR is above 90. For seniors, GFR naturally declines — 60-89 may be acceptable over 70 if stable. Below 60 is CKD stage 3. Below 30 is stage 4 (severe). Below 15 requires dialysis consideration.</div></div>
<div className="faq-item"><button className="faq-q">Can kidney disease be reversed?<span className="faq-icon">+</span></button><div className="faq-a">Early-stage CKD can often be stabilized and sometimes partially reversed through BP control (under 130/80), blood sugar management, hydration, and reducing NSAIDs. Later stages can be slowed but not reversed. Early detection is critical.</div></div>
<div className="faq-item"><button className="faq-q">What supplements support kidney health?<span className="faq-icon">+</span></button><div className="faq-a">For healthy kidneys: Omega-3, CoQ10, Alpha-Lipoic Acid, Vitamin D3. WARNING: Seniors with CKD must AVOID high-dose Vitamin C, excess potassium, and many herbal supplements. Always consult your nephrologist with existing kidney disease.</div></div>
<div className="faq-item"><button className="faq-q">Does high blood pressure damage kidneys?<span className="faq-icon">+</span></button><div className="faq-a">Yes — hypertension is the #2 cause of CKD. High BP damages tiny kidney blood vessels over years. Keeping BP under 130/80 is one of the most important things you can do for kidney protection.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/kidney/" className="r-link"><span>💧</span> Kidney supplements</a>
<a href="/tools/bp-checker/" className="r-link"><span>💓</span> BP Checker</a>
<a href="/tools/diabetes-risk/" className="r-link"><span>🩸</span> Diabetes Risk</a>
<a href="/tools/hydration/" className="r-link"><span>🥤</span> Hydration Calculator</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz is a risk screening tool based on major CKD risk factors identified by the National Kidney Foundation and KDIGO guidelines. It is NOT a medical diagnosis. Only blood tests (GFR, creatinine, urine albumin) can diagnose kidney disease. If your score suggests elevated risk, request kidney function testing from your doctor.</p>
<p>If you experience blood in urine, severe swelling, significant decrease in urination, or persistent nausea/vomiting, seek medical attention promptly.</p></div>

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
