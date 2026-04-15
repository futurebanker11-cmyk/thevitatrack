'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function DiabetesRiskPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `function sel(el){
  el.closest('.q-options').querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected')});
  el.classList.add('selected');
  el.querySelector('input').checked=true;
}

function scoreRisk(){
  var cats=[
    {q:'q1',label:'Weight / BMI'},
    {q:'q2',label:'Family history'},
    {q:'q3',label:'Physical activity'},
    {q:'q4',label:'Blood pressure'},
    {q:'q5',label:'Belly fat distribution'},
    {q:'q6',label:'Blood sugar history'},
    {q:'q7',label:'Diet quality'},
    {q:'q8',label:'Frequent urination'},
    {q:'q9',label:'Unexplained fatigue'},
    {q:'q10',label:'Vision / nerve symptoms'}
  ];

  var total=0,scores=[];
  for(var i=0;i<cats.length;i++){
    var checked=document.querySelector('input[name="'+cats[i].q+'"]:checked');
    if(!checked){alert('Please answer all 10 questions (question '+(i+1)+' is missing)');return;}
    var val=parseInt(checked.value);
    total+=val;
    scores.push({label:cats[i].label,val:val,max:3});
  }

  // Higher score = higher risk (unlike muscle quiz where higher=better)
  var riskPct=Math.round((total/30)*100);

  var cls,emoji,label,sub;
  if(riskPct<=20){cls='low';emoji='✅';label='Low Diabetes Risk';sub='Your risk factors are minimal. Continue your healthy habits and get screened with your annual physical.';}
  else if(riskPct<=40){cls='low';emoji='💚';label='Low-to-Moderate Risk';sub='A few risk factors present. Awareness and prevention habits will keep you in good shape.';}
  else if(riskPct<=60){cls='moderate';emoji='⚠️';label='Moderate Diabetes Risk';sub='Several significant risk factors detected. Ask your doctor for a fasting glucose and A1C test at your next visit.';}
  else if(riskPct<=80){cls='high';emoji='🟠';label='High Diabetes Risk';sub='Multiple strong risk factors. Schedule blood work with your doctor soon — early detection changes outcomes dramatically.';}
  else{cls='high';emoji='🔴';label='Very High Diabetes Risk';sub='Your risk profile is significant. See your doctor for fasting glucose and A1C testing as soon as possible.';}

  document.getElementById('risk-result').className='risk-result '+cls;
  document.getElementById('r-emoji').textContent=emoji;
  document.getElementById('r-score').textContent=riskPct;
  document.getElementById('r-label').textContent=label;
  document.getElementById('r-sub').textContent=sub;

  // Breakdown bars (inverted — 0 is best, 3 is worst for this quiz)
  var bd=document.getElementById('bd-list');bd.innerHTML='';
  scores.forEach(function(s){
    var riskBar=Math.round((s.val/s.max)*100);
    var barCls=riskBar<=33?'high':riskBar<=66?'mid':'low'; // inverted colors: high(green)=low risk
    var d=document.createElement('div');d.className='bd-item';
    d.innerHTML='<span class="bd-cat">'+s.label+'</span><div class="bd-bar-wrap"><div class="bd-bar '+barCls+'" style="width:0%"></div></div><span class="bd-score">'+s.val+'/3</span>';
    bd.appendChild(d);
    setTimeout(function(){d.querySelector('.bd-bar').style.width=riskBar+'%';},100);
  });

  // Action plan
  var ap=document.getElementById('ap-list');ap.innerHTML='';
  var plan=[];
  var apEl=document.getElementById('action-plan');

  if(riskPct>60){
    apEl.className='action-plan urgent';
    document.getElementById('ap-title').textContent='Urgent — your diabetes prevention plan';
    plan.push({ic:'🩸',t:'<strong>Get tested NOW.</strong> Ask your doctor for a fasting glucose test AND an A1C (glycated hemoglobin) test. These together give the most accurate picture. Don\\'t wait for your next annual physical.'});
  }else if(riskPct>40){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your diabetes prevention plan';
    plan.push({ic:'🩸',t:'<strong>Get your blood sugar checked.</strong> At your next doctor visit, request a fasting glucose and A1C test. If it\\'s been more than a year since your last test, schedule one soon.'});
  }else{
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your healthy maintenance plan';
    plan.push({ic:'✅',t:'<strong>Low risk — keep it up!</strong> Continue your healthy habits. Get blood sugar checked annually with your regular physical. The tips below will help you maintain your low risk.'});
  }

  if(scores[0].val>=2) plan.push({ic:'⚖️',t:'<strong>Weight management is your #1 lever.</strong> The DPP study proved that just 5-7% weight loss (10-14 lbs for a 200 lb person) reduces diabetes risk by 71%. Slow, steady loss through diet quality — not crash dieting. <a href="/tools/calorie-calculator/" style="color:var(--green);font-weight:700">Calculate your safe calorie target →</a>'});
  if(scores[2].val>=2) plan.push({ic:'🚶',t:'<strong>Start walking 150 minutes per week.</strong> That\\'s just 22 minutes per day. Walking after meals is especially powerful — it reduces post-meal blood sugar spikes by 30-50%. Start with 10 minutes after dinner tonight.'});
  if(scores[4].val>=2) plan.push({ic:'📏',t:'<strong>Belly fat is the most dangerous type.</strong> Visceral fat around organs directly causes insulin resistance. Even modest weight loss reduces belly fat first. Waist circumference is a better predictor of diabetes than BMI. <a href="/tools/bmi-senior/" style="color:var(--green);font-weight:700">Check your BMI →</a>'});
  if(scores[5].val>=2) plan.push({ic:'🔬',t:'<strong>You\\'ve had elevated blood sugar before — don\\'t ignore it.</strong> Pre-diabetes progresses to diabetes in 5-10 years without intervention. But 71% of seniors who make lifestyle changes avoid this progression entirely.'});
  if(scores[6].val>=2) plan.push({ic:'🥗',t:'<strong>Reduce refined carbs and added sugars.</strong> Replace white bread, pasta, and rice with whole grains. Fill half your plate with vegetables. Eat protein first at every meal — it slows sugar absorption. Mediterranean diet is the most evidence-backed pattern for diabetes prevention.'});
  if(scores[7].val>=2||scores[8].val>=2||scores[9].val>=2) plan.push({ic:'⚠️',t:'<strong>Your symptoms suggest possible undiagnosed diabetes.</strong> Frequent urination, fatigue after meals, and vision changes are classic signs. These need immediate medical evaluation — don\\'t dismiss them as "getting older."'});
  if(scores[3].val>=2) plan.push({ic:'💓',t:'<strong>High blood pressure + diabetes risk = compounded heart danger.</strong> Managing blood pressure is critical for preventing diabetes complications. <a href="/tools/bp-checker/" style="color:var(--green);font-weight:700">Check your blood pressure →</a> | <a href="/tools/heart-age/" style="color:var(--green);font-weight:700">Heart age calculator →</a>'});

  plan.push({ic:'💊',t:'<strong>Ask your doctor about GLP-1 medications</strong> if lifestyle changes aren\\'t enough. Ozempic and Mounjaro lower blood sugar AND reduce weight — addressing both risk factors. <a href="/tools/glp1-calculator/" style="color:var(--green);font-weight:700">GLP-1 Weight Loss Calculator →</a>'});
  plan.push({ic:'🌿',t:'<strong>Supplements for blood sugar support:</strong> Berberine (500mg), Chromium Picolinate, Alpha-Lipoic Acid, Cinnamon Extract, and Magnesium Glycinate all have clinical evidence. <a href="/heart/" style="color:var(--green);font-weight:700">See supplement guides →</a>'});

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

<div className="intro-note"><p><strong>The silent epidemic:</strong> 33% of adults over 65 have Type 2 diabetes and another 50% are pre-diabetic. Pre-diabetes has NO symptoms — it's only found through blood tests. But the Diabetes Prevention Program proved that seniors over 60 who make modest lifestyle changes can reduce their risk by 71%. This quiz helps you understand where you stand so you can act early.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Assess Your Type 2 Diabetes Risk</h2>
<div className="calc-sub">Based on ADA screening criteria with senior-specific risk factors</div>

<div className="quiz-q"><div className="q-num">Question 1 of 10</div><h3>⚖️ How would you describe your weight?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">Healthy weight (BMI under 25)</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">Slightly overweight (BMI 25-29)</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">Significantly overweight (BMI 30-35)</span></label>
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Very overweight (BMI over 35)</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 2 of 10</div><h3>👨‍👩‍👦 Does diabetes run in your family?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">No family history of diabetes</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">Extended family (aunt, uncle, grandparent)</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">Parent or sibling has/had Type 2</span></label>
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">Multiple close relatives have/had diabetes</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 3 of 10</div><h3>🏃 How physically active are you?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">Active — exercise 4+ times per week</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Moderate — walk or exercise 2-3 times/week</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">Light — occasional walking only</span></label>
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Sedentary — little to no physical activity</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 4 of 10</div><h3>💓 Do you have high blood pressure?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">No — blood pressure is normal</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Borderline or controlled with medication</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Yes — diagnosed high blood pressure</span></label>
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Yes — difficult to control even with medication</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 5 of 10</div><h3>📍 Where do you carry most of your extra weight?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">Evenly distributed / not overweight</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">Mostly hips and thighs</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">Mostly around the belly</span></label>
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">Large belly (waist over 40" men / 35" women)</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 6 of 10</div><h3>🩸 Have you ever been told you have pre-diabetes or high blood sugar?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">No — blood sugar has always been normal</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">I don't know / haven't been tested recently</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">Yes — told I'm pre-diabetic or borderline</span></label>
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">Yes — diagnosed but not yet on medication</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 7 of 10</div><h3>🍞 How would you describe your diet?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">Balanced — lots of vegetables, lean protein, whole grains</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Mostly healthy with some processed foods</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Lots of bread, pasta, rice, and sweets</span></label>
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">Heavy on sugary drinks, fast food, and snacks</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 8 of 10</div><h3>🚽 Do you urinate more frequently than usual?</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">No — normal frequency</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">Slightly more than usual</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">Noticeably more, especially at night</span></label>
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">Very frequent — going 10+ times per day</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 9 of 10</div><h3>😴 Do you experience unexplained fatigue?</h3><div className="q-options" id="q9">
<label className="q-opt"><input type="radio" name="q9" value="0" /><span className="q-radio"></span><span className="q-text">No — energy is good for my age</span></label>
<label className="q-opt"><input type="radio" name="q9" value="1" /><span className="q-radio"></span><span className="q-text">Occasional tiredness, usually in afternoon</span></label>
<label className="q-opt"><input type="radio" name="q9" value="2" /><span className="q-radio"></span><span className="q-text">Frequent fatigue even after good sleep</span></label>
<label className="q-opt"><input type="radio" name="q9" value="3" /><span className="q-radio"></span><span className="q-text">Constantly exhausted — crashes after meals</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 10 of 10</div><h3>👀 Do you experience blurry vision or tingling in hands/feet?</h3><div className="q-options" id="q10">
<label className="q-opt"><input type="radio" name="q10" value="0" /><span className="q-radio"></span><span className="q-text">No — vision and sensation are fine</span></label>
<label className="q-opt"><input type="radio" name="q10" value="1" /><span className="q-radio"></span><span className="q-text">Occasional blurriness or mild tingling</span></label>
<label className="q-opt"><input type="radio" name="q10" value="2" /><span className="q-radio"></span><span className="q-text">Frequent blurry vision or numbness in extremities</span></label>
<label className="q-opt"><input type="radio" name="q10" value="3" /><span className="q-radio"></span><span className="q-text">Both — blurry vision AND tingling/numbness</span></label>
</div></div>

<button className="calc-btn">🩸 Get My Diabetes Risk Score →</button>

<div className="results" id="results">
<div className="risk-result" id="risk-result">
<div className="risk-emoji" id="r-emoji">🩸</div>
<div><span className="risk-score" id="r-score">45</span><span className="risk-of"> / 100</span></div>
<div className="risk-label" id="r-label">Moderate Risk</div>
<div className="risk-sub" id="r-sub">You have several risk factors for Type 2 diabetes</div>
</div>
<div className="breakdown"><h3>Your risk factor breakdown</h3><div id="bd-list"></div></div>
<div className="action-plan" id="action-plan"><h3 id="ap-title">Your diabetes prevention plan</h3><div id="ap-list"></div></div>
</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Understanding diabetes risk after 60</h2>
<p>Type 2 diabetes is the most common chronic disease among American seniors. By age 65, one in three adults either has diabetes or is pre-diabetic without knowing it. The consequences of unmanaged blood sugar are devastating: heart disease risk doubles, kidney failure, vision loss, nerve damage, and cognitive decline. But here's the good news — pre-diabetes is reversible, and even established Type 2 can be dramatically improved.</p>

<h3>The Diabetes Prevention Program — the most important study for seniors</h3>
<p>The landmark Diabetes Prevention Program (DPP) study proved that lifestyle changes beat medication for preventing diabetes. Participants over 60 who lost just 5-7% of body weight (10-14 lbs for a 200 lb person) and walked 150 minutes per week reduced their diabetes risk by 71%. This was more effective than Metformin. The lesson: modest, sustainable changes have enormous impact — especially for seniors.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Source: Diabetes Prevention Program Research Group, "Reduction in the incidence of type 2 diabetes with lifestyle intervention or metformin," NEJM, 2002. American Diabetes Association Standards of Care 2024.</em></p>

<h3>Why belly fat matters more than total weight</h3>
<p>Visceral fat — the fat stored around your abdominal organs — produces inflammatory chemicals that directly cause insulin resistance. A senior with normal weight but a large waistline (over 40 inches for men, 35 inches for women) can have higher diabetes risk than someone who is overweight but carries fat on their hips and thighs. Waist circumference is a better predictor of diabetes risk than BMI in seniors.</p>

<h3>Blood sugar, heart disease, and the vicious cycle</h3>
<p>High blood sugar damages blood vessels, accelerating atherosclerosis (artery plaque). Diabetes doubles heart attack and stroke risk. High blood pressure (common in seniors) further compounds this. If your diabetes risk is elevated, your heart risk is too — which is why we recommend also checking your heart age.</p>
<p><strong>Related:</strong> <a href="/tools/heart-age/" style={{"color":"var(--green)","fontWeight":"700"}}>Heart Age Calculator →</a> | <a href="/tools/bp-checker/" style={{"color":"var(--green)","fontWeight":"700"}}>Blood Pressure Checker →</a></p>

<h3>GLP-1 medications — a game-changer for senior diabetes</h3>
<p>Ozempic, Wegovy, and Mounjaro have revolutionized diabetes and pre-diabetes treatment. These medications reduce A1C by 1-2 points AND cause 10-15% weight loss. For seniors with both diabetes and obesity, GLP-1 therapy addresses both problems simultaneously. However, muscle loss on GLP-1 is a real concern — high protein intake and resistance training are essential.</p>
<p><strong>Related:</strong> <a href="/tools/glp1-calculator/" style={{"color":"var(--green)","fontWeight":"700"}}>GLP-1 Calculator →</a> | <a href="/tools/protein-calculator/" style={{"color":"var(--green)","fontWeight":"700"}}>Protein Calculator →</a></p>

<h3>Supplements that support blood sugar health</h3>
<p>Several supplements have clinical evidence for blood sugar support: Berberine (500mg 2-3x daily — comparable to Metformin in some studies), Chromium Picolinate (200-1000mcg — improves insulin sensitivity), Alpha-Lipoic Acid (600mg — protects nerves and supports glucose metabolism), Cinnamon Extract (500-1000mg — may improve fasting glucose), and Magnesium Glycinate (400mg — deficiency directly worsens insulin resistance). These complement medication — they don't replace it.</p>
<p><strong>See our guide:</strong> <a href="/heart/" style={{"color":"var(--green)","fontWeight":"700"}}>Heart health supplements →</a> | <a href="/longevity/" style={{"color":"var(--green)","fontWeight":"700"}}>Longevity supplements →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">What percentage of seniors have diabetes?<span className="faq-icon">+</span></button><div className="faq-a">About 33% of adults over 65 have Type 2 diabetes (diagnosed or undiagnosed), and another 50% are pre-diabetic. Combined, over 80% of seniors have some degree of abnormal blood sugar. Many don't know until complications appear.</div></div>
<div className="faq-item"><button className="faq-q">What are early signs of diabetes in seniors?<span className="faq-icon">+</span></button><div className="faq-a">Often subtle: increased thirst, frequent urination (especially at night), unexplained fatigue, blurry vision, slow-healing wounds, tingling in hands/feet, and unintentional weight loss. Many seniors have NO obvious symptoms — screening is essential.</div></div>
<div className="faq-item"><button className="faq-q">Can pre-diabetes be reversed after 60?<span className="faq-icon">+</span></button><div className="faq-a">Yes — the Diabetes Prevention Program proved seniors over 60 who lost 5-7% of body weight and walked 150 min/week reduced diabetes risk by 71%. That's more effective than medication. It's never too late.</div></div>
<div className="faq-item"><button className="faq-q">What is a normal blood sugar for a 70 year old?<span className="faq-icon">+</span></button><div className="faq-a">Fasting blood sugar under 100 mg/dL is normal. 100-125 is pre-diabetic. Over 126 is diabetic. A1C under 7% is the standard target, though some doctors accept 7.5-8% for frail seniors to avoid dangerous low blood sugar.</div></div>
<div className="faq-item"><button className="faq-q">Do GLP-1 medications help with diabetes?<span className="faq-icon">+</span></button><div className="faq-a">Yes — Ozempic, Wegovy, and Mounjaro lower blood sugar AND promote weight loss. They reduce A1C by 1-2 points and body weight by 10-15%. Must be combined with protein and exercise to prevent muscle loss.</div></div>
<div className="faq-item"><button className="faq-q">What supplements help blood sugar?<span className="faq-icon">+</span></button><div className="faq-a">Berberine (500mg 2-3x daily), Chromium Picolinate (200-1000mcg), Alpha-Lipoic Acid (600mg), Cinnamon Extract (500-1000mg), and Magnesium Glycinate (400mg). These complement medication but don't replace it. Always check with your doctor.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/tools/glp1-calculator/" className="r-link"><span>⚖️</span> GLP-1 Calculator</a>
<a href="/tools/heart-age/" className="r-link"><span>❤️</span> Heart Age Calculator</a>
<a href="/tools/calorie-calculator/" className="r-link"><span>🔢</span> Calorie Calculator</a>
<a href="/heart/" className="r-link"><span>💓</span> Heart supplements</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz provides a general diabetes risk assessment based on ADA screening criteria. It is NOT a diagnosis. Only blood tests (fasting glucose, A1C, or oral glucose tolerance test) can diagnose diabetes or pre-diabetes. If your score suggests elevated risk, see your doctor for proper blood work.</p>
<p>If you experience sudden blurry vision, extreme thirst, or unexplained weight loss, seek medical attention promptly.</p></div>

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
