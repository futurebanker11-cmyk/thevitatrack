'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function ProteinCalculatorPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `var wUnit='lbs';
function setWU(u){wUnit=u;document.querySelectorAll('#wt-toggle .unit-btn').forEach(function(b){b.classList.remove('active')});event.target.classList.add('active');var w=document.getElementById('weight');if(u==='kg'){w.value=Math.round(parseFloat(w.value)*0.4536);w.min=30;w.max=230;document.getElementById('wt-hint').textContent='Enter weight in kilograms';}else{w.value=Math.round(parseFloat(w.value)*2.205);w.min=60;w.max=500;document.getElementById('wt-hint').textContent='Enter weight in pounds';}}

function calcProtein(){
  var wt=parseFloat(document.getElementById('weight').value);
  var age=parseInt(document.getElementById('age').value);
  var sex=document.getElementById('sex').value;
  var act=document.getElementById('activity').value;
  var goal=document.getElementById('goal').value;
  if(!wt){alert('Please enter your weight');return;}

  var wtKg=wUnit==='kg'?wt:wt*0.4536;

  // Base protein factor (g per kg)
  var baseLow=1.0, baseHigh=1.2;

  // Adjust for age
  if(age>=75){baseLow+=0.1;baseHigh+=0.1;} // 75+ needs even more
  else if(age>=70){baseLow+=0.05;baseHigh+=0.05;}

  // Adjust for activity
  if(act==='sedentary'){baseHigh-=0.05;}
  else if(act==='moderate'){baseLow+=0.1;baseHigh+=0.1;}
  else if(act==='active'){baseLow+=0.2;baseHigh+=0.2;}

  // Adjust for goal
  var contextText='';
  if(goal==='build'){baseLow=1.2;baseHigh=1.5;contextText='Higher range recommended for muscle building. Combine with resistance training 2-3x per week for best results.';}
  else if(goal==='lose'){baseLow=1.2;baseHigh=1.5;contextText='Higher protein preserves muscle during weight loss. Eat protein first at every meal to maintain fullness and protect muscle mass.';}
  else if(goal==='recover'){baseLow=1.2;baseHigh=1.5;contextText='Recovery from illness or surgery requires significantly more protein. Your body is rebuilding tissue. Aim for the higher end of this range.';}
  else if(goal==='glp1'){baseLow=1.2;baseHigh=1.5;contextText='GLP-1 medications can cause 20-40% muscle loss during weight loss. Eating at the higher protein range plus resistance training is critical to preserve muscle.';}
  else{contextText='This range supports healthy muscle maintenance and prevents sarcopenia. Spread protein evenly across 3 meals for maximum benefit.';}

  // Cap ranges
  baseLow=Math.min(baseLow,1.5);baseHigh=Math.min(baseHigh,1.8);

  var gramsLow=Math.round(wtKg*baseLow);
  var gramsHigh=Math.round(wtKg*baseHigh);
  var gramsTarget=Math.round((gramsLow+gramsHigh)/2);
  var perMeal=Math.round(gramsTarget/3);
  var rda=Math.round(wtKg*0.8);
  var extra=gramsTarget-rda;

  // Update display
  document.getElementById('r-grams').textContent=gramsTarget;
  document.getElementById('r-range').textContent='Recommended range: '+gramsLow+'–'+gramsHigh+'g daily';
  document.getElementById('r-context').textContent=contextText;
  document.getElementById('s-meal').textContent=perMeal+'g';
  document.getElementById('s-rda').textContent=rda+'g';
  document.getElementById('s-extra').textContent='+'+extra+'g';
  document.getElementById('rda-text').textContent='The government RDA of 0.8g/kg gives you just '+rda+'g/day — but current research shows seniors over 60 need '+gramsLow+'-'+gramsHigh+'g daily. That\\'s '+extra+'g MORE than the standard recommendation. At '+rda+'g/day, you are likely losing muscle mass every single day without realizing it.';

  // Build meal plan
  buildMealPlan(gramsTarget,perMeal);

  document.getElementById('results').classList.add('show');
  setTimeout(function(){document.querySelector('.prot-result').scrollIntoView({behavior:'smooth',block:'center'});},100);
}

