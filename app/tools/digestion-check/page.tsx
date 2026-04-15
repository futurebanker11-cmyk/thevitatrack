'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function DigestionCheckPage() {

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

function scoreMood(){
  var cats=[
    {q:'q1',label:'Bowel regularity'},
    {q:'q2',label:'Heartburn / acid reflux'},
    {q:'q3',label:'Bloating & gas'},
    {q:'q4',label:'Appetite'},
    {q:'q5',label:'Water & fiber intake'},
    {q:'q6',label:'Medication impact'},
    {q:'q7',label:'Abdominal pain'},
    {q:'q8',label:'Quality of life impact'},
    {q:'q9',label:'Physical activity'},
    {q:'q10',label:'Stress / mood (gut-brain axis)'}
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
  if(pct>=80){cls='low';emoji='✅';label='Healthy Digestion';sub='Your gut health is in great shape. Maintain your current habits!';}
  else if(pct>=60){cls='low';emoji='🫃';label='Good With Minor Issues';sub='Generally healthy digestion with a few areas to improve. See the tips below.';}
  else if(pct>=40){cls='moderate';emoji='⚠️';label='Fair — Several Issues Present';sub='Multiple digestive symptoms are affecting your quality of life. The plan below targets your specific weak areas.';}
  else{cls='high';emoji='🔴';label='Poor Digestive Health';sub='Significant gut issues detected. Discuss with your doctor and review the action plan below.';}

  document.getElementById('risk-result').className='risk-result '+cls;
  document.getElementById('r-emoji').textContent=emoji;
  document.getElementById('r-score').textContent=pct;
  document.getElementById('r-label').textContent=label;
  document.getElementById('r-sub').textContent=sub;

  var bd=document.getElementById('bd-list');bd.innerHTML='';
  scores.forEach(function(s){
    var pctBar=Math.round((s.val/s.max)*100);
    var barCls=pctBar>=66?'high':pctBar>=33?'mid':'low';
    var d=document.createElement('div');d.className='bd-item';
    d.innerHTML='<span class="bd-cat">'+s.label+'</span><div class="bd-bar-wrap"><div class="bd-bar '+barCls+'" style="width:0%"></div></div><span class="bd-score">'+s.val+'/'+s.max+'</span>';
    bd.appendChild(d);
    setTimeout(function(){d.querySelector('.bd-bar').style.width=pctBar+'%';},100);
  });

  var ap=document.getElementById('ap-list');ap.innerHTML='';
  var plan=[];
  var apEl=document.getElementById('action-plan');

  if(pct<40){
    apEl.className='action-plan urgent';
    document.getElementById('ap-title').textContent='See your doctor — your gut needs help';
    plan.push({ic:'🩺',t:'<strong>Discuss your symptoms with your doctor or gastroenterologist.</strong> Chronic digestive problems can indicate conditions that need proper diagnosis: IBS, GERD, celiac disease, SIBO, or medication-related damage. Many of these are highly treatable once identified.'});
  }else if(pct<60){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your gut health improvement plan';
    plan.push({ic:'📋',t:'<strong>Several areas need attention.</strong> Focus on the red and yellow items above. Most digestive issues in seniors improve significantly with hydration, fiber, exercise, and probiotics.'});
  }else{
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your digestive health maintenance plan';
    plan.push({ic:'✅',t:'<strong>Your digestion is in good shape!</strong> The tips below will help you maintain healthy gut function as you age.'});
  }

  if(scores[0].val<=1) plan.push({ic:'🚽',t:'<strong>Constipation is your top issue.</strong> Start here: drink 6-8 cups of water daily, add 25-30g fiber gradually (psyllium husk is gentlest), walk 20-30 minutes daily, and try a consistent bathroom time each morning. Avoid stimulant laxatives long-term — they create dependency. <a href="/tools/hydration/" style="color:var(--green);font-weight:700">Calculate your water target →</a>'});
  if(scores[1].val<=1) plan.push({ic:'🔥',t:'<strong>Acid reflux needs management.</strong> Elevate the head of your bed 6-8 inches, stop eating 3 hours before bed, avoid trigger foods (citrus, tomato, coffee, chocolate, spicy food), and maintain a healthy weight. If you take PPIs long-term, ask your doctor about stepping down — long-term use reduces B12 and increases fracture risk.'});
  if(scores[2].val<=1) plan.push({ic:'🎈',t:'<strong>Chronic bloating may indicate enzyme deficiency or food intolerance.</strong> Try a digestive enzyme supplement with meals. Consider a 2-week lactose elimination trial. Eat slowly, chew thoroughly, and avoid carbonated drinks. If bloating persists, ask your doctor about SIBO testing.'});
  if(scores[3].val<=1) plan.push({ic:'🍽️',t:'<strong>Poor appetite affects nutrition and overall health.</strong> Eat smaller, more frequent meals (5-6 per day instead of 3). Prioritize protein-rich foods first. Appetite loss can be caused by depression, medications, or zinc deficiency — discuss with your doctor. <a href="/tools/calorie-calculator/" style="color:var(--green);font-weight:700">Calculate your calorie needs →</a>'});
  if(scores[4].val<=1) plan.push({ic:'💧',t:'<strong>Low water and fiber = constipation, bloating, and poor digestion.</strong> This is the #1 fixable issue. Add one extra glass of water per day until you reach 6-8 cups. Add one serving of vegetables at each meal. Psyllium husk (start with 1 tsp, increase gradually) is the gentlest fiber supplement. <a href="/tools/hydration/" style="color:var(--green);font-weight:700">Hydration Calculator →</a>'});
  if(scores[5].val<=1) plan.push({ic:'💊',t:'<strong>Your medications are affecting your gut.</strong> Ask your pharmacist for a gut-focused medication review. Common culprits: opioids (severe constipation), NSAIDs (stomach damage), PPIs (nutrient malabsorption), and antibiotics (microbiome destruction). Never stop medications yourself — but ASK about alternatives.'});
  if(scores[6].val<=1) plan.push({ic:'😣',t:'<strong>Frequent abdominal pain needs investigation.</strong> Pain location matters: upper central = possible GERD or ulcer; lower left = possible diverticular disease; general cramping = possible IBS. Keep a food diary for 2 weeks to identify triggers, then discuss with your doctor.'});
  if(scores[8].val<=1) plan.push({ic:'🏃',t:'<strong>Exercise directly improves digestion.</strong> Walking stimulates intestinal contractions (peristalsis). Even a 10-minute walk after meals reduces bloating and improves transit time. Sedentary seniors have 2-3x higher constipation rates.'});
  if(scores[9].val<=1) plan.push({ic:'😟',t:'<strong>Your mood is affecting your gut (and vice versa).</strong> The gut-brain axis means stress directly worsens IBS, reflux, and constipation. Managing stress and depression improves digestive symptoms. <a href="/tools/mood-check/" style="color:var(--green);font-weight:700">Take the Mood Quiz →</a>'});

  plan.push({ic:'🌿',t:'<strong>Gut health supplements:</strong> Probiotics (multi-strain, 10-50B CFU), Digestive Enzymes, Psyllium Fiber, Ginger Extract, and L-Glutamine (gut repair). Start with probiotics — they address the widest range of gut issues. <a href="/digestion/" style="color:var(--green);font-weight:700">See our digestion supplement guide →</a>'});

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

<div className="intro-note"><p><strong>Your gut is your second brain.</strong> The gut microbiome produces 90% of your body's serotonin (the "happiness chemical"), influences immune function, affects nutrient absorption, and communicates directly with your brain via the vagus nerve. When your gut is unhealthy, everything suffers — mood, energy, immunity, and even cognitive function. This quiz identifies exactly what's going wrong.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Assess Your Digestive Health</h2>
<div className="calc-sub">Covers the most common digestive complaints in adults over 60</div>

<div className="quiz-q"><div className="q-num">Question 1 of 10</div><h3>🚽 How regular are your bowel movements?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Regular — daily or every other day, easy to pass</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">Mostly regular — occasional difficulty</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">Often constipated — go 3+ days without, straining</span></label>
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">Severely irregular — chronic constipation or alternating with diarrhea</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 2 of 10</div><h3>🔥 Do you experience heartburn or acid reflux?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">Rarely or never</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">Occasionally — after heavy or spicy meals</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">Frequently — several times per week</span></label>
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">Daily — rely on antacids or PPIs regularly</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 3 of 10</div><h3>🎈 How often do you feel bloated or gassy?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Rarely — occasional normal gas</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">Sometimes — after certain foods</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Often — uncomfortable bloating most days</span></label>
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">Constantly — severe bloating, pain, and excessive gas</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 4 of 10</div><h3>🍽️ How is your appetite?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Good — enjoy meals, eat regular portions</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Fair — sometimes not hungry, smaller portions</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Poor — often skip meals, feel full quickly</span></label>
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">Very poor — nausea, almost no desire to eat</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 5 of 10</div><h3>💧 How much water and fiber do you consume daily?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">Plenty — 6+ cups water, fruits, vegetables, and whole grains</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">Moderate — could drink and eat more fiber</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">Low — mostly drink coffee/tea, low fiber diet</span></label>
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">Very low — rarely drink water, mostly processed foods</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 6 of 10</div><h3>💊 Do you take medications that affect digestion?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">None that I know of</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">1-2 (PPIs, antacids, or iron supplements)</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">NSAIDs, antibiotics, or calcium channel blockers</span></label>
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">Opioid pain medications or multiple gut-affecting drugs</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 7 of 10</div><h3>😣 Do you experience abdominal pain or cramping?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">Rarely or never</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Occasionally — mild discomfort after eating</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Frequently — cramping or pain several times per week</span></label>
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">Daily pain — significantly affects quality of life</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 8 of 10</div><h3>😰 Do digestive issues affect your daily life or social activities?</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">Not at all</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">Slightly — occasional discomfort during activities</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">Moderately — avoid certain foods, restaurants, or outings</span></label>
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">Severely — digestive problems control my daily decisions</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 9 of 10</div><h3>🏃 How physically active are you?</h3><div className="q-options" id="q9">
<label className="q-opt"><input type="radio" name="q9" value="3" /><span className="q-radio"></span><span className="q-text">Active — walk or exercise 4+ times per week</span></label>
<label className="q-opt"><input type="radio" name="q9" value="2" /><span className="q-radio"></span><span className="q-text">Moderate — exercise 2-3 times per week</span></label>
<label className="q-opt"><input type="radio" name="q9" value="1" /><span className="q-radio"></span><span className="q-text">Light — occasional walking only</span></label>
<label className="q-opt"><input type="radio" name="q9" value="0" /><span className="q-radio"></span><span className="q-text">Sedentary — very little physical movement</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 10 of 10</div><h3>😟 Do you experience stress, anxiety, or low mood regularly?</h3><div className="q-options" id="q10">
<label className="q-opt"><input type="radio" name="q10" value="3" /><span className="q-radio"></span><span className="q-text">Rarely — generally calm and content</span></label>
<label className="q-opt"><input type="radio" name="q10" value="2" /><span className="q-radio"></span><span className="q-text">Sometimes — normal life stresses</span></label>
<label className="q-opt"><input type="radio" name="q10" value="1" /><span className="q-radio"></span><span className="q-text">Often — frequent anxiety or low mood</span></label>
<label className="q-opt"><input type="radio" name="q10" value="0" /><span className="q-radio"></span><span className="q-text">Constantly — chronic stress, anxiety, or depression</span></label>
</div></div>

<button className="calc-btn">🫃 Get My Gut Health Score →</button>

<div className="results" id="results">
<div className="risk-result" id="risk-result">
<div className="risk-emoji" id="r-emoji">🫃</div>
<div><span className="risk-score" id="r-score">65</span><span className="risk-of"> / 100</span></div>
<div className="risk-label" id="r-label">Fair Gut Health</div>
<div className="risk-sub" id="r-sub">Some digestive issues need attention</div>
</div>
<div className="breakdown"><h3>Your digestive health breakdown</h3><div id="bd-list"></div></div>
<div className="action-plan" id="action-plan"><h3 id="ap-title">Your gut health plan</h3><div id="ap-list"></div></div>
</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Why digestion changes after 60</h2>
<p>Your digestive system slows down with age — literally. Intestinal motility decreases, stomach acid production drops by up to 40%, digestive enzyme output declines, and the gut microbiome loses diversity. Add in the effects of medications (PPIs, opioids, NSAIDs, antibiotics) and reduced physical activity, and it's no surprise that digestive complaints are the #1 reason seniors visit their doctor.</p>

<h3>The 4 most common digestive issues in seniors</h3>
<p><strong>1. Chronic constipation (33% of seniors):</strong> The most common complaint. Caused by dehydration, low fiber, medications, inactivity, and weakened pelvic floor. The fix: 25-30g fiber daily, 6-8 cups water, daily walking, and psyllium husk if needed. Avoid stimulant laxatives long-term.</p>
<p><strong>2. GERD / acid reflux (20% of seniors):</strong> Worsens with age as the esophageal sphincter weakens. Long-term PPI use (omeprazole, pantoprazole) can reduce B12 and magnesium absorption and increase fracture risk. Lifestyle changes: elevate bed head, don't eat within 3 hours of bedtime, avoid trigger foods, and maintain healthy weight.</p>
<p><strong>3. Bloating and gas:</strong> Often caused by reduced digestive enzyme production, food intolerances that develop with age (especially lactose), small intestinal bacterial overgrowth (SIBO), or swallowed air from eating too quickly. Digestive enzyme supplements can help significantly.</p>
<p><strong>4. Medication-induced gut problems:</strong> NSAIDs damage the stomach lining, opioids cause severe constipation, antibiotics destroy beneficial gut bacteria, and PPIs reduce acid needed for protein digestion and mineral absorption. Always review gut side effects with your pharmacist.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: Soenen S et al., "The ageing gastrointestinal tract," Current Opinion in Clinical Nutrition and Metabolic Care, 2016. American Gastroenterological Association guidelines on chronic constipation, 2023.</em></p>

<h3>The gut-brain connection — why your mood affects your gut</h3>
<p>Your gut produces 90% of your body's serotonin and communicates with your brain via the vagus nerve. This "gut-brain axis" means stress and depression directly worsen digestive symptoms (IBS flares, constipation, nausea) — and digestive problems worsen mood. Treating one often improves the other. If you have both gut and mood issues, addressing both simultaneously is most effective.</p>
<p><strong>Related:</strong> <a href="/tools/mood-check/" style={{"color":"var(--green)","fontWeight":"700"}}>Mood &amp; Depression Quiz →</a></p>

<h3>Supplements that support gut health in seniors</h3>
<p>Probiotics (multi-strain, 10-50 billion CFU — restores microbiome diversity), Digestive Enzymes (compensates for declining natural production), Psyllium Fiber (gentle bulk-forming for constipation — start low, increase slowly), Ginger Extract (reduces nausea, supports motility), L-Glutamine (repairs intestinal lining), and Peppermint Oil capsules (enteric-coated — relieves IBS cramping and bloating).</p>
<p><strong>See our guide:</strong> <a href="/digestion/" style={{"color":"var(--green)","fontWeight":"700"}}>Doctor-reviewed digestion supplements for seniors →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">Why do digestive problems increase after 60?<span className="faq-icon">+</span></button><div className="faq-a">Stomach acid drops up to 40%, intestinal motility slows, microbiome loses diversity, medications disrupt gut function, and reduced activity slows digestion. These compound to make gut issues the #1 complaint in geriatric medicine.</div></div>
<div className="faq-item"><button className="faq-q">How common is constipation in seniors?<span className="faq-icon">+</span></button><div className="faq-a">About 33% of adults over 60 have chronic constipation. Causes: dehydration, low fiber, medications (especially opioids), inactivity, and weakened pelvic floor. Usually treatable with hydration, fiber, and exercise.</div></div>
<div className="faq-item"><button className="faq-q">Are probiotics effective for seniors?<span className="faq-icon">+</span></button><div className="faq-a">Yes — the gut microbiome loses diversity with aging. Multi-strain probiotics (Lactobacillus + Bifidobacterium) help constipation, diarrhea, immune function, and even mood. Use 10-50 billion CFU consistently for 4-8 weeks.</div></div>
<div className="faq-item"><button className="faq-q">What supplements support digestion?<span className="faq-icon">+</span></button><div className="faq-a">Probiotics (multi-strain), Digestive Enzymes, Psyllium Fiber, Ginger Extract, L-Glutamine (gut repair), and Peppermint Oil (IBS). Start with probiotics and fiber — they address the two most common issues.</div></div>
<div className="faq-item"><button className="faq-q">Is GERD dangerous for seniors?<span className="faq-icon">+</span></button><div className="faq-a">Untreated GERD can cause esophageal damage and increase cancer risk. Long-term PPI use also carries risks (B12 deficiency, fractures). Lifestyle changes should be tried first: elevate bed head, avoid eating before bed, maintain healthy weight.</div></div>
<div className="faq-item"><button className="faq-q">When should I see a doctor about digestion?<span className="faq-icon">+</span></button><div className="faq-a">If you have: unintentional weight loss, blood in stool, difficulty swallowing, persistent vomiting, severe pain, or sudden bowel habit changes lasting 2+ weeks. Also if new constipation starts after age 50 without obvious cause.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/digestion/" className="r-link"><span>🫃</span> Digestion supplements</a>
<a href="/tools/hydration/" className="r-link"><span>💧</span> Hydration Calculator</a>
<a href="/tools/mood-check/" className="r-link"><span>🌤️</span> Mood Check</a>
<a href="/tools/calorie-calculator/" className="r-link"><span>🔢</span> Calorie Calculator</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz assesses digestive symptom patterns and risk factors. It is NOT a medical diagnosis. Conditions like IBS, GERD, celiac disease, and inflammatory bowel disease require proper evaluation by a gastroenterologist. If you experience blood in stool, difficulty swallowing, severe pain, or unexplained weight loss, see your doctor promptly.</p></div>

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
