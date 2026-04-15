'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function SupplementBudgetPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `function toggleGoal(btn){btn.classList.toggle('selected');}

function buildStack(){
  var goals=[];
  document.querySelectorAll('.goal-btn.selected').forEach(function(b){goals.push(b.dataset.goal);});
  if(goals.length===0){alert('Please select at least one health goal');return;}
  var budget=parseInt(document.getElementById('budget').value);

  // Master supplement database with priority, cost, and goal mapping
  var supps=[
    // FOUNDATION (everyone)
    {name:'Vitamin D3 + K2',dose:'2,000-4,000 IU daily',cost:10,tier:'essential',why:'Over 40% of seniors are deficient. Supports bones, immunity, and muscle strength.',goals:['all'],link:'/longevity/'},
    {name:'Magnesium Glycinate',dose:'400mg daily, before bed',cost:12,tier:'essential',why:'Supports 300+ body functions: sleep, muscle, BP, blood sugar.',goals:['all'],link:'/longevity/'},
    {name:'Omega-3 Fish Oil',dose:'2,000mg EPA+DHA daily',cost:15,tier:'essential',why:'Reduces inflammation, supports heart and brain. Anti-aging cornerstone.',goals:['all'],link:'/heart/'},
    // HEART
    {name:'CoQ10 Ubiquinol',dose:'200mg daily',cost:18,tier:'recommended',why:'Powers heart muscle mitochondria. Essential if on statins (which deplete CoQ10).',goals:['heart','energy'],link:'/heart/'},
    {name:'Nattokinase',dose:'2,000 FU daily',cost:14,tier:'recommended',why:'Supports healthy circulation and may help maintain normal blood pressure.',goals:['heart'],link:'/blood-pressure/'},
    // BRAIN
    {name:'Lion\\'s Mane Mushroom',dose:'500-1,000mg daily',cost:16,tier:'recommended',why:'Stimulates nerve growth factor (NGF). May support memory and cognitive function.',goals:['brain'],link:'/brain/'},
    {name:'Phosphatidylserine',dose:'100-300mg daily',cost:18,tier:'optional',why:'Supports cell membrane health in the brain. May improve memory and focus.',goals:['brain'],link:'/brain/'},
    // JOINTS
    {name:'Glucosamine + Chondroitin',dose:'1,500mg / 1,200mg daily',cost:16,tier:'recommended',why:'Supports joint cartilage. Most studied joint supplement. Takes 8-12 weeks for full effect.',goals:['joints'],link:'/joints/'},
    {name:'Turmeric Curcumin',dose:'500-1,000mg with piperine',cost:14,tier:'recommended',why:'Powerful anti-inflammatory. Supports joint comfort and may slow cartilage breakdown.',goals:['joints','energy'],link:'/joints/'},
    // SLEEP
    {name:'Melatonin (low-dose)',dose:'0.5-1mg before bed',cost:6,tier:'recommended',why:'Natural sleep hormone. Low dose is more effective for seniors than high doses.',goals:['sleep'],link:'/sleep/'},
    {name:'L-Theanine',dose:'200mg before bed',cost:10,tier:'optional',why:'Calming amino acid from green tea. Promotes relaxation without drowsiness.',goals:['sleep'],link:'/sleep/'},
    // DIGESTION
    {name:'Probiotic (multi-strain)',dose:'10-50 billion CFU daily',cost:18,tier:'recommended',why:'Supports gut microbiome diversity. Choose one with Lactobacillus and Bifidobacterium strains.',goals:['digestion'],link:'/digestion/'},
    {name:'Digestive Enzymes',dose:'With each meal',cost:14,tier:'optional',why:'Helps break down food more efficiently. Useful if you experience bloating or gas after meals.',goals:['digestion'],link:'/digestion/'},
    // ENERGY
    {name:'Creatine Monohydrate',dose:'5g daily',cost:10,tier:'recommended',why:'Safe and effective for seniors. Supports muscle energy, strength, and cognitive function.',goals:['energy'],link:'/longevity/'},
    {name:'B12 Methylcobalamin',dose:'1,000mcg sublingual',cost:8,tier:'recommended',why:'1 in 5 seniors over 60 are B12 deficient. Sublingual form bypasses absorption issues.',goals:['energy','brain'],link:'/longevity/'},
    // PROSTATE
    {name:'Saw Palmetto',dose:'320mg daily',cost:12,tier:'recommended',why:'Most studied prostate supplement. May reduce urinary frequency and nighttime bathroom trips.',goals:['prostate'],link:'/prostate/'},
    {name:'Beta-Sitosterol',dose:'60-130mg daily',cost:10,tier:'optional',why:'Plant sterol that supports healthy urinary flow and prostate comfort.',goals:['prostate'],link:'/prostate/'},
    // EYES
    {name:'Lutein + Zeaxanthin',dose:'20mg / 4mg daily',cost:14,tier:'recommended',why:'AREDS2 formula nutrients. Filters blue light and supports macular health.',goals:['eyes'],link:'/eyes/'},
    {name:'Bilberry Extract',dose:'160mg daily',cost:12,tier:'optional',why:'Rich in anthocyanins that support night vision and eye blood vessel health.',goals:['eyes'],link:'/eyes/'}
  ];

  // Filter: essential (always) + goal-matched supplements
  var filtered=supps.filter(function(s){
    if(s.goals.indexOf('all')>=0) return true;
    for(var i=0;i<goals.length;i++){if(s.goals.indexOf(goals[i])>=0) return true;}
    return false;
  });

  // Sort: essential first, then recommended, then optional
  var tierOrder={essential:0,recommended:1,optional:2};
  filtered.sort(function(a,b){return tierOrder[a.tier]-tierOrder[b.tier]||a.cost-b.cost;});

  // Remove duplicates (same supplement from multiple goals)
  var seen={},unique=[];
  filtered.forEach(function(s){if(!seen[s.name]){seen[s.name]=true;unique.push(s);}});

  // Render
  var sl=document.getElementById('stack-list');sl.innerHTML='';
  var totalCost=0,rank=1;
  unique.forEach(function(s){
    var withinBudget=(totalCost+s.cost)<=budget;
    totalCost+=s.cost;
    var cls='stack-item '+s.tier+(withinBudget?'':' over-budget');
    var d=document.createElement('div');d.className=cls;
    d.innerHTML='<div class="stack-rank">'+rank+'</div><div class="stack-info"><div class="stack-name">'+s.name+(withinBudget?'':' <span style="color:#C62828;font-size:12px">OVER BUDGET</span>')+'</div><div class="stack-dose">'+s.dose+'</div><div class="stack-why">'+s.why+' <a href="'+s.link+'" style="color:var(--green);font-weight:600">See recommendations →</a></div></div><div class="stack-cost"><div class="stack-price">$'+s.cost+'</div><div class="stack-per">/month</div></div>';
    sl.appendChild(d);
    rank++;
  });

  // Total
  document.getElementById('total-cost').textContent='$'+totalCost+'/mo';
  var ot=document.getElementById('over-text');
  if(totalCost>budget){
    ot.style.display='block';
    ot.textContent='$'+(totalCost-budget)+' over budget — grayed items are optional. Start with the green and blue priorities first.';
    document.getElementById('total-bar').style.borderColor='#C62828';
    document.getElementById('total-cost').style.color='#C62828';
  }else{
    ot.style.display='none';
    document.getElementById('total-bar').style.borderColor='#1A5632';
    document.getElementById('total-cost').style.color='#1A5632';
  }

  document.getElementById('results').classList.add('show');
  setTimeout(function(){document.getElementById('total-bar').scrollIntoView({behavior:'smooth',block:'center'});},100);
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

<div className="intro-note"><p><strong>The supplement industry wants you to buy everything.</strong> The truth is, most seniors need only 3-5 well-chosen supplements. The right ones depend on YOUR specific health goals. This planner ranks supplements by clinical evidence strength and helps you avoid wasting money on products that won't make a difference for your situation.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Build Your Supplement Stack</h2>
<div className="calc-sub">Select your health goals (pick all that apply) and set your budget</div>

<div className="form-group"><label className="form-label">What are your health priorities? (select all that apply)</label>
<div className="goal-grid" id="goals">
<button className="goal-btn" data-goal="heart"><span className="g-icon">❤️</span><span className="g-text">Heart health</span></button>
<button className="goal-btn" data-goal="brain"><span className="g-icon">🧠</span><span className="g-text">Brain & memory</span></button>
<button className="goal-btn" data-goal="joints"><span className="g-icon">🦴</span><span className="g-text">Joints & bones</span></button>
<button className="goal-btn" data-goal="sleep"><span className="g-icon">🌙</span><span className="g-text">Better sleep</span></button>
<button className="goal-btn" data-goal="digestion"><span className="g-icon">🫃</span><span className="g-text">Digestion & gut</span></button>
<button className="goal-btn" data-goal="energy"><span className="g-icon">⚡</span><span className="g-text">Energy & vitality</span></button>
<button className="goal-btn" data-goal="prostate"><span className="g-icon">🩺</span><span className="g-text">Prostate health</span></button>
<button className="goal-btn" data-goal="eyes"><span className="g-icon">👁️</span><span className="g-text">Eye health</span></button>
</div></div>

<div className="form-group"><label className="form-label">Your monthly supplement budget</label>
<div className="budget-val" id="budget-val">$50/month</div>
<input type="range" className="budget-slider" id="budget" min="20" max="120" step="10" value="50" />
<div style={{"display":"flex","justifyContent":"space-between","fontSize":"13px","color":"var(--muted)"}}><span>$20/mo</span><span>$120/mo</span></div>
</div>

<button className="calc-btn">💊 Build My Supplement Plan →</button>

<div className="results" id="results">
<div className="total-bar" id="total-bar"><div><div className="total-label">Your monthly supplement cost</div><div className="over-text" id="over-text" style={{"display":"none"}}></div></div><div className="total-amt" id="total-cost">$0</div></div>
<div id="stack-list"></div>
</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="1775331881" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>How to build a smart supplement routine after 60</h2>
<p>The supplement aisle is overwhelming — thousands of products, all claiming to be essential. The reality is simpler: most seniors benefit from a small core of well-researched supplements, plus 1-2 additions based on their specific health concerns. This guide helps you cut through the noise and spend wisely.</p>

<h3>The universal senior foundation — everyone should start here</h3>
<p><strong>Vitamin D3+K2 ($10/mo):</strong> Over 40% of seniors are deficient. Vitamin D supports bone density, immune function, and muscle strength. K2 ensures calcium goes to bones, not arteries. This is the single most cost-effective supplement for seniors. Take 2000-4000 IU daily with a meal containing fat.</p>
<p><strong>Magnesium Glycinate ($12/mo):</strong> Supports 300+ enzymatic reactions including sleep, muscle relaxation, blood pressure, and blood sugar. Most seniors don't get enough from diet alone. Glycinate form is best absorbed and least likely to cause digestive issues.</p>
<p><strong>Omega-3 Fish Oil ($15/mo):</strong> Reduces inflammation, supports heart and brain health, lowers triglycerides. Look for supplements providing at least 1000mg combined EPA+DHA. Take with meals.</p>

<h3>What NOT to waste money on</h3>
<p>Skip these unless your doctor specifically recommends them: generic multivitamins (low, ineffective doses), individual B vitamins (unless tested deficient), collagen pills (poorly absorbed compared to food-based protein), mega-dose vitamin C (your body excretes the excess), and proprietary blends that hide individual ingredient amounts.</p>

<h3>Adding supplements one at a time</h3>
<p>Never start multiple supplements simultaneously. Add one new supplement every 2-4 weeks so you can identify what works, notice any side effects, and check for medication interactions. Start with the highest-priority supplement from your plan, stabilize, then add the next.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: USDA Dietary Guidelines for Americans 2020-2025. NIH Office of Dietary Supplements fact sheets. Bauer et al., PROT-AGE Study Group recommendations.</em></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">What supplements should every senior take?<span className="faq-icon">+</span></button><div className="faq-a">The essential foundation: Vitamin D3+K2 (2000-4000 IU), Magnesium Glycinate (400mg), and Omega-3 Fish Oil (2000mg). These address the most common deficiencies and support bone, heart, brain, and muscle health. Total cost: about $30-40/month.</div></div>
<div className="faq-item"><button className="faq-q">How much should seniors spend on supplements?<span className="faq-icon">+</span></button><div className="faq-a">$30-80/month is reasonable. Foundation stack costs $30-50. Add condition-specific supplements for $20-40 more. Never sacrifice food quality for supplements — whole food nutrition comes first.</div></div>
<div className="faq-item"><button className="faq-q">Which supplements are a waste of money?<span className="faq-icon">+</span></button><div className="faq-a">Most generic multivitamins (low ineffective doses), individual B vitamins (unless diagnosed deficient), collagen pills (poorly absorbed), mega-dose antioxidants, and proprietary blends that hide ingredient amounts.</div></div>
<div className="faq-item"><button className="faq-q">Multivitamin or individual supplements?<span className="faq-icon">+</span></button><div className="faq-a">Individual supplements are generally better — they allow therapeutic doses of what you need. Multivitamins contain tiny amounts of everything. Exception: if budget is very tight, a quality senior multivitamin is better than nothing.</div></div>
<div className="faq-item"><button className="faq-q">Do supplements interact with medications?<span className="faq-icon">+</span></button><div className="faq-a">Yes — critical for seniors. Fish Oil with blood thinners, Magnesium with antibiotics, Calcium with thyroid meds, Vitamin K with Warfarin. ALWAYS check with your pharmacist before starting any supplement.</div></div>
<div className="faq-item"><button className="faq-q">Best order to add supplements on a budget?<span className="faq-icon">+</span></button><div className="faq-a">Priority order: 1) Vitamin D3+K2 (~$10), 2) Magnesium Glycinate (~$12), 3) Omega-3 Fish Oil (~$15), 4) Your #1 condition-specific supplement. Add one at a time, wait 2-4 weeks between additions.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/heart/" className="r-link"><span>❤️</span> Heart supplements</a>
<a href="/brain/" className="r-link"><span>🧠</span> Brain supplements</a>
<a href="/joints/" className="r-link"><span>🦴</span> Joint supplements</a>
<a href="/sleep/" className="r-link"><span>🌙</span> Sleep supplements</a>
</div></div>