function buildMealPlan(total,perMeal){
  var c=document.getElementById('meal-items');c.innerHTML='';
  var bkG=perMeal, luG=perMeal, diG=total-bkG-luG;
  var snG=0;
  if(total>90){snG=10;diG-=10;} // Add snack if high protein

  var meals=[
    {icon:'🌅',name:'Breakfast',g:bkG,foods:'2 eggs (12g) + Greek yogurt (15g) + toast'},
    {icon:'☀️',name:'Lunch',g:luG,foods:'Chicken breast (25g) or tuna (20g) + beans + vegetables'},
    {icon:'🌙',name:'Dinner',g:diG,foods:'Salmon/fish (25g) or chicken + cottage cheese (14g)'}
  ];
  if(snG>0) meals.push({icon:'🥜',name:'Snack',g:snG,foods:'Almonds (7g) + glass of milk (8g)'});

  meals.forEach(function(m){
    var row=document.createElement('div');row.className='meal-row';
    row.innerHTML='<span class="meal-icon">'+m.icon+'</span><div><div class="meal-name">'+m.name+'</div><div class="meal-foods">'+m.foods+'</div></div><div class="meal-g">'+m.g+'g</div>';
    c.appendChild(row);
  });

  // Total row
  var tot=document.createElement('div');tot.className='meal-row';
  tot.style.background='#F0FAF3';tot.style.borderRadius='8px';tot.style.padding='14px 12px';tot.style.marginTop='8px';
  tot.innerHTML='<span class="meal-icon">✅</span><div><div class="meal-name">Daily Total</div><div class="meal-foods">Spread evenly — 25-30g per meal is optimal</div></div><div class="meal-g" style="font-size:22px">'+total+'g</div>';
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

<div className="intro-note"><p><strong>Why this matters:</strong> The standard protein recommendation (0.8g per kg) was set for healthy young adults. Research from the PROT-AGE Study Group and the European Society for Clinical Nutrition shows seniors over 65 need <strong>1.0-1.2g per kg daily</strong> — and up to 1.5g/kg if recovering from illness or exercising regularly. Most seniors are eating barely half of what they need.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Calculate Your Daily Protein Target</h2>
<div className="calc-sub">Personalized for your age, weight, activity level, and health goals</div>

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

<div className="form-group"><label className="form-label">Activity level</label>
<select className="form-select" id="activity">
<option value="sedentary">Sedentary (little movement, mostly sitting)</option>
<option value="light" selected>Light (daily walking, light housework)</option>
<option value="moderate">Moderate (exercise 2-3 times/week)</option>
<option value="active">Active (exercise 4-5 times/week, resistance training)</option>
</select></div>

<div className="form-group"><label className="form-label">Health goal</label>
<select className="form-select" id="goal">
<option value="maintain" selected>Maintain muscle and general health</option>
<option value="build">Build muscle / recover from sarcopenia</option>
<option value="lose">Lose weight while preserving muscle</option>
<option value="recover">Recovering from illness, surgery, or hospitalization</option>
<option value="glp1">On GLP-1 medication (Ozempic, Wegovy, Mounjaro)</option>
</select></div>

<button className="calc-btn">Calculate My Protein Target →</button>

<div className="results" id="results">

<div className="prot-result">
<div className="prot-big" id="r-grams">82</div>
<div className="prot-unit">grams per day</div>
<div className="prot-label" id="r-range">Recommended range: 68-82g daily</div>
<div className="prot-sub" id="r-context">Based on 1.0-1.2g per kg for muscle maintenance in adults 65+</div>
</div>

<div className="stats-grid">
<div className="stat-card"><div className="stat-num" id="s-meal">27g</div><div className="stat-label">Per meal (3 meals)</div></div>
<div className="stat-card"><div className="stat-num" id="s-rda">55g</div><div className="stat-label">Standard RDA (too low)</div></div>
<div className="stat-card"><div className="stat-num" id="s-extra">+27g</div><div className="stat-label">Extra you need vs RDA</div></div>
</div>

<div className="compare-note">
<h4>Why the standard RDA is dangerously low for you</h4>
<p id="rda-text">The government RDA of 0.8g/kg gives you just 55g/day — but research shows this is not enough to prevent muscle loss in seniors. You need approximately 27g MORE than the RDA recommends. Most seniors eating standard diets are losing muscle every day without realizing it.</p>
</div>

<div className="meal-plan" id="meal-plan">
<h3>How to hit your target — sample daily plan</h3>
<div id="meal-items"></div>
</div>

<div className="food-list">
<h3>Best protein sources for seniors (easy to digest)</h3>
<div className="food-item"><div><div className="food-name">Eggs (2 large)</div><div className="food-serving">Scrambled, boiled, or poached</div></div><div className="food-g">12g</div></div>
<div className="food-item"><div><div className="food-name">Greek yogurt (1 cup)</div><div className="food-serving">Plain, add fruit for flavor</div></div><div className="food-g">15-20g</div></div>
<div className="food-item"><div><div className="food-name">Chicken breast (4 oz)</div><div className="food-serving">Grilled, baked, or slow-cooked</div></div><div className="food-g">31g</div></div>
<div className="food-item"><div><div className="food-name">Salmon fillet (4 oz)</div><div className="food-serving">Also provides omega-3 for heart + brain</div></div><div className="food-g">25g</div></div>
<div className="food-item"><div><div className="food-name">Cottage cheese (1/2 cup)</div><div className="food-serving">Before bed — slow-digesting casein protein</div></div><div className="food-g">14g</div></div>
<div className="food-item"><div><div className="food-name">Protein powder (1 scoop)</div><div className="food-serving">Whey or plant-based, in smoothie or water</div></div><div className="food-g">20-30g</div></div>
<div className="food-item"><div><div className="food-name">Canned tuna (3 oz)</div><div className="food-serving">On toast, in salad, or with crackers</div></div><div className="food-g">20g</div></div>
<div className="food-item"><div><div className="food-name">Black beans (1/2 cup)</div><div className="food-serving">With rice for complete protein</div></div><div className="food-g">8g</div></div>
<div className="food-item"><div><div className="food-name">Milk (1 glass, 8oz)</div><div className="food-serving">Whole milk provides extra calories if underweight</div></div><div className="food-g">8g</div></div>
<div className="food-item"><div><div className="food-name">Almonds (1/4 cup)</div><div className="food-serving">Snack — also provides healthy fats and vitamin E</div></div><div className="food-g">7g</div></div>
</div>

</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="1775331881" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Why seniors need more protein than younger adults</h2>
<p>After age 60, your body becomes less efficient at turning dietary protein into muscle — a phenomenon called anabolic resistance. The same 20g of protein that builds muscle effectively in a 30-year-old produces significantly less muscle protein synthesis in a 70-year-old. To compensate, you need to eat more protein at each meal.</p>

<h3>Sarcopenia — the silent muscle thief</h3>
<p>Starting in your 30s, you lose 3-8% of muscle mass per decade. After 60, the rate accelerates dramatically. By age 70, many adults have lost 30-40% of their peak muscle mass. This condition — called sarcopenia — increases fall risk, reduces independence, weakens your immune system, and is one of the strongest predictors of mortality in seniors. Adequate protein intake is the single most important dietary factor for slowing sarcopenia.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Source: Bauer et al., "Evidence-based recommendations for optimal dietary protein intake in older people," Journal of the American Medical Directors Association, 2013. PROT-AGE Study Group.</em></p>

<h3>The 25-30g per meal rule</h3>
<p>Your body can only use about 25-40g of protein per meal for muscle building — this is called the "muscle full" effect. Eating 60g at dinner and 10g at breakfast is far less effective than eating 30g at each of three meals. Research from the University of Texas found that seniors who spread protein evenly across meals built significantly more muscle than those who loaded protein at dinner.</p>

<h3>Protein timing for seniors on GLP-1 medications</h3>
<p>If you're taking Ozempic, Wegovy, or Mounjaro, protein becomes even more critical. GLP-1 drugs reduce appetite, making it easy to under-eat protein. Studies show 20-40% of weight lost on GLP-1 medications can be lean muscle. Prioritize protein at every meal — eat protein FIRST before vegetables or carbs, especially when appetite is low. Aim for the higher end of the range: 1.2-1.5g per kg.</p>
<p><strong>Related:</strong> <a href="/tools/glp1-calculator/" style={{"color":"var(--green)","fontWeight":"700"}}>Calculate your GLP-1 weight loss projection →</a></p>

<h3>Protein and kidney health — the myth</h3>
<p>Many seniors worry that high protein intake damages kidneys. For healthy seniors, this is a myth — research consistently shows protein intake up to 1.5g/kg does NOT harm kidneys with normal function. However, seniors with advanced kidney disease (GFR below 30) should work with their nephrologist on protein targets. If your kidney function is normal, do not restrict protein based on outdated fears.</p>
<p><strong>Related:</strong> <a href="/kidney/" style={{"color":"var(--green)","fontWeight":"700"}}>Kidney health supplements for seniors →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">How much protein does a 70 year old need per day?<span className="faq-icon">+</span></button><div className="faq-a">A 70-year-old needs 1.0-1.2g protein per kg body weight daily. For a 150 lb senior, that's 68-82g per day. If recovering from illness or doing resistance training, aim for 1.2-1.5g/kg. This is significantly more than the standard 0.8g/kg RDA.</div></div>
<div className="faq-item"><button className="faq-q">Why do seniors need more protein than younger adults?<span className="faq-icon">+</span></button><div className="faq-a">Seniors develop "anabolic resistance" — muscles become less efficient at using protein. The same protein amount that maintains muscle at 30 is insufficient at 70. Combined with sarcopenia (age-related muscle loss), higher intake is essential to prevent frailty.</div></div>
<div className="faq-item"><button className="faq-q">What are the best protein sources for seniors?<span className="faq-icon">+</span></button><div className="faq-a">Eggs (12g per 2), Greek yogurt (15-20g per cup), chicken breast (31g per 4oz), salmon (25g per 4oz), cottage cheese (14g per half cup), and protein powder (20-30g per scoop). Spread protein evenly across 3-4 meals for maximum benefit.</div></div>
<div className="faq-item"><button className="faq-q">Can seniors eat too much protein?<span className="faq-icon">+</span></button><div className="faq-a">For healthy seniors, up to 1.5g/kg is safe. Seniors with severe kidney disease (GFR below 30) may need limits — consult your nephrologist. For most seniors, the bigger risk is eating too LITTLE protein.</div></div>
<div className="faq-item"><button className="faq-q">Do seniors on GLP-1 medications need extra protein?<span className="faq-icon">+</span></button><div className="faq-a">Yes — aim for 1.2-1.5g/kg. GLP-1 drugs cause weight loss that can include 20-40% muscle mass. Eat protein first at every meal, especially when appetite is low. Combine with resistance training 2-3 times per week.</div></div>
<div className="faq-item"><button className="faq-q">How should seniors distribute protein across meals?<span className="faq-icon">+</span></button><div className="faq-a">Aim for 25-30g per meal across 3 meals. This is more effective than eating most protein at dinner. Your body can only use about 30-40g per meal for muscle building — the "muscle full" effect.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/longevity/" className="r-link"><span>🧬</span> Longevity supplements</a>
<a href="/joints/" className="r-link"><span>🦴</span> Joint supplements</a>
<a href="/tools/glp1-calculator/" className="r-link"><span>⚖️</span> GLP-1 Calculator</a>
<a href="/tools/bmi-senior/" className="r-link"><span>📊</span> BMI Calculator</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This calculator provides estimates based on published research from the PROT-AGE Study Group and European Society for Clinical Nutrition. Individual protein needs vary based on kidney function, medical conditions, and medications. Seniors with kidney disease (GFR below 30) should consult their nephrologist before increasing protein intake.</p>
<p>This tool is for educational purposes only and does not replace professional dietary advice.</p></div>

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
