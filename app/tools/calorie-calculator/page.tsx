'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function CalorieCalculatorPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `var hUnit='imp',wUnit='lbs';
function setHU(u){hUnit=u;document.querySelectorAll('#ht-toggle .unit-btn').forEach(function(b){b.classList.remove('active')});event.target.classList.add('active');document.getElementById('ht-imp').style.display=u==='imp'?'grid':'none';document.getElementById('ht-met').style.display=u==='met'?'block':'none';}
function setWU(u){wUnit=u;document.querySelectorAll('#wt-toggle .unit-btn').forEach(function(b){b.classList.remove('active')});event.target.classList.add('active');var w=document.getElementById('weight');if(u==='kg'){w.value=Math.round(parseFloat(w.value)*0.4536);w.min=30;w.max=230;document.getElementById('wt-hint').textContent='Enter weight in kilograms';}else{w.value=Math.round(parseFloat(w.value)*2.205);w.min=60;w.max=500;document.getElementById('wt-hint').textContent='Enter weight in pounds';}}

function calcCalories(){
  var age=parseInt(document.getElementById('age').value);
  var sex=document.getElementById('sex').value;
  var wt=parseFloat(document.getElementById('weight').value);
  var actFactor=parseFloat(document.getElementById('activity').value);
  var goal=document.getElementById('goal').value;
  if(!wt){alert('Please enter your weight');return;}

  // Convert to metric
  var wtKg=wUnit==='kg'?wt:wt*0.4536;
  var htCm;
  if(hUnit==='met'){htCm=parseFloat(document.getElementById('cm').value);}
  else{htCm=(parseInt(document.getElementById('feet').value)*12+parseInt(document.getElementById('inches').value))*2.54;}
  if(!htCm||htCm<120||htCm>220){alert('Please enter a valid height');return;}

  // Mifflin-St Jeor BMR
  var bmr;
  if(sex==='m'){bmr=(10*wtKg)+(6.25*htCm)-(5*age)+5;}
  else{bmr=(10*wtKg)+(6.25*htCm)-(5*age)-161;}

  // Senior adjustment: additional 2-5% reduction for age-related metabolic slowdown
  if(age>=80) bmr*=0.92;
  else if(age>=75) bmr*=0.94;
  else if(age>=70) bmr*=0.96;
  else if(age>=65) bmr*=0.98;

  bmr=Math.round(bmr);
  var tdee=Math.round(bmr*actFactor);

  // Goal adjustment
  var target=tdee;
  var label='Your daily calorie target for weight maintenance';
  var resultCls='';
  if(goal==='gentle-loss'){
    target=tdee-250; // 250 cal deficit = ~0.5 lb/week (safe for seniors)
    label='Your target for gentle weight loss (0.5 lb/week)';
    resultCls='deficit';
  }else if(goal==='muscle'){
    target=tdee+150; // Slight surplus for muscle building
    label='Your target for muscle building (slight surplus)';
  }else if(goal==='glp1'){
    target=tdee; // Maintain TDEE to prevent muscle loss
    label='Your minimum target on GLP-1 medication — do NOT eat less';
  }

  // Safe minimums
  var minCal=sex==='m'?1500:1200;
  var isDanger=false;
  if(target<minCal){
    isDanger=true;
    target=minCal;
    label='Safety floor applied — '+minCal+' calories is the minimum for '+((sex==='m')?'men':'women');
    resultCls='danger';
  }

  // Macros (senior-optimized: 28% protein, 42% carbs, 30% fat)
  var proteinG=Math.round(wtKg*1.1); // 1.1g/kg for seniors
  var proteinCal=proteinG*4;
  var fatCal=Math.round(target*0.30);
  var fatG=Math.round(fatCal/9);
  var carbCal=target-proteinCal-fatCal;
  var carbG=Math.round(carbCal/4);
  if(carbG<0){carbG=Math.round(target*0.35/4);carbCal=carbG*4;fatCal=target-proteinCal-carbCal;fatG=Math.round(fatCal/9);}

  var protPct=Math.round(proteinCal/target*100);
  var carbPct=Math.round(carbCal/target*100);
  var fatPct=100-protPct-carbPct;

  // RDA protein for comparison
  var rdaProtein=Math.round(wtKg*0.8);

  // Update display
  document.getElementById('r-cals').textContent=target.toLocaleString();
  document.getElementById('r-label').textContent=label;
  var cr=document.getElementById('cal-result');
  cr.className='cal-result'+(resultCls?' '+resultCls:'');

  document.getElementById('s-bmr').textContent=bmr.toLocaleString();
  document.getElementById('s-tdee').textContent=tdee.toLocaleString();
  document.getElementById('s-protein').textContent=proteinG+'g';

  // Macro bar
  document.getElementById('bar-prot').style.width=protPct+'%';document.getElementById('bar-prot').textContent='Protein '+protPct+'%';
  document.getElementById('bar-carb').style.width=carbPct+'%';document.getElementById('bar-carb').textContent='Carbs '+carbPct+'%';
  document.getElementById('bar-fat').style.width=fatPct+'%';document.getElementById('bar-fat').textContent='Fat '+fatPct+'%';
  document.getElementById('lbl-prot').textContent='Protein: '+proteinG+'g ('+proteinCal+' cal)';
  document.getElementById('lbl-carb').textContent='Carbs: '+carbG+'g ('+carbCal+' cal)';
  document.getElementById('lbl-fat').textContent='Fat: '+fatG+'g ('+fatCal+' cal)';

  // Danger warning
  var dw=document.getElementById('danger-warn');
  if(isDanger){
    dw.style.display='block';
    document.getElementById('danger-text').textContent='Your calculated target fell below the safe minimum of '+minCal+' calories. We\\'ve raised it to '+minCal+' to prevent malnutrition and dangerous muscle loss. If you need to eat fewer calories for medical reasons, work with a registered dietitian.';
  }else{dw.style.display='none';}

  // Compare text
  document.getElementById('compare-text').textContent='Your BMR — calories burned just lying in bed — is '+bmr.toLocaleString()+'. With your activity level, your total daily energy expenditure (TDEE) is '+tdee.toLocaleString()+' calories. '+(goal==='gentle-loss'?'For gentle weight loss, we subtract just 250 calories (not 500+ like generic calculators recommend) to protect your muscle mass.':goal==='muscle'?'For muscle building, we add a modest 150-calorie surplus combined with high protein.':goal==='glp1'?'On GLP-1 medication, your goal is to eat AT LEAST this much to prevent dangerous muscle loss from under-eating.':'For weight maintenance, aim for approximately '+target.toLocaleString()+' calories per day.');

  // Age note
  var ageText='';
  if(age>=75) ageText='At 75+, your metabolism has slowed significantly. Nutritional density matters more than ever — every calorie should deliver maximum nutrients. Focus on protein-rich foods, colorful vegetables, and healthy fats. Consider a senior multivitamin to fill gaps.';
  else if(age>=70) ageText='At 70-74, maintaining muscle is your #1 nutrition priority. Your protein target of '+proteinG+'g/day is higher than the outdated RDA of '+rdaProtein+'g because research shows seniors need 25-50% more protein to maintain muscle.';
  else if(age>=65) ageText='At 65-69, your metabolism is 5-10% slower than at 55. The difference is mostly due to muscle loss — which is why strength training and adequate protein are more important than calorie counting for healthy aging.';
  else ageText='At 55-64, you\\'re approaching the age where metabolic decline becomes noticeable. Now is the ideal time to establish habits: resistance training, adequate protein, and nutrient-dense eating will protect your metabolism for decades to come.';
  document.getElementById('age-note').textContent=ageText;

  // Meal timing
  buildMeals(target,proteinG);

  document.getElementById('results').classList.add('show');
  setTimeout(function(){document.getElementById('cal-result').scrollIntoView({behavior:'smooth',block:'center'});},100);
}