<div className="content-section">
<h3>How to prioritize supplements on a fixed income</h3>
<p>Most seniors take Social Security as their primary income, making every dollar count. The good news: the most impactful supplements are also the cheapest. Vitamin D3+K2 costs roughly $8-12 per month and affects bones, muscles, mood, and immunity — making it the single highest-ROI supplement. Magnesium glycinate ($10-15/month) improves sleep, muscle function, and heart rhythm. Generic fish oil ($12-18/month) supports heart and brain health. These three together cost under $40/month and cover the most critical nutrient gaps for seniors.</p>

<h3>Brand-name vs generic — what actually matters</h3>
<p>For most supplements, generic or store brands work identically to premium brands. The active ingredients are the same. Where brand matters: fish oil (purity testing for mercury and oxidation varies significantly), probiotics (strain specificity and colony count matter), and CoQ10 (ubiquinol form is better absorbed than ubiquinone in seniors). For calcium, magnesium, vitamin D, and basic multivitamins, store brands from Costco, Walmart, or Amazon Basics are perfectly effective and dramatically cheaper.</p>
<p><strong>See our full guides:</strong> <a href="/longevity/" style={{"color":"var(--green)","fontWeight":"700"}}>Longevity supplements →</a> | <a href="/heart/" style={{"color":"var(--green)","fontWeight":"700"}}>Heart supplements →</a> | <a href="/joints/" style={{"color":"var(--green)","fontWeight":"700"}}>Joint supplements →</a></p>
</div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This tool provides general supplement guidance based on published research. It does not replace consultation with your healthcare provider or pharmacist. Always check supplement-drug interactions, especially if you take blood thinners, heart medications, or diabetes drugs. Supplement costs are approximate averages for quality products on Amazon.</p></div>

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
