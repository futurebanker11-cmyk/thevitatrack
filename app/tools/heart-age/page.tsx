'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function HeartAgePage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `function calcHeartAge(){
  var realAge=parseInt(document.getElementById('age').value);
  var sex=document.getElementById('sex').value;
  var bp=parseInt(document.getElementById('bp').value);
  var chol=parseInt(document.getElementById('chol').value);
  var diabetes=document.getElementById('diabetes').value;
  var smoking=document.getElementById('smoking').value;
  var exercise=document.getElementById('exercise').value;
  var weight=document.getElementById('weight').value;

  // Default unknowns to average
  var hasUnknowns=false;
  if(bp===0){bp=130;hasUnknowns=true;}
  if(chol===0){chol=220;hasUnknowns=true;}

  // Calculate heart age offset from Framingham-based risk factors
  var offset=0;
  var factors=[];

  // Blood pressure impact
  if(bp<120){offset-=2;factors.push({status:'good',icon:'💚',title:'Blood pressure: Normal',detail:'Under 120 systolic — excellent for your age',impact:'-2 years'});}
  else if(bp<130){offset+=0;factors.push({status:'good',icon:'💛',title:'Blood pressure: Elevated',detail:'120-129 — borderline, monitor regularly',impact:'+0 years'});}
  else if(bp<140){offset+=3;factors.push({status:'warn',icon:'🟠',title:'Blood pressure: Stage 1 High',detail:'130-139 — discuss medication with your doctor',impact:'+3 years'});}
  else if(bp<160){offset+=6;factors.push({status:'bad',icon:'🔴',title:'Blood pressure: Stage 2 High',detail:'140-159 — medication typically needed',impact:'+6 years'});}
  else{offset+=10;factors.push({status:'bad',icon:'🔴',title:'Blood pressure: Very High',detail:'160+ — see your doctor urgently',impact:'+10 years'});}

  // Cholesterol
  if(chol<200){offset-=1;factors.push({status:'good',icon:'💚',title:'Cholesterol: Desirable',detail:'Under 200 — well controlled',impact:'-1 year'});}
  else if(chol<240){offset+=2;factors.push({status:'warn',icon:'🟠',title:'Cholesterol: Borderline High',detail:'200-239 — diet changes or medication may help',impact:'+2 years'});}
  else{offset+=5;factors.push({status:'bad',icon:'🔴',title:'Cholesterol: High',detail:'240+ — medication and diet changes recommended',impact:'+5 years'});}

  // Diabetes
  if(diabetes==='no'){offset-=1;factors.push({status:'good',icon:'💚',title:'No diabetes',detail:'Major protective factor for heart health',impact:'-1 year'});}
  else if(diabetes==='pre'){offset+=2;factors.push({status:'warn',icon:'🟠',title:'Pre-diabetic',detail:'Reversible with diet and exercise — act now',impact:'+2 years'});}
  else{offset+=5;factors.push({status:'bad',icon:'🔴',title:'Type 2 diabetes',detail:'Increases cardiovascular risk significantly',impact:'+5 years'});}

  // Smoking
  if(smoking==='never'){offset-=1;factors.push({status:'good',icon:'💚',title:'Never smoked',detail:'One of the best things for heart longevity',impact:'-1 year'});}
  else if(smoking==='former'){offset+=1;factors.push({status:'good',icon:'💛',title:'Former smoker (5+ years quit)',detail:'Risk decreasing — great decision',impact:'+1 year'});}
  else if(smoking==='recent'){offset+=4;factors.push({status:'warn',icon:'🟠',title:'Recently quit smoking',detail:'Risk still elevated but improving every month',impact:'+4 years'});}
  else{offset+=8;factors.push({status:'bad',icon:'🔴',title:'Current smoker',detail:'Single biggest controllable risk factor — quitting lowers risk 50% in 1 year',impact:'+8 years'});}

  // Exercise
  if(exercise==='active'){offset-=3;factors.push({status:'good',icon:'💚',title:'Very active (5+x/week)',detail:'Excellent — lowers risk of heart failure by 30%+',impact:'-3 years'});}
  else if(exercise==='moderate'){offset-=2;factors.push({status:'good',icon:'💚',title:'Moderate exercise (3-4x/week)',detail:'Great — meeting recommended activity guidelines',impact:'-2 years'});}
  else if(exercise==='light'){offset+=1;factors.push({status:'warn',icon:'🟠',title:'Light exercise only',detail:'Below recommended 150 min/week — try to increase gradually',impact:'+1 year'});}
  else{offset+=4;factors.push({status:'bad',icon:'🔴',title:'No regular exercise',detail:'Physical inactivity is as harmful as smoking for heart risk',impact:'+4 years'});}

  // Weight
  if(weight==='normal'){offset-=1;factors.push({status:'good',icon:'💚',title:'Healthy weight',detail:'Reduces strain on heart and blood vessels',impact:'-1 year'});}
  else if(weight==='overweight'){offset+=1;factors.push({status:'warn',icon:'🟠',title:'Slightly overweight',detail:'Modest impact — focus on exercise and diet quality',impact:'+1 year'});}
  else{offset+=4;factors.push({status:'bad',icon:'🔴',title:'Significantly overweight',detail:'Increases workload on heart, raises BP and diabetes risk',impact:'+4 years'});}

  // Sex adjustment (women slightly lower risk pre-75)
  if(sex==='f'&&realAge<75) offset-=1;

  // Cap offset to realistic range
  offset=Math.max(-10,Math.min(20,offset));

  var heartAge=realAge+offset;
  var diff=heartAge-realAge;

  // Classification
  var cls,emoji,label;
  if(diff<=-3){cls='younger';emoji='💚';label='Your heart is younger than you!';}
  else if(diff<=2){cls='same';emoji='💛';label='Your heart age matches your real age';}
  else if(diff<=8){cls='older';emoji='🧡';label='Your heart is older than you';}
  else{cls='much-older';emoji='❤️‍🩹';label='Your heart is significantly older — action needed';}

  // Update display
  var r=document.getElementById('heart-result');
  r.className='heart-result '+cls;
  document.getElementById('h-emoji').textContent=emoji;
  document.getElementById('h-age').textContent=heartAge;
  document.getElementById('h-label').textContent=label;
  var vsText='Your real age: '+realAge+' → Your heart is ';
  if(diff>0) vsText+=diff+' years OLDER';
  else if(diff<0) vsText+=Math.abs(diff)+' years YOUNGER';
  else vsText+='the same age';
  document.getElementById('h-vs').textContent=vsText;

  // Render factors
  var fList=document.getElementById('factor-list');fList.innerHTML='';
  factors.forEach(function(f){
    var d=document.createElement('div');d.className='factor-item '+f.status;
    d.innerHTML='<span class="factor-icon">'+f.icon+'</span><div class="factor-text"><strong>'+f.title+'</strong>'+f.detail+'</div><span class="factor-impact">'+f.impact+'</span>';
    fList.appendChild(d);
  });

  // Render improvement suggestions
  var iList=document.getElementById('improve-list');iList.innerHTML='';
  var improvements=[];

  if(bp>=130) improvements.push({ic:'🩺',t:'<strong>Lower blood pressure:</strong> Reducing systolic by 10 mmHg could subtract 3-5 years from your heart age. <a href="/tools/bp-checker/" style="color:var(--green);font-weight:700">Check your BP →</a>'});
  if(smoking==='current') improvements.push({ic:'🚭',t:'<strong>Quit smoking:</strong> This alone could subtract 5-10 years from your heart age. Risk drops 50% within just 1 year of quitting.'});
  if(smoking==='recent') improvements.push({ic:'🚭',t:'<strong>Stay quit:</strong> Your risk is still declining. After 5 years smoke-free, your heart age improvement will be even greater.'});
  if(exercise==='none'||exercise==='light') improvements.push({ic:'🚶',t:'<strong>Increase exercise to 150 min/week:</strong> Walking 30 minutes, 5 days a week reduces heart failure risk by 30%. Start with 10 minutes after each meal.'});
  if(chol>=240) improvements.push({ic:'🥗',t:'<strong>Lower cholesterol:</strong> Diet changes (less saturated fat, more fiber) + statin therapy if recommended. Could subtract 3-5 years from heart age.'});
  if(diabetes!=='no') improvements.push({ic:'💊',t:'<strong>Manage blood sugar:</strong> Tight glucose control reduces cardiovascular events. <a href="/tools/glp1-calculator/" style="color:var(--green);font-weight:700">Consider GLP-1 medications →</a>'});
  if(weight==='obese') improvements.push({ic:'⚖️',t:'<strong>Work toward a healthier weight:</strong> Even 5-10% weight loss improves blood pressure, cholesterol, and blood sugar simultaneously.'});

  improvements.push({ic:'🌿',t:'<strong>Support your heart with supplements:</strong> CoQ10, Omega-3, Magnesium, and Garlic Extract all have evidence for cardiovascular support. <a href="/heart/" style="color:var(--green);font-weight:700">See our heart supplement guide →</a>'});

  if(diff<=-3) improvements.unshift({ic:'🎉',t:'<strong>Congratulations!</strong> Your heart is younger than your real age. Keep doing what you\\'re doing — your lifestyle choices are paying off. Regular monitoring and maintaining these habits is the best strategy.'});
  else if(diff<=2) improvements.unshift({ic:'👍',t:'<strong>Good news:</strong> Your heart age is close to your real age. Small improvements in the factors below could make your heart even younger. Focus on the orange and red items above.'});

  improvements.forEach(function(imp){
    var d=document.createElement('div');d.className='imp-item';
    d.innerHTML='<span class="ic">'+imp.ic+'</span><span>'+imp.t+'</span>';
    iList.appendChild(d);
  });

  document.getElementById('results').classList.add('show');

  // Show unknown warning if applicable
  var unknownNote=document.getElementById('unknown-note');
  if(unknownNote){unknownNote.style.display=hasUnknowns?'block':'none';}

  setTimeout(function(){document.getElementById('heart-result').scrollIntoView({behavior:'smooth',block:'center'});},100);
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
.intro-note{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:20px 24px;margin:28px 0 0;border-left:4px solid #E53E3E}.intro-note p{font-size:16px;color:var(--t2);line-height:1.6;margin:0}.intro-note strong{color:#C62828}
.calc-card{background:var(--white);border:2px solid var(--green);border-radius:16px;padding:32px 28px;margin:20px 0 28px;position:relative;overflow:hidden}
.calc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#E53E3E,#4ADE80,#E53E3E)}
.calc-title{font-size:22px;font-weight:700;color:var(--green);margin-bottom:4px}.calc-sub{font-size:15px;color:var(--t2);margin-bottom:24px}
.form-group{margin-bottom:20px}.form-label{display:block;font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-select,.form-input{width:100%;padding:14px 16px;border:1.5px solid var(--border);border-radius:10px;font:inherit;font-size:17px;color:var(--text);background:var(--white);min-height:50px;-webkit-appearance:none;appearance:none}
.form-select{background-image:url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23717170' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center;padding-right:40px}
.form-select:focus,.form-input:focus{outline:none;border-color:var(--green);box-shadow:0 0 0 3px rgba(26,86,50,.15)}
.calc-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,#C62828,#E53E3E);color:#fff;border:none;padding:18px 32px;border-radius:12px;font:inherit;font-size:20px;font-weight:700;cursor:pointer;width:100%;min-height:60px;box-shadow:0 4px 14px rgba(198,40,40,.3);transition:transform .1s}.calc-btn:hover{transform:translateY(-1px)}
.results{display:none;margin-top:28px}.results.show{display:block;animation:fadeIn .5s}
@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
/* HEART RESULT */
.heart-result{border-radius:14px;padding:32px 24px;text-align:center;margin-bottom:24px;border:2px solid var(--border);position:relative}
.heart-result.younger{background:#F0FAF3;border-color:#A7D8B8}
.heart-result.same{background:#FFFBEB;border-color:#E8D48B}
.heart-result.older{background:#FEF2F2;border-color:#F87171}
.heart-result.much-older{background:#FEE;border-color:#DC2626}
.heart-emoji{font-size:48px;margin-bottom:8px}
.heart-age-num{font-size:64px;font-weight:700;line-height:1}.heart-label{font-size:20px;font-weight:700;margin-top:4px}
.heart-vs{font-size:16px;color:var(--t2);margin-top:8px;padding:10px 20px;background:rgba(0,0,0,.04);border-radius:8px;display:inline-block}
.heart-result.younger .heart-age-num,.heart-result.younger .heart-label{color:#1A5632}
.heart-result.same .heart-age-num,.heart-result.same .heart-label{color:#B8860B}
.heart-result.older .heart-age-num,.heart-result.older .heart-label{color:#E65100}
.heart-result.much-older .heart-age-num,.heart-result.much-older .heart-label{color:#C62828}
/* FACTORS */
.factors{margin:20px 0}.factors h3{font-size:19px;font-weight:700;margin-bottom:14px}
.factor-item{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:10px;margin-bottom:8px}
.factor-item.good{background:#F0FAF3;border:1px solid #C6E7D0}
.factor-item.warn{background:#FFFBEB;border:1px solid #E8D48B}
.factor-item.bad{background:#FEF2F2;border:1px solid #FECACA}
.factor-icon{font-size:22px;flex-shrink:0}.factor-text{flex:1;font-size:15px;line-height:1.45}
.factor-text strong{display:block;font-size:16px;margin-bottom:2px}
.factor-impact{font-size:14px;font-weight:700;white-space:nowrap;padding:4px 10px;border-radius:6px}
.factor-item.good .factor-impact{color:#1A5632;background:#E8F5E9}
.factor-item.warn .factor-impact{color:#92400E;background:#FEF3C7}
.factor-item.bad .factor-impact{color:#991B1B;background:#FEE2E2}
/* IMPROVE */
.improve{background:#F0FAF3;border:2px solid #A7D8B8;border-radius:14px;padding:24px;margin:20px 0}
.improve h3{font-size:19px;font-weight:700;color:var(--green);margin-bottom:14px}
.imp-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px}
.imp-item .ic{font-size:18px;flex-shrink:0;line-height:1.4}.imp-item span{font-size:15px;color:var(--t2);line-height:1.5}
/* STANDARD CONTENT/FAQ/RELATED/FOOTER */
.content-section{margin:32px 0}.content-section h2{font-size:24px;font-weight:700;margin-bottom:14px}.content-section h3{font-size:20px;font-weight:700;color:var(--green);margin:20px 0 10px}.content-section p{font-size:17px;color:var(--t2);line-height:1.7;margin-bottom:14px}
.faq{margin:36px 0}.faq h2{font-size:24px;font-weight:700;margin-bottom:20px;text-align:center}.faq-item{background:var(--white);border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px}.faq-q{padding:16px 22px;font-size:18px;font-weight:600;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:none;width:100%;text-align:left;font-family:inherit;line-height:1.4}.faq-q:hover{background:#FAFAF8}.faq-icon{font-size:22px;color:var(--muted);flex-shrink:0;transition:transform .2s}.faq-q.active .faq-icon{transform:rotate(45deg)}.faq-a{padding:0 22px 16px;font-size:16px;color:var(--t2);line-height:1.65;display:none}.faq-a.show{display:block}
.related{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin:32px 0}.related h3{font-size:20px;font-weight:700;margin-bottom:16px}.r-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.r-link{display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid var(--border);border-radius:10px;text-decoration:none;color:var(--green);font-weight:600;font-size:16px}.r-link:hover{border-color:#c5c3be}
.disc{background:#F5F4F1;border-radius:var(--r);padding:24px;margin:0 0 40px}.disc h4{font-size:16px;font-weight:700;margin-bottom:8px}.disc p{font-size:14px;color:var(--muted);line-height:1.7}.disc p+p{margin-top:8px}
.sidebar{width:240px;flex-shrink:0;position:sticky;top:70px;display:none}.sidebar-inner{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:18px}.sidebar h4{font-size:15px;font-weight:700;margin-bottom:14px}.sb-link{display:block;padding:8px 10px;border-radius:8px;text-decoration:none;background:#F8FAF8;font-size:14px;font-weight:600;color:var(--green);margin-bottom:6px}.sb-link:hover{background:#E8F5E9}.sb-div{border:none;border-top:1px solid var(--border);margin:12px 0}.sb-sub{font-size:13px;color:var(--muted);margin-top:12px}.sb-sub a{color:var(--green);text-decoration:none;display:block;padding:5px 0;font-weight:600}
@media(min-width:1000px){.sidebar{display:block}}@media(max-width:999px){.main-wrap{max-width:800px}}
.ftr{border-top:1px solid var(--border);background:linear-gradient(180deg,#FAFDFB,#F7F6F3);padding:36px 20px 20px;text-align:center}.ftr-inner{max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px}.ftr-logo{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--text)}.ftr-logo svg{width:22px;height:22px}.ftr-logo span{font-size:22px;font-weight:700}.ftr-logo:hover span{color:var(--green)}.ftr-links{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 20px;list-style:none}.ftr-links a{display:inline-block;padding:8px 4px;text-decoration:none;color:var(--text);font-weight:600;font-size:15px;min-height:44px}.ftr-links a:hover{color:var(--green)}.ftr-btm{max-width:700px;margin:0 auto;padding:14px 20px 8px;text-align:center;border-top:1px dashed #E0DDD8}.ftr-btm p{margin:0 0 4px;color:var(--muted);font-size:14px}
@media(max-width:700px){.page-hero{padding:28px 20px 24px}.page-hero h1{font-size:26px}.calc-card{padding:24px 18px}.form-row{grid-template-columns:1fr}.heart-age-num{font-size:48px}.factor-item{flex-wrap:wrap}.factor-impact{width:100%}.r-grid{grid-template-columns:1fr}.faq-q{font-size:17px;padding:14px 18px}}
      `}</style>
<div className="main-wrap">
<div className="main">

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="8981383031" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="intro-note"><p><strong>Heart disease is the #1 killer of Americans over 65.</strong> But your risk is not fixed — it depends on controllable factors like blood pressure, cholesterol, smoking, diabetes, and exercise. This calculator estimates your "heart age" to show whether your heart is aging faster or slower than your body. Most people can lower their heart age by 5-15 years.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Estimate Your Heart Age</h2>
<div className="calc-sub">Answer 7 questions — takes about 60 seconds</div>

<div className="form-row">
<div className="form-group"><label className="form-label">Your actual age</label>
<select className="form-select" id="age"><option value="55">55-59</option><option value="62" selected>60-64</option><option value="67">65-69</option><option value="72">70-74</option><option value="77">75-79</option><option value="82">80+</option></select></div>
<div className="form-group"><label className="form-label">Biological sex</label>
<select className="form-select" id="sex"><option value="m">Male</option><option value="f">Female</option></select></div>
</div>

<div className="form-group"><label className="form-label">Your systolic blood pressure (top number)</label>
<select className="form-select" id="bp">
<option value="110">Under 120 (Normal)</option>
<option value="125" selected>120-129 (Elevated)</option>
<option value="135">130-139 (Stage 1 High)</option>
<option value="150">140-159 (Stage 2 High)</option>
<option value="170">160+ (Very High)</option>
<option value="0">I don't know my blood pressure</option>
</select></div>

<div className="form-group"><label className="form-label">Total cholesterol level</label>
<select className="form-select" id="chol">
<option value="180">Under 200 (Desirable)</option>
<option value="220" selected>200-239 (Borderline high)</option>
<option value="260">240+ (High)</option>
<option value="0">I don't know my cholesterol</option>
</select></div>

<div className="form-row">
<div className="form-group"><label className="form-label">Do you have diabetes?</label>
<select className="form-select" id="diabetes"><option value="no" selected>No</option><option value="pre">Pre-diabetic</option><option value="yes">Yes, Type 2</option></select></div>
<div className="form-group"><label className="form-label">Do you smoke?</label>
<select className="form-select" id="smoking"><option value="never" selected>Never smoked</option><option value="former">Former smoker (quit 5+ years)</option><option value="recent">Quit within last 5 years</option><option value="current">Current smoker</option></select></div>
</div>

<div className="form-row">
<div className="form-group"><label className="form-label">Weekly exercise</label>
<select className="form-select" id="exercise"><option value="none">No regular exercise</option><option value="light" selected>Light (walking 1-2x/week)</option><option value="moderate">Moderate (3-4x/week, 30+ min)</option><option value="active">Active (5+x/week or vigorous)</option></select></div>
<div className="form-group"><label className="form-label">Weight category</label>
<select className="form-select" id="weight"><option value="normal">Healthy weight</option><option value="overweight" selected>Slightly overweight</option><option value="obese">Significantly overweight</option></select></div>
</div>

<button className="calc-btn">❤️ Calculate My Heart Age →</button>

<div className="results" id="results">

<div className="heart-result" id="heart-result">
<div id="unknown-note" style={{"display":"none","background":"#FFFBEB","border":"1px solid #E8D48B","borderRadius":"8px","padding":"12px 16px","marginBottom":"16px","fontSize":"14px","color":"#92400E","textAlign":"left"}}><strong>Note:</strong> You selected "I don't know" for blood pressure or cholesterol. We used average values, so this result is less accurate. For a better estimate, ask your doctor for your latest numbers.</div>
<div className="heart-emoji" id="h-emoji">❤️</div>
<div className="heart-age-num" id="h-age">67</div>
<div className="heart-label" id="h-label">Your estimated heart age</div>
<div className="heart-vs" id="h-vs">Your real age: 62 → Your heart is 5 years older</div>
</div>

<div className="factors" id="factors">
<h3>Your risk factors — what's helping and hurting</h3>
<div id="factor-list"></div>
</div>

<div className="improve" id="improve">
<h3>How to lower your heart age</h3>
<div id="improve-list"></div>
</div>

</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Understanding your heart age after 60</h2>
<p>Heart age is a way of expressing your cardiovascular risk as an age — making it easier to understand than percentages or risk scores. If you're 65 but your heart age is 78, it means your combination of risk factors gives you the same heart disease risk as an average 78-year-old. The concept was developed from the Framingham Heart Study, the longest-running cardiovascular study in history.</p>

<h3>Why heart age matters more than risk percentages</h3>
<p>Doctors often talk about "10-year cardiovascular risk" in percentages — but most people don't connect with numbers like "14% chance of a heart event." Telling someone their heart is 13 years older than they are is far more motivating. Research from the United Kingdom's NHS Health Check program found that heart age messaging increased medication adherence and lifestyle changes significantly more than percentage-based risk communication.</p>

<h3>The Framingham Heart Study — where heart age comes from</h3>
<p>Started in 1948 in Framingham, Massachusetts, this landmark study followed thousands of participants over decades. It identified the major modifiable risk factors for heart disease: high blood pressure, high cholesterol, smoking, diabetes, and physical inactivity. The Framingham Risk Score, and its modern derivatives, form the basis of cardiovascular risk calculators worldwide, including the one on this page.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: D'Agostino et al., "General Cardiovascular Risk Profile for Use in Primary Care: The Framingham Heart Study," Circulation, 2008. PREVENT Risk Calculator, AHA 2024.</em></p>

<h3>How seniors can lower heart age — it's never too late</h3>
<p>Even after 60, significant improvements are possible. Lowering systolic blood pressure by 10 mmHg reduces cardiovascular events by 20%. Quitting smoking reduces heart attack risk by 50% within 1 year. Walking 150 minutes per week reduces heart failure risk by 30%. Managing diabetes lowers risk by 25%. These are not marginal — they're life-changing improvements available at any age.</p>

<h3>Supplements that support cardiovascular health in seniors</h3>
<p>Several supplements have clinical evidence for heart health support: CoQ10 Ubiquinol (200mg — powers heart muscle energy), Omega-3 Fish Oil (2000mg EPA+DHA — reduces triglycerides and inflammation), Magnesium Glycinate (400mg — relaxes blood vessels), Nattokinase (supports healthy circulation), and Aged Garlic Extract (improves endothelial function and may lower blood pressure). These complement medication but do not replace it.</p>
<p><strong>See our doctor-reviewed guide:</strong> <a href="/heart/" style={{"color":"var(--green)","fontWeight":"700"}}>Heart health supplements for seniors →</a> | <a href="/blood-pressure/" style={{"color":"var(--green)","fontWeight":"700"}}>Blood pressure supplements →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">What is heart age and why does it matter?<span className="faq-icon">+</span></button><div className="faq-a">Heart age estimates how old your cardiovascular system is based on risk factors. A 65-year-old with high BP and no exercise might have a heart age of 78. Knowing your heart age motivates changes — it's more impactful than hearing "you have a 14% risk."</div></div>
<div className="faq-item"><button className="faq-q">Can you lower your heart age?<span className="faq-icon">+</span></button><div className="faq-a">Yes. Reducing BP by 10 points lowers heart age 3-5 years. Quitting smoking: 5-10 years. Regular exercise: 3-5 years. Lowering cholesterol and managing diabetes also help. Most people can reduce heart age by 5-15 years with consistent lifestyle changes.</div></div>
<div className="faq-item"><button className="faq-q">How accurate is a heart age calculator?<span className="faq-icon">+</span></button><div className="faq-a">Heart age provides an estimate based on population-level risk data from the Framingham Heart Study. It cannot account for genetics or individual variations. Use it as a conversation starter with your doctor, not a diagnosis. For clinical risk assessment, ask about the ACC/AHA ASCVD calculator.</div></div>
<div className="faq-item"><button className="faq-q">What supplements support heart health?<span className="faq-icon">+</span></button><div className="faq-a">CoQ10 Ubiquinol (200mg), Omega-3 Fish Oil (2000mg), Magnesium Glycinate (400mg), Nattokinase, and Aged Garlic Extract all have clinical evidence. They complement medication but don't replace it. See our heart health supplement guide for specific products.</div></div>
<div className="faq-item"><button className="faq-q">Is heart age different for men and women?<span className="faq-icon">+</span></button><div className="faq-a">Yes. Before menopause, women have lower cardiovascular risk. After menopause (typically around 50-55), risk rises significantly. By age 70-75, the gap narrows. Women over 65 are more likely to have isolated systolic hypertension and atypical heart attack symptoms.</div></div>
<div className="faq-item"><button className="faq-q">What is the Framingham Heart Study?<span className="faq-icon">+</span></button><div className="faq-a">One of the longest-running cardiovascular studies in history, started in 1948 in Framingham, Massachusetts. It identified the major heart disease risk factors we use today: high blood pressure, cholesterol, smoking, diabetes, and obesity. Our calculator uses scoring models derived from this data.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/heart/" className="r-link"><span>❤️</span> Heart supplements</a>
<a href="/blood-pressure/" className="r-link"><span>💓</span> BP supplements</a>
<a href="/tools/bp-checker/" className="r-link"><span>🩺</span> BP Checker</a>
<a href="/tools/glp1-calculator/" className="r-link"><span>⚖️</span> GLP-1 Calculator</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This calculator provides an ESTIMATE based on Framingham risk models. It is NOT a clinical diagnosis. Heart age cannot account for family history, genetics, or individual variations. For an accurate cardiovascular risk assessment, consult your doctor and ask about the ACC/AHA ASCVD risk calculator.</p>
<p>If you experience chest pain, shortness of breath, or other heart symptoms, seek emergency medical care immediately.</p></div>

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
