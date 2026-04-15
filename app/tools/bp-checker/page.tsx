'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function BpCheckerPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `(adsbygoogle = window.adsbygoogle || []).push({});
(adsbygoogle = window.adsbygoogle || []).push({});
document.write(new Date().getFullYear())
function checkBP(){
  var sys=parseInt(document.getElementById('systolic').value);
  var dia=parseInt(document.getElementById('diastolic').value);
  var age=parseInt(document.getElementById('age').value);
  var pulse=parseInt(document.getElementById('pulse').value)||0;

  if(!sys||sys<60||sys>250){alert('Please enter a valid systolic (top) number between 60-250');return;}
  if(!dia||dia<30||dia>150){alert('Please enter a valid diastolic (bottom) number between 30-150');return;}
  if(dia>=sys){alert('Diastolic (bottom) should be lower than systolic (top)');return;}

  // Classify
  var cat,cls,sub,color;
  if(sys>180||dia>120){cat='Hypertensive Crisis';cls='crisis';sub='SEEK EMERGENCY MEDICAL CARE IMMEDIATELY. Do not wait.';color='#B71C1C';}
  else if(sys>=140||dia>=90){cat='Stage 2 Hypertension';cls='stage2';sub='Contact your doctor soon. Medication adjustment may be needed.';color='#C62828';}
  else if(sys>=130||dia>=80){cat='Stage 1 Hypertension';cls='stage1';sub='Discuss treatment options with your doctor at your next visit.';color='#E65100';}
  else if(sys>=120&&dia<80){cat='Elevated';cls='elevated';sub='Not yet hypertension, but monitor closely. Lifestyle changes recommended.';color='#B8860B';}
  else{cat='Normal';cls='normal';sub='Great reading! Continue your healthy habits and regular monitoring.';color='#1A5632';}

  // Update gauge
  var gauge=document.getElementById('gauge');
  gauge.className='gauge-wrap '+cls;
  document.getElementById('g-reading').textContent=sys+'/'+dia;
  document.getElementById('g-label').textContent=cat;
  document.getElementById('g-sub').textContent=sub;

  // Position marker on bar (0-100%)
  var markerPos;
  if(sys<=120) markerPos=Math.max(2,(sys-80)/40*25);
  else if(sys<=129) markerPos=25+((sys-120)/9*15);
  else if(sys<=139) markerPos=40+((sys-130)/9*20);
  else if(sys<=180) markerPos=60+((sys-140)/40*20);
  else markerPos=Math.min(98,80+((sys-180)/20*20));
  document.getElementById('bp-marker').style.left=markerPos+'%';

  // Stats
  var map=Math.round((2*dia+sys)/3);
  var pp=sys-dia;
  document.getElementById('s-map').textContent=map+' mmHg';
  document.getElementById('s-pp').textContent=pp+' mmHg';
  document.getElementById('s-pulse').textContent=pulse?pulse+' bpm':'—';

  // Age-specific notes
  var ageNote=document.getElementById('age-note-text');
  var ageTitle=document.getElementById('age-note-title');
  if(age>=80){
    ageTitle.textContent='For your age group (80+)';
    ageNote.textContent='At 80+, your doctor may accept a systolic target of under 140-150 mmHg to reduce fall risk from overtreatment. Dizziness when standing (orthostatic hypotension) is a key concern. Always stand up slowly and tell your doctor if you feel lightheaded after taking BP medication.';
  }else if(age>=75){
    ageTitle.textContent='For your age group (75-79)';
    ageNote.textContent='The SPRINT trial showed benefits of targeting under 120 systolic at this age, but increased fall and kidney injury risk. Most geriatricians recommend under 130-140 systolic depending on your frailty level and medication burden. Isolated systolic hypertension is very common at this age.';
  }else if(age>=70){
    ageTitle.textContent='For your age group (70-74)';
    ageNote.textContent='A systolic target under 130 mmHg is recommended for most healthy adults in this age range. If you take 3+ blood pressure medications and still can\\'t reach target, discuss realistic goals with your doctor. Pulse pressure above 60 mmHg indicates arterial stiffness — common but worth monitoring.';
  }else if(age>=65){
    ageTitle.textContent='For your age group (65-69)';
    ageNote.textContent='Current AHA guidelines recommend a systolic target under 130 mmHg for adults 65+. The SPRINT trial confirmed this reduces cardiovascular events by 25-34% in this age group. Make sure to monitor for dizziness when starting or changing BP medications.';
  }else if(age>=60){
    ageTitle.textContent='For your age group (60-64)';
    ageNote.textContent='Standard AHA guidelines apply: systolic under 130, diastolic under 80. At this age, blood pressure tends to rise as arteries begin stiffening. If you have normal readings, excellent — maintain through diet, exercise, stress management, and regular monitoring.';
  }else{
    ageTitle.textContent='For your age group (55-59)';
    ageNote.textContent='Standard guidelines apply: under 120/80 is optimal, under 130/80 is the treatment target. If you\\'re trending upward from past readings, now is the time to address it with lifestyle changes before medication becomes necessary.';
  }

  // Pulse pressure warning
  if(pp>60){
    ageNote.textContent+='\\n\\nYour pulse pressure ('+pp+' mmHg) is above 60, indicating arterial stiffness. This is common in seniors but increases cardiovascular risk. Discuss with your doctor.';
  }

  // Action steps
  var actions=document.getElementById('action-list');
  actions.innerHTML='';
  var steps=[];
  if(cls==='crisis'){
    steps=[
      {icon:'🚨',text:'<strong>Call 911 or go to the ER immediately</strong> if you have headache, chest pain, shortness of breath, or vision changes.'},
      {icon:'⏱️',text:'<strong>If no symptoms:</strong> Rest for 5 minutes and re-check. If still above 180/120, contact your doctor urgently.'},
      {icon:'💊',text:'<strong>Do not take extra medication</strong> unless your doctor specifically instructed you to do so for crisis readings.'}
    ];
  }else if(cls==='stage2'){
    steps=[
      {icon:'📞',text:'<strong>Contact your doctor within 1-2 days.</strong> Medication may need to be started or adjusted.'},
      {icon:'📋',text:'<strong>Take 3 readings</strong> over the next 2 days at the same time. Record them to show your doctor.'},
      {icon:'🧂',text:'<strong>Reduce sodium today:</strong> Avoid processed foods, canned soups, deli meats, and restaurant meals.'},
      {icon:'🚶',text:'<strong>Walk 20-30 minutes</strong> today if physically able — even gentle walking can lower BP 5-8 points.'}
    ];
  }else if(cls==='stage1'){
    steps=[
      {icon:'📋',text:'<strong>Monitor daily for 2 weeks.</strong> Record readings to establish a pattern before your doctor\\'s appointment.'},
      {icon:'🥗',text:'<strong>Start the DASH diet:</strong> More fruits, vegetables, whole grains, lean proteins. Reduce sodium to under 1,500mg/day.'},
      {icon:'🏋️',text:'<strong>Exercise 150 min/week:</strong> Walking, swimming, or cycling — any movement that raises your heart rate gently.'},
      {icon:'💊',text:'<strong>Ask your doctor</strong> if medication is appropriate, especially if lifestyle changes alone don\\'t bring it under 130/80 in 3-6 months.'}
    ];
  }else if(cls==='elevated'){
    steps=[
      {icon:'👀',text:'<strong>Monitor 2-3 times per week.</strong> Elevated BP often progresses to Stage 1 if not addressed.'},
      {icon:'🧂',text:'<strong>Cut sodium:</strong> Aim for under 2,300mg/day (ideally under 1,500mg). Read food labels carefully.'},
      {icon:'🚶',text:'<strong>Increase physical activity:</strong> 30 minutes of brisk walking most days reduces systolic BP by 5-8 points.'},
      {icon:'😌',text:'<strong>Manage stress:</strong> Deep breathing, meditation, or gentle yoga can lower BP 4-5 points.'}
    ];
  }else{
    steps=[
      {icon:'✅',text:'<strong>Excellent reading!</strong> Continue your current lifestyle — it\\'s working well.'},
      {icon:'📋',text:'<strong>Keep monitoring</strong> at least once a week to catch any changes early.'},
      {icon:'🥗',text:'<strong>Maintain a healthy diet:</strong> Rich in fruits, vegetables, whole grains, and lean proteins.'},
      {icon:'💪',text:'<strong>Stay active:</strong> Regular exercise is the best long-term protection against hypertension.'}
    ];
  }
  steps.forEach(function(s){
    var div=document.createElement('div');div.className='act-item';
    div.innerHTML='<span class="act-icon">'+s.icon+'</span><span class="act-text">'+s.text+'</span>';
    actions.appendChild(div);
  });

  // Supplement link for non-normal
  if(cls!=='normal'){
    var supDiv=document.createElement('div');supDiv.className='act-item';
    supDiv.innerHTML='<span class="act-icon">🌿</span><span class="act-text"><strong>Natural support:</strong> See our <a href="/blood-pressure/" style="color:#1A5632;font-weight:700">doctor-reviewed blood pressure supplements</a> — Magnesium, CoQ10, Omega-3, and more.</span>';
    actions.appendChild(supDiv);
  }

  document.getElementById('results').classList.add('show');
  setTimeout(function(){document.getElementById('gauge').scrollIntoView({behavior:'smooth',block:'center'});},100);
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
.ad-slot{text-align:center;margin:24px 0;min-height:90px;background:#F5F4F1;border:1px dashed #D3D1C7;border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:14px}
.calc-card{background:var(--white);border:2px solid var(--green);border-radius:16px;padding:32px 28px;margin:28px 0;position:relative;overflow:hidden}
.calc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#1A5632,#4ADE80,#1A5632)}
.calc-title{font-size:22px;font-weight:700;color:var(--green);margin-bottom:4px}.calc-sub{font-size:15px;color:var(--t2);margin-bottom:24px}
.form-group{margin-bottom:20px}.form-label{display:block;font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px}.form-hint{font-size:13px;color:var(--muted);margin-bottom:6px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.bp-input-row{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:end}
.bp-slash{font-size:32px;font-weight:700;color:var(--muted);padding-bottom:14px;text-align:center}
.form-select,.form-input{width:100%;padding:14px 16px;border:1.5px solid var(--border);border-radius:10px;font:inherit;font-size:17px;color:var(--text);background:var(--white);min-height:50px;-webkit-appearance:none;appearance:none;text-align:center}
.form-input.big{font-size:32px;font-weight:700;padding:16px;color:var(--green)}
.form-select{background-image:url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23717170' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center;padding-right:40px;text-align:left}
.form-select:focus,.form-input:focus{outline:none;border-color:var(--green);box-shadow:0 0 0 3px rgba(26,86,50,.15)}
.calc-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,#1A5632,#22703F);color:#fff;border:none;padding:18px 32px;border-radius:12px;font:inherit;font-size:20px;font-weight:700;cursor:pointer;width:100%;min-height:60px;box-shadow:0 4px 14px rgba(26,86,50,.3);transition:transform .1s}.calc-btn:hover{transform:translateY(-1px)}
.results{display:none;margin-top:28px}.results.show{display:block;animation:fadeIn .5s}
@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
/* GAUGE */
.gauge-wrap{text-align:center;margin-bottom:24px;padding:28px 24px;border-radius:14px;border:2px solid var(--border)}
.gauge-wrap.normal{background:#F0FAF3;border-color:#A7D8B8}
.gauge-wrap.elevated{background:#FFFBEB;border-color:#E8D48B}
.gauge-wrap.stage1{background:#FFF3E0;border-color:#FFB74D}
.gauge-wrap.stage2{background:#FEF2F2;border-color:#F87171}
.gauge-wrap.crisis{background:#FEE;border-color:#DC2626}
.gauge-reading{font-size:56px;font-weight:700;line-height:1.1}.gauge-label{font-size:22px;font-weight:700;margin-top:6px}.gauge-sub{font-size:16px;color:var(--t2);margin-top:8px}
.gauge-wrap.normal .gauge-reading{color:#1A5632}.gauge-wrap.normal .gauge-label{color:#1A5632}
.gauge-wrap.elevated .gauge-reading{color:#B8860B}.gauge-wrap.elevated .gauge-label{color:#B8860B}
.gauge-wrap.stage1 .gauge-reading{color:#E65100}.gauge-wrap.stage1 .gauge-label{color:#E65100}
.gauge-wrap.stage2 .gauge-reading{color:#C62828}.gauge-wrap.stage2 .gauge-label{color:#C62828}
.gauge-wrap.crisis .gauge-reading{color:#B71C1C}.gauge-wrap.crisis .gauge-label{color:#B71C1C}
/* BAR INDICATOR */
.bp-bar{height:16px;border-radius:8px;background:linear-gradient(90deg,#4ADE80 0%,#4ADE80 25%,#FCD34D 25%,#FCD34D 40%,#FB923C 40%,#FB923C 60%,#EF4444 60%,#EF4444 80%,#991B1B 80%);margin:20px 0 6px;position:relative}
.bp-marker{position:absolute;top:-6px;width:4px;height:28px;background:var(--text);border-radius:2px;transition:left .5s}
.bp-bar-labels{display:flex;justify-content:space-between;font-size:11px;color:var(--muted)}
/* STATS */
.stats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:20px 0}
.stat-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}
.stat-num{font-size:24px;font-weight:700;line-height:1.2;color:var(--green)}.stat-label{font-size:13px;color:var(--muted);margin-top:4px}
/* AGE NOTE */
.age-note{background:#F0FAF3;border:1px solid #C6E7D0;border-radius:12px;padding:20px;margin:20px 0}
.age-note h4{font-size:17px;font-weight:700;color:var(--green);margin-bottom:8px}
.age-note p{font-size:15px;color:var(--t2);line-height:1.6;margin:0}
/* ACTION STEPS */
.actions{margin:20px 0}.actions h4{font-size:17px;font-weight:700;margin-bottom:10px}
.act-item{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)}
.act-icon{font-size:20px;flex-shrink:0}.act-text{font-size:15px;color:var(--t2);line-height:1.5}
.act-text strong{color:var(--text)}
/* CHART */
.bp-chart{margin:24px 0}.bp-chart h3{font-size:19px;font-weight:700;margin-bottom:16px}
.bp-table{width:100%;border-collapse:collapse;font-size:15px}
.bp-table th{background:var(--green);color:#fff;padding:12px 14px;text-align:left;font-size:14px}
.bp-table td{padding:11px 14px;border-bottom:1px solid var(--border)}
.bp-table tr:nth-child(even) td{background:#FAFAF8}
.bp-table .you td{background:#F0FAF3;font-weight:700;border-left:3px solid var(--green)}
/* CONTENT */
.content-section{margin:32px 0}.content-section h2{font-size:24px;font-weight:700;margin-bottom:14px}.content-section h3{font-size:20px;font-weight:700;color:var(--green);margin:20px 0 10px}.content-section p{font-size:17px;color:var(--t2);line-height:1.7;margin-bottom:14px}
.faq{margin:36px 0}.faq h2{font-size:24px;font-weight:700;margin-bottom:20px;text-align:center}.faq-item{background:var(--white);border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px}.faq-q{padding:16px 22px;font-size:18px;font-weight:600;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:none;width:100%;text-align:left;font-family:inherit;line-height:1.4}.faq-q:hover{background:#FAFAF8}.faq-icon{font-size:22px;color:var(--muted);flex-shrink:0;transition:transform .2s}.faq-q.active .faq-icon{transform:rotate(45deg)}.faq-a{padding:0 22px 16px;font-size:16px;color:var(--t2);line-height:1.65;display:none}.faq-a.show{display:block}
.related{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin:32px 0}.related h3{font-size:20px;font-weight:700;margin-bottom:16px}.r-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.r-link{display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid var(--border);border-radius:10px;text-decoration:none;color:var(--green);font-weight:600;font-size:16px}.r-link:hover{border-color:#c5c3be}
.disc{background:#F5F4F1;border-radius:var(--r);padding:24px;margin:0 0 40px}.disc h4{font-size:16px;font-weight:700;margin-bottom:8px}.disc p{font-size:14px;color:var(--muted);line-height:1.7}.disc p+p{margin-top:8px}
.sidebar{width:240px;flex-shrink:0;position:sticky;top:70px;display:none}.sidebar-inner{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:18px}.sidebar h4{font-size:15px;font-weight:700;margin-bottom:14px}.sb-link{display:block;padding:8px 10px;border-radius:8px;text-decoration:none;background:#F8FAF8;font-size:14px;font-weight:600;color:var(--green);margin-bottom:6px}.sb-link:hover{background:#E8F5E9}.sb-div{border:none;border-top:1px solid var(--border);margin:12px 0}.sb-sub{font-size:13px;color:var(--muted);margin-top:12px}.sb-sub a{color:var(--green);text-decoration:none;display:block;padding:5px 0;font-weight:600}
@media(min-width:1000px){.sidebar{display:block}}@media(max-width:999px){.main-wrap{max-width:800px}}
.ftr{border-top:1px solid var(--border);background:linear-gradient(180deg,#FAFDFB,#F7F6F3);padding:36px 20px 20px;text-align:center}.ftr-inner{max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px}.ftr-logo{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--text)}.ftr-logo svg{width:22px;height:22px}.ftr-logo span{font-size:22px;font-weight:700}.ftr-logo:hover span{color:var(--green)}.ftr-links{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 20px;list-style:none}.ftr-links a{display:inline-block;padding:8px 4px;text-decoration:none;color:var(--text);font-weight:600;font-size:15px;min-height:44px;border-bottom:2px solid transparent}.ftr-links a:hover{color:var(--green)}.ftr-btm{max-width:700px;margin:0 auto;padding:14px 20px 8px;text-align:center;border-top:1px dashed #E0DDD8}.ftr-btm p{margin:0 0 4px;color:var(--muted);font-size:14px}
@media(max-width:700px){.page-hero{padding:28px 20px 24px}.page-hero h1{font-size:26px}.calc-card{padding:24px 18px}.form-row{grid-template-columns:1fr}.bp-input-row{grid-template-columns:1fr auto 1fr}.stats-grid{grid-template-columns:1fr}.gauge-reading{font-size:42px}.r-grid{grid-template-columns:1fr}.faq-q{font-size:17px;padding:14px 18px}.bp-table{font-size:13px}.bp-table th,.bp-table td{padding:8px 10px}}
      `}</style>
<div className="main-wrap">
<div className="main">

<div className="ad-slot">
<ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="8981383031" data-ad-format="auto" data-full-width-responsive="true"></ins>

</div>

<div style={{"background":"var(--white)","border":"1px solid var(--border)","borderRadius":"12px","padding":"20px 24px","margin":"28px 0 0","borderLeft":"4px solid var(--green)"}}>
<p style={{"fontSize":"16px","color":"var(--t2)","lineHeight":"1.6","margin":"0"}}><strong style={{"color":"var(--green)"}}>Did you know?</strong> Normal blood pressure ranges change after age 65. The 2017 SPRINT trial showed that aggressive BP targets (under 120 systolic) reduce heart events in seniors by 34% — but increase fall risk. Enter your reading below and select your age group for <strong>personalized, age-adjusted results</strong> based on the latest AHA and SPRINT guidelines.</p>
</div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Check Your Blood Pressure Reading</h2>
<div className="calc-sub">Enter the numbers from your blood pressure monitor</div>

<div className="bp-input-row">
<div className="form-group">
<label className="form-label">Systolic (top)</label>
<input type="number" className="form-input big" id="systolic" placeholder="120" min="60" max="250" step="1" />
</div>
<div className="bp-slash">/</div>
<div className="form-group">
<label className="form-label">Diastolic (bottom)</label>
<input type="number" className="form-input big" id="diastolic" placeholder="80" min="30" max="150" step="1" />
</div>
</div>

<div className="form-row">
<div className="form-group"><label className="form-label">Your age</label>
<select className="form-select" id="age"><option value="55">55–59</option><option value="62" selected>60–64</option><option value="67">65–69</option><option value="72">70–74</option><option value="77">75–79</option><option value="82">80+</option></select></div>
<div className="form-group"><label className="form-label">Pulse (optional)</label>
<input type="number" className="form-input" id="pulse" placeholder="72" min="30" max="200" step="1" /></div>
</div>

<button className="calc-btn">Check My Blood Pressure →</button>

<div className="results" id="results">

<div className="gauge-wrap" id="gauge">
<div className="gauge-reading" id="g-reading">120/80</div>
<div className="gauge-label" id="g-label">Normal</div>
<div className="gauge-sub" id="g-sub">Your blood pressure is in the healthy range</div>
</div>

<div className="bp-bar"><div className="bp-marker" id="bp-marker"></div></div>
<div className="bp-bar-labels"><span>Normal</span><span>Elevated</span><span>Stage 1</span><span>Stage 2</span><span>Crisis</span></div>

<div className="stats-grid">
<div className="stat-card"><div className="stat-num" id="s-map">—</div><div className="stat-label">MAP (mean arterial)</div></div>
<div className="stat-card"><div className="stat-num" id="s-pp">—</div><div className="stat-label">Pulse pressure</div></div>
<div className="stat-card"><div className="stat-num" id="s-pulse">—</div><div className="stat-label">Heart rate (bpm)</div></div>
</div>

<div className="age-note" id="age-note">
<h4 id="age-note-title">For your age group (60-64)</h4>
<p id="age-note-text">Your doctor likely targets a systolic reading below 130 mmHg based on the SPRINT trial. If you're taking blood pressure medications, your readings should be checked at the same time each day for consistent monitoring.</p>
</div>

<div className="actions" id="actions">
<h4>What to do next</h4>
<div id="action-list"></div>
</div>

<div className="bp-chart">
<h3>Blood pressure ranges by age (senior-adjusted)</h3>
<table className="bp-table">
<thead><tr><th>Category</th><th>Systolic</th><th>Diastolic</th><th>What it means</th></tr></thead>
<tbody id="bp-table-body">
<tr><td><strong style={{"color":"#1A5632"}}>Normal</strong></td><td>&lt; 120</td><td>&lt; 80</td><td>Healthy — maintain lifestyle</td></tr>
<tr><td><strong style={{"color":"#B8860B"}}>Elevated</strong></td><td>120–129</td><td>&lt; 80</td><td>Watch closely — lifestyle changes</td></tr>
<tr><td><strong style={{"color":"#E65100"}}>Stage 1 Hypertension</strong></td><td>130–139</td><td>80–89</td><td>Discuss medication with doctor</td></tr>
<tr><td><strong style={{"color":"#C62828"}}>Stage 2 Hypertension</strong></td><td>≥ 140</td><td>≥ 90</td><td>Medication likely needed</td></tr>
<tr><td><strong style={{"color":"#B71C1C"}}>Hypertensive Crisis</strong></td><td>&gt; 180</td><td>&gt; 120</td><td>Seek emergency care immediately</td></tr>
</tbody>
</table>
</div>

</div>
</div>

<div className="ad-slot">
<ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins>

</div>

<div className="content-section">
<h2>Understanding blood pressure after age 60</h2>
<p>Blood pressure naturally changes as you age. Your arteries stiffen and lose elasticity (arteriosclerosis), forcing your heart to pump harder. By age 70+, isolated systolic hypertension — a high top number with a normal bottom number — is the most common pattern. This is why the systolic number becomes more important as you get older.</p>

<h3>Why normal BP ranges are debated for seniors</h3>
<p>The 2017 SPRINT trial showed that targeting a systolic pressure below 120 mmHg in adults over 75 reduced cardiovascular events by 34% compared to the traditional target of below 140. However, aggressive treatment also increased risks of dizziness, falls, kidney injury, and electrolyte imbalances. Most geriatric guidelines now recommend a target of under 130 mmHg for healthy seniors, but under 140 mmHg for frail seniors or those on many medications.</p>

<h3>Isolated systolic hypertension — the senior pattern</h3>
<p>If your top number is high (140+) but your bottom number is normal (under 80), you have isolated systolic hypertension. This is extremely common after 65 and still needs treatment — it significantly increases stroke and heart attack risk. Do not dismiss a high systolic reading just because your diastolic is fine.</p>

<h3>Pulse pressure — a number your doctor may not mention</h3>
<p>Pulse pressure is the difference between your systolic and diastolic readings (for example, 140 minus 80 = 60). A pulse pressure above 60 mmHg in seniors indicates stiff arteries and increased cardiovascular risk. Our calculator shows your pulse pressure automatically.</p>

<h3>MAP — mean arterial pressure</h3>
<p>MAP estimates the average pressure in your arteries during one heartbeat. Normal MAP is 70-100 mmHg. A MAP below 60 means your organs may not get enough blood. A MAP above 100 suggests your heart is working too hard. Our calculator computes this for you.</p>

<h3>How supplements may support healthy blood pressure</h3>
<p>Several supplements have clinical evidence for modest blood pressure reduction when used alongside medication: Magnesium Glycinate (400mg daily — relaxes blood vessels), CoQ10 Ubiquinol (200mg — supports heart energy), Omega-3 Fish Oil (2000mg — reduces inflammation), Beetroot Powder (nitric oxide production), and Aged Garlic Extract (endothelial function). These are not replacements for medication — they support your overall cardiovascular health.</p>
<p><strong>See our doctor-reviewed recommendations:</strong> <a href="/blood-pressure/" style={{"color":"var(--green)","fontWeight":"700"}}>Blood pressure supplements for seniors →</a></p>
</div>

<div className="content-section">
<h3>How to measure blood pressure correctly</h3>
<p>Inaccurate readings lead to wrong treatment decisions. Follow these steps every time:</p>
<p><strong>Before measuring:</strong> Sit quietly for 5 minutes. Avoid caffeine, exercise, and smoking for 30 minutes before. Empty your bladder. Don't talk during the reading.</p>
<p><strong>Positioning:</strong> Sit in a chair with back support. Feet flat on the floor — do not cross legs. Rest your arm on a table at heart level. Use the correct cuff size (too small = falsely high readings).</p>
<p><strong>Taking the reading:</strong> Take 2-3 readings, one minute apart. Record the average of the last two readings. Check at the same time each day — morning before medication and evening are recommended.</p>
</div>

<div className="ad-slot">
<ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins>

</div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">What is normal blood pressure for a 70 year old?<span className="faq-icon">+</span></button><div className="faq-a">For most seniors over 65, doctors target systolic below 130 mmHg. For frail seniors over 75 or those on multiple medications, under 140/90 may be more appropriate. The SPRINT trial showed aggressive treatment (under 120 systolic) reduces cardiovascular events but increases fall and kidney injury risk.</div></div>
<div className="faq-item"><button className="faq-q">Is 140/90 normal for a senior?<span className="faq-icon">+</span></button><div className="faq-a">140/90 is Stage 1 Hypertension by AHA guidelines for all ages. However, for frail seniors over 75 on multiple medications, some doctors accept up to 140/90 to avoid overtreatment. Discuss your personal target with your doctor based on your overall health.</div></div>
<div className="faq-item"><button className="faq-q">Why does blood pressure increase with age?<span className="faq-icon">+</span></button><div className="faq-a">Arteries stiffen with age (arteriosclerosis), forcing the heart to pump harder. This raises systolic pressure. By age 70+, isolated systolic hypertension (high top number, normal bottom) is the most common pattern. Regular monitoring becomes increasingly important.</div></div>
<div className="faq-item"><button className="faq-q">How often should seniors check blood pressure?<span className="faq-icon">+</span></button><div className="faq-a">Seniors with hypertension should check at least twice daily (morning and evening) for the first 2 weeks after any medication change, then at least 3 times per week. Keep a written log showing date, time, and reading to share with your doctor.</div></div>
<div className="faq-item"><button className="faq-q">Can supplements help lower blood pressure?<span className="faq-icon">+</span></button><div className="faq-a">Magnesium Glycinate, CoQ10, Omega-3, Beetroot Powder, and Aged Garlic Extract all have clinical evidence for modest BP reduction. They work best alongside medication, not as replacements. See our doctor-reviewed blood pressure supplement guide for specific dosages and brands.</div></div>
<div className="faq-item"><button className="faq-q">What is the best time to check blood pressure?<span className="faq-icon">+</span></button><div className="faq-a">Morning before medications and before eating, and evening before bed. Sit quietly 5 minutes first, feet flat, arm at heart level. Take 2-3 readings one minute apart and use the average. Consistency matters more than the exact time.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/blood-pressure/" className="r-link"><span>💓</span> BP supplements</a>
<a href="/heart/" className="r-link"><span>❤️</span> Heart supplements</a>
<a href="/tools/glp1-calculator/" className="r-link"><span>⚖️</span> GLP-1 Calculator</a>
<a href="/kidney/" className="r-link"><span>💧</span> Kidney supplements</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This tool provides general guidance based on AHA blood pressure categories. It is NOT a medical diagnosis. Blood pressure classification should be based on multiple readings over time, not a single reading. If your reading indicates Stage 2 Hypertension or Crisis, contact your doctor or seek emergency care.</p>
<p>This tool does not replace professional medical advice. Always work with your healthcare provider for blood pressure management.</p></div>

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
