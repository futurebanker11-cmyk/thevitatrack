'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function MuscleLossRiskPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `function sel(el){
  el.closest('.q-options').querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected')});
  el.classList.add('selected');
  el.querySelector('input').checked=true;
}

function scoreRisk(){
  var cats=[
    {q:'q1',label:'Chair rise strength'},
    {q:'q2',label:'Walking speed'},
    {q:'q3',label:'Stair climbing'},
    {q:'q4',label:'Grip strength'},
    {q:'q5',label:'Fall history'},
    {q:'q6',label:'Protein intake'},
    {q:'q7',label:'Resistance training'},
    {q:'q8',label:'Weight stability'},
    {q:'q9',label:'Energy level'},
    {q:'q10',label:'Weight loss / GLP-1 risk'}
  ];

  var total=0,scores=[];
  for(var i=0;i<cats.length;i++){
    var checked=document.querySelector('input[name="'+cats[i].q+'"]:checked');
    if(!checked){alert('Please answer all 10 questions (question '+(i+1)+' is missing)');return;}
    var val=parseInt(checked.value);
    total+=val;
    scores.push({label:cats[i].label,val:val,max:3});
  }

  // Score: higher=better. Convert to risk percentage (invert)
  var maxScore=30;
  var healthPct=Math.round((total/maxScore)*100);
  // Risk is inverse of health
  var riskPct=100-healthPct;

  var cls,emoji,label,sub;
  if(riskPct<=25){cls='low';emoji='💪';label='Low Muscle Loss Risk';sub='Your strength and habits are protecting your muscles well. Keep up your current routine!';}
  else if(riskPct<=50){cls='moderate';emoji='⚠️';label='Moderate Muscle Loss Risk';sub='You show some early warning signs. Action now can prevent sarcopenia from progressing.';}
  else{cls='high';emoji='🔴';label='High Muscle Loss Risk';sub='Multiple risk factors detected. Discuss sarcopenia screening with your doctor soon.';}

  // Display score as "health score" (higher is better for the user)
  document.getElementById('risk-result').className='risk-result '+cls;
  document.getElementById('r-emoji').textContent=emoji;
  document.getElementById('r-score').textContent=healthPct;
  document.getElementById('r-label').textContent=label;
  document.getElementById('r-sub').textContent=sub;

  // Breakdown bars
  var bd=document.getElementById('bd-list');bd.innerHTML='';
  scores.forEach(function(s){
    var pctBar=Math.round((s.val/s.max)*100);
    var barCls=pctBar>=66?'high':pctBar>=33?'mid':'low';
    var d=document.createElement('div');d.className='bd-item';
    d.innerHTML='<span class="bd-cat">'+s.label+'</span><div class="bd-bar-wrap"><div class="bd-bar '+barCls+'" style="width:0%"></div></div><span class="bd-score">'+s.val+'/'+s.max+'</span>';
    bd.appendChild(d);
    setTimeout(function(){d.querySelector('.bd-bar').style.width=pctBar+'%';},100);
  });

  // Action plan based on weak areas
  var ap=document.getElementById('ap-list');ap.innerHTML='';
  var plan=[];
  var apEl=document.getElementById('action-plan');

  if(cls==='high'){
    apEl.className='action-plan urgent';
    document.getElementById('ap-title').textContent='Urgent — your muscle preservation action plan';
    plan.push({ic:'🩺',t:'<strong>See your doctor for sarcopenia screening.</strong> Ask for grip strength testing, gait speed measurement, and a DEXA scan for muscle mass. Early intervention makes a huge difference.'});
  }else if(cls==='moderate'){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your muscle preservation action plan';
    plan.push({ic:'📋',t:'<strong>You caught this early — that\\'s good.</strong> Focus on the red and yellow items above. These are the specific areas where you can make the biggest impact.'});
  }else{
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Keep it up — your maintenance plan';
    plan.push({ic:'✅',t:'<strong>Excellent!</strong> Your strength and habits are protecting your muscles. Continue your current routine and re-take this quiz every 6 months to track changes.'});
  }

  // Specific tips based on weak areas
  if(scores[0].val<=1||scores[2].val<=1||scores[3].val<=1) plan.push({ic:'🏋️',t:'<strong>Start resistance training NOW.</strong> Weakness in chair rise, stairs, or grip = muscle deficit. Begin with bodyweight exercises: wall push-ups, chair squats, resistance bands. Aim for 2-3 sessions per week. You can gain measurable strength in 8-12 weeks. <a href="/joints/" style="color:var(--green);font-weight:700">Joint supplements for exercise →</a>'});
  if(scores[1].val<=1) plan.push({ic:'🚶',t:'<strong>Walking speed is a vital sign.</strong> Slower walking speed is one of the strongest predictors of health decline. Set a daily walking goal and gradually increase pace. A walking stick is fine — the key is consistent movement.'});
  if(scores[4].val<=1) plan.push({ic:'🤕',t:'<strong>Falls indicate muscle weakness AND balance problems.</strong> Ask your doctor for a fall risk assessment. Balance exercises (standing on one foot, heel-to-toe walking) reduce fall risk by 40%. Consider tai chi — it\\'s the most evidence-backed balance intervention.'});
  if(scores[5].val<=1) plan.push({ic:'🥩',t:'<strong>Your protein intake is dangerously low.</strong> This is accelerating your muscle loss. You need 25-30g protein at EVERY meal — not just dinner. Add eggs at breakfast, Greek yogurt for snacks, chicken or fish at lunch. <a href="/tools/protein-calculator/" style="color:var(--green);font-weight:700">Calculate your exact protein target →</a>'});
  if(scores[6].val<=1) plan.push({ic:'💪',t:'<strong>Strength training is the #1 anti-sarcopenia intervention.</strong> Walking alone is NOT enough — you need to challenge your muscles against resistance. Resistance bands are cheap, portable, and effective for beginners. Even 20 minutes 3x/week makes a dramatic difference.'});
  if(scores[7].val<=1) plan.push({ic:'⚖️',t:'<strong>Unintentional weight loss is a red flag.</strong> When seniors lose weight without trying, most of it is muscle. See your doctor to check for underlying causes: thyroid, cancer screening, depression, medication side effects, or malnutrition.'});
  if(scores[8].val<=1) plan.push({ic:'⚡',t:'<strong>Low energy may be muscle-related.</strong> Muscle is your body\\'s metabolic engine — less muscle means less energy. Check Vitamin D levels (very common deficiency in seniors), B12 status, and thyroid function. <a href="/tools/sleep-score/" style="color:var(--green);font-weight:700">Take the sleep quiz →</a>'});
  if(scores[9].val<=1) plan.push({ic:'💊',t:'<strong>GLP-1 medication without strength training = accelerated muscle loss.</strong> If you\\'re on Ozempic/Wegovy/Mounjaro, resistance training and 1.2-1.5g protein per kg is absolutely essential — not optional. <a href="/tools/glp1-calculator/" style="color:var(--green);font-weight:700">GLP-1 Calculator →</a>'});

  // Always add supplement tip
  plan.push({ic:'🌿',t:'<strong>Supplements that support muscle health:</strong> Creatine Monohydrate (5g/day — safe and effective for seniors), Vitamin D3+K2 (2000-4000 IU), Omega-3 Fish Oil (for inflammation), and Protein Powder to fill gaps. <a href="/longevity/" style="color:var(--green);font-weight:700">See longevity supplements →</a>'});

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

<div className="intro-note"><p><strong>Why this matters:</strong> You lose 3-8% of muscle mass per decade after 30. After 60, the rate accelerates. By 70, many adults have lost 30-40% of peak muscle. This isn't just about looking weak — sarcopenia increases fall risk 3x, doubles hospitalization rates, and is one of the strongest predictors of early death in seniors. The good news: it's reversible with the right actions.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Assess Your Muscle Loss Risk</h2>
<div className="calc-sub">Based on the SARC-F screening model with additional senior-specific factors</div>

<div className="quiz-q"><div className="q-num">Question 1 of 10</div><h3>💪 Can you rise from a chair without using your arms?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Yes, easily every time</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">Yes, but it takes effort</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">Sometimes need to push off with hands</span></label>
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">Always need my arms or someone's help</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 2 of 10</div><h3>🚶 How is your walking speed compared to 5 years ago?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">About the same — I walk briskly</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">Slightly slower but still comfortable</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">Noticeably slower — others pass me</span></label>
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">Much slower — I avoid walking far</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 3 of 10</div><h3>🪜 Can you climb a flight of stairs (10-12 steps)?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Yes, without difficulty or resting</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">Yes, but I'm winded at the top</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Need the railing and go slowly</span></label>
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">I avoid stairs or can't do them</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 4 of 10</div><h3>🫙 How is your grip strength (opening jars, carrying bags)?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Strong — no trouble with jars or bags</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Mostly fine, occasional difficulty</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Often struggle with jars and heavy bags</span></label>
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">Very weak — need help regularly</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 5 of 10</div><h3>🤸 Have you fallen in the past 12 months?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">No falls at all</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">1 fall, but no injury</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">2-3 falls or 1 with injury</span></label>
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">4+ falls or major injury from falling</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 6 of 10</div><h3>🥩 How much protein do you eat daily?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">Protein at every meal (eggs, meat, fish, dairy)</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">Protein at most meals</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">Mostly carbs — protein mainly at dinner</span></label>
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">Very little protein — mostly bread, rice, snacks</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 7 of 10</div><h3>🏋️ Do you do any resistance/strength training?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">Yes, 2-3+ times per week (weights, bands, bodyweight)</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Occasionally (1x/week or less)</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Only walking/cardio, no strength work</span></label>
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">No exercise at all</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 8 of 10</div><h3>⚖️ Have you lost weight unintentionally in the past year?</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">No — weight is stable</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">Lost 1-5 lbs without trying</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">Lost 5-10 lbs without trying</span></label>
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">Lost more than 10 lbs without trying</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 9 of 10</div><h3>😴 How is your energy level throughout the day?</h3><div className="q-options" id="q9">
<label className="q-opt"><input type="radio" name="q9" value="3" /><span className="q-radio"></span><span className="q-text">Good energy most of the day</span></label>
<label className="q-opt"><input type="radio" name="q9" value="2" /><span className="q-radio"></span><span className="q-text">Decent but tire in the afternoon</span></label>
<label className="q-opt"><input type="radio" name="q9" value="1" /><span className="q-radio"></span><span className="q-text">Low energy — fatigue is common</span></label>
<label className="q-opt"><input type="radio" name="q9" value="0" /><span className="q-radio"></span><span className="q-text">Exhausted most of the time</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 10 of 10</div><h3>💊 Are you on GLP-1 medication or recently lost significant weight?</h3><div className="q-options" id="q10">
<label className="q-opt"><input type="radio" name="q10" value="3" /><span className="q-radio"></span><span className="q-text">No weight loss drugs, weight is stable</span></label>
<label className="q-opt"><input type="radio" name="q10" value="2" /><span className="q-radio"></span><span className="q-text">On GLP-1 but doing strength training</span></label>
<label className="q-opt"><input type="radio" name="q10" value="1" /><span className="q-radio"></span><span className="q-text">On GLP-1 without strength training</span></label>
<label className="q-opt"><input type="radio" name="q10" value="0" /><span className="q-radio"></span><span className="q-text">Lost 20+ lbs recently without exercise</span></label>
</div></div>

<button className="calc-btn">💪 Get My Muscle Loss Risk Score →</button>

<div className="results" id="results">

<div className="risk-result" id="risk-result">
<div className="risk-emoji" id="r-emoji">💪</div>
<div><span className="risk-score" id="r-score">72</span><span className="risk-of"> / 100</span></div>
<div className="risk-label" id="r-label">Moderate Risk</div>
<div className="risk-sub" id="r-sub">You show some signs of muscle loss — action now can prevent progression</div>
</div>

<div className="breakdown"><h3>Your risk factor breakdown</h3><div id="bd-list"></div></div>

<div className="action-plan" id="action-plan"><h3 id="ap-title">Your muscle preservation plan</h3><div id="ap-list"></div></div>

</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="1775331881" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Understanding sarcopenia — the silent muscle thief</h2>
<p>Sarcopenia comes from the Greek words "sarx" (flesh) and "penia" (poverty) — literally "poverty of flesh." It's the age-related progressive loss of muscle mass, strength, and physical function. Unlike osteoporosis (which gets regular screening), sarcopenia is rarely tested for — yet it's equally dangerous and far more common.</p>

<h3>Why muscle loss accelerates after 60</h3>
<p>Multiple factors converge: declining testosterone and growth hormone, chronic low-grade inflammation (inflammaging), reduced physical activity, inadequate protein intake, and cellular changes that make muscle less responsive to protein (anabolic resistance). After 60, you can lose 1-2% of muscle mass per year — and the rate increases with each decade.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: Cruz-Jentoft AJ et al., "Sarcopenia: revised European consensus on definition and diagnosis," Age and Ageing, 2019. Malmstrom TK et al., "SARC-F: a simple questionnaire to rapidly diagnose sarcopenia," Journal of the American Medical Directors Association, 2013.</em></p>

<h3>The SARC-F screening test</h3>
<p>The SARC-F is a validated clinical screening questionnaire that asks 5 questions about Strength, Assistance walking, Rising from a chair, Climbing stairs, and Falls. A score of 4+ suggests sarcopenia risk. Our quiz expands on SARC-F by adding nutrition, exercise, weight loss, energy, and GLP-1 medication questions — making it more comprehensive for today's senior health landscape.</p>

<h3>Muscle loss and GLP-1 medications</h3>
<p>This is an emerging crisis. GLP-1 drugs like Ozempic, Wegovy, and Mounjaro cause rapid weight loss — but research shows 20-40% of that lost weight is lean muscle. For seniors already losing muscle from aging, adding GLP-1 without resistance training can dramatically accelerate sarcopenia. If you're on GLP-1 medication, strength training and high protein intake (1.2-1.5g/kg) are not optional — they're essential.</p>
<p><strong>Related:</strong> <a href="/tools/glp1-calculator/" style={{"color":"var(--green)","fontWeight":"700"}}>GLP-1 Weight Loss Calculator →</a> | <a href="/tools/protein-calculator/" style={{"color":"var(--green)","fontWeight":"700"}}>Protein Calculator for Seniors →</a></p>

<h3>How to fight back — it's never too late</h3>
<p>The most powerful intervention is resistance training — and it works at any age. Studies show seniors in their 80s and 90s who begin strength training gain measurable muscle mass within 8-12 weeks. Combined with adequate protein (1.0-1.2g/kg daily, spread across meals), Vitamin D3+K2, and creatine monohydrate (5g daily — safe and effective for seniors), muscle loss can be slowed, stopped, and partially reversed.</p>
<p><strong>See supplements that support muscle health:</strong> <a href="/joints/" style={{"color":"var(--green)","fontWeight":"700"}}>Joint &amp; bone supplements →</a> | <a href="/longevity/" style={{"color":"var(--green)","fontWeight":"700"}}>Longevity supplements →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">What is sarcopenia and how common is it?<span className="faq-icon">+</span></button><div className="faq-a">Sarcopenia is age-related muscle loss affecting approximately 1 in 3 adults over 60 and up to 50% over 80. It increases fall risk 3x, doubles hospitalization rates, and reduces independence. Most people don't know they have it until a fall reveals the damage.</div></div>
<div className="faq-item"><button className="faq-q">What are the signs of muscle loss in seniors?<span className="faq-icon">+</span></button><div className="faq-a">Difficulty rising from a chair without arms, weaker grip (dropping jars), slower walking, trouble with stairs, unintentional weight loss, increased fatigue, and more frequent falls. If you notice 2+ of these, screening is recommended.</div></div>
<div className="faq-item"><button className="faq-q">Can you reverse sarcopenia after 60?<span className="faq-icon">+</span></button><div className="faq-a">Yes — resistance training 2-3x per week combined with 1.0-1.2g protein per kg body weight daily can restore significant muscle. Studies show measurable gains within 8-12 weeks, even in people in their 80s and 90s.</div></div>
<div className="faq-item"><button className="faq-q">How much protein prevents muscle loss?<span className="faq-icon">+</span></button><div className="faq-a">Seniors need 1.0-1.2g/kg daily — 25-50% more than the standard 0.8g/kg RDA. Spread across 3 meals (25-30g each). Up to 1.5g/kg if recovering from illness or on GLP-1 medications. Use our protein calculator for your exact target.</div></div>
<div className="faq-item"><button className="faq-q">Does GLP-1 medication cause muscle loss?<span className="faq-icon">+</span></button><div className="faq-a">Yes — 20-40% of weight lost on Ozempic/Wegovy/Mounjaro can be muscle. Seniors on GLP-1 must do resistance training and eat 1.2-1.5g protein per kg to prevent accelerated sarcopenia.</div></div>
<div className="faq-item"><button className="faq-q">What is the SARC-F test?<span className="faq-icon">+</span></button><div className="faq-a">SARC-F is a validated 5-question screening for sarcopenia covering Strength, Assistance walking, Rising, Climbing stairs, and Falls. Score 4+ suggests risk. Our quiz expands on SARC-F with additional nutrition, exercise, and medication questions.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/tools/protein-calculator/" className="r-link"><span>🥩</span> Protein Calculator</a>
<a href="/joints/" className="r-link"><span>🦴</span> Joint supplements</a>
<a href="/tools/glp1-calculator/" className="r-link"><span>⚖️</span> GLP-1 Calculator</a>
<a href="/longevity/" className="r-link"><span>🧬</span> Longevity supplements</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz is a screening tool inspired by the SARC-F questionnaire. It is NOT a clinical diagnosis of sarcopenia. A proper diagnosis requires grip strength testing, muscle mass measurement (DEXA scan), and gait speed assessment by a healthcare provider. If your score suggests moderate or high risk, discuss sarcopenia screening with your doctor.</p></div>

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
