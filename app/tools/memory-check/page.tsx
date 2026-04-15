'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function MemoryCheckPage() {

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

function scoreMemory(){
  var cats=[
    {q:'q1',label:'Recent memory recall'},
    {q:'q2',label:'Word finding ability'},
    {q:'q3',label:'Multi-step task execution'},
    {q:'q4',label:'Spatial navigation'},
    {q:'q5',label:'Repetition awareness'},
    {q:'q6',label:'Daily task management'},
    {q:'q7',label:'Focus & concentration'},
    {q:'q8',label:'Sleep quality'},
    {q:'q9',label:'Physical activity'},
    {q:'q10',label:'Social engagement'}
  ];

  var total=0,scores=[];
  for(var i=0;i<cats.length;i++){
    var checked=document.querySelector('input[name="'+cats[i].q+'"]:checked');
    if(!checked){alert('Please answer all 10 questions (question '+(i+1)+' is missing)');return;}
    var val=parseInt(checked.value);
    total+=val;
    scores.push({label:cats[i].label,val:val,max:3});
  }

  var pct=Math.round((total/30)*100);

  var cls,emoji,label,sub;
  if(pct>=80){cls='low';emoji='🧠';label='Excellent Brain Health';sub='Your cognitive function and brain-protective habits are strong. Keep up your routine!';}
  else if(pct>=60){cls='low';emoji='💚';label='Good Brain Health';sub='Your brain health is solid with a few areas to strengthen. See the tips below for your specific weak spots.';}
  else if(pct>=40){cls='moderate';emoji='⚠️';label='Fair — Some Concerns';sub='Several areas need attention. The personalized plan below targets your specific weak points. Consider discussing with your doctor.';}
  else{cls='high';emoji='🔴';label='Concerning — Please See Your Doctor';sub='Multiple significant cognitive concerns detected. Schedule an evaluation with your doctor — many causes of memory problems are treatable.';}

  document.getElementById('risk-result').className='risk-result '+cls;
  document.getElementById('r-emoji').textContent=emoji;
  document.getElementById('r-score').textContent=pct;
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

  // Action plan
  var ap=document.getElementById('ap-list');ap.innerHTML='';
  var plan=[];
  var apEl=document.getElementById('action-plan');

  // Core cognitive concerns (Q1-7)
  var cogScore=0;for(var i=0;i<7;i++) cogScore+=scores[i].val;
  var cogPct=Math.round((cogScore/21)*100);

  if(cogPct<40){
    apEl.className='action-plan urgent';
    document.getElementById('ap-title').textContent='Important — please see your doctor';
    plan.push({ic:'🩺',t:'<strong>Schedule a cognitive evaluation.</strong> Your answers suggest functional cognitive concerns that warrant professional assessment. Ask your doctor for an MMSE or MoCA screening test. Many causes of memory problems are TREATABLE — B12 deficiency, thyroid disorders, medication side effects, sleep apnea, depression, and even dehydration can all mimic dementia.'});
  }else if(cogPct<60){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your brain health improvement plan';
    plan.push({ic:'📋',t:'<strong>Some cognitive areas need attention.</strong> Focus on the red and yellow categories above. The good news: the brain retains neuroplasticity at any age — improvement is possible with consistent effort.'});
  }else{
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your brain maintenance plan';
    plan.push({ic:'✅',t:'<strong>Your cognitive function looks healthy!</strong> The tips below will help you maintain and even improve your brain health as you age.'});
  }

  // Specific tips based on weak areas
  if(scores[0].val<=1||scores[4].val<=1) plan.push({ic:'🧠',t:'<strong>Memory recall issues:</strong> Try the "tell someone" technique — after learning something new, immediately tell another person about it. Writing things down also strengthens memory encoding. Brain games like crosswords help, but learning NEW skills (language, instrument) builds more neural pathways.'});
  if(scores[1].val<=1) plan.push({ic:'💬',t:'<strong>Word-finding difficulty:</strong> This is one of the most common age-related changes and is usually normal. Stay socially active — regular conversation exercises language circuits. Reading aloud strengthens word retrieval. If word-finding becomes severe enough to disrupt conversations, mention it to your doctor.'});
  if(scores[2].val<=1||scores[5].val<=1) plan.push({ic:'📝',t:'<strong>Task management:</strong> Use external memory aids without shame — they\\'re tools, not crutches. Keep a daily planner, use phone reminders, and maintain a consistent routine. If managing bills/medications has become genuinely difficult, discuss with your doctor.'});
  if(scores[3].val<=1) plan.push({ic:'🗺️',t:'<strong>Navigation confusion is a red flag.</strong> Getting lost in familiar places is NOT a normal part of aging. Please discuss this specific symptom with your doctor — it may indicate early cognitive changes that benefit from early intervention.'});
  if(scores[6].val<=1) plan.push({ic:'🎯',t:'<strong>Focus and concentration:</strong> Reduce distractions (turn off TV while reading), practice single-tasking instead of multitasking, and try meditation — even 10 minutes daily improves attention. Also check: is poor focus actually caused by poor sleep, depression, or medication side effects?'});
  if(scores[7].val<=1) plan.push({ic:'😴',t:'<strong>Poor sleep directly damages memory.</strong> During deep sleep, your brain consolidates memories and clears Alzheimer\\'s-related proteins. Improving your sleep may be the single most impactful thing you can do for memory. <a href="/tools/sleep-score/" style="color:var(--green);font-weight:700">Take the Sleep Quality Quiz →</a>'});
  if(scores[8].val<=1) plan.push({ic:'🏃',t:'<strong>Exercise is brain medicine.</strong> Aerobic exercise increases BDNF, which grows new brain cells. Walking 150 min/week (22 min/day) reduces dementia risk 30-40%. Start today — even a 10-minute walk helps. This is the most powerful brain-protective habit you can adopt.'});
  if(scores[9].val<=1) plan.push({ic:'👥',t:'<strong>Social isolation increases dementia risk by 50%.</strong> Regular conversation exercises memory, attention, and language simultaneously. Join a class, volunteer, call a friend daily, or attend community events. Even brief daily interactions are protective.'});

  // Always add supplement tip
  plan.push({ic:'🌿',t:'<strong>Supplements for brain health:</strong> Omega-3 DHA (1000mg), Lion\\'s Mane Mushroom, B12 Methylcobalamin, Phosphatidylserine, and Vitamin D3. Consistency over months is key. <a href="/brain/" style="color:var(--green);font-weight:700">See our brain supplement guide →</a>'});

  // Cross-links based on related risks
  if(pct<60) plan.push({ic:'❤️',t:'<strong>Check related risk factors:</strong> Heart disease, diabetes, and poor sleep all accelerate cognitive decline. <a href="/tools/heart-age/" style="color:var(--green);font-weight:700">Heart Age →</a> | <a href="/tools/diabetes-risk/" style="color:var(--green);font-weight:700">Diabetes Risk →</a> | <a href="/tools/hydration/" style="color:var(--green);font-weight:700">Hydration →</a>'});

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

<div className="intro-note"><p><strong>Important distinction:</strong> Forgetting where you put your keys is NORMAL aging. Forgetting what keys are for is NOT. This quiz helps you understand where your memory falls on that spectrum. It is NOT a dementia diagnosis — only a neurologist can provide that. But it can help you identify areas to work on and when to talk to your doctor.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Assess Your Brain Health</h2>
<div className="calc-sub">Think about the past few months — be honest with yourself</div>

<div className="quiz-q"><div className="q-num">Question 1 of 10</div><h3>🧠 How well do you remember recent conversations or events?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Well — I recall details from conversations and events</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">Mostly — forget small details but remember the main points</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">Struggling — often forget conversations I just had</span></label>
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">Frequently forget entire conversations or events</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 2 of 10</div><h3>💬 How easily do you find the right words when speaking?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">Easily — conversations flow naturally</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">Mostly fine — occasionally pause to find a word</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">Frequently stuck — "tip of the tongue" happens often</span></label>
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">Very difficult — regularly can't express what I mean</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 3 of 10</div><h3>📋 Can you follow multi-step tasks (recipes, directions, instructions)?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Yes — no trouble with complex tasks</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">Usually — occasionally need to re-read steps</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Difficult — often lose track of what step I'm on</span></label>
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">Very hard — avoid complex tasks or need help</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 4 of 10</div><h3>🗺️ Do you ever get confused in familiar places or while driving usual routes?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Never — I navigate familiar places easily</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Rarely — once or twice I've momentarily blanked</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Sometimes — occasionally confused on familiar routes</span></label>
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">Yes — I've gotten lost in places I know well</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 5 of 10</div><h3>🔄 Do you repeat the same stories or questions without realizing?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">Never — or very rarely</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">Occasionally — family points it out sometimes</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">Often — I've been told I repeat myself frequently</span></label>
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">Very often — repeating without any awareness</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 6 of 10</div><h3>💰 How well do you manage finances (bills, appointments, medications)?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">Independently — no missed bills or appointments</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">Mostly — use reminders and lists to stay on track</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">Struggling — missed payments or appointments recently</span></label>
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">Need help — family manages my finances/medications</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 7 of 10</div><h3>🎯 How is your ability to focus and concentrate?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">Good — can read a book or watch a movie without losing focus</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Fair — sometimes lose concentration partway through</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Poor — frequently distracted, can't finish what I start</span></label>
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">Very poor — can barely focus on anything for long</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 8 of 10</div><h3>😴 How well do you sleep? (Sleep quality directly affects memory)</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">Well — 7-8 hours, wake refreshed</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">Decent — some waking but mostly rested</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">Poor — frequent waking, tired in the morning</span></label>
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">Very poor — chronic insomnia or severe sleep problems</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 9 of 10</div><h3>🏃 How physically active are you?</h3><div className="q-options" id="q9">
<label className="q-opt"><input type="radio" name="q9" value="3" /><span className="q-radio"></span><span className="q-text">Active — exercise 3+ times/week including walking</span></label>
<label className="q-opt"><input type="radio" name="q9" value="2" /><span className="q-radio"></span><span className="q-text">Moderate — walk regularly, some activity</span></label>
<label className="q-opt"><input type="radio" name="q9" value="1" /><span className="q-radio"></span><span className="q-text">Light — occasional movement only</span></label>
<label className="q-opt"><input type="radio" name="q9" value="0" /><span className="q-radio"></span><span className="q-text">Sedentary — very little physical activity</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 10 of 10</div><h3>👥 How socially engaged are you?</h3><div className="q-options" id="q10">
<label className="q-opt"><input type="radio" name="q10" value="3" /><span className="q-radio"></span><span className="q-text">Very — regular contact with friends, family, or groups</span></label>
<label className="q-opt"><input type="radio" name="q10" value="2" /><span className="q-radio"></span><span className="q-text">Moderate — see people a few times a week</span></label>
<label className="q-opt"><input type="radio" name="q10" value="1" /><span className="q-radio"></span><span className="q-text">Limited — mostly alone, occasional contact</span></label>
<label className="q-opt"><input type="radio" name="q10" value="0" /><span className="q-radio"></span><span className="q-text">Isolated — rarely see or talk to anyone</span></label>
</div></div>

<button className="calc-btn">🧠 Get My Brain Health Score →</button>

<div className="results" id="results">
<div className="risk-result" id="risk-result">
<div className="risk-emoji" id="r-emoji">🧠</div>
<div><span className="risk-score" id="r-score">78</span><span className="risk-of"> / 100</span></div>
<div className="risk-label" id="r-label">Good Brain Health</div>
<div className="risk-sub" id="r-sub">Your cognitive function appears healthy for your age</div>
</div>
<div className="breakdown"><h3>Your brain health breakdown</h3><div id="bd-list"></div></div>
<div className="action-plan" id="action-plan"><h3 id="ap-title">Your brain health plan</h3><div id="ap-list"></div></div>
</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>How memory changes after 60 — what's normal and what's not</h2>
<p>The brain begins shrinking at about 0.5% per year after 60, with the hippocampus (memory center) shrinking faster. Processing speed slows, multitasking becomes harder, and name recall takes longer. These are NORMAL age-related changes. What is NOT normal is forgetting entire recent events, getting lost in familiar places, inability to manage finances you previously handled, or personality changes that concern your family.</p>

<h3>The 6 pillars of brain health — backed by research</h3>
<p><strong>1. Physical exercise:</strong> The single most powerful intervention. Aerobic exercise increases BDNF (brain-derived neurotrophic factor), which literally grows new brain cells. Walking 150 minutes per week reduces dementia risk by 30-40%. It also improves blood flow to the brain — critical since vascular problems cause 20-30% of dementia cases.</p>
<p><strong>2. Quality sleep:</strong> During deep sleep, your brain activates the glymphatic system, which flushes out beta-amyloid protein — the substance that builds up in Alzheimer's disease. Chronic poor sleep accelerates cognitive decline. Sleep apnea, which affects 20-30% of seniors, is a treatable cause of memory problems.</p>
<p><strong>3. Social engagement:</strong> Loneliness increases dementia risk by 50%. Regular social interaction exercises multiple brain functions simultaneously — attention, memory, language, emotion processing. Even brief daily conversations are protective.</p>
<p><strong>4. Mental stimulation:</strong> Learning new skills builds cognitive reserve. Learning a new language, musical instrument, or complex hobby creates new neural pathways. Passive entertainment (TV) does not provide the same benefit as active learning.</p>
<p><strong>5. Mediterranean diet:</strong> The MIND diet (Mediterranean-DASH Intervention for Neurodegenerative Delay) reduces Alzheimer's risk by up to 53% in strict followers. Key foods: leafy greens, berries, nuts, olive oil, fish, whole grains. Key avoidances: processed foods, excessive red meat, butter, fried food.</p>
<p><strong>6. Cardiovascular health:</strong> "What's good for your heart is good for your brain." High blood pressure, diabetes, and high cholesterol all damage brain blood vessels. Managing these conditions is essential brain protection.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: Livingston G et al., "Dementia prevention, intervention, and care," The Lancet, 2020. Morris MC et al., "MIND diet associated with reduced incidence of Alzheimer's disease," Alzheimer's & Dementia, 2015.</em></p>

<h3>Supplements that support brain health in seniors</h3>
<p>Several supplements have clinical evidence for cognitive support: Omega-3 DHA (1000mg — the primary structural fat in brain cell membranes), Lion's Mane Mushroom (500-1000mg — stimulates nerve growth factor), Phosphatidylserine (100-300mg — supports brain cell membrane integrity), B12 Methylcobalamin (1000mcg sublingual — 1 in 5 seniors are deficient, and deficiency mimics dementia), and Vitamin D3 (2000-4000 IU — low levels are linked to cognitive decline). These work best as part of the 6-pillar approach above.</p>
<p><strong>See our full guide:</strong> <a href="/brain/" style={{"color":"var(--green)","fontWeight":"700"}}>Doctor-reviewed brain &amp; memory supplements →</a></p>

<h3>When to see your doctor about memory</h3>
<p>Schedule an evaluation if you or a family member notices: forgetting recent conversations entirely (not just details), confusion in familiar places, difficulty with tasks you previously managed easily (bills, cooking, driving), repeating questions or stories without awareness, or personality or mood changes. Early assessment is critical because some causes of memory loss are treatable — B12 deficiency, thyroid disorders, medication side effects, sleep apnea, depression, and dehydration can all mimic dementia.</p>
<p><strong>Related:</strong> <a href="/tools/sleep-score/" style={{"color":"var(--green)","fontWeight":"700"}}>Sleep Quality Quiz →</a> | <a href="/tools/heart-age/" style={{"color":"var(--green)","fontWeight":"700"}}>Heart Age Calculator →</a> | <a href="/tools/hydration/" style={{"color":"var(--green)","fontWeight":"700"}}>Hydration Calculator →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">Is memory loss normal after 60?<span className="faq-icon">+</span></button><div className="faq-a">Some changes are normal: slower name recall, needing more time to learn new things, occasionally misplacing items. What is NOT normal: forgetting entire conversations, getting lost in familiar places, difficulty with routine tasks, or personality changes.</div></div>
<div className="faq-item"><button className="faq-q">What's the difference between normal aging and dementia?<span className="faq-icon">+</span></button><div className="faq-a">Normal aging: forget where you put your keys. Dementia: forget what keys are for. The key distinction is whether memory issues interfere with daily functioning and independence. If they do, see your doctor.</div></div>
<div className="faq-item"><button className="faq-q">What supplements support brain health?<span className="faq-icon">+</span></button><div className="faq-a">Omega-3 DHA (1000mg), Lion's Mane Mushroom (500-1000mg), Phosphatidylserine (100-300mg), B12 Methylcobalamin (1000mcg), and Vitamin D3 (2000-4000 IU). Consistency over months is key — these aren't overnight fixes.</div></div>
<div className="faq-item"><button className="faq-q">Can you improve memory after 60?<span className="faq-icon">+</span></button><div className="faq-a">Yes — the brain retains neuroplasticity. Proven: aerobic exercise (increases BDNF), learning new skills, social engagement, quality sleep, Mediterranean diet, and stress management. Seniors who adopt these show measurable improvement.</div></div>
<div className="faq-item"><button className="faq-q">Does sleep affect memory?<span className="faq-icon">+</span></button><div className="faq-a">Profoundly. Deep sleep consolidates memories and clears beta-amyloid (Alzheimer's protein). Seniors with poor sleep have 1.5-2x higher cognitive decline risk. Sleep apnea (20-30% of seniors) is a treatable cause of memory problems.</div></div>
<div className="faq-item"><button className="faq-q">When should I see a doctor about memory?<span className="faq-icon">+</span></button><div className="faq-a">If you: forget recent events entirely, get confused in familiar places, can't manage finances/cooking you previously handled, repeat questions without awareness, or if family expresses concern. Some causes are treatable: B12 deficiency, thyroid issues, medication side effects, sleep apnea, depression.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/brain/" className="r-link"><span>🧠</span> Brain supplements</a>
<a href="/tools/sleep-score/" className="r-link"><span>🌙</span> Sleep Quiz</a>
<a href="/tools/heart-age/" className="r-link"><span>❤️</span> Heart Age Calculator</a>
<a href="/tools/diabetes-risk/" className="r-link"><span>🩸</span> Diabetes Risk Quiz</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz is a general self-assessment of brain health habits and concerns. It is NOT a cognitive test, dementia screening, or diagnosis. Only a neurologist or geriatrician using validated tools (MMSE, MoCA) can diagnose cognitive impairment or dementia. If your results suggest concern, please schedule an evaluation with your healthcare provider.</p>
<p>Many causes of memory problems are treatable — B12 deficiency, thyroid disorders, medication side effects, sleep apnea, and depression can all mimic dementia symptoms.</p></div>

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
