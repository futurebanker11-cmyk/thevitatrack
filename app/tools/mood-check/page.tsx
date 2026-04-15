'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function MoodCheckPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `function sel(el){
  el.closest('.q-options').querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected')});
  el.classList.add('selected');
  el.querySelector('input').checked=true;
}

function scoreMood(){
  var cats=[
    {q:'q1',label:'Overall happiness'},
    {q:'q2',label:'Interest in activities'},
    {q:'q3',label:'Energy level'},
    {q:'q4',label:'Sleep quality'},
    {q:'q5',label:'Appetite'},
    {q:'q6',label:'Social connection'},
    {q:'q7',label:'Concentration'},
    {q:'q8',label:'Self-worth'},
    {q:'q9',label:'Physical symptoms'},
    {q:'q10',label:'Hopefulness'}
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

  // Show crisis box if self-worth or hopelessness scored 0
  var crisisBox=document.getElementById('crisis-box');
  if(scores[7].val===0||scores[9].val===0){
    crisisBox.style.display='block';
  }else{
    crisisBox.style.display='none';
  }

  var cls,emoji,label,sub;
  if(pct>=80){cls='low';emoji='😊';label='Healthy Emotional Wellbeing';sub='Your mood and emotional health appear strong. Continue the habits that are serving you well.';}
  else if(pct>=60){cls='low';emoji='🌤️';label='Good With Some Low Points';sub='Your overall mood is decent but some areas could use attention. Small changes can make a meaningful difference.';}
  else if(pct>=40){cls='moderate';emoji='🌥️';label='Moderate Mood Concerns';sub='Several signs suggest your emotional health needs support. Consider speaking with your doctor — these feelings are treatable.';}
  else{cls='high';emoji='⛅';label='Significant Mood Concerns';sub='Your answers suggest you may be experiencing depression. Please talk to your doctor — late-life depression is highly treatable and you deserve to feel better.';}

  document.getElementById('risk-result').className='risk-result '+cls;
  document.getElementById('r-emoji').textContent=emoji;
  document.getElementById('r-score').textContent=pct;
  document.getElementById('r-label').textContent=label;
  document.getElementById('r-sub').textContent=sub;

  // Breakdown bars (higher = better for this quiz)
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

  if(pct<40){
    apEl.className='action-plan urgent';
    document.getElementById('ap-title').textContent='Please reach out — you deserve support';
    plan.push({ic:'🩺',t:'<strong>Talk to your doctor about how you\\'re feeling.</strong> Depression in seniors is one of the most treatable conditions in medicine. Whether through therapy, medication, or both, most people feel significantly better within 4-8 weeks of starting treatment. You don\\'t have to feel this way.'});
  }else if(pct<60){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your emotional wellness plan';
    plan.push({ic:'💚',t:'<strong>Some areas need attention.</strong> The red and yellow bars above show where you\\'re struggling most. Addressing even one of these can create a positive ripple effect across the others.'});
  }else{
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your emotional health maintenance plan';
    plan.push({ic:'✅',t:'<strong>Your emotional health looks good!</strong> Keep nurturing the habits that support your wellbeing. The tips below will help you maintain and strengthen your emotional resilience.'});
  }

  if(scores[0].val<=1||scores[9].val<=1) plan.push({ic:'🌅',t:'<strong>Persistent sadness or hopelessness is not normal aging.</strong> If you\\'ve felt this way for more than 2 weeks, talk to your doctor. Depression is a medical condition — not a character flaw or weakness. Treatment works, and you deserve to feel better.'});
  if(scores[1].val<=1) plan.push({ic:'🎨',t:'<strong>Loss of interest (anhedonia) is a hallmark of depression.</strong> Try re-engaging with ONE activity you used to love — even for just 15 minutes. Behavioral activation (doing things before you feel like it) is a core technique in depression therapy. The motivation follows the action, not the other way around.'});
  if(scores[2].val<=1) plan.push({ic:'🏃',t:'<strong>Exercise is proven medicine for depression.</strong> Even 30 minutes of walking is as effective as medication for mild-to-moderate depression. Start with a 10-minute walk today. Exercise increases serotonin, endorphins, and BDNF — all natural mood boosters.'});
  if(scores[3].val<=1) plan.push({ic:'😴',t:'<strong>Sleep and depression are deeply connected.</strong> Poor sleep worsens depression, and depression disrupts sleep — a vicious cycle. Improving your sleep can significantly lift your mood. <a href="/tools/sleep-score/" style="color:var(--green);font-weight:700">Take the Sleep Quiz →</a>'});
  if(scores[4].val<=1) plan.push({ic:'🍽️',t:'<strong>Appetite changes affect nutrition, which affects mood.</strong> Try to eat at regular times even without hunger. Protein and omega-3 rich foods support brain chemistry. Avoid excessive sugar and alcohol — both worsen depression. <a href="/tools/calorie-calculator/" style="color:var(--green);font-weight:700">Calorie Calculator →</a>'});
  if(scores[5].val<=1) plan.push({ic:'👥',t:'<strong>Social isolation increases depression risk by 50%.</strong> Reach out to ONE person today — a phone call counts. Consider joining a community group, volunteer organization, or faith community. Regular social connection is as important as medication for recovery.'});
  if(scores[6].val<=1) plan.push({ic:'🧠',t:'<strong>Concentration problems from depression can mimic dementia.</strong> This is called "pseudodementia" and is REVERSIBLE with depression treatment. If you or family members are worried about your memory, treating depression first may resolve the cognitive issues. <a href="/tools/memory-check/" style="color:var(--green);font-weight:700">Memory Check →</a>'});
  if(scores[7].val<=1) plan.push({ic:'💜',t:'<strong>Feeling worthless or like a burden is depression talking — not reality.</strong> These are symptoms of an illness, not truths about who you are. Please share these feelings with your doctor or a trusted person. CBT (cognitive behavioral therapy) is specifically designed to address these thought patterns.'});
  if(scores[8].val<=1) plan.push({ic:'🩺',t:'<strong>Unexplained physical symptoms are common in senior depression.</strong> Depression frequently presents as pain, fatigue, or digestive issues rather than obvious sadness. If doctors can\\'t find a cause, depression may be the answer. Treating the depression often resolves the physical symptoms.'});

  plan.push({ic:'🌿',t:'<strong>Supplements that support mood:</strong> Omega-3 Fish Oil (2000mg), Vitamin D3 (deficiency linked to depression), Magnesium Glycinate, B12 Methylcobalamin, and SAMe. These complement treatment. <a href="/brain/" style="color:var(--green);font-weight:700">See brain &amp; mood supplements →</a>'});

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

<div className="intro-note"><p><strong>You are not alone.</strong> Depression in seniors is extremely common, but most people never seek help — either because they don't recognize it, or because they believe feeling low is just part of getting older. It isn't. This quiz screens for signs of late-life depression so you can take the first step toward feeling better. It takes 90 seconds and could change your life.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Screen Your Emotional Health</h2>
<div className="calc-sub">Think about how you've felt over the past TWO WEEKS</div>

<div className="quiz-q"><div className="q-num">Question 1 of 10</div><h3>😊 How often do you feel genuinely happy or content?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Most days — I enjoy my life</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">Some days — mixed with difficult days</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">Rarely — most days feel flat or empty</span></label>
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">Almost never — persistent sadness or numbness</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 2 of 10</div><h3>🎨 Have you lost interest in activities you used to enjoy?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">No — I still enjoy my hobbies and activities</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">Slightly — some things feel less enjoyable</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">Quite a bit — most things don't interest me anymore</span></label>
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">Nothing interests me — I go through the motions</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 3 of 10</div><h3>⚡ How is your energy level?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Good — I have enough energy for daily activities</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">Fair — tire more easily than I'd like</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Low — fatigue makes daily tasks difficult</span></label>
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">Exhausted — even simple tasks feel overwhelming</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 4 of 10</div><h3>😴 How is your sleep?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Good — I sleep well and wake rested</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Some trouble — occasional insomnia or waking early</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Poor — frequent insomnia, waking at 3-4 AM and can't sleep</span></label>
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">Very poor — sleeping too much (12+ hours) or barely sleeping</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 5 of 10</div><h3>🍽️ How is your appetite?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">Normal — eating regular meals</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">Slightly changed — eating a bit more or less</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">Significantly reduced — skipping meals, not hungry</span></label>
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">No appetite at all, or eating excessively for comfort</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 6 of 10</div><h3>👥 How socially connected do you feel?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">Well connected — regular contact with friends/family</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">Some connection — could be more social</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">Isolated — rarely see people, declining invitations</span></label>
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">Very isolated — feel alone, no meaningful connections</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 7 of 10</div><h3>🧠 How well can you concentrate and make decisions?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">Well — normal focus and decision-making</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Slightly harder — takes more effort than before</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Difficulty — often can't focus or make simple decisions</span></label>
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">Severe difficulty — mental fog, can't think clearly</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 8 of 10</div><h3>💭 Do you feel worthless or like a burden to others?</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">No — I feel valued and purposeful</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">Occasionally — brief moments of self-doubt</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">Often — feel like I'm a burden on my family</span></label>
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">Constantly — feel worthless or that everyone would be better off without me</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 9 of 10</div><h3>😣 Do you experience unexplained aches, pains, or physical symptoms?</h3><div className="q-options" id="q9">
<label className="q-opt"><input type="radio" name="q9" value="3" /><span className="q-radio"></span><span className="q-text">No more than expected for my age</span></label>
<label className="q-opt"><input type="radio" name="q9" value="2" /><span className="q-radio"></span><span className="q-text">Somewhat more aches and pains than usual</span></label>
<label className="q-opt"><input type="radio" name="q9" value="1" /><span className="q-radio"></span><span className="q-text">Frequent unexplained pain, headaches, or stomach issues</span></label>
<label className="q-opt"><input type="radio" name="q9" value="0" /><span className="q-radio"></span><span className="q-text">Constant physical symptoms that doctors can't explain</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 10 of 10</div><h3>🌅 Do you feel hopeful about the future?</h3><div className="q-options" id="q10">
<label className="q-opt"><input type="radio" name="q10" value="3" /><span className="q-radio"></span><span className="q-text">Yes — I look forward to things</span></label>
<label className="q-opt"><input type="radio" name="q10" value="2" /><span className="q-radio"></span><span className="q-text">Somewhat — some good days ahead</span></label>
<label className="q-opt"><input type="radio" name="q10" value="1" /><span className="q-radio"></span><span className="q-text">Not really — things seem unlikely to improve</span></label>
<label className="q-opt"><input type="radio" name="q10" value="0" /><span className="q-radio"></span><span className="q-text">No — everything feels hopeless</span></label>
</div></div>

<button className="calc-btn">🌿 Get My Mood Health Score →</button>

<div className="results" id="results">
<div className="risk-result" id="risk-result">
<div className="risk-emoji" id="r-emoji">🌿</div>
<div><span className="risk-score" id="r-score">72</span><span className="risk-of"> / 100</span></div>
<div className="risk-label" id="r-label">Good Emotional Health</div>
<div className="risk-sub" id="r-sub">Your mood appears healthy overall</div>
</div>

<div id="crisis-box" style={{"display":"none","background":"#FEF2F2","border":"2px solid #DC2626","borderRadius":"12px","padding":"20px","margin":"16px 0","textAlign":"center"}}>
<p style={{"fontSize":"18px","fontWeight":"700","color":"#991B1B","marginBottom":"10px"}}>If you are having thoughts of harming yourself, please reach out now:</p>
<p style={{"fontSize":"22px","fontWeight":"700","marginBottom":"6px"}}><a href="tel:988" style={{"color":"#DC2626"}}>📞 Call or text 988</a> (Suicide & Crisis Lifeline)</p>
<p style={{"fontSize":"15px","color":"#7F1D1D"}}>Available 24/7, free and confidential. You matter, and help is available.</p>
</div>

<div className="breakdown"><h3>Your emotional health breakdown</h3><div id="bd-list"></div></div>
<div className="action-plan" id="action-plan"><h3 id="ap-title">Your emotional wellness plan</h3><div id="ap-list"></div></div>
</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Understanding depression after 60</h2>
<p>Depression in seniors is fundamentally different from depression in younger adults. It often presents as physical symptoms (unexplained pain, fatigue, digestive issues) rather than obvious sadness. It frequently coexists with medical conditions, making it harder to recognize. And it is vastly undertreated — only about 10% of depressed seniors receive proper care.</p>

<h3>Depression vs normal grief vs "just getting older"</h3>
<p>Grief after losing a spouse, friend, or independence is natural and expected. But grief that doesn't improve after several months, or sadness that isn't connected to a specific loss, may be clinical depression. The key distinction: grief comes in waves with periods of positive memories. Depression is persistent and colors everything — you can't recall feeling good, can't imagine feeling better, and nothing brings pleasure. Depression lasting more than 2 weeks is NOT normal aging.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: Geriatric Depression Scale (GDS), Yesavage et al., 1982. PHQ-9, Kroenke et al., 2001. American Association for Geriatric Psychiatry guidelines, 2024.</em></p>

<h3>Pseudodementia — when depression mimics dementia</h3>
<p>One of the most critical issues in geriatric medicine: depression causes memory problems, poor concentration, and confusion that looks exactly like early dementia. This is called "pseudodementia." The difference is that depression-related cognitive problems are REVERSIBLE with treatment. Every senior being evaluated for dementia should be screened for depression first — treating the depression may resolve the "dementia" symptoms entirely.</p>
<p><strong>Related:</strong> <a href="/tools/memory-check/" style={{"color":"var(--green)","fontWeight":"700"}}>Memory &amp; Brain Health Quiz →</a></p>

<h3>The depression-body connection in seniors</h3>
<p>Depression doesn't just affect mood — it physically damages health. Depressed seniors have 40% higher risk of heart disease, weakened immune systems, accelerated muscle loss, increased fall risk, and faster cognitive decline. Depression also disrupts sleep, reduces appetite (leading to malnutrition), and decreases physical activity — creating a cascade of declining health.</p>
<p><strong>Related:</strong> <a href="/tools/sleep-score/" style={{"color":"var(--green)","fontWeight":"700"}}>Sleep Quiz →</a> | <a href="/tools/calorie-calculator/" style={{"color":"var(--green)","fontWeight":"700"}}>Calorie Calculator →</a> | <a href="/tools/fall-risk/" style={{"color":"var(--green)","fontWeight":"700"}}>Fall Risk →</a></p>

<h3>What actually works for late-life depression</h3>
<p><strong>CBT (Cognitive Behavioral Therapy)</strong> is the most evidence-backed talk therapy for senior depression. It teaches you to identify and change negative thought patterns. <strong>SSRIs</strong> like sertraline and escitalopram are well-studied and generally safe in seniors. <strong>Exercise</strong> — even 30 minutes of walking 3-5 times per week — is as effective as medication for mild-to-moderate depression. <strong>Social connection</strong> — regular meaningful interaction protects against and helps treat depression. <strong>Treating underlying conditions</strong> — thyroid disorders, B12 deficiency, chronic pain, and sleep disorders can all cause or worsen depression.</p>

<h3>Supplements that support mood in seniors</h3>
<p>Omega-3 Fish Oil (2000mg — anti-inflammatory effects on brain chemistry), Vitamin D3 (2000-4000 IU — deficiency is strongly linked to depression risk), Magnesium Glycinate (400mg — supports neurotransmitter function), B12 Methylcobalamin (1000mcg — deficiency causes mood changes), and SAMe (200-400mg — shown to improve mood in multiple studies). These complement professional treatment — they don't replace it for clinical depression.</p>
<p><strong>See our guide:</strong> <a href="/brain/" style={{"color":"var(--green)","fontWeight":"700"}}>Brain &amp; mood supplements →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">How common is depression in seniors?<span className="faq-icon">+</span></button><div className="faq-a">15-20% of adults over 60 have depression. Over 30% of seniors with chronic illness are affected. Only about 10% receive treatment — making it one of the most underdiagnosed conditions in older adults.</div></div>
<div className="faq-item"><button className="faq-q">What are signs of depression in older adults?<span className="faq-icon">+</span></button><div className="faq-a">Often different from younger adults: persistent fatigue, loss of interest, social withdrawal, sleep changes, appetite changes, difficulty concentrating, unexplained physical pain, irritability, and feelings of worthlessness or being a burden.</div></div>
<div className="faq-item"><button className="faq-q">Can depression be mistaken for dementia?<span className="faq-icon">+</span></button><div className="faq-a">Yes — "pseudodementia." Depression causes memory problems, poor focus, and confusion that mimics early dementia. The critical difference: depression-related cognitive problems are treatable and reversible. Every dementia evaluation should include depression screening.</div></div>
<div className="faq-item"><button className="faq-q">Is depression a normal part of aging?<span className="faq-icon">+</span></button><div className="faq-a">Absolutely not. Depression is a medical condition, not an inevitable part of getting older. While seniors face more triggers (loss, illness, isolation), persistent sadness lasting more than 2 weeks is not normal at any age and is treatable.</div></div>
<div className="faq-item"><button className="faq-q">What treatments work for senior depression?<span className="faq-icon">+</span></button><div className="faq-a">CBT (talk therapy), SSRIs (sertraline, escitalopram), exercise (as effective as medication for mild cases), social engagement, sleep improvement, and treating underlying conditions like thyroid, B12 deficiency, or chronic pain.</div></div>
<div className="faq-item"><button className="faq-q">Do supplements help with mood?<span className="faq-icon">+</span></button><div className="faq-a">Omega-3 (2000mg), Vitamin D3 (deficiency linked to depression), Magnesium Glycinate, B12 Methylcobalamin, and SAMe all have evidence. These complement professional treatment for clinical depression.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/brain/" className="r-link"><span>🧠</span> Brain supplements</a>
<a href="/tools/memory-check/" className="r-link"><span>🧠</span> Memory Check</a>
<a href="/tools/sleep-score/" className="r-link"><span>🌙</span> Sleep Quiz</a>
<a href="/tools/fall-risk/" className="r-link"><span>🛡️</span> Fall Risk Quiz</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz is a general mood screening inspired by the Geriatric Depression Scale (GDS) and PHQ-9. It is NOT a clinical diagnosis of depression. Only a qualified healthcare provider can diagnose and treat depression. If your results suggest concern, please speak with your doctor — depression in seniors is highly treatable.</p>
<p><strong>Crisis resources:</strong> If you are in emotional distress or having thoughts of self-harm, call or text <strong>988</strong> (Suicide & Crisis Lifeline, available 24/7) or go to your nearest emergency room.</p></div>

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
