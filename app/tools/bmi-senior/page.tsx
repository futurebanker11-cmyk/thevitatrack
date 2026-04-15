'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function BmiSeniorPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `var hUnit='imp',wUnit='lbs';
function setHU(u){hUnit=u;document.querySelectorAll('#ht-toggle .unit-btn').forEach(function(b){b.classList.remove('active')});event.target.classList.add('active');document.getElementById('ht-imp').style.display=u==='imp'?'grid':'none';document.getElementById('ht-met').style.display=u==='met'?'block':'none';}
function setWU(u){wUnit=u;document.querySelectorAll('#wt-toggle .unit-btn').forEach(function(b){b.classList.remove('active')});event.target.classList.add('active');var w=document.getElementById('weight');if(u==='kg'){w.value=Math.round(parseFloat(w.value)*0.4536);w.min=30;w.max=230;document.getElementById('wt-hint').textContent='Enter weight in kilograms';}else{w.value=Math.round(parseFloat(w.value)*2.205);w.min=60;w.max=500;document.getElementById('wt-hint').textContent='Enter weight in pounds';}}

function calcBMI(){
  var wt=parseFloat(document.getElementById('weight').value);
  var age=parseInt(document.getElementById('age').value);
  if(!wt){alert('Please enter your weight');return;}

  // Convert to lbs/inches
  var wtLbs=wUnit==='kg'?wt*2.205:wt;
  var htIn;
  if(hUnit==='met'){htIn=parseFloat(document.getElementById('cm').value)/2.54;}
  else{htIn=parseInt(document.getElementById('feet').value)*12+parseInt(document.getElementById('inches').value);}
  if(!htIn||htIn<48||htIn>84){alert('Please enter a valid height');return;}

  var bmi=((wtLbs/(htIn*htIn))*703);
  var bmiR=bmi.toFixed(1);

  // Senior classification (65+)
  var isSenior=age>=65;
  var cat,cls,sub;
  if(isSenior){
    if(bmi<23){cat='Underweight (Senior Range)';cls='underweight';sub='Below the healthy range for adults over 65. This increases risk of frailty, falls, weakened immunity, and slower recovery.';}
    else if(bmi<30){cat='Healthy Weight (Senior Range)';cls='healthy';sub='Your BMI is in the optimal range for adults over 65. Research shows this range has the lowest mortality risk for seniors.';}
    else if(bmi<33){cat='Mildly Overweight (Senior Range)';cls='overweight';sub='Slightly above the senior healthy range. Often manageable with exercise and diet. Discuss with your doctor whether action is needed.';}
    else{cat='Obese (Senior Range)';cls='obese';sub='Above the recommended senior range. Associated with increased health risks. Work with your doctor on a safe, gradual approach that preserves muscle.';}
  }else{
    // Standard for under 65
    if(bmi<18.5){cat='Underweight (Standard)';cls='underweight';sub='Below the standard healthy range.';}
    else if(bmi<25){cat='Normal Weight (Standard)';cls='healthy';sub='Within the standard healthy range. As you approach 65, the healthy range shifts to 23-30.';}
    else if(bmi<30){cat='Overweight (Standard)';cls='overweight';sub='Above the standard range, but note: for adults nearing 65, BMI 25-27 is associated with the lowest mortality.';}
    else{cat='Obese (Standard)';cls='obese';sub='Above the standard healthy range. Discuss management options with your doctor.';}
  }

  // Update result
  document.getElementById('bmi-result').className='bmi-result '+cls;
  document.getElementById('r-bmi').textContent=bmiR;
  document.getElementById('r-cat').textContent=cat;
  document.getElementById('r-sub').textContent=sub;

  // Bar marker (BMI 15-45 mapped to 0-100%)
  var pos=Math.max(2,Math.min(98,((bmi-15)/30)*100));
  document.getElementById('bmi-marker').style.left=pos+'%';

  // Standard vs Senior comparison
  var stdCat,senCat;
  if(bmi<18.5) stdCat='Underweight'; else if(bmi<25) stdCat='Normal'; else if(bmi<30) stdCat='Overweight'; else stdCat='Obese';
  if(bmi<23) senCat='Underweight'; else if(bmi<30) senCat='Healthy'; else if(bmi<33) senCat='Mildly Overweight'; else senCat='Obese';
  document.getElementById('c-std').textContent=stdCat;
  document.getElementById('c-sen').textContent=senCat;

  var cText='';
  if(stdCat==='Overweight'&&senCat==='Healthy'){
    cText='The standard chart calls your BMI "overweight," but for adults over 65, this is actually the HEALTHIEST range. The obesity paradox shows BMI 25-27 has the lowest death rate in seniors. Do NOT try to lose weight to reach a "normal" standard BMI — that would likely make you less healthy.';
  }else if(stdCat==='Normal'&&senCat==='Underweight'){
    cText='The standard chart says you\\'re "normal," but for seniors over 65, your BMI is actually in the UNDERWEIGHT range. A BMI below 23 in seniors is linked to increased frailty, weaker immunity, and higher mortality. Consider increasing calorie and protein intake.';
  }else if(stdCat===senCat||senCat==='Healthy'){
    cText='Both standard and senior charts agree on your classification. Your BMI of '+bmiR+' falls within the range associated with the best health outcomes for adults your age.';
  }else{
    cText='The standard and senior charts classify you differently. For adults over 65, the senior-adjusted ranges are more clinically relevant. Discuss your results with your doctor.';
  }
  document.getElementById('compare-text').textContent=cText;

  // Guidance
  var gTitle=document.getElementById('g-title');
  var gItems=document.getElementById('g-items');
  gItems.innerHTML='';
  var items=[];
  if(cls==='underweight'){
    gTitle.textContent='Action needed — your BMI is below the senior healthy range';
    items=[
      {ic:'🍗',t:'<strong>Increase protein intake</strong> to 1.2g per kg of body weight daily. Add eggs, Greek yogurt, chicken, fish, and protein shakes to your meals.'},
      {ic:'🥑',t:'<strong>Eat calorie-dense healthy foods:</strong> nuts, avocado, olive oil, cheese, whole milk. Aim for 5-6 smaller meals per day instead of 3 large ones.'},
      {ic:'💪',t:'<strong>Start resistance training</strong> 2-3 times per week. Building muscle is the best way to safely increase BMI in seniors.'},
      {ic:'🩺',t:'<strong>See your doctor</strong> to rule out unintentional weight loss causes: thyroid issues, malabsorption, depression, cancer screening, or medication side effects.'},
      {ic:'💊',t:'<strong>Consider supplements:</strong> Vitamin D3+K2 for bone density, protein powder for muscle building, and a senior multivitamin for nutritional gaps.'}
    ];
  }else if(cls==='healthy'){
    gTitle.textContent='Great news — your BMI is in the optimal senior range';
    items=[
      {ic:'✅',t:'<strong>Maintain your current weight.</strong> You\\'re in the range associated with the lowest mortality risk for adults over 65.'},
      {ic:'💪',t:'<strong>Focus on muscle preservation:</strong> 1.0-1.2g protein per kg daily + resistance training 2-3x per week. Muscle matters more than the scale at your age.'},
      {ic:'🚶',t:'<strong>Stay active:</strong> 150 minutes of moderate exercise per week for cardiovascular health and mobility.'},
      {ic:'📋',t:'<strong>Monitor for unintentional weight loss.</strong> If you lose 5%+ without trying, tell your doctor — this is a red flag regardless of BMI.'}
    ];
  }else if(cls==='overweight'){
    gTitle.textContent='Slightly above the senior healthy range';
    items=[
      {ic:'🩺',t:'<strong>Discuss with your doctor</strong> whether weight management is appropriate for your specific health situation.'},
      {ic:'⚠️',t:'<strong>Do NOT crash diet.</strong> Rapid weight loss in seniors destroys muscle. Any weight loss should be gradual (0.5-1 lb per week max) with high protein intake.'},
      {ic:'🏋️',t:'<strong>Prioritize exercise over dieting:</strong> Strength training + walking improves health markers even without weight loss.'},
      {ic:'🥗',t:'<strong>Focus on food quality,</strong> not just calories. Mediterranean diet is strongly linked to better health outcomes for seniors.'}
    ];
  }else{
    gTitle.textContent='Above the recommended senior range — work with your doctor';
    items=[
      {ic:'🩺',t:'<strong>See your doctor</strong> for a comprehensive health assessment. BMI above 33 in seniors increases risks for diabetes, heart disease, and joint problems.'},
      {ic:'⚠️',t:'<strong>Safe weight loss for seniors</strong> means preserving muscle. High protein diet (1.2g/kg) + resistance training is essential during any weight loss plan.'},
      {ic:'💊',t:'<strong>Discuss GLP-1 medications</strong> with your doctor if diet and exercise haven\\'t been sufficient. <a href="/tools/glp1-calculator/" style="color:#7A5F00;font-weight:700">Try our GLP-1 calculator</a> to estimate potential results.'},
      {ic:'🏋️',t:'<strong>Every step helps:</strong> Even without weight loss, exercise improves blood sugar, blood pressure, and joint health. Start with walking 10 minutes after each meal.'}
    ];
  }
  items.forEach(function(it){
    var d=document.createElement('div');d.className='g-item';
    d.innerHTML='<span class="ic">'+it.ic+'</span><span>'+it.t+'</span>';
    gItems.appendChild(d);
  });
  // Supplement link
  var supDiv=document.createElement('div');supDiv.className='g-item';
  supDiv.innerHTML='<span class="ic">🌿</span><span><strong>Related:</strong> See our <a href="/longevity/" style="color:#7A5F00;font-weight:700">longevity supplements</a> and <a href="/joints/" style="color:#7A5F00;font-weight:700">joint &amp; bone supplements</a> for healthy aging support.</span>';
  gItems.appendChild(supDiv);

  document.getElementById('results').classList.add('show');
  setTimeout(function(){document.getElementById('bmi-result').scrollIntoView({behavior:'smooth',block:'center'});},100);
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
.form-group{margin-bottom:20px}.form-label{display:block;font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px}.form-hint{font-size:13px;color:var(--muted);margin-bottom:6px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-select,.form-input{width:100%;padding:14px 16px;border:1.5px solid var(--border);border-radius:10px;font:inherit;font-size:17px;color:var(--text);background:var(--white);min-height:50px;-webkit-appearance:none;appearance:none}
.form-select{background-image:url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23717170' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center;padding-right:40px}
.form-select:focus,.form-input:focus{outline:none;border-color:var(--green);box-shadow:0 0 0 3px rgba(26,86,50,.15)}
.unit-toggle{display:flex;gap:0;margin-bottom:10px;background:#F5F4F1;border-radius:8px;padding:3px;width:fit-content}
.unit-btn{padding:7px 16px;border:none;background:none;font:inherit;font-size:14px;font-weight:600;color:var(--muted);cursor:pointer;border-radius:6px;transition:all .15s}
.unit-btn.active{background:var(--green);color:#fff}
.calc-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,#1A5632,#22703F);color:#fff;border:none;padding:18px 32px;border-radius:12px;font:inherit;font-size:20px;font-weight:700;cursor:pointer;width:100%;min-height:60px;box-shadow:0 4px 14px rgba(26,86,50,.3);transition:transform .1s}.calc-btn:hover{transform:translateY(-1px)}
.results{display:none;margin-top:28px}.results.show{display:block;animation:fadeIn .5s}
@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
/* RESULT */
.bmi-result{border-radius:14px;padding:28px 24px;text-align:center;margin-bottom:24px;border:2px solid var(--border)}
.bmi-result.healthy{background:#F0FAF3;border-color:#A7D8B8}
.bmi-result.underweight{background:#EFF6FF;border-color:#93C5FD}
.bmi-result.overweight{background:#FFFBEB;border-color:#E8D48B}
.bmi-result.obese{background:#FEF2F2;border-color:#F87171}
.bmi-num{font-size:56px;font-weight:700;line-height:1.1}.bmi-cat{font-size:22px;font-weight:700;margin-top:6px}.bmi-sub{font-size:16px;color:var(--t2);margin-top:8px}
.bmi-result.healthy .bmi-num,.bmi-result.healthy .bmi-cat{color:#1A5632}
.bmi-result.underweight .bmi-num,.bmi-result.underweight .bmi-cat{color:#2563EB}
.bmi-result.overweight .bmi-num,.bmi-result.overweight .bmi-cat{color:#B8860B}
.bmi-result.obese .bmi-num,.bmi-result.obese .bmi-cat{color:#C62828}
/* BAR */
.bmi-bar{height:20px;border-radius:10px;background:linear-gradient(90deg,#60A5FA 0%,#60A5FA 18%,#4ADE80 18%,#4ADE80 52%,#FCD34D 52%,#FCD34D 70%,#EF4444 70%);margin:20px 0 6px;position:relative}
.bmi-marker{position:absolute;top:-8px;width:6px;height:36px;background:var(--text);border-radius:3px;transition:left .6s;box-shadow:0 2px 6px rgba(0,0,0,.3)}
.bmi-bar-labels{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);padding:0 2px}
/* COMPARISON */
.compare-box{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:20px 22px;margin:20px 0}
.compare-box h4{font-size:17px;font-weight:700;margin-bottom:12px;color:var(--green)}
.compare-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.compare-card{padding:14px;border-radius:10px;text-align:center;border:1px solid var(--border)}
.compare-card.old{background:#FEF2F2;border-color:#FECACA}.compare-card.new{background:#F0FAF3;border-color:#A7D8B8}
.compare-card h5{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
.compare-card .val{font-size:20px;font-weight:700}.compare-card.old .val{color:#C62828}.compare-card.new .val{color:#1A5632}
.compare-card .label{font-size:13px;color:var(--muted);margin-top:2px}
/* GUIDANCE */
.guidance{background:#FFF8E8;border:2px solid #E8D48B;border-radius:14px;padding:24px;margin:20px 0}
.guidance h4{font-size:19px;font-weight:700;color:#7A5F00;margin-bottom:12px}
.g-item{display:flex;align-items:flex-start;gap:9px;margin-bottom:8px}.g-item .ic{font-size:18px;flex-shrink:0;line-height:1.3}.g-item span{font-size:15px;color:#6D4C00;line-height:1.45}
/* TABLE */
.bmi-table{width:100%;border-collapse:collapse;font-size:15px;margin:20px 0}
.bmi-table th{background:var(--green);color:#fff;padding:12px 14px;text-align:left;font-size:14px}
.bmi-table td{padding:11px 14px;border-bottom:1px solid var(--border)}
.bmi-table tr:nth-child(even) td{background:#FAFAF8}
.bmi-table .you td{background:#F0FAF3;font-weight:700;border-left:3px solid var(--green)}
/* CONTENT */
.content-section{margin:32px 0}.content-section h2{font-size:24px;font-weight:700;margin-bottom:14px}.content-section h3{font-size:20px;font-weight:700;color:var(--green);margin:20px 0 10px}.content-section p{font-size:17px;color:var(--t2);line-height:1.7;margin-bottom:14px}
.faq{margin:36px 0}.faq h2{font-size:24px;font-weight:700;margin-bottom:20px;text-align:center}.faq-item{background:var(--white);border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px}.faq-q{padding:16px 22px;font-size:18px;font-weight:600;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:none;width:100%;text-align:left;font-family:inherit;line-height:1.4}.faq-q:hover{background:#FAFAF8}.faq-icon{font-size:22px;color:var(--muted);flex-shrink:0;transition:transform .2s}.faq-q.active .faq-icon{transform:rotate(45deg)}.faq-a{padding:0 22px 16px;font-size:16px;color:var(--t2);line-height:1.65;display:none}.faq-a.show{display:block}
.related{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin:32px 0}.related h3{font-size:20px;font-weight:700;margin-bottom:16px}.r-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.r-link{display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid var(--border);border-radius:10px;text-decoration:none;color:var(--green);font-weight:600;font-size:16px}.r-link:hover{border-color:#c5c3be}
.disc{background:#F5F4F1;border-radius:var(--r);padding:24px;margin:0 0 40px}.disc h4{font-size:16px;font-weight:700;margin-bottom:8px}.disc p{font-size:14px;color:var(--muted);line-height:1.7}.disc p+p{margin-top:8px}
.sidebar{width:240px;flex-shrink:0;position:sticky;top:70px;display:none}.sidebar-inner{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:18px}.sidebar h4{font-size:15px;font-weight:700;margin-bottom:14px}.sb-link{display:block;padding:8px 10px;border-radius:8px;text-decoration:none;background:#F8FAF8;font-size:14px;font-weight:600;color:var(--green);margin-bottom:6px}.sb-link:hover{background:#E8F5E9}.sb-div{border:none;border-top:1px solid var(--border);margin:12px 0}.sb-sub{font-size:13px;color:var(--muted);margin-top:12px}.sb-sub a{color:var(--green);text-decoration:none;display:block;padding:5px 0;font-weight:600}
@media(min-width:1000px){.sidebar{display:block}}@media(max-width:999px){.main-wrap{max-width:800px}}
.ftr{border-top:1px solid var(--border);background:linear-gradient(180deg,#FAFDFB,#F7F6F3);padding:36px 20px 20px;text-align:center}.ftr-inner{max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px}.ftr-logo{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--text)}.ftr-logo svg{width:22px;height:22px}.ftr-logo span{font-size:22px;font-weight:700}.ftr-logo:hover span{color:var(--green)}.ftr-links{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 20px;list-style:none}.ftr-links a{display:inline-block;padding:8px 4px;text-decoration:none;color:var(--text);font-weight:600;font-size:15px;min-height:44px}.ftr-links a:hover{color:var(--green)}.ftr-btm{max-width:700px;margin:0 auto;padding:14px 20px 8px;text-align:center;border-top:1px dashed #E0DDD8}.ftr-btm p{margin:0 0 4px;color:var(--muted);font-size:14px}
@media(max-width:700px){.page-hero{padding:28px 20px 24px}.page-hero h1{font-size:26px}.calc-card{padding:24px 18px}.form-row{grid-template-columns:1fr}.bmi-num{font-size:42px}.compare-row{grid-template-columns:1fr}.r-grid{grid-template-columns:1fr}.faq-q{font-size:17px;padding:14px 18px}.bmi-table{font-size:13px}.bmi-table th,.bmi-table td{padding:8px 10px}}
      `}</style>
<div className="main-wrap">
<div className="main">

<div className="ad-slot">
<ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="8981383031" data-ad-format="auto" data-full-width-responsive="true"></ins>

</div>

<div className="intro-note"><p><strong>Important:</strong> If your doctor has told you your BMI is "overweight" based on the standard 18.5-25 chart, that may not apply to you. Research published in the <em>American Journal of Clinical Nutrition</em> shows seniors with BMI 25-27 actually have the <strong>lowest mortality rates</strong>. This calculator uses geriatric-specific ranges backed by clinical evidence.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Calculate Your Senior BMI</h2>
<div className="calc-sub">Enter your height, weight, and age for age-adjusted results</div>

<div className="form-group">
<label className="form-label">Your height</label>
<div className="unit-toggle" id="ht-toggle">
<button className="unit-btn active">ft / in</button>
<button className="unit-btn">cm</button>
</div>
<div id="ht-imp" className="form-row">
<div><label className="form-hint">Feet</label><select className="form-select" id="feet"><option value="4">4 ft</option><option value="5" selected>5 ft</option><option value="6">6 ft</option></select></div>
<div><label className="form-hint">Inches</label><select className="form-select" id="inches"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6" selected>6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></select></div>
</div>
<div id="ht-met" style={{"display":"none"}}><label className="form-hint">Centimeters</label><input type="number" className="form-input" id="cm" value="168" min="120" max="220" /></div>
</div>

<div className="form-group">
<label className="form-label">Your weight</label>
<div className="unit-toggle" id="wt-toggle">
<button className="unit-btn active">lbs</button>
<button className="unit-btn">kg</button>
</div>
<input type="number" className="form-input" id="weight" value="170" min="60" max="500" style={{"fontSize":"24px","fontWeight":"700","color":"var(--green)","textAlign":"center"}} />
<div id="wt-hint" style={{"fontSize":"13px","color":"var(--muted)","marginTop":"4px","textAlign":"center"}}>Enter weight in pounds</div>
</div>

<div className="form-row">
<div className="form-group"><label className="form-label">Your age</label>
<select className="form-select" id="age"><option value="58">55-59</option><option value="62">60-64</option><option value="67" selected>65-69</option><option value="72">70-74</option><option value="77">75-79</option><option value="82">80+</option></select></div>
<div className="form-group"><label className="form-label">Sex</label>
<select className="form-select" id="sex"><option value="f">Female</option><option value="m">Male</option></select></div>
</div>

<button className="calc-btn">Calculate My Senior BMI →</button>

<div className="results" id="results">

<div className="bmi-result" id="bmi-result">
<div className="bmi-num" id="r-bmi">26.2</div>
<div className="bmi-cat" id="r-cat">Healthy Weight (Senior Range)</div>
<div className="bmi-sub" id="r-sub">Your BMI falls within the optimal range for adults over 65</div>
</div>

<div className="bmi-bar"><div className="bmi-marker" id="bmi-marker"></div></div>
<div className="bmi-bar-labels"><span>Under 23</span><span>23-30 Healthy</span><span>30-33</span><span>Over 33</span></div>

<div className="compare-box">
<h4>Standard vs Senior BMI — why this matters for you</h4>
<div className="compare-row">
<div className="compare-card old"><h5>Standard Chart Says</h5><div className="val" id="c-std">Overweight</div><div className="label">Based on 18.5-25 range</div></div>
<div className="compare-card new"><h5>Senior Chart Says</h5><div className="val" id="c-sen">Healthy</div><div className="label">Based on 23-30 range</div></div>
</div>
<p id="compare-text" style={{"fontSize":"15px","color":"var(--t2)","lineHeight":"1.6"}}></p>
</div>

<div className="guidance" id="guidance">
<h4 id="g-title">What this means for you</h4>
<div id="g-items"></div>
</div>

<div style={{"margin":"20px 0"}}>
<h3 style={{"fontSize":"19px","fontWeight":"700","marginBottom":"12px"}}>BMI categories: Standard vs Senior (age 65+)</h3>
<table className="bmi-table">
<thead><tr><th>Category</th><th>Standard BMI</th><th>Senior BMI (65+)</th><th>Key difference</th></tr></thead>
<tbody>
<tr><td><strong style={{"color":"#2563EB"}}>Underweight</strong></td><td>&lt; 18.5</td><td>&lt; 23</td><td>Senior threshold much higher</td></tr>
<tr><td><strong style={{"color":"#1A5632"}}>Healthy</strong></td><td>18.5 – 24.9</td><td>23 – 29.9</td><td>Includes "overweight" by standard</td></tr>
<tr><td><strong style={{"color":"#B8860B"}}>Overweight</strong></td><td>25 – 29.9</td><td>30 – 32.9</td><td>Most "overweight" seniors are fine</td></tr>
<tr><td><strong style={{"color":"#C62828"}}>Obese</strong></td><td>≥ 30</td><td>≥ 33</td><td>Threshold raised for seniors</td></tr>
</tbody></table>
<p style={{"fontSize":"13px","color":"var(--muted)","marginTop":"8px"}}>Senior ranges based on meta-analysis by Winter et al. (American Journal of Clinical Nutrition, 2014) and Kıskaç et al. (Annals of Geriatric Medicine and Research).</p>
</div>

</div>
</div>

<div className="ad-slot">
<ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins>

</div>

<div className="content-section">
<h2>Why standard BMI is wrong for seniors over 65</h2>
<p>Body Mass Index was designed in the 1830s by a Belgian mathematician studying young soldiers. It was never meant for older adults. As you age, your body changes in ways that make BMI misleading — and following the standard chart can actually harm your health.</p>

<h3>The obesity paradox — when "overweight" means "healthier"</h3>
<p>Multiple large studies have found that seniors with BMI 25-27 — classified as "overweight" by standard charts — actually live LONGER than those with "normal" BMI of 18.5-25. This phenomenon, called the obesity paradox, exists because extra weight in seniors provides energy reserves during illness, protects against hip fractures from falls, improves recovery from surgeries and hospitalizations, and serves as a buffer against the muscle-wasting effects of chronic disease.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: Winter et al., "BMI and all-cause mortality in older adults: a meta-analysis," American Journal of Clinical Nutrition, 2014. Flicker et al., "Body mass index and survival in men and women aged 70 to 75," Journal of the American Geriatrics Society, 2010. Kıskaç et al., Annals of Geriatric Medicine and Research, 2022.</em></p>

<h3>Muscle loss makes BMI dangerous — the hidden risk</h3>
<p>Sarcopenia — age-related muscle loss — starts in your 30s and accelerates after 65. By age 70, you may have lost up to half your muscle mass. Since muscle weighs more than fat, losing muscle while gaining fat can keep your BMI stable while your actual health deteriorates. A 70-year-old woman with BMI 22 might look "healthy" on paper but could have dangerously low muscle mass — a condition called sarcopenic obesity that dramatically increases fall risk, disability, and death.</p>

<h3>What matters more than BMI for seniors</h3>
<p>While BMI is a quick screening tool, these measurements tell your doctor more about your actual health: <strong>Waist circumference</strong> (men over 40 inches, women over 35 inches indicates high visceral fat risk), <strong>grip strength</strong> (directly predicts disability and mortality in seniors), <strong>walking speed</strong> (slower than 0.8 m/s signals frailty), and <strong>unintentional weight loss</strong> (losing 5%+ of body weight without trying is a red flag at any BMI).</p>

<h3>What seniors should focus on instead of BMI</h3>
<p>Rather than trying to reach a "normal" BMI, seniors benefit far more from: eating adequate protein (1.0-1.2g per kg of body weight daily), resistance training 2-3 times per week to maintain muscle, staying physically active for cardiovascular health, maintaining bone density through Vitamin D3+K2 and weight-bearing exercise, and regular screening for sarcopenia and frailty.</p>
<p><strong>See our doctor-reviewed recommendations:</strong> <a href="/longevity/" style={{"color":"var(--green)","fontWeight":"700"}}>Longevity supplements for healthy aging →</a> | <a href="/joints/" style={{"color":"var(--green)","fontWeight":"700"}}>Joint &amp; bone supplements →</a></p>
</div>

<div className="ad-slot">
<ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins>

</div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">What is a healthy BMI for a 70 year old?<span className="faq-icon">+</span></button><div className="faq-a">For adults over 65, a healthy BMI is 23-30 — different from the 18.5-25 standard range. Research shows seniors with BMI 25-27 have the lowest mortality rates. A BMI below 23 is associated with increased frailty, falls, and death in seniors.</div></div>
<div className="faq-item"><button className="faq-q">Why is standard BMI wrong for seniors?<span className="faq-icon">+</span></button><div className="faq-a">Standard BMI ignores age-related muscle loss, bone density changes, and fat redistribution. A senior can have "normal" BMI but dangerously low muscle mass. The American Journal of Clinical Nutrition confirms different categories are needed for older adults.</div></div>
<div className="faq-item"><button className="faq-q">Is being slightly overweight healthier for seniors?<span className="faq-icon">+</span></button><div className="faq-a">Yes — the "obesity paradox." Multiple studies show seniors with BMI 25-27 have lower death rates than BMI 18.5-22. Extra weight provides illness reserves, protects against hip fractures, and aids surgery recovery. However, BMI above 33 does increase health risks.</div></div>
<div className="faq-item"><button className="faq-q">Should seniors try to lose weight to reach normal BMI?<span className="faq-icon">+</span></button><div className="faq-a">For seniors with BMI 25-30, intentional weight loss is generally NOT recommended unless there are specific obesity-related conditions. Weight loss in seniors often means losing muscle, increasing fall risk and frailty. Focus on strength, fitness, and nutrition instead.</div></div>
<div className="faq-item"><button className="faq-q">How does muscle loss affect BMI in seniors?<span className="faq-icon">+</span></button><div className="faq-a">Sarcopenia makes BMI misleading. You can have "normal" BMI but dangerously low muscle mass hidden by high body fat — called sarcopenic obesity. Grip strength and walking speed are better health indicators than BMI for seniors.</div></div>
<div className="faq-item"><button className="faq-q">What BMI is underweight for seniors?<span className="faq-icon">+</span></button><div className="faq-a">For adults over 65, BMI below 23 is considered underweight — much higher than the standard 18.5 cutoff. Low BMI in seniors is linked to increased mortality, weakened immunity, frailty, and slower recovery from illness.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/longevity/" className="r-link"><span>🧬</span> Longevity supplements</a>
<a href="/joints/" className="r-link"><span>🦴</span> Joint &amp; bone supplements</a>
<a href="/tools/glp1-calculator/" className="r-link"><span>⚖️</span> GLP-1 Calculator</a>
<a href="/tools/bp-checker/" className="r-link"><span>💓</span> BP Checker</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This calculator uses geriatric BMI categories based on published research (Winter et al., AJCN 2014). BMI is a screening tool, not a diagnosis. It cannot distinguish between muscle and fat mass. For a complete health assessment, consult your healthcare provider.</p>
<p>Senior BMI ranges (23-30 healthy) are general guidelines. Your individual health targets depend on your medical history, medications, and overall fitness level.</p></div>

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
