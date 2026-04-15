'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function ProstateCheckPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `function sel(el){
  el.closest('.q-options').querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected')});
  el.classList.add('selected');
  el.querySelector('input').checked=true;
}

function scoreRisk(){
  var cats=[
    {q:'q1',label:'Daytime frequency'},
    {q:'q2',label:'Nighttime urination (nocturia)'},
    {q:'q3',label:'Stream strength'},
    {q:'q4',label:'Difficulty starting'},
    {q:'q5',label:'Incomplete emptying'},
    {q:'q6',label:'Urgency'},
    {q:'q7',label:'Sleep impact'},
    {q:'q8',label:'PSA screening status'},
    {q:'q9',label:'Family cancer history'},
    {q:'q10',label:'Quality of life impact'}
  ];

  var total=0,scores=[];
  for(var i=0;i<cats.length;i++){
    var checked=document.querySelector('input[name="'+cats[i].q+'"]:checked');
    if(!checked){alert('Please answer all 10 questions (question '+(i+1)+' is missing)');return;}
    var val=parseInt(checked.value);
    total+=val;
    scores.push({label:cats[i].label,val:val,max:3});
  }

  // Symptom score from Q1-7 (core IPSS-inspired)
  var symptomTotal=0;for(var i=0;i<7;i++) symptomTotal+=scores[i].val;
  var symptomPct=Math.round((symptomTotal/21)*100);
  var riskPct=Math.round((total/30)*100);

  var cls,emoji,label,sub;
  if(symptomPct<=20){cls='low';emoji='✅';label='Mild or No Symptoms';sub='Your urinary symptoms are minimal. Continue annual PSA screening and healthy prostate habits.';}
  else if(symptomPct<=45){cls='low';emoji='💚';label='Mild Symptoms';sub='Some early BPH signs present. Monitor and consider lifestyle changes and supplements.';}
  else if(symptomPct<=65){cls='moderate';emoji='⚠️';label='Moderate Symptoms';sub='Your symptoms are affecting daily life. Discuss BPH treatment options with your doctor or urologist.';}
  else{cls='high';emoji='🔴';label='Severe Symptoms';sub='Significant urinary symptoms detected. See a urologist soon — effective treatments can dramatically improve your quality of life.';}

  document.getElementById('risk-result').className='risk-result '+cls;
  document.getElementById('r-emoji').textContent=emoji;
  document.getElementById('r-score').textContent=riskPct;
  document.getElementById('r-label').textContent=label;
  document.getElementById('r-sub').textContent=sub;

  // Breakdown
  var bd=document.getElementById('bd-list');bd.innerHTML='';
  scores.forEach(function(s){
    var riskBar=Math.round((s.val/s.max)*100);
    var barCls=riskBar<=33?'high':riskBar<=66?'mid':'low';
    var d=document.createElement('div');d.className='bd-item';
    d.innerHTML='<span class="bd-cat">'+s.label+'</span><div class="bd-bar-wrap"><div class="bd-bar '+barCls+'" style="width:0%"></div></div><span class="bd-score">'+s.val+'/3</span>';
    bd.appendChild(d);
    setTimeout(function(){d.querySelector('.bd-bar').style.width=riskBar+'%';},100);
  });

  // Action plan
  var ap=document.getElementById('ap-list');ap.innerHTML='';
  var plan=[];
  var apEl=document.getElementById('action-plan');

  if(symptomPct>65){
    apEl.className='action-plan urgent';
    document.getElementById('ap-title').textContent='See a urologist — your symptoms are severe';
    plan.push({ic:'🩺',t:'<strong>Schedule a urology appointment.</strong> Your symptom severity score suggests BPH that would benefit significantly from medical treatment. Alpha-blockers (like tamsulosin) can provide relief within 1-2 weeks. Don\\'t suffer in silence — these symptoms are highly treatable.'});
  }else if(symptomPct>40){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your prostate health plan';
    plan.push({ic:'📋',t:'<strong>Your symptoms are moderate — discuss with your doctor.</strong> Mention your urinary symptoms at your next visit. Medication may help, or lifestyle changes and supplements may be sufficient for now.'});
  }else{
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your prostate maintenance plan';
    plan.push({ic:'✅',t:'<strong>Symptoms are mild — great!</strong> Focus on prevention with the lifestyle and supplement tips below. Continue annual PSA screening.'});
  }

  if(scores[1].val>=2) plan.push({ic:'🌙',t:'<strong>Nocturia is destroying your sleep.</strong> Getting up 3+ times per night causes chronic sleep deprivation, daytime fatigue, and fall risk. Limit fluids 2-3 hours before bed, avoid caffeine after noon, and empty your bladder twice before sleeping ("double voiding"). If these don\\'t help, medication can. <a href="/tools/sleep-score/" style="color:var(--green);font-weight:700">Take the Sleep Quiz →</a>'});
  if(scores[2].val>=2||scores[3].val>=2) plan.push({ic:'💧',t:'<strong>Weak stream / difficulty starting = likely obstruction.</strong> The enlarged prostate is physically blocking urine flow. Alpha-blocker medications relax the prostate muscles and can restore normal flow within days. This is the most treatable BPH symptom — talk to your doctor.'});
  if(scores[4].val>=2) plan.push({ic:'🔄',t:'<strong>Incomplete emptying increases UTI risk.</strong> Residual urine in the bladder breeds bacteria. Try "double voiding" — urinate, wait 30 seconds, then try again. If the sensation persists, your doctor can measure post-void residual with a simple ultrasound.'});
  if(scores[5].val>=2) plan.push({ic:'⚡',t:'<strong>Urgency and incontinence are treatable.</strong> Bladder training exercises (gradually increasing time between bathroom visits) can improve control. Medications like mirabegron calm the overactive bladder. Don\\'t limit activities because of urgency — get treatment instead.'});
  if(scores[6].val>=2) plan.push({ic:'💤',t:'<strong>Sleep disruption from BPH is a serious health issue.</strong> Chronic sleep loss from nocturia increases heart disease risk, impairs memory, and raises fall risk. Treating the prostate issue fixes the sleep problem. <a href="/tools/sleep-score/" style="color:var(--green);font-weight:700">Sleep Quiz →</a> | <a href="/tools/fall-risk/" style="color:var(--green);font-weight:700">Fall Risk →</a>'});
  if(scores[7].val>=2) plan.push({ic:'📅',t:'<strong>You\\'re overdue for PSA screening.</strong> Men over 50 should have annual PSA blood test and digital rectal exam. Early detection of prostate issues (including cancer) dramatically improves outcomes. Schedule this appointment now — it takes 5 minutes.'});
  if(scores[8].val>=2) plan.push({ic:'👨‍👩‍👦',t:'<strong>Family history increases your prostate cancer risk.</strong> With a father or brother affected, your risk is 2-3x higher. This makes annual PSA screening even more important. Discuss with your doctor whether you need more frequent monitoring.'});

  // Supplement tip
  plan.push({ic:'🌿',t:'<strong>Natural prostate support:</strong> Saw Palmetto (320mg), Beta-Sitosterol, Pygeum (reduces nighttime urination), Zinc, and Lycopene all have clinical evidence. Best for mild-to-moderate symptoms. <a href="/prostate/" style="color:var(--green);font-weight:700">See our prostate supplement guide →</a>'});

  // Lifestyle tips
  plan.push({ic:'🚶',t:'<strong>Lifestyle tips:</strong> Exercise regularly (reduces BPH symptoms), limit caffeine and alcohol (bladder irritants), avoid antihistamines and decongestants (worsen obstruction), and maintain a healthy weight — obesity worsens BPH. <a href="/tools/bmi-senior/" style="color:var(--green);font-weight:700">Check your BMI →</a>'});

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

<div className="intro-note"><p><strong>Most men suffer in silence.</strong> Prostate enlargement is the most common health issue in older men, yet many never discuss symptoms with their doctor. Getting up 3-4 times per night to urinate is NOT just "getting older" — it's a treatable condition. This quiz helps you understand whether your symptoms are mild, moderate, or severe, and what to do about them.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Rate Your Prostate Symptoms</h2>
<div className="calc-sub">Based on the International Prostate Symptom Score (IPSS) used by urologists worldwide</div>

<div className="quiz-q"><div className="q-num">Question 1 of 10</div><h3>🚽 How often do you urinate during the day?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">Every 3-4 hours (normal)</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">Every 2-3 hours</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">Every 1-2 hours</span></label>
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Almost hourly or more</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 2 of 10</div><h3>🌙 How many times do you wake up at night to urinate?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">0-1 times (normal for age)</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">2 times</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">3-4 times</span></label>
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">5+ times — barely sleep</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 3 of 10</div><h3>💧 How is your urine stream strength?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">Strong and steady</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Slightly weaker than it used to be</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">Noticeably weak — takes longer to finish</span></label>
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Very weak — dribbles or stops and starts</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 4 of 10</div><h3>⏳ Do you have difficulty starting to urinate?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">No — starts immediately</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Slight delay (a few seconds)</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Noticeable wait — need to stand and wait</span></label>
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Significant difficulty — straining required</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 5 of 10</div><h3>🔄 Does your bladder feel completely empty after urinating?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">Yes — completely empty every time</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">Mostly — occasionally feels not quite done</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">Often feels like there's still urine left</span></label>
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">Never feels empty — always need to go again soon</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 6 of 10</div><h3>⚡ Do you experience sudden urgency (need to rush to the bathroom)?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">Rarely or never</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">Occasionally — once or twice a week</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">Frequently — several times daily</span></label>
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">Almost constantly — sometimes don't make it in time</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 7 of 10</div><h3>💤 How much do these symptoms affect your sleep?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">Not at all — sleep well</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Mildly — wake once but fall back asleep</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Moderately — broken sleep most nights</span></label>
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">Severely — exhausted from nighttime bathroom trips</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 8 of 10</div><h3>📅 When did you last have a PSA test and prostate exam?</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">Within the past year</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">1-2 years ago</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">3-5 years ago</span></label>
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">Never, or more than 5 years ago</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 9 of 10</div><h3>👨‍👩‍👦 Does prostate cancer run in your family?</h3><div className="q-options" id="q9">
<label className="q-opt"><input type="radio" name="q9" value="0" /><span className="q-radio"></span><span className="q-text">No family history</span></label>
<label className="q-opt"><input type="radio" name="q9" value="1" /><span className="q-radio"></span><span className="q-text">Extended family (uncle, grandfather)</span></label>
<label className="q-opt"><input type="radio" name="q9" value="2" /><span className="q-radio"></span><span className="q-text">Father or brother had prostate cancer</span></label>
<label className="q-opt"><input type="radio" name="q9" value="3" /><span className="q-radio"></span><span className="q-text">Multiple close relatives had prostate cancer</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 10 of 10</div><h3>😤 Overall, how bothered are you by your urinary symptoms?</h3><div className="q-options" id="q10">
<label className="q-opt"><input type="radio" name="q10" value="0" /><span className="q-radio"></span><span className="q-text">Not at all — no issues</span></label>
<label className="q-opt"><input type="radio" name="q10" value="1" /><span className="q-radio"></span><span className="q-text">Mildly annoying but manageable</span></label>
<label className="q-opt"><input type="radio" name="q10" value="2" /><span className="q-radio"></span><span className="q-text">Moderately — affects daily life and sleep</span></label>
<label className="q-opt"><input type="radio" name="q10" value="3" /><span className="q-radio"></span><span className="q-text">Severely — significantly impacts quality of life</span></label>
</div></div>

<button className="calc-btn">🩺 Get My Prostate Health Score →</button>

<div className="results" id="results">
<div className="risk-result" id="risk-result">
<div className="risk-emoji" id="r-emoji">🩺</div>
<div><span className="risk-score" id="r-score">45</span><span className="risk-of"> / 100</span></div>
<div className="risk-label" id="r-label">Moderate Symptoms</div>
<div className="risk-sub" id="r-sub">Your urinary symptoms are affecting your quality of life</div>
</div>
<div className="breakdown"><h3>Your symptom breakdown</h3><div id="bd-list"></div></div>
<div className="action-plan" id="action-plan"><h3 id="ap-title">Your prostate health plan</h3><div id="ap-list"></div></div>
</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Understanding prostate health after 50</h2>
<p>The prostate gland grows throughout a man's life. By age 60, it's often large enough to press on the urethra, restricting urine flow — a condition called benign prostatic hyperplasia (BPH). This is NOT cancer, but its symptoms can be identical. That's why proper evaluation by a urologist is essential: to confirm BPH, rule out cancer, and discuss treatment options that can dramatically improve quality of life.</p>

<h3>BPH by the numbers</h3>
<p>BPH affects approximately 50% of men in their 60s, 70% in their 70s, and 90% of men in their 80s. It is the most common reason older men visit a urologist. Despite being so common, many men endure years of symptoms before seeking help — often because they assume it's just "normal aging." It's not. BPH is treatable, and treatment can restore sleep, reduce urgency, and dramatically improve daily comfort.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: Barry MJ et al., "The International Prostate Symptom Score (IPSS)," Journal of Urology, 1992. American Urological Association Guidelines on BPH Management, 2023. Roehrborn CG, "Benign Prostatic Hyperplasia," NEJM, 2008.</em></p>

<h3>Nocturia — the sleep destroyer</h3>
<p>The symptom that bothers men most is nocturia — waking up multiple times per night to urinate. Getting up 3-4 times per night fragments sleep, causing daytime fatigue, reduced concentration, and increased fall risk (nighttime bathroom trips in the dark are a leading cause of falls in older men). Treating the underlying prostate enlargement often fixes the sleep problem. If nocturia is your primary concern, also take our sleep quiz.</p>
<p><strong>Related:</strong> <a href="/tools/sleep-score/" style={{"color":"var(--green)","fontWeight":"700"}}>Sleep Quality Quiz →</a> | <a href="/tools/fall-risk/" style={{"color":"var(--green)","fontWeight":"700"}}>Fall Risk Assessment →</a></p>

<h3>BPH vs prostate cancer — key differences</h3>
<p>BPH and prostate cancer are separate conditions. BPH is benign growth — the prostate gets bigger but the cells are normal. Prostate cancer is abnormal cell growth. Having BPH does NOT increase your cancer risk. However, symptoms can overlap, which is why PSA testing and digital rectal exam are important for distinguishing between them. If your PSA is elevated, your doctor may recommend further testing — but an elevated PSA alone does not mean cancer.</p>

<h3>Treatment options for BPH</h3>
<p><strong>Watchful waiting</strong> (mild symptoms): monitor without treatment, lifestyle changes. <strong>Alpha-blockers</strong> (tamsulosin, alfuzosin): relax prostate muscles for better urine flow — fast relief. <strong>5-alpha reductase inhibitors</strong> (finasteride, dutasteride): shrink the prostate over 6-12 months. <strong>Combination therapy:</strong> both drug classes together for moderate-severe symptoms. <strong>Minimally invasive procedures</strong> (UroLift, Rezūm): for men who don't respond to medication. <strong>Surgery (TURP):</strong> the gold standard for severe BPH — removes prostate tissue blocking the urethra.</p>

<h3>Natural supplements for prostate health</h3>
<p>Several supplements have clinical evidence for mild-to-moderate BPH symptom relief: Saw Palmetto (320mg — the most studied prostate supplement, may reduce urinary frequency), Beta-Sitosterol (60-130mg — improves urinary flow in multiple trials), Pygeum Africanum (100mg — specifically reduces nighttime urination), Zinc (30mg — essential for prostate tissue health), and Lycopene (10mg — antioxidant protection). These work best for mild symptoms and alongside medical treatment.</p>
<p><strong>See our complete guide:</strong> <a href="/prostate/" style={{"color":"var(--green)","fontWeight":"700"}}>Doctor-reviewed prostate supplements for men →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">What are symptoms of an enlarged prostate?<span className="faq-icon">+</span></button><div className="faq-a">Frequent urination (especially at night), weak stream, difficulty starting, incomplete emptying, urgency, stop-and-start flow, straining, and dribbling. Symptoms range from mild nuisance to severe impact on life and sleep.</div></div>
<div className="faq-item"><button className="faq-q">How common is enlarged prostate in men over 60?<span className="faq-icon">+</span></button><div className="faq-a">BPH affects about 50% of men in their 60s and up to 90% in their 80s. It's the most common prostate condition. It is NOT cancer and doesn't increase cancer risk, but symptoms significantly impact quality of life.</div></div>
<div className="faq-item"><button className="faq-q">What is the IPSS score?<span className="faq-icon">+</span></button><div className="faq-a">The International Prostate Symptom Score is a validated 7-question tool used by urologists. Scores 0-7 are mild, 8-19 moderate, 20-35 severe. Our quiz is inspired by IPSS with additional lifestyle and screening questions.</div></div>
<div className="faq-item"><button className="faq-q">What supplements help prostate health?<span className="faq-icon">+</span></button><div className="faq-a">Saw Palmetto (320mg), Beta-Sitosterol (60-130mg), Pygeum Africanum (100mg), Zinc (30mg), and Lycopene (10mg). Best for mild-to-moderate symptoms. Always use alongside, not instead of, medical treatment.</div></div>
<div className="faq-item"><button className="faq-q">When should I see a urologist?<span className="faq-icon">+</span></button><div className="faq-a">If you: wake 3+ times to urinate, have difficulty starting/maintaining stream, see blood in urine, experience pain during urination, feel bladder never empties, or can't urinate at all (emergency). Also get annual PSA screening after 50.</div></div>
<div className="faq-item"><button className="faq-q">Does BPH increase prostate cancer risk?<span className="faq-icon">+</span></button><div className="faq-a">No — BPH does NOT cause or increase cancer risk. They're separate conditions that can coexist. Some symptoms overlap, which is why proper evaluation is important. Regular PSA testing helps distinguish between them.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/prostate/" className="r-link"><span>🩺</span> Prostate supplements</a>
<a href="/tools/sleep-score/" className="r-link"><span>🌙</span> Sleep Quiz</a>
<a href="/tools/fall-risk/" className="r-link"><span>🛡️</span> Fall Risk Quiz</a>
<a href="/kidney/" className="r-link"><span>💧</span> Kidney supplements</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz is a self-screening tool inspired by the International Prostate Symptom Score (IPSS). It is NOT a medical diagnosis. Only a urologist can diagnose BPH, prostate cancer, or other prostate conditions through PSA testing, digital rectal exam, and potentially imaging or biopsy. If your symptoms are moderate or severe, please see a urologist.</p>
<p>If you experience sudden inability to urinate (urinary retention), blood in urine, or severe pain, seek emergency medical care immediately.</p></div>

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