function buildMeals(cals,prot){
  var c=document.getElementById('meal-items');c.innerHTML='';
  var bkCal=Math.round(cals*0.30),luCal=Math.round(cals*0.35),diCal=Math.round(cals*0.30);
  var snCal=cals-bkCal-luCal-diCal;
  var bkP=Math.round(prot*0.30),luP=Math.round(prot*0.35),diP=Math.round(prot*0.30),snP=prot-bkP-luP-diP;

  var meals=[
    {icon:'🌅',name:'Breakfast (30%)',cal:bkCal,prot:bkP,foods:'Eggs, Greek yogurt, oatmeal, whole grain toast'},
    {icon:'☀️',name:'Lunch (35%)',cal:luCal,prot:luP,foods:'Chicken/fish, vegetables, beans, whole grains'},
    {icon:'🌙',name:'Dinner (30%)',cal:diCal,prot:diP,foods:'Salmon, lean meat, vegetables, sweet potato'},
  ];
  if(snCal>50) meals.push({icon:'🥜',name:'Snack (5%)',cal:snCal,prot:snP,foods:'Nuts, cottage cheese, fruit, protein shake'});

  meals.forEach(function(m){
    var row=document.createElement('div');row.className='meal-row';
    row.innerHTML='<span class="meal-icon">'+m.icon+'</span><div><div class="meal-name">'+m.name+'</div><div class="meal-foods">'+m.foods+'</div></div><div class="meal-g">'+m.cal+' cal<br><small style="color:var(--green)">'+m.prot+'g protein</small></div>';
    c.appendChild(row);
  });
  var tot=document.createElement('div');tot.className='meal-row';
  tot.style.cssText='background:#F0FAF3;border-radius:8px;padding:14px 12px;margin-top:8px';
  tot.innerHTML='<span class="meal-icon">✅</span><div><div class="meal-name">Daily Total</div><div class="meal-foods">Protein spread evenly — 25-30g per meal for best absorption</div></div><div class="meal-g" style="font-size:20px">'+cals.toLocaleString()+' cal<br><small style="color:var(--green)">'+prot+'g protein</small></div>';
  c.appendChild(tot);
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
.prot-result{background:#F0FAF3;border:2px solid #A7D8B8;border-radius:14px;padding:28px 24px;text-align:center;margin-bottom:24px}
.prot-big{font-size:56px;font-weight:700;color:var(--green);line-height:1.1}.prot-unit{font-size:22px;font-weight:600;color:var(--green)}.prot-label{font-size:16px;color:var(--t2);margin-top:4px}.prot-sub{font-size:15px;color:var(--muted);margin-top:8px}
.stats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:20px 0}
.stat-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}
.stat-num{font-size:24px;font-weight:700;line-height:1.2;color:var(--green)}.stat-label{font-size:13px;color:var(--muted);margin-top:4px}
.meal-plan{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:24px;margin:20px 0}
.meal-plan h3{font-size:19px;font-weight:700;margin-bottom:16px;color:var(--green)}
.meal-row{display:grid;grid-template-columns:auto 1fr auto;gap:12px;padding:14px 0;border-bottom:1px solid var(--border);align-items:center}
.meal-row:last-child{border:none}
.meal-icon{font-size:24px}.meal-name{font-weight:600}.meal-foods{font-size:14px;color:var(--t2)}.meal-g{font-size:18px;font-weight:700;color:var(--green);text-align:right;white-space:nowrap}
.food-list{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:24px;margin:20px 0}
.food-list h3{font-size:19px;font-weight:700;margin-bottom:16px}
.food-item{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #F5F4F1}
.food-item:last-child{border:none}
.food-name{font-size:16px;font-weight:600;color:var(--text)}.food-serving{font-size:13px;color:var(--muted)}.food-g{font-size:16px;font-weight:700;color:var(--green)}
.compare-note{background:#FFFBEB;border:2px solid #E8D48B;border-radius:14px;padding:24px;margin:20px 0}
.compare-note h4{font-size:19px;font-weight:700;color:#7A5F00;margin-bottom:12px}
.compare-note p{font-size:15px;color:#6D4C00;line-height:1.6;margin-bottom:8px}
.content-section{margin:32px 0}.content-section h2{font-size:24px;font-weight:700;margin-bottom:14px}.content-section h3{font-size:20px;font-weight:700;color:var(--green);margin:20px 0 10px}.content-section p{font-size:17px;color:var(--t2);line-height:1.7;margin-bottom:14px}
.faq{margin:36px 0}.faq h2{font-size:24px;font-weight:700;margin-bottom:20px;text-align:center}.faq-item{background:var(--white);border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px}.faq-q{padding:16px 22px;font-size:18px;font-weight:600;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:none;width:100%;text-align:left;font-family:inherit;line-height:1.4}.faq-q:hover{background:#FAFAF8}.faq-icon{font-size:22px;color:var(--muted);flex-shrink:0;transition:transform .2s}.faq-q.active .faq-icon{transform:rotate(45deg)}.faq-a{padding:0 22px 16px;font-size:16px;color:var(--t2);line-height:1.65;display:none}.faq-a.show{display:block}
.related{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin:32px 0}.related h3{font-size:20px;font-weight:700;margin-bottom:16px}.r-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.r-link{display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid var(--border);border-radius:10px;text-decoration:none;color:var(--green);font-weight:600;font-size:16px}.r-link:hover{border-color:#c5c3be}
.disc{background:#F5F4F1;border-radius:var(--r);padding:24px;margin:0 0 40px}.disc h4{font-size:16px;font-weight:700;margin-bottom:8px}.disc p{font-size:14px;color:var(--muted);line-height:1.7}.disc p+p{margin-top:8px}
.sidebar{width:240px;flex-shrink:0;position:sticky;top:70px;display:none}.sidebar-inner{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:18px}.sidebar h4{font-size:15px;font-weight:700;margin-bottom:14px}.sb-link{display:block;padding:8px 10px;border-radius:8px;text-decoration:none;background:#F8FAF8;font-size:14px;font-weight:600;color:var(--green);margin-bottom:6px}.sb-link:hover{background:#E8F5E9}.sb-div{border:none;border-top:1px solid var(--border);margin:12px 0}.sb-sub{font-size:13px;color:var(--muted);margin-top:12px}.sb-sub a{color:var(--green);text-decoration:none;display:block;padding:5px 0;font-weight:600}
@media(min-width:1000px){.sidebar{display:block}}@media(max-width:999px){.main-wrap{max-width:800px}}
.ftr{border-top:1px solid var(--border);background:linear-gradient(180deg,#FAFDFB,#F7F6F3);padding:36px 20px 20px;text-align:center}.ftr-inner{max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px}.ftr-logo{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--text)}.ftr-logo svg{width:22px;height:22px}.ftr-logo span{font-size:22px;font-weight:700}.ftr-logo:hover span{color:var(--green)}.ftr-links{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 20px;list-style:none}.ftr-links a{display:inline-block;padding:8px 4px;text-decoration:none;color:var(--text);font-weight:600;font-size:15px;min-height:44px}.ftr-links a:hover{color:var(--green)}.ftr-btm{max-width:700px;margin:0 auto;padding:14px 20px 8px;text-align:center;border-top:1px dashed #E0DDD8}.ftr-btm p{margin:0 0 4px;color:var(--muted);font-size:14px}
@media(max-width:700px){.page-hero{padding:28px 20px 24px}.page-hero h1{font-size:26px}.calc-card{padding:24px 18px}.form-row{grid-template-columns:1fr}.stats-grid{grid-template-columns:1fr}.prot-big{font-size:42px}.meal-row{grid-template-columns:auto 1fr;gap:8px}.meal-g{grid-column:1/-1;text-align:left}.r-grid{grid-template-columns:1fr}.faq-q{font-size:17px;padding:14px 18px}}
      `}</style>
<div className="main-wrap">
<div className="main">

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="8981383031" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="intro-note"><p><strong>Warning for seniors:</strong> Unlike younger adults, aggressive calorie cutting after 60 is dangerous. It accelerates muscle loss (sarcopenia), weakens bones, and increases fall risk. Never go below <strong>1,200 calories (women)</strong> or <strong>1,500 calories (men)</strong> per day without medical supervision. This calculator includes safe minimum floors.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Calculate Your Daily Calorie Needs</h2>
<div className="calc-sub">Uses the Mifflin-St Jeor formula with senior-specific adjustments</div>

<div className="form-row">
<div className="form-group"><label className="form-label">Age</label>
<select className="form-select" id="age"><option value="57">55-59</option><option value="62">60-64</option><option value="67" selected>65-69</option><option value="72">70-74</option><option value="77">75-79</option><option value="82">80+</option></select></div>
<div className="form-group"><label className="form-label">Sex</label>
<select className="form-select" id="sex"><option value="f">Female</option><option value="m">Male</option></select></div>
</div>

<div className="form-group">
<label className="form-label">Height</label>
<div className="unit-toggle" id="ht-toggle">
<button className="unit-btn active">ft / in</button>
<button className="unit-btn">cm</button>
</div>
<div id="ht-imp" className="form-row">
<div><select className="form-select" id="feet"><option value="4">4 ft</option><option value="5" selected>5 ft</option><option value="6">6 ft</option></select></div>
<div><select className="form-select" id="inches"><option value="0">0 in</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6" selected>6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></select></div>
</div>
<div id="ht-met" style={{"display":"none"}}><input type="number" className="form-input" id="cm" value="168" min="120" max="220" style={{"textAlign":"center","fontSize":"20px","fontWeight":"700"}} /></div>
</div>

<div className="form-group">
<label className="form-label">Weight</label>
<div className="unit-toggle" id="wt-toggle">
<button className="unit-btn active">lbs</button>
<button className="unit-btn">kg</button>
</div>
<input type="number" className="form-input" id="weight" value="170" min="60" max="500" style={{"fontSize":"24px","fontWeight":"700","color":"var(--green)","textAlign":"center"}} />
<div id="wt-hint" style={{"fontSize":"13px","color":"var(--muted)","marginTop":"4px","textAlign":"center"}}>Enter weight in pounds</div>
</div>

<div className="form-group"><label className="form-label">Activity level</label>
<select className="form-select" id="activity">
<option value="1.2">Sedentary (mostly sitting, little movement)</option>
<option value="1.375" selected>Light (daily walking, light housework)</option>
<option value="1.55">Moderate (exercise 2-3 times/week, 30+ min)</option>
<option value="1.725">Active (exercise 4-5 times/week, vigorous)</option>
</select></div>

<div className="form-group"><label className="form-label">Your goal</label>
<select className="form-select" id="goal">
<option value="maintain" selected>Maintain current weight</option>
<option value="gentle-loss">Gentle weight loss (0.5 lb/week — safe for seniors)</option>
<option value="muscle">Build/maintain muscle</option>
<option value="glp1">On GLP-1 medication (ensure adequate intake)</option>
</select></div>

<button className="calc-btn">Calculate My Daily Calories →</button>

<div className="results" id="results">

<div className="cal-result" id="cal-result">
<div className="cal-big" id="r-cals">1,850</div>
<div className="cal-unit">calories per day</div>
<div className="cal-label" id="r-label">Your daily calorie target for weight maintenance</div>
</div>

<div id="danger-warn" className="warn-box" style={{"display":"none"}}>
<strong>⚠️ Safety Warning</strong>
<span id="danger-text"></span>
</div>

<div className="stats-grid">
<div className="stat-card"><div className="stat-num" id="s-bmr">1,420</div><div className="stat-label">Your BMR (resting burn)</div></div>
<div className="stat-card"><div className="stat-num" id="s-tdee">1,953</div><div className="stat-label">TDEE (total daily burn)</div></div>
<div className="stat-card"><div className="stat-num" id="s-protein">82g</div><div className="stat-label">Protein target</div></div>
</div>

<div style={{"margin":"20px 0"}}>
<h3 style={{"fontSize":"17px","fontWeight":"700","marginBottom":"8px"}}>Your macronutrient breakdown</h3>
<div className="macro-bar"><div className="prot" id="bar-prot" style={{"width":"30%"}}>Protein</div><div className="carb" id="bar-carb" style={{"width":"40%"}}>Carbs</div><div className="fat" id="bar-fat" style={{"width":"30%"}}>Fat</div></div>
<div className="macro-labels"><span id="lbl-prot">Protein: 82g (328 cal)</span><span id="lbl-carb">Carbs: 185g (740 cal)</span><span id="lbl-fat">Fat: 62g (558 cal)</span></div>
</div>

<div className="compare-note">
<h4>How your calorie need compares</h4>
<p id="compare-text">Your BMR — calories burned just lying in bed — is 1,420. With your light activity level, your total daily energy expenditure (TDEE) is 1,953 calories. For weight maintenance, your target is 1,850 calories per day.</p>
<p id="age-note" style={{"marginTop":"8px"}}></p>
</div>

<div className="meal-plan">
<h3>Sample meal timing for seniors</h3>
<div id="meal-items"></div>
</div>

</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="1775331881" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>How calorie needs change after 60</h2>
<p>Your body's calorie requirements decrease as you age, but not as much as most people think — and cutting too aggressively is one of the most dangerous nutrition mistakes seniors make. Understanding your actual needs helps you stay nourished, maintain muscle, and avoid the malnutrition that affects over 50% of hospitalized elderly patients.</p>

<h3>Why your metabolism slows — and what you can do about it</h3>
<p>Basal metabolic rate drops approximately 10% per decade after age 60. The primary reason is sarcopenia — the loss of metabolically active muscle tissue. Muscle burns more calories at rest than fat, so as muscle mass declines, your resting calorie burn decreases. This is why resistance training is the single best strategy for maintaining metabolism as you age. Seniors who do strength training 2-3 times per week have measurably higher BMR than sedentary seniors of the same age and weight.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Source: Mifflin MD et al., "A new predictive equation for resting energy expenditure in healthy individuals," American Journal of Clinical Nutrition, 1990. Dietary Guidelines for Americans 2020-2025, USDA.</em></p>

<h3>The danger of eating too few calories after 60</h3>
<p>When seniors cut calories too aggressively (below 1,200 for women or 1,500 for men), the body responds by burning muscle for fuel — not just fat. This creates a devastating cycle: less muscle leads to lower metabolism, which leads to more fat storage, which leads to more calorie cutting, which leads to more muscle loss. Within 6-12 months of aggressive dieting, a senior can lose significant functional muscle, increasing fall risk and reducing independence. This is why our calculator includes safe minimum floors that cannot be overridden.</p>

<h3>Calorie needs on GLP-1 medications</h3>
<p>Seniors taking Ozempic, Wegovy, or Mounjaro face a unique challenge: the drugs suppress appetite so effectively that many unknowingly eat 800-1,000 calories per day — far below the safe minimum. This causes rapid muscle loss alongside fat loss. If you're on a GLP-1 medication, tracking calories is essential to ensure you're eating ENOUGH, not too little. Our calculator flags when your intake drops below safe thresholds.</p>
<p><strong>Related:</strong> <a href="/tools/glp1-calculator/" style={{"color":"var(--green)","fontWeight":"700"}}>GLP-1 Weight Loss Calculator →</a> | <a href="/tools/protein-calculator/" style={{"color":"var(--green)","fontWeight":"700"}}>Protein Calculator for Seniors →</a></p>

<h3>Protein: the one macronutrient seniors can't compromise on</h3>
<p>Regardless of calorie target, seniors must maintain adequate protein intake (1.0-1.2g per kg body weight) to prevent muscle loss. This means the proportion of calories from protein should be higher for seniors (25-30%) compared to younger adults (15-20%). Our calculator automatically adjusts macronutrient ratios to prioritize protein at your calorie level.</p>
<p><strong>See our full guide:</strong> <a href="/longevity/" style={{"color":"var(--green)","fontWeight":"700"}}>Longevity supplements →</a> | <a href="/joints/" style={{"color":"var(--green)","fontWeight":"700"}}>Joint &amp; bone supplements →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">How many calories should a 70 year old eat per day?<span className="faq-icon">+</span></button><div className="faq-a">A moderately active 70-year-old woman needs approximately 1,600-1,800 calories/day, while a man needs about 2,000-2,200. Sedentary seniors need 200-400 fewer. Individual needs vary — use the calculator above for a personalized estimate based on your height, weight, and activity level.</div></div>
<div className="faq-item"><button className="faq-q">Why do seniors need fewer calories?<span className="faq-icon">+</span></button><div className="faq-a">BMR drops ~10% per decade after 60 due to muscle loss, reduced organ mass, and hormonal changes. But seniors should NOT drastically cut calories — this accelerates muscle loss. Focus on nutrient-dense foods and maintain protein intake at 1.0-1.2g per kg body weight.</div></div>
<div className="faq-item"><button className="faq-q">Should seniors count calories to lose weight?<span className="faq-icon">+</span></button><div className="faq-a">Weight loss in seniors requires extreme caution. Never cut more than 500 calories below TDEE. Never go below 1,200 (women) or 1,500 (men). Focus on nutrition quality and exercise rather than aggressive restriction. Weight loss should be maximum 0.5 lb per week to preserve muscle.</div></div>
<div className="faq-item"><button className="faq-q">What is BMR and why does it matter?<span className="faq-icon">+</span></button><div className="faq-a">BMR (Basal Metabolic Rate) is calories burned at complete rest — breathing, circulating blood, maintaining body temperature. It accounts for 60-75% of daily calorie burn. Seniors have lower BMR due to muscle loss, which is why strength training is critical for maintaining metabolism.</div></div>
<div className="faq-item"><button className="faq-q">Do seniors on GLP-1 medications need to track calories?<span className="faq-icon">+</span></button><div className="faq-a">Yes — to ensure you eat ENOUGH. GLP-1 drugs suppress appetite so effectively that many seniors drop to 800-1,000 calories unknowingly, causing dangerous muscle loss. Track calories to stay above 1,200 (women) / 1,500 (men) minimum.</div></div>
<div className="faq-item"><button className="faq-q">What macronutrient ratio is best for seniors?<span className="faq-icon">+</span></button><div className="faq-a">Seniors should aim for approximately 25-30% protein, 40-45% carbohydrates, and 25-30% fat. The higher protein proportion (vs 15-20% for younger adults) is essential for preventing sarcopenia. Prioritize protein first, then fill remaining calories with healthy fats and complex carbs.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/tools/protein-calculator/" className="r-link"><span>🥩</span> Protein Calculator</a>
<a href="/tools/bmi-senior/" className="r-link"><span>📊</span> BMI Calculator</a>
<a href="/tools/glp1-calculator/" className="r-link"><span>⚖️</span> GLP-1 Calculator</a>
<a href="/longevity/" className="r-link"><span>🧬</span> Longevity supplements</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This calculator uses the Mifflin-St Jeor equation with senior-specific adjustments. Results are estimates — individual needs vary based on medical conditions, medications, and body composition. Seniors with chronic kidney disease, diabetes, heart failure, or other conditions should work with a registered dietitian for personalized guidance.</p>
<p>Never reduce calorie intake below 1,200 (women) or 1,500 (men) without medical supervision.</p></div>

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
