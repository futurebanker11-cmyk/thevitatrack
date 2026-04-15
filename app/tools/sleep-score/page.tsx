'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function SleepScorePage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `function sel(el){
  el.closest('.q-options').querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected')});
  el.classList.add('selected');
  el.querySelector('input').checked=true;
}

function scoreSleep(){
  var cats=[
    {name:'Sleep Onset',q:'q1',label:'Time to fall asleep'},
    {name:'Sleep Duration',q:'q2',label:'Hours of actual sleep'},
    {name:'Night Waking',q:'q3',label:'Nighttime awakenings'},
    {name:'Sleep Continuity',q:'q4',label:'Ability to fall back asleep'},
    {name:'Nocturia',q:'q5',label:'Bathroom trips at night'},
    {name:'Morning Freshness',q:'q6',label:'How you feel on waking'},
    {name:'Daytime Energy',q:'q7',label:'Daytime alertness'},
    {name:'Sleep Breathing',q:'q8',label:'Snoring / breathing issues'}
  ];

  var total=0,answered=0,scores=[];
  for(var i=0;i<cats.length;i++){
    var checked=document.querySelector('input[name="'+cats[i].q+'"]:checked');
    if(!checked){alert('Please answer all 8 questions (question '+(i+1)+' is missing)');return;}
    var val=parseInt(checked.value);
    total+=val;answered++;
    scores.push({name:cats[i].label,val:val,max:3});
  }

  // Score out of 100 (max raw=24)
  var pct=Math.round((total/24)*100);

  // Classification
  var cls,emoji,label,sub;
  if(pct>=85){cls='excellent';emoji='😴';label='Excellent Sleep Quality';sub='Your sleep patterns are healthy for your age. Keep up your current routine!';}
  else if(pct>=65){cls='good';emoji='🌙';label='Good Sleep Quality';sub='Your sleep is decent but has room for improvement. See the tips below.';}
  else if(pct>=45){cls='fair';emoji='😐';label='Fair Sleep Quality';sub='Your sleep is below average for healthy aging. The tips below can help significantly.';}
  else{cls='poor';emoji='😟';label='Poor Sleep Quality';sub='Your sleep quality is concerning. Review the tips below and consider discussing with your doctor.';}

  // Update result
  document.getElementById('sleep-result').className='sleep-result '+cls;
  document.getElementById('s-emoji').textContent=emoji;
  document.getElementById('s-score').textContent=pct;
  document.getElementById('s-label').textContent=label;
  document.getElementById('s-sub').textContent=sub;

  // Breakdown bars
  var bd=document.getElementById('bd-list');bd.innerHTML='';
  scores.forEach(function(s){
    var pctBar=Math.round((s.val/s.max)*100);
    var barCls=pctBar>=66?'high':pctBar>=33?'mid':'low';
    var d=document.createElement('div');d.className='bd-item';
    d.innerHTML='<span class="bd-cat">'+s.name+'</span><div class="bd-bar-wrap"><div class="bd-bar '+barCls+'" style="width:0%"></div></div><span class="bd-score">'+s.val+'/'+s.max+'</span>';
    bd.appendChild(d);
    // Animate bar
    setTimeout(function(){d.querySelector('.bd-bar').style.width=pctBar+'%';},100);
  });

  // Personalized tips based on weak areas
  var tips=document.getElementById('tip-list');tips.innerHTML='';
  var tipList=[];

  if(scores[0].val<=1) tipList.push({ic:'🛏️',t:'<strong>Can\\'t fall asleep:</strong> Try the "20-minute rule" — if not asleep in 20 minutes, get up, do something calming (reading, gentle stretching), and return when drowsy. Avoid screens, clock-watching, and trying harder to sleep.'});
  if(scores[1].val<=1) tipList.push({ic:'⏰',t:'<strong>Not enough sleep hours:</strong> Go to bed and wake up at the SAME time every day — even weekends. Your body\\'s clock needs consistency. Aim for 8 hours in bed to get 7 hours of actual sleep.'});
  if(scores[2].val<=1) tipList.push({ic:'🔄',t:'<strong>Frequent night waking:</strong> Common causes in seniors: sleep apnea, medications, pain, room temperature. Keep bedroom at 65-68°F (18-20°C). Ask your doctor if any medications could be switched to morning dosing.'});
  if(scores[3].val<=1) tipList.push({ic:'😤',t:'<strong>Can\\'t fall back asleep:</strong> Do NOT check your phone or clock. Practice deep breathing: inhale 4 seconds, hold 7 seconds, exhale 8 seconds (the 4-7-8 technique). If still awake after 20 minutes, get up briefly.'});
  if(scores[4].val<=1) tipList.push({ic:'🚽',t:'<strong>Frequent bathroom trips:</strong> Stop all fluids 2-3 hours before bed. Avoid caffeine after noon and alcohol in the evening. If you go 3+ times per night, see your doctor — it may be treatable (prostate, overactive bladder, or medication timing). <a href="/prostate/" style="color:#1A5632;font-weight:700">See prostate supplements →</a>'});
  if(scores[5].val<=1) tipList.push({ic:'☀️',t:'<strong>Waking up exhausted:</strong> This often signals poor sleep quality (not enough deep sleep) or sleep apnea. Get 15 minutes of bright sunlight within 30 minutes of waking — this resets your circadian clock. Avoid heavy meals within 3 hours of bedtime.'});
  if(scores[6].val<=1) tipList.push({ic:'💤',t:'<strong>Daytime sleepiness:</strong> Limit naps to 20 minutes maximum before 2pm. Long or late naps steal nighttime sleep. If you\\'re drowsy despite 7+ hours in bed, ask about a sleep study — you may have undiagnosed sleep apnea.'});
  if(scores[7].val<=1) tipList.push({ic:'🫁',t:'<strong>Snoring / breathing issues:</strong> This is a red flag for sleep apnea, which affects 20-30% of seniors and is vastly underdiagnosed. Ask your doctor for a sleep study. CPAP therapy can be life-changing — it also reduces heart attack and stroke risk.'});

  // Always add supplement tip
  tipList.push({ic:'🌿',t:'<strong>Natural sleep support:</strong> Magnesium Glycinate (400mg before bed) is the most effective supplement for senior sleep. Start with this before trying melatonin. <a href="/sleep/" style="color:#1A5632;font-weight:700">See our full sleep supplement guide →</a>'});

  // Add hygiene tips for everyone
  if(pct<85){
    tipList.push({ic:'📱',t:'<strong>Screen curfew:</strong> Stop all screens (TV, phone, tablet) 1 hour before bed. Blue light suppresses melatonin production. If you must use screens, enable night mode.'});
    tipList.push({ic:'🌡️',t:'<strong>Bedroom environment:</strong> Cool (65-68°F), dark (blackout curtains), and quiet. Use a white noise machine if needed. Your bedroom should be used only for sleep — not TV or work.'});
  }

  tipList.forEach(function(tip){
    var d=document.createElement('div');d.className='tip-item';
    d.innerHTML='<span class="ic">'+tip.ic+'</span><span>'+tip.t+'</span>';
    tips.appendChild(d);
  });

  document.getElementById('results').classList.add('show');
  setTimeout(function(){document.getElementById('sleep-result').scrollIntoView({behavior:'smooth',block:'center'});},100);
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
.page-hero{background:linear-gradient(135deg,#14442A,#14442A);color:#fff;padding:40px 24px 36px}.page-hero-inner{max-width:800px;margin:0 auto}.breadcrumb{font-size:15px;color:rgba(255,255,255,.7);margin-bottom:12px}.breadcrumb a{color:rgba(255,255,255,.85);text-decoration:none}.page-hero h1{font-size:32px;font-weight:700;line-height:1.2;margin-bottom:10px}.page-hero p{font-size:18px;color:rgba(255,255,255,.9);max-width:640px}.hero-badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.hero-badge{font-size:13px;background:rgba(255,255,255,.15);color:#fff;padding:5px 14px;border-radius:20px;font-weight:600}
.main-wrap{max-width:1100px;margin:0 auto;padding:0 20px;display:flex;gap:28px;align-items:flex-start}.main{flex:1;max-width:800px;min-width:0}
.ad-slot{text-align:center;margin:24px 0;min-height:90px;border-radius:8px}
.intro-note{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:20px 24px;margin:28px 0 0;border-left:4px solid var(--green)}.intro-note p{font-size:16px;color:var(--t2);line-height:1.6;margin:0}.intro-note strong{color:var(--green)}
.calc-card{background:var(--white);border:2px solid var(--green);border-radius:16px;padding:32px 28px;margin:20px 0 28px;position:relative;overflow:hidden}
.calc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#1A5632,#4ADE80,#1A5632)}
.calc-title{font-size:22px;font-weight:700;color:var(--green);margin-bottom:4px}.calc-sub{font-size:15px;color:var(--t2);margin-bottom:24px}
/* QUIZ QUESTION */
.quiz-q{background:#F0FAF3;border:1px solid #C6E7D0;border-radius:12px;padding:20px 22px;margin-bottom:14px}
.quiz-q h3{font-size:17px;font-weight:700;color:var(--green);margin-bottom:12px}
.quiz-q .q-num{font-size:13px;font-weight:700;color:#4ADE80;margin-bottom:4px}
.q-options{display:flex;flex-direction:column;gap:6px}
.q-opt{display:flex;align-items:center;gap:10px;padding:12px 16px;border:1.5px solid #E8F5E9;border-radius:10px;cursor:pointer;transition:all .15s;background:var(--white)}
.q-opt:hover{border-color:#4ADE80;background:#F0FAF3}
.q-opt.selected{border-color:var(--green);background:#E8F5E9}
.q-opt input{display:none}
.q-radio{width:20px;height:20px;border-radius:50%;border:2px solid #A7D8B8;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .15s}
.q-opt.selected .q-radio{border-color:var(--green);background:var(--green)}
.q-opt.selected .q-radio::after{content:'';width:8px;height:8px;background:#fff;border-radius:50%}
.q-text{font-size:16px;color:var(--text)}
.calc-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,#1A5632,#22703F);color:#fff;border:none;padding:18px 32px;border-radius:12px;font:inherit;font-size:20px;font-weight:700;cursor:pointer;width:100%;min-height:60px;box-shadow:0 4px 14px rgba(109,40,217,.3);transition:transform .1s}.calc-btn:hover{transform:translateY(-1px)}
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
.tips{background:#F0FAF3;border:2px solid #C6E7D0;border-radius:14px;padding:24px;margin:20px 0}
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

<div className="intro-note"><p><strong>Poor sleep is not a normal part of aging.</strong> While sleep patterns change after 60, chronic insomnia, frequent waking, and daytime exhaustion are NOT inevitable. They're symptoms of addressable problems — and this quiz helps you identify exactly what's going wrong with your sleep.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Rate Your Sleep Quality</h2>
<div className="calc-sub">Think about your typical sleep over the past month</div>

<div className="quiz-q"><div className="q-num">Question 1 of 8</div><h3>How long does it take you to fall asleep?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Under 15 minutes</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">15-30 minutes</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">30-60 minutes</span></label>
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">Over 60 minutes</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 2 of 8</div><h3>How many hours of actual sleep do you get?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">7-8 hours</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">6-7 hours</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">5-6 hours</span></label>
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">Under 5 hours</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 3 of 8</div><h3>How often do you wake up during the night?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Rarely (0-1 times)</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">Sometimes (2 times)</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Often (3-4 times)</span></label>
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">Very often (5+ times)</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 4 of 8</div><h3>When you wake up at night, can you fall back asleep easily?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Yes, within 5-10 minutes</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Usually, within 20 minutes</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Sometimes takes 30+ minutes</span></label>
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">I often lie awake for an hour or more</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 5 of 8</div><h3>Do you need to use the bathroom at night?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">Rarely or never</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">Once per night</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">2-3 times per night</span></label>
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">4+ times per night</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 6 of 8</div><h3>How do you feel when you wake up in the morning?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">Refreshed and energized</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">Fairly rested</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">Tired and groggy</span></label>
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">Exhausted — feel like I didn't sleep</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 7 of 8</div><h3>Do you feel sleepy or nap during the day?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">Rarely — alert most of the day</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Occasionally drowsy in the afternoon</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Frequently sleepy — nap most days</span></label>
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">Constantly exhausted — struggle to stay awake</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 8 of 8</div><h3>Do you snore loudly or has anyone noticed you stop breathing while sleeping?</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">No snoring or breathing issues</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">Light snoring occasionally</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">Loud snoring most nights</span></label>
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">Yes — partner says I stop breathing / gasp</span></label>
</div></div>

<button className="calc-btn">🌙 Get My Sleep Score →</button>

<div className="results" id="results">

<div className="sleep-result" id="sleep-result">
<div className="score-emoji" id="s-emoji">🌙</div>
<div><span className="score-num" id="s-score">72</span><span className="score-of"> / 100</span></div>
<div className="score-label" id="s-label">Fair Sleep Quality</div>
<div className="score-sub" id="s-sub">Your sleep has room for improvement — see tips below</div>
</div>

<div className="breakdown"><h3>Your sleep breakdown by category</h3><div id="bd-list"></div></div>

<div className="tips" id="tips"><h3>Your personalized sleep improvement plan</h3><div id="tip-list"></div></div>

</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="1775331881" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Why sleep changes after 60 — and what to do about it</h2>
<p>Sleep architecture shifts significantly as you age. Your body produces less melatonin, spends less time in deep (restorative) sleep, and more time in light sleep stages. This is normal. What is NOT normal is chronic insomnia, waking up exhausted, or needing sleep aids every night. These are treatable problems.</p>

<h3>The 5 most common sleep disruptors in seniors</h3>
<p><strong>1. Nocturia (nighttime urination):</strong> The #1 sleep disruptor for adults over 60. Caused by enlarged prostate, overactive bladder, or evening fluid intake. Limiting fluids after 6pm and seeing a urologist can dramatically improve sleep.</p>
<p><strong>2. Medications:</strong> Beta-blockers, diuretics, SSRIs, corticosteroids, and some blood pressure drugs disrupt sleep. Ask your doctor about timing changes — taking activating medications in the morning instead of evening.</p>
<p><strong>3. Sleep apnea:</strong> Affects 20-30% of seniors and is vastly underdiagnosed. If you snore loudly, gasp during sleep, or feel exhausted despite 8 hours in bed, ask your doctor about a sleep study. CPAP therapy is life-changing.</p>
<p><strong>4. Chronic pain:</strong> Arthritis, neuropathy, and back pain prevent deep sleep. This creates a vicious cycle — poor sleep increases pain sensitivity, which further disrupts sleep. Treating the underlying pain often fixes the sleep problem.</p>
<p><strong>5. Anxiety and depression:</strong> Sleep disruption is both a symptom and a cause of mood disorders. Cognitive behavioral therapy for insomnia (CBT-I) is more effective than sleeping pills for long-term improvement.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Source: Buysse DJ et al., "The Pittsburgh Sleep Quality Index: A New Instrument for Psychiatric Practice and Research," 1989. National Sleep Foundation 2024 guidelines.</em></p>

<h3>Natural supplements that support better sleep in seniors</h3>
<p>Several supplements have clinical evidence for improving sleep quality without the risks of prescription sleep aids: Magnesium Glycinate (400mg before bed — relaxes muscles and nervous system), Melatonin (0.5-1mg only — low dose is better for seniors), L-Theanine (200mg — promotes calm without drowsiness), Tart Cherry Extract (natural melatonin source), and Valerian Root (may reduce time to fall asleep).</p>
<p><strong>See our full guide:</strong> <a href="/sleep/" style={{"color":"var(--green)","fontWeight":"700"}}>Doctor-reviewed sleep supplements for seniors →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">How much sleep does a 70 year old need?<span className="faq-icon">+</span></button><div className="faq-a">Adults over 65 need 7-8 hours per night. However, seniors get less deep sleep and more light sleep, so you may need 8-9 hours in bed to get 7 hours of actual sleep. Quality matters as much as quantity — waking up refreshed is more important than hours.</div></div>
<div className="faq-item"><button className="faq-q">Why do seniors have trouble sleeping?<span className="faq-icon">+</span></button><div className="faq-a">Multiple factors: reduced melatonin, medications (diuretics, beta-blockers, SSRIs), chronic pain, sleep apnea, nocturia, restless legs, and anxiety. Most seniors have 2-3 of these simultaneously. Identifying YOUR specific disruptors is key.</div></div>
<div className="faq-item"><button className="faq-q">Is waking up at night normal for seniors?<span className="faq-icon">+</span></button><div className="faq-a">Waking 1-2 times is normal after 60. Waking 3+ times or being unable to fall back asleep within 20 minutes is NOT normal — discuss with your doctor. Frequent waking is often sleep apnea, nocturia, or medication timing.</div></div>
<div className="faq-item"><button className="faq-q">What supplements help seniors sleep?<span className="faq-icon">+</span></button><div className="faq-a">Magnesium Glycinate (400mg), low-dose Melatonin (0.5-1mg), L-Theanine (200mg), Tart Cherry Extract, and Valerian Root. Start with magnesium — it's the most effective and safest for seniors. Always check drug interactions.</div></div>
<div className="faq-item"><button className="faq-q">Is melatonin safe for seniors?<span className="faq-icon">+</span></button><div className="faq-a">Low-dose (0.5-1mg) is safe for short-term use. High doses (5-10mg) cause morning grogginess and interact with BP and diabetes medications. Less is more with melatonin for seniors — start with 0.5mg.</div></div>
<div className="faq-item"><button className="faq-q">When should I see a doctor about sleep?<span className="faq-icon">+</span></button><div className="faq-a">See your doctor if you: take 30+ minutes to fall asleep regularly, wake gasping or choking, have restless legs, feel exhausted despite 8+ hours in bed, or use sleep aids more than twice per week. Untreated sleep disorders increase heart disease and fall risk.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/sleep/" className="r-link"><span>🌙</span> Sleep supplements</a>
<a href="/brain/" className="r-link"><span>🧠</span> Brain supplements</a>
<a href="/tools/bp-checker/" className="r-link"><span>💓</span> BP Checker</a>
<a href="/tools/heart-age/" className="r-link"><span>❤️</span> Heart Age Calculator</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz provides a general assessment inspired by the Pittsburgh Sleep Quality Index (PSQI). It is NOT a clinical diagnosis. If you suspect sleep apnea, restless legs syndrome, or other sleep disorders, consult your doctor for a proper sleep study.</p>
<p>Never stop or change sleep medications without consulting your doctor.</p></div>

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
