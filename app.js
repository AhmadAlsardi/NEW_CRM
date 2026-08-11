const state = {
  loggedIn:false,
  page:"login",
  importantOpen:false,
  templatesOpen:false,
  hrOpen:false,
  trainingOpen:false,
  projectFilterOpen:false,
  taskFilterOpen:false,
  projectFilter:"All",
  taskFilter:"All",
  taskQuery:"",
  projectQuery:"",
  timerRunning:false,
  timerStartedAt:null,
  elapsedBefore:0,
  timerInterval:null,
  timesheets: JSON.parse(localStorage.getItem("smTrainingTimesheets")||"[]"),
  comments: JSON.parse(localStorage.getItem("smTrainingComments")||"[]"),
  dashboardTab:"tasks",
  calendarDate:new Date(2026,7,10),
  calendarView:"month",
  headerClockOpen:false,
  quickOpen:false,
  notificationOpen:false,
  projectStartFilter:"",
  projectEndFilter:"",
  overviewMonth:"8",
  overviewStatus:"All",
  overviewYear:"2026",
  department:"design",
  socialOpen:false,
  videoOpen:false,
};

const project = {
  id:1,name:"Smart Media Training Project",customer:"Training Client",tags:"Training",
  start:"2026-08-10",deadline:"2026-08-31",members:"Training Employee",status:"In Progress"
};
const task = {
  id:1,name:"Design Training Task",status:"In Progress",start:"2026-08-10",due:"2026-08-15",
  assigned:"Training Employee",tags:"Design",priority:"Medium",followers:"Training Supervisor"
};

const guide = {
 login:`<section class="guide-section"><h3>تسجيل الدخول</h3>
 <p class="guide-lead">نظام CRM مخصص لتوثيق المشاريع والمهمات والأوقات المستغرقة، بهدف تنظيم العمل وتحليل الوقت بصورة دقيقة.</p>
 <ol class="guide-list">
   <li>أدخل بريدك الإلكتروني الخاص بالشركة في <b>Email Address</b>.</li>
   <li>أدخل كلمة المرور في <b>Password</b>.</li>
   <li>فعّل <b>Remember me</b> لتسهيل تسجيل الدخول في المرات القادمة.</li>
   <li>اضغط <b>Login</b> للدخول إلى حسابك.</li>
 </ol>
 <div class="guide-note">إذا نسيت كلمة المرور، اضغط <b>Forgot Password?</b> واتبع خطوات إعادة التعيين.</div>
 <div class="guide-training">هذه نسخة تدريبية فقط، ولا ترسل بيانات الدخول إلى النظام الحقيقي.</div></section>`,
 forgot:`<section class="guide-section"><h3>نسيت كلمة المرور</h3>
 <ol class="guide-list"><li>أدخل بريد الشركة في <b>Email Address</b>.</li><li>اضغط <b>Confirm</b>.</li><li>في النظام الحقيقي، اتبع رسالة إعادة تعيين كلمة المرور التي تصل إلى بريدك.</li></ol>
 <div class="guide-training">في نسخة التدريب لن يتم إرسال أي بريد إلكتروني حقيقي.</div></section>`,
 dashboard:`<section class="guide-section"><h3>Dashboard / الشاشة الرئيسية</h3>
 <ul class="guide-list">
   <li>تظهر بعد تسجيل الدخول مباشرة.</li>
   <li>تعرض ملخص المشاريع والمهمات الخاصة بك.</li>
   <li>يمكنك الانتقال من القائمة الجانبية إلى <b>Projects</b> و<b>Tasks</b> و<b>Important Links</b> و<b>Templates</b> و<b>HR App</b>.</li>
 </ul>
 <div class="guide-note">الهدف الأساسي هو توثيق العمل الفعلي وتسجيل الوقت على المهمات والمشاريع.</div></section>`,
 important:`<section class="guide-section"><h3>Important Links / الروابط المهمة</h3>
 <ul class="guide-list"><li>Google Workspace Services</li><li>KPI's</li><li>Policies</li><li>مواقع Smart Media في الأردن والسعودية</li></ul>
 <p>استخدم هذه الروابط للوصول إلى موارد الشركة والرجوع إلى السياسات والخدمات المعتمدة.</p></section>`,
 workspace:`<section class="guide-section"><h3>Google Workspace</h3>
 <ul class="guide-list"><li>Gmail للبريد الإلكتروني.</li><li>Google Drive لحفظ ومشاركة ملفات العمل.</li><li>Google Calendar للجدولة.</li><li>Google Meet للاجتماعات.</li><li>Google Chat للتواصل.</li><li>Google Keep لتدوين الملاحظات والمهام.</li></ul>
 <div class="guide-note">تُستخدم هذه الأدوات من خلال حساب البريد الإلكتروني الخاص بالشركة.</div></section>`,
 kpis:`<section class="guide-section"><h3>KPI's</h3>
 <p>مؤشرات الأداء الرئيسية المستخدمة لمتابعة جودة وإنجاز العمل.</p>
 <ul class="guide-list"><li>Social Media</li><li>Developers</li><li>Design</li><li>Content</li></ul>
 <p>اضغط على الصورة داخل النظام لتكبيرها وقراءتها بوضوح.</p></section>`,
 policies:`<section class="guide-section"><h3>Company Policies</h3>
 <ul class="guide-list"><li>الحضور والاستراحات.</li><li>الإجازات والمغادرات.</li><li>مشاركة ملفات العمل.</li><li>استخدام CRM.</li><li>العمل عن بعد.</li><li>فترة التجربة.</li><li>مراجعة الأداء.</li><li>حقوق وملكية أعمال الشركة.</li></ul></section>`,
 templates:`<section class="guide-section"><h3>Templates / القوالب</h3>
 <ul class="guide-list"><li>قوالب السوشال ميديا.</li><li>قوالب Word الرسمية.</li><li>SM Letterhead.</li><li>شعار وهوية Smart Media المعتمدة.</li></ul>
 <div class="guide-note">استخدم القوالب المعتمدة في جميع الأعمال للحفاظ على التناسق والاحترافية.</div></section>`,
 hr:`<section class="guide-section"><h3>HR App</h3><ul class="guide-list"><li>Jordan: ZenHR.</li><li>Saudi Arabia: نظام الموارد البشرية المعتمد في السعودية.</li></ul></section>`,
 zenhr:`<section class="guide-section"><h3>نظام ZenHR</h3>
 <h4>المزايا الرئيسية</h4><ul class="guide-list"><li>إعلانات الشركة.</li><li>دليل الموظفين.</li><li>رصيد وطلبات الإجازات والمغادرات.</li><li>الطلبات المالية مثل الاسترداد والساعات الإضافية والقروض.</li><li>المستندات والتقارير مثل قسائم الراتب.</li><li>إدارة الحضور اليومي.</li><li>العقود والوثائق الخاصة بك.</li></ul>
 <h4>كيفية البدء</h4><ol class="guide-list"><li>افتح تطبيق أو موقع ZenHR.</li><li>سجّل الدخول بالبريد الإلكتروني وكلمة المرور المخصصين لك.</li></ol></section>`,
 projects:`<section class="guide-section"><h3>Projects / المشاريع</h3>
 <p>تعرض الصفحة جميع المشاريع وبياناتها الأساسية.</p>
 <ul class="guide-list"><li>Project Name</li><li>Customer</li><li>Tags</li><li>Start Date</li><li>Deadline</li><li>Members</li><li>Status</li></ul>
 <h4>طرق البحث</h4><ol class="guide-list"><li><b>Search:</b> ابحث باسم المشروع أو أي كلمة مرتبطة به.</li><li><b>Filter:</b> اختر All أو Not Started أو In Progress أو On Hold أو Cancelled أو Finished.</li><li><b>Date Range:</b> استخدم تاريخ البداية والنهاية لتصفية النتائج.</li></ol>
 <div class="guide-training">المشروع التدريبي: <b>Smart Media Training Project</b>.</div></section>`,
 projectDetails:`<section class="guide-section"><h3>تفاصيل المشروع</h3>
 <ul class="guide-list"><li>راجع Customer وTags وStart Date وDeadline.</li><li>راجع أعضاء المشروع وحالته.</li><li>من جدول Tasks افتح <b>Design Training Task</b> لتطبيق تسجيل الوقت.</li></ul></section>`,
 tasks:`<section class="guide-section"><h3>Tasks / المهمات</h3>
 <p>تعرض الصفحة المهمات مع تفاصيلها الأساسية.</p>
 <ul class="guide-list"><li>Name</li><li>Status</li><li>Start Date</li><li>Due Date</li><li>Assigned to</li><li>Tags</li><li>Priority</li></ul>
 <h4>الفلاتر</h4><ul class="guide-list"><li>Not Started</li><li>In Progress</li><li>Testing</li><li>Awaiting Feedback</li><li>Complete</li><li>Today's tasks</li><li>Due Date Passed</li><li>Upcoming Tasks</li><li>Tasks assigned to me</li><li>Tasks I'm following</li></ul>
 <div class="guide-training">المهمة التدريبية: <b>Design Training Task</b>.</div></section>`,
 overview:`<section class="guide-section"><h3>Tasks Overview</h3>
 <ol class="guide-list"><li>اختر الشهر.</li><li>اختر الحالة.</li><li>اختر السنة.</li><li>اضغط <b>Filter</b>.</li></ol>
 <p>تظهر نتيجة المهمات المطابقة داخل المساحة أسفل الفلاتر.</p></section>`,
 taskDetails:`<section class="guide-section"><h3>Task Information / معلومات المهمة</h3>
 <ul class="guide-list"><li><b>Status:</b> حالة المهمة.</li><li><b>Start Date:</b> تاريخ بدء المهمة.</li><li><b>Due Date:</b> تاريخ الانتهاء عند وجوده.</li><li><b>Priority:</b> أولوية المهمة.</li><li><b>Your logged time:</b> الوقت المسجل بواسطة مؤقتاتك.</li><li><b>Total logged time:</b> إجمالي الوقت المسجل على المهمة.</li><li><b>Assignees:</b> الموظفون المكلفون بالمهمة.</li><li><b>Followers:</b> الموظفون المتابعون لتقدم المهمة.</li></ul>
 <h4>تسجيل الوقت بالمؤقت</h4><ol class="guide-list"><li>قبل بدء العمل اضغط <b>Start Timer</b>.</li><li>عند أخذ استراحة، أوقف المؤقت.</li><li>بعد العودة من الاستراحة، شغّل المؤقت من جديد.</li><li>عند انتهاء العمل اضغط <b>Stop Timer</b>.</li><li>اكتب الملاحظات في <b>Notes</b>.</li><li>اضغط <b>Save</b>.</li></ol>
 <h4>Comments</h4><ul class="guide-list"><li>اكتب ما تم إنجازه في نهاية اليوم.</li><li>أضف رابط الإنجاز فقط.</li><li>لا ترفع ملفات أو صور داخل التعليق.</li></ul>
 <h4>Timesheets</h4><p>تعرض التاريخ، ساعة البدء، ساعة الانتهاء، المدة والملاحظات.</p>
 <div class="guide-danger">تسجيل المهام والأوقات بشكل صحيح جزء أساسي من إجراءات العمل وتحليل الوقت والتقارير وتقييم الأداء.</div></section>`,
 fileManagement:`<section class="guide-section"><h3>حفظ ملفات المشاريع / Project File Management</h3>
 <p class="guide-lead">هذا الجزء يوضح طريقة تنظيم ملفات التصميم المعتمدة بعد تنفيذ المهمة.</p>
 <h4>ملفات المشاريع — باستثناء Social Media</h4><ol class="guide-list"><li>من المجلد الرئيسي افتح <b>All client</b>.</li><li>أنشئ مجلدًا باسم العميل بعد التأكد من عدم وجود مجلد بنفس الاسم.</li><li>داخل مجلد العميل أنشئ مجلدًا باسمك.</li><li>احفظ الملف باسم المهمة مثل <b>Branding</b> أو <b>Website</b>.</li><li>ارفع ملف العمل مع <b>Source File</b>.</li></ol>
 <div class="guide-training">جرّب المحاكاة في الجهة اليسرى بالضغط على المجلدات بالترتيب الصحيح.</div></section>`,
 socialFiles:`<section class="guide-section"><h3>حفظ ملفات Social Media</h3>
 <ol class="guide-list"><li>افتح مساحة ملفات Social Media.</li><li>اختر أو أنشئ مجلد السنة مثل <b>2025</b>.</li><li>داخل السنة اختر أو أنشئ مجلد الشهر.</li><li>احفظ تصاميم الشهر داخل المجلد الصحيح.</li></ol>
 <div class="guide-note">الهدف من التقسيم حسب السنة والشهر هو سهولة الرجوع إلى التصاميم لاحقًا.</div></section>`,
 presentations:`<section class="guide-section"><h3>Presentation Files / ملفات العروض التقديمية</h3>
 <ul class="guide-list"><li>لا يتم إرسال أو استخدام عروض تقديمية إلا العروض الخاصة بـ <b>Smart Media</b>.</li><li>عروض السعودية متاحة من الرابط المخصص لها.</li><li>بالنسبة للأردن، يتم استخدام النسخة المناسبة مع شعار Smart Media Jordan والـwebsite الخاص بالأردن.</li></ul>
 <div class="guide-danger">تأكد من استخدام الهوية والقالب المعتمدين قبل مشاركة أي Presentation.</div></section>`,
 pendingDesign:`<section class="guide-section"><h3>جدول المهام المعلقة لفريق التصميم</h3>
 <p>يُستخدم الجدول لمتابعة سير العمل اليومي والالتزام بالمواعيد النهائية.</p>
 <ul class="guide-list"><li>يعرض المهمة والمشروع والموظف المسؤول.</li><li>يوضح الموعد النهائي لكل مهمة.</li><li>قد يشمل Social Media Plans، Campaign Content، Rebranding، تحديث الشعار والهوية، Product Design والإعلانات.</li><li>يتم توزيع المسؤوليات بوضوح حسب المشروع والمهمة.</li></ul>
 <div class="guide-note">استخدم الفلاتر في المحاكاة لمشاهدة مهام كل عضو وحالة التسليم.</div></section>`,
 socialDrive:`<section class="guide-section"><h3>Google Drive Policy — Social Media</h3><ul class="guide-list"><li>يجب حفظ ومشاركة ملفات العمل عبر Google Drive بشكل حصري.</li><li>يجب استخدام قوالب الشركة المعتمدة عند إنشاء الملفات.</li><li>يتم تنظيم الملفات داخل المجلدات المخصصة لتسهيل الوصول إليها.</li><li>مشاركة الملفات مع العملاء تكون عبر روابط Google Drive فقط.</li><li>يُمنع استخدام <b>My Drive</b> لهذا الغرض.</li></ul><div class="guide-note">طبّق السياسة في المحاكاة على اليسار.</div></section>`,
 meetingReports:`<section class="guide-section"><h3>Meetings & Meeting Summary</h3><ol class="guide-list"><li>بعد أي اجتماع، جهّز ملخص الاجتماع.</li><li>اكتب اليوم والتاريخ والوقت.</li><li>أضف أسماء الحضور.</li><li>وثّق المناقشات والاتفاقات وجميع التفاصيل المهمة.</li><li>أرسل الملخص إلى العميل عبر البريد الإلكتروني.</li></ol><div class="guide-training">استخدم القالب المعتمد حسب المنطقة: الأردن أو السعودية.</div></section>`,
 monthlyPlan:`<section class="guide-section"><h3>Monthly Social Media Plan</h3><ul class="guide-list"><li>بعد الاتفاق مع العميل، استخدم Template Smart Media المناسب للمنطقة.</li><li>يجب أن تكون الخطة كاملة ومفصلة.</li><li>الخط: <b>Poppins</b>، الحجم <b>12</b>.</li><li>Slide 1: شعار Smart Media.</li><li>Slide 2: الاتفاقيات ومحتوى الخطة الشهرية.</li><li>Slide 3: Profile Picture + Cover Photo للعميل من Facebook.</li><li>Slide 4: Posts Link.</li><li>Slide 5: Reels Link.</li><li>لكل منشور: رقم المنشور، المنصات، تاريخ النشر، والكابشن.</li></ul></section>`,
 monthlyReports:`<section class="guide-section"><h3>Monthly Reports & Publishing</h3><ul class="guide-list"><li>استخدم التقرير الشهري المعتمد.</li><li>يجب إرسال التقرير للعميل شهريًا.</li><li>تتبّع تفاصيل النشر ووثّقها يوميًا.</li><li>تابع تقويم العميل ولا تفوّت يوم نشر.</li><li>طلبات Motion يجب أن تحتوي جميع التفاصيل بدقة باستخدام التمبلت المعتمد.</li></ul></section>`,
 clientFolders:`<section class="guide-section"><h3>Client Folder Organization</h3><ol class="guide-list"><li>أنشئ مجلدًا باسم العميل داخل المجلد الرئيسي.</li><li>أنشئ داخله مجلد السنة الحالية.</li><li>أنشئ مجلد <b>Social Media Plans</b> للخطط الشهرية.</li><li>أنشئ مجلد <b>Reports</b> للتقارير الشهرية.</li><li>أنشئ مجلد <b>Meeting Summaries</b> لملخصات الاجتماعات.</li><li>صيغة التسمية: <b>اسم العميل + الشهر + السنة</b>.</li></ol><div class="guide-note">تأكد أن كل فولدر يحتوي نوع الملفات المخصص له فقط.</div></section>`,
 paymentCards:`<section class="guide-section"><h3>Payment Cards — Important</h3><ul class="guide-list"><li>يُمنع استخدام بطاقة شخصية.</li><li>يُمنع استخدام بطاقة تابعة لشركة Smart Media.</li><li>يُمنع الاطلاع على بيانات بطاقة العميل.</li><li>العميل مسؤول عن إضافة بطاقته إلى حسابه.</li><li>إذا احتاج مساعدة، يتم إرسال فيديو تعريفي أو تقديم المساعدة دون طلب بيانات البطاقة.</li></ul><div class="guide-danger">لا تطلب من العميل مشاركة بيانات البطاقة الشخصية.</div></section>`,
 pendingVideo:`<section class="guide-section"><h3>Video Production — Pending Tasks</h3><p>يُستخدم الجدول لمتابعة المهام المعلقة لفريق Video Production.</p><ul class="guide-list"><li>المهمة والمشروع.</li><li>عضو الفريق المسؤول.</li><li>الموعد النهائي.</li><li>حالة المهمة.</li></ul><div class="guide-note">باقي تدريب Video Production يعتمد على نفس خطوات CRM والمؤقت وZenHR الموجودة في التدريب العام.</div></section>`,
 support:`<section class="guide-section"><h3>Support</h3><p>هذه الصفحة موجودة للمحاكاة البصرية حتى تبقى واجهة التدريب مألوفة. لا يتطلب هذا التدريب إنشاء تذكرة دعم.</p></section>`,
 leads:`<section class="guide-section"><h3>Leads</h3><p>هذا القسم ظاهر للمحاكاة البصرية، لكنه ليس ضمن خطوات التدريب الحالية.</p></section>`,
 utilities:`<section class="guide-section"><h3>Utilities</h3><ul class="guide-list"><li>Media</li><li>Calendar</li></ul><p>القسم ظاهر للمحاكاة البصرية ضمن واجهة CRM.</p></section>`
};

function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function fmtDate(d){return new Date(d).toLocaleDateString("en-GB")}
function secondsToHMS(total){total=Math.max(0,Math.floor(total));let h=Math.floor(total/3600),m=Math.floor((total%3600)/60),s=total%60;return [h,m,s].map(x=>String(x).padStart(2,"0")).join(":")}
function totalLoggedSeconds(){return state.timesheets.reduce((a,x)=>a+(x.duration||0),0)}
function currentElapsed(){return state.elapsedBefore + (state.timerRunning ? Math.floor((Date.now()-state.timerStartedAt)/1000):0)}

function guidePane(key){
 return `<aside class="guide-pane">
   <div class="guide-head"><div class="eyebrow">SMART MEDIA • TRAINING GUIDE</div><h2>دليل استخدام النظام</h2></div>
   <div class="guide-content">${guide[key]||guide.dashboard}
   <div class="guide-actions">
    <button onclick="navigate('dashboard')">Dashboard</button>
    <button onclick="navigate('projects')">Projects</button>
    <button onclick="navigate('tasks')">Tasks</button>
    <button onclick="navigate('fileManagement')">Design Files</button>
    <button onclick="navigate('socialDrive')">Social Media</button>
    <button onclick="navigate('pendingVideo')">Video Production</button>
    <button onclick="resetTraining()">Reset Training Data</button>
   </div></div></aside>`;
}
function shell(crm,key){return `<div class="training-shell"><main class="crm-pane">${crm}</main>${guidePane(key)}</div>`}

function loginView(forgot=false){
 const form = forgot ? `
 <div class="login-screen"><div class="login-wrap"><img src="assets/smart-media-logo.png" class="login-logo"><h1 class="login-title">Forgot Password</h1>
 <div class="login-card"><div class="form-group"><label>Email Address</label><input id="forgotEmail" type="email" class="form-control"></div>
 <button class="login-button" onclick="fakeConfirm()">Confirm</button><a class="forgot-link" onclick="navigate('login')">Back to Login</a></div></div></div>` :
 `<div class="login-screen"><div class="login-wrap"><img src="assets/smart-media-logo.png" class="login-logo"><h1 class="login-title">Login</h1>
 <div class="login-card"><div class="form-group"><label>Email Address</label><input id="email" type="email" class="form-control" autofocus></div>
 <div class="form-group"><label>Password</label><input id="password" type="password" class="form-control"></div>
 <label class="checkbox-row"><input type="checkbox" id="remember"> <span>Remember me</span></label>
 <button class="login-button" onclick="fakeLogin()">Login</button><a class="forgot-link" onclick="navigate('forgot')">Forgot Password?</a></div></div></div>`;
 return shell(form,forgot?"forgot":"login");
}
function fakeLogin(){
 const e=document.getElementById("email").value.trim(),p=document.getElementById("password").value;
 if(!e||!p){alert("Training: enter an email and password to continue.");return}
 state.loggedIn=true;navigate("dashboard");
}
function fakeConfirm(){alert("Training simulation: password reset instructions would be sent to the employee's company email.");navigate("login")}


function topIcon(name){
 const common=`class="top-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
 const icons={
  share:`<svg ${common}><circle cx="18" cy="5" r="2.2"></circle><circle cx="6" cy="12" r="2.2"></circle><circle cx="18" cy="19" r="2.2"></circle><path d="M8 11l7.8-4.6M8 13l7.8 4.6"></path></svg>`,
  check:`<svg ${common}><path d="M5 12.5l4.2 4.2L19 7"></path></svg>`,
  user:`<svg class="profile-svg" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="21" fill="#fff" stroke="#3b82f6" stroke-width="1.5"/><circle cx="22" cy="15.5" r="7" fill="#d9e0e8"/><path d="M9.5 37c1.6-7.5 6.2-11.2 12.5-11.2S32.9 29.5 34.5 37" fill="#d9e0e8"/></svg>`,
  clock:`<svg ${common}><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7v5l3.5 2"></path></svg>`,
  bell:`<svg ${common}><path d="M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M10 20h4"></path></svg>`
 };
 return icons[name]||"";
}

function header(){
 const now=new Date();
 const clock=now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
 const date=now.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
 return `<header class="header">
 <button class="header-plain menu-icon" title="Menu" aria-label="Menu">≡</button>
 <div class="search-wrap"><input class="top-search" placeholder="Search..." onkeydown="globalSearch(event,this.value)"><span class="search-glass">⌕</span></div>
 <div class="header-pop-wrap"><button class="quick-plus" title="Quick Create" aria-label="Quick Create" onclick="state.quickOpen=!state.quickOpen;state.headerClockOpen=false;state.notificationOpen=false;render()">+</button>
 ${state.quickOpen?`<div class="header-pop quick-pop"><div class="pop-title">Quick Create</div><a onclick="navigate('taskDetails')">Design Training Task</a><a onclick="navigate('projectDetails')">Training Project</a></div>`:""}</div>
 <div class="header-spacer"></div>
 <div class="header-icons">
   <button class="top-action header-plain" title="Share" aria-label="Share">${topIcon("share")}</button>
   <button class="top-action header-plain" title="To do" aria-label="To do">${topIcon("check")}</button>
   <button class="profile-action header-plain" title="Profile" aria-label="Profile">${topIcon("user")}</button>
   <div class="header-pop-wrap"><button class="header-icon top-action" title="Time & date" aria-label="Time and date" onclick="state.headerClockOpen=!state.headerClockOpen;state.quickOpen=false;state.notificationOpen=false;render()">${topIcon("clock")}</button>
   ${state.headerClockOpen?`<div class="header-pop clock-pop"><div class="clock-big" id="liveHeaderClock">${clock}</div><div class="muted">${date}</div><button class="btn btn-light btn-sm" onclick="calendarToday();navigate('dashboard')">Open today's calendar</button></div>`:""}</div>
   <div class="header-pop-wrap"><button class="header-icon top-action" title="Notifications" aria-label="Notifications" onclick="state.notificationOpen=!state.notificationOpen;state.quickOpen=false;state.headerClockOpen=false;render()">${topIcon("bell")}</button>
   ${state.notificationOpen?`<div class="header-pop notification-pop"><div class="pop-title">Notifications</div><div class="empty-pop">No notifications found</div></div>`:""}</div>
 </div></header>`;
}
function globalSearch(e,value){
 if(e.key!=="Enter")return;
 const q=value.trim().toLowerCase();
 if(!q)return;
 if(q.includes("design")||q.includes("task")) navigate("taskDetails");
 else if(q.includes("project")||q.includes("training")) navigate("projectDetails");
 else alert("No matching training record found.");
}
function sidebar(active){
 const cls=x=>active===x?"active":"";
 return `<aside class="sidebar"><div class="sidebar-logo"><img src="assets/smart-media-logo.png"></div>
 <a class="nav-item ${cls("dashboard")}" onclick="navigate('dashboard')"><span class="nav-icon">◆</span><span class="nav-text">Dashboard</span></a>
 <a class="nav-parent ${active.startsWith("important")?"active":""}" onclick="toggleMenu('important')"><span class="nav-icon">↗</span><span class="nav-text">Important Links</span><span class="nav-arrow">‹</span></a>
 ${state.importantOpen?`<div class="submenu">
   <a onclick="navigate('workspace')">Google Workspace Services</a><a onclick="navigate('kpis')">KPI's</a><a onclick="navigate('policies')">Policies</a>
   <a onclick="showExternal('Smart Media SA website')">Smart Media SA website</a><a onclick="showExternal('Smart Media Jo website')">Smart Media Jo website</a><a onclick="navigate('support')">Open Ticket</a></div>`:""}
 <a class="nav-parent ${active==="templates"?"active":""}" onclick="toggleMenu('templates')"><span class="nav-icon">↗</span><span class="nav-text">Templates</span><span class="nav-arrow">‹</span></a>
 ${state.templatesOpen?`<div class="submenu"><a onclick="navigate('templates')">Smart Media SM Plan</a><a onclick="navigate('templates')">SM Letterhead</a><a onclick="navigate('templates')">SM Logo &amp; Identity</a></div>`:""}
 <a class="nav-parent ${active==="hr"?"active":""}" onclick="toggleMenu('hr')"><span class="nav-icon">●</span><span class="nav-text">HR App</span><span class="nav-arrow">‹</span></a>
 ${state.hrOpen?`<div class="submenu"><a onclick="navigate('zenhr')">Jordan</a><a onclick="showExternal('Saudi Arabia HR App')">Saudi Arabia</a></div>`:""}
 <a class="nav-item ${cls("projects")}" onclick="navigate('projects')"><span class="nav-icon">☷</span><span class="nav-text">Projects</span></a>
 <a class="nav-item ${active.startsWith("tasks")||active==="taskDetails"?"active":""}" onclick="navigate('tasks')"><span class="nav-icon">◉</span><span class="nav-text">Tasks</span></a>
 <a class="nav-parent ${["fileManagement","socialFiles","presentations","pendingDesign"].includes(active)?"active":""}" onclick="toggleMenu('training')"><span class="nav-icon">▣</span><span class="nav-text">Design Training</span><span class="nav-arrow">‹</span></a>
 ${state.trainingOpen?`<div class="submenu"><a onclick="navigate('fileManagement')">Project Files</a><a onclick="navigate('socialFiles')">Social Media Files</a><a onclick="navigate('presentations')">Presentations</a><a onclick="navigate('pendingDesign')">Pending Tasks Table</a></div>`:""}
 <a class="nav-parent ${["socialDrive","meetingReports","monthlyPlan","monthlyReports","clientFolders","paymentCards"].includes(active)?"active":""}" onclick="toggleMenu('social')"><span class="nav-icon">◎</span><span class="nav-text">Social Media Training</span><span class="nav-arrow">‹</span></a>
 ${state.socialOpen?`<div class="submenu"><a onclick="navigate('socialDrive')">Drive Policy</a><a onclick="navigate('meetingReports')">Meeting Summary</a><a onclick="navigate('monthlyPlan')">Monthly Plan</a><a onclick="navigate('monthlyReports')">Monthly Reports</a><a onclick="navigate('clientFolders')">Client Folders</a><a onclick="navigate('paymentCards')">Payment Cards</a></div>`:""}
 <a class="nav-parent ${active==="pendingVideo"?"active":""}" onclick="toggleMenu('video')"><span class="nav-icon">▶</span><span class="nav-text">Video Production</span><span class="nav-arrow">‹</span></a>
 ${state.videoOpen?`<div class="submenu"><a onclick="navigate('dashboard')">CRM Training</a><a onclick="navigate('zenhr')">ZenHR</a><a onclick="navigate('pendingVideo')">Pending Tasks</a></div>`:""}
 <a class="nav-item ${cls("support")}" onclick="navigate('support')"><span class="nav-icon">◌</span><span class="nav-text">Support</span></a>
 <a class="nav-item ${cls("leads")}" onclick="navigate('leads')"><span class="nav-icon">☎</span><span class="nav-text">Leads</span></a>
 <a class="nav-parent ${active==="utilities"?"active":""}" onclick="navigate('utilities')"><span class="nav-icon">⚙</span><span class="nav-text">Utilities</span><span class="nav-arrow">‹</span></a>
 </aside>`;
}
function crmFrame(content,active){return `<div class="crm-app">${sidebar(active)}${header()}<section class="content">${content}</section></div>`}
function toggleMenu(which){state[which+"Open"]=!state[which+"Open"];render()}

function dashboardTabContent(){
 if(state.dashboardTab==="projects") return `<div class="dashboard-table-shell"><a onclick="navigate('projects')" class="view-link">View All</a>
 <div class="table-scroll"><table class="data-table dashboard-table"><thead><tr><th>Project Name</th><th>Start Date</th><th>Deadline</th><th>Status</th></tr></thead><tbody><tr><td><a onclick="navigate('projectDetails')">${project.name}</a></td><td>${project.start}</td><td>${project.deadline}</td><td><span class="pill progress">${project.status}</span></td></tr></tbody></table></div></div>`;
 if(state.dashboardTab==="reminders") return `<div class="dashboard-empty"><b>My Reminders</b><p>No reminders found.</p></div>`;
 if(state.dashboardTab==="tickets") return `<div class="dashboard-empty"><b>Tickets</b><p>No tickets found.</p></div>`;
 if(state.dashboardTab==="announcements") return `<div class="dashboard-empty"><b>Announcements</b><p>No announcements found.</p></div>`;
 return `<div class="dashboard-table-shell"><a onclick="navigate('tasks')" class="view-link">View All</a>
 <div class="table-tools compact-tools"><select class="select-sm"><option>25</option></select><button class="btn btn-light btn-sm">Export</button><button class="btn btn-light btn-sm" onclick="render()" title="Reload">↻</button><div class="table-search"><div class="search-group"><span>⌕</span><input class="input-sm" placeholder="Search..." oninput="filterDashboardTask(this.value)"></div></div></div>
 <div class="table-scroll always-scroll"><table class="data-table dashboard-table" id="dashboardTaskTable"><thead><tr><th>#</th><th>Name</th><th>Status</th><th>Start Date</th><th>Tags</th><th>Priority</th></tr></thead>
 <tbody><tr><td>1</td><td><a onclick="navigate('taskDetails')">Design Training Task</a></td><td><span class="pill progress">In Progress</span></td><td>2026-08-10</td><td>Design</td><td>Medium</td></tr></tbody></table></div></div>`;
}
function filterDashboardTask(value){
 const row=document.querySelector("#dashboardTaskTable tbody tr"); if(!row)return;
 row.style.display=row.textContent.toLowerCase().includes(value.toLowerCase())?"":"none";
}
function setDashboardTab(tab){state.dashboardTab=tab;render()}
function calendarNav(delta){
 const d=new Date(state.calendarDate);
 if(state.calendarView==="month") d.setMonth(d.getMonth()+delta);
 else if(state.calendarView==="week") d.setDate(d.getDate()+7*delta);
 else d.setDate(d.getDate()+delta);
 state.calendarDate=d;render();
}
function calendarToday(){state.calendarDate=new Date();render()}
function setCalendarView(v){state.calendarView=v;render()}
function calendarHtml(){
 const d=new Date(state.calendarDate), view=state.calendarView;
 if(view==="day"){
   const title=d.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
   const hours=Array.from({length:9},(_,i)=>i+9).map(h=>`<div class="day-hour"><span>${String(h).padStart(2,"0")}:00</span>${d.getFullYear()===2026&&d.getMonth()===7&&d.getDate()===10&&h===9?`<b class="calendar-event">Design Training Task</b>`:""}</div>`).join("");
   return `<div class="calendar-title">${title}</div><div class="day-view">${hours}</div>`;
 }
 if(view==="week"){
   const start=new Date(d);start.setDate(d.getDate()-d.getDay());
   const ds=Array.from({length:7},(_,i)=>{const x=new Date(start);x.setDate(start.getDate()+i);return x});
   const title=`${ds[0].toLocaleDateString("en-US",{month:"short",day:"numeric"})} – ${ds[6].toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`;
   return `<div class="calendar-title">${title}</div><div class="week-view">${ds.map(x=>`<div class="week-day"><b>${x.toLocaleDateString("en-US",{weekday:"short"})}</b><span>${x.getDate()}</span>${x.getFullYear()===2026&&x.getMonth()===7&&x.getDate()===10?`<small class="calendar-event">Design Training Task</small>`:""}</div>`).join("")}</div>`;
 }
 const y=d.getFullYear(),m=d.getMonth(),first=new Date(y,m,1),start=new Date(y,m,1-first.getDay());
 const cells=Array.from({length:42},(_,i)=>{const x=new Date(start);x.setDate(start.getDate()+i);return x});
 const title=d.toLocaleDateString("en-US",{month:"long",year:"numeric"});
 return `<div class="calendar-title">${title}</div><div class="weekday-row">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(x=>`<div>${x}</div>`).join("")}</div><div class="calendar-grid">${cells.map(x=>{
   const inMonth=x.getMonth()===m, isToday=x.toDateString()===new Date().toDateString(), training=x.getFullYear()===2026&&x.getMonth()===7&&x.getDate()===10;
   return `<div class="day ${!inMonth?"outside":""} ${isToday?"today":""}"><span>${x.getDate()}</span>${training?`<small class="calendar-event">Design Training Task</small>`:""}</div>`}).join("")}</div>`;
}
function dashboard(){
 return crmFrame(`
 <div class="stats-grid"><div class="stat-card"><span>↗ &nbsp; Converted Leads</span><b>0 / 0</b></div><div class="stat-card"><span>☷ &nbsp; Projects In Progress</span><b>1 / 1</b></div><div class="stat-card"><span>✓ &nbsp; Tasks Not Finished</span><b>1 / 1</b></div></div>
 <div class="dashboard-grid"><div class="dashboard-main">
  <div class="card dashboard-activity"><div class="tabs">
   <button class="tab ${state.dashboardTab==="tasks"?"active":""}" onclick="setDashboardTab('tasks')">☷ My Tasks</button>
   <button class="tab ${state.dashboardTab==="projects"?"active":""}" onclick="setDashboardTab('projects')">☷ My Projects</button>
   <button class="tab ${state.dashboardTab==="reminders"?"active":""}" onclick="setDashboardTab('reminders')">◷ My Reminders</button>
   <button class="tab ${state.dashboardTab==="tickets"?"active":""}" onclick="setDashboardTab('tickets')">Tickets</button>
   <button class="tab ${state.dashboardTab==="announcements"?"active":""}" onclick="setDashboardTab('announcements')">Announcements</button></div>
   <div class="widget-body">${dashboardTabContent()}</div></div>
  <div class="calendar"><div class="calendar-head"><div class="calendar-nav"><button class="btn btn-light btn-sm" onclick="calendarNav(-1)">‹</button><button class="btn btn-light btn-sm" onclick="calendarNav(1)">›</button><button class="btn btn-light btn-sm" onclick="calendarToday()">Today</button></div><div></div><div class="calendar-modes"><button class="btn ${state.calendarView==="month"?"btn-dark":"btn-light"} btn-sm" onclick="setCalendarView('month')">Month</button><button class="btn ${state.calendarView==="week"?"btn-dark":"btn-light"} btn-sm" onclick="setCalendarView('week')">Week</button><button class="btn ${state.calendarView==="day"?"btn-dark":"btn-light"} btn-sm" onclick="setCalendarView('day')">Day</button></div></div>${calendarHtml()}</div>
 </div><div class="dashboard-side"><div class="card side-widget"><div class="card-head">✓ My To Do Items</div><div class="widget-body"><b>Latest to do's</b><p>No todos found</p><br><b>✓ Latest finished to do's</b><p>No finished todos found</p></div></div>
 <div class="card side-widget"><div class="card-head">▣ Leads Overview</div><div class="widget-body">Lead &nbsp; Web Lead &nbsp; Customer<br><br>Lost Leads</div></div>
 <div class="card side-widget"><div class="card-head">☷ Statistics by Project Status</div><div class="widget-body">Not Started &nbsp; In Progress &nbsp; On Hold<br><br>Cancelled &nbsp; Finished</div></div></div></div>`, "dashboard");
}

function filterDropdown(kind){
 if(kind==="project"){
  if(!state.projectFilterOpen)return "";
  return `<div class="dropdown">${["All","Not Started","In Progress","On Hold","Cancelled","Finished"].map(x=>`<a onclick="setProjectFilter('${x}')">${x}</a>`).join("")}</div>`;
 }
 if(!state.taskFilterOpen)return "";
 const groups=[["All"],["Not Started","In Progress","Testing","Awaiting Feedback","Complete"],["Today's tasks","Due Date Passed","Upcoming Tasks"],["Tasks assigned to me","Tasks i'm following"]];
 return `<div class="dropdown">${groups.map((g,i)=>`${i?'<div class="divider"></div>':''}${g.map(x=>`<a onclick="setTaskFilter(${JSON.stringify(x)})">${x}</a>`).join("")}`).join("")}</div>`;
}
function setProjectFilter(x){state.projectFilter=x;state.projectFilterOpen=false;render()}
function setTaskFilter(x){state.taskFilter=x;state.taskFilterOpen=false;render()}
function projectVisible(){
 const q=state.projectQuery.toLowerCase(); let ok=!q||Object.values(project).join(" ").toLowerCase().includes(q);
 if(state.projectFilter!=="All") ok=ok&&project.status===state.projectFilter;
 if(state.projectStartFilter) ok=ok&&project.start>=state.projectStartFilter;
 if(state.projectEndFilter) ok=ok&&project.deadline<=state.projectEndFilter;
 return ok;
}
function setProjectDate(which,value){state[which]=value;render()}
function clearProjectDates(){state.projectStartFilter="";state.projectEndFilter="";render()}
function taskVisible(){
 const q=state.taskQuery.toLowerCase(); let ok=!q||Object.values(task).join(" ").toLowerCase().includes(q);
 const f=state.taskFilter;
 if(f==="All")return ok;if(f==="In Progress")return ok&&task.status==="In Progress";
 if(f==="Today's tasks")return ok&&task.start==="2026-08-10";
 if(f==="Tasks assigned to me")return ok;
 if(f==="Tasks i'm following")return ok;
 return false;
}

function projects(){
 const visible=projectVisible();
 return crmFrame(`<div class="toolbar"><button class="small-square">☷</button><div class="filter-wrap"><button class="filter-btn ${state.projectFilterOpen?"focus":""}" onclick="state.projectFilterOpen=!state.projectFilterOpen;render()">▼</button>${filterDropdown("project")}</div></div>
 <div class="card"><div class="card-head">▱ <span>Projects Summary</span></div>
 <div class="summary-row"><div class="summary-cell"><span class="summary-main"><span class="summary-number">${project.status==="Not Started"?1:0}</span><span class="status-not">Not Started</span></span></div>
 <div class="summary-cell"><span class="summary-main"><span class="summary-number">${project.status==="In Progress"?1:0}</span><span class="status-progress">In Progress</span></span></div>
 <div class="summary-cell"><span class="summary-main"><span class="summary-number">0</span><span class="status-hold">On Hold</span></span></div>
 <div class="summary-cell"><span class="summary-main"><span class="summary-number">0</span><span class="status-cancel">Cancelled</span></span></div>
 <div class="summary-cell"><span class="summary-main"><span class="summary-number">0</span><span class="status-finish">Finished</span></span></div></div>
 <div class="table-tools"><select class="select-sm"><option>25</option></select><button class="btn btn-light btn-sm">Export</button><button class="btn btn-light btn-sm">↻</button>
 <div class="date-range"><input type="date" class="input-sm" value="${state.projectStartFilter}" onchange="setProjectDate('projectStartFilter',this.value)" title="Start date"><span class="input-sm date-to">to</span><input type="date" class="input-sm" value="${state.projectEndFilter}" onchange="setProjectDate('projectEndFilter',this.value)" title="End date"><button class="btn btn-light btn-sm clear-date" onclick="clearProjectDates()" title="Clear dates">×</button></div>
 <div class="table-search"><div class="search-group"><span>⌕</span><input class="input-sm" placeholder="Search..." value="${esc(state.projectQuery)}" oninput="state.projectQuery=this.value;render()"></div></div></div>
 <div class="table-wrap"><table class="data-table"><thead><tr><th>#</th><th>Project Name</th><th>Customer</th><th>Tags</th><th>Start Date</th><th>Deadline</th><th>Members</th><th>Status</th></tr></thead>
 <tbody>${visible?`<tr><td>1</td><td><a onclick="navigate('projectDetails')">${project.name}</a></td><td>${project.customer}</td><td>${project.tags}</td><td>${project.start}</td><td>${project.deadline}</td><td>${project.members}</td><td><span class="pill progress">${project.status}</span></td></tr>`:`<tr><td colspan="8" class="empty">No entries found</td></tr>`}</tbody></table></div></div>`, "projects");
}

function projectDetails(){
 return crmFrame(`<button class="btn btn-light back-link" onclick="navigate('projects')">Back to projects list</button>
 <h1 class="page-title">${project.name}</h1>
 <div class="task-details-grid"><div class="task-main"><div class="task-title-bar"><h2>Project Details</h2><span class="pill progress">${project.status}</span></div>
 <div class="task-section"><div class="task-info-grid"><div class="info-box"><div class="info-label">Customer</div><div class="info-value">${project.customer}</div></div><div class="info-box"><div class="info-label">Tags</div><div class="info-value">${project.tags}</div></div><div class="info-box"><div class="info-label">Start Date</div><div class="info-value">${project.start}</div></div><div class="info-box"><div class="info-label">Deadline</div><div class="info-value">${project.deadline}</div></div></div></div>
 <div class="task-section"><h3>Tasks</h3><table class="data-table"><thead><tr><th>#</th><th>Name</th><th>Status</th><th>Start Date</th><th>Due Date</th><th>Assigned to</th></tr></thead><tbody><tr><td>1</td><td><a onclick="navigate('taskDetails')">Design Training Task</a></td><td><span class="pill progress">In Progress</span></td><td>${task.start}</td><td>${task.due}</td><td>${task.assigned}</td></tr></tbody></table></div></div>
 <div class="task-side"><div class="side-block"><b>Members</b><div class="people"><span class="person-dot">TE</span>${project.members}</div></div><div class="side-block"><b>Project Status</b><p class="status-progress">In Progress</p></div></div></div>`, "projects");
}

function tasks(){
 const visible=taskVisible();
 return crmFrame(`<div class="toolbar"><button class="small-square">⠿</button><div><button class="btn btn-success green-overview" onclick="navigate('tasksOverview')">Tasks Overview</button><span class="filter-wrap"><button class="filter-btn ${state.taskFilterOpen?"focus":""}" onclick="state.taskFilterOpen=!state.taskFilterOpen;render()">▼</button>${filterDropdown("task")}</span></div></div>
 <div class="card task-summary"><div class="card-head">▱ <span>Tasks Summary</span></div><div class="summary-row">
 <div class="summary-cell"><span class="summary-main"><span class="summary-number">0</span><span class="status-not">Not Started</span></span><small>Tasks assigned to me: 0</small></div>
 <div class="summary-cell"><span class="summary-main"><span class="summary-number">1</span><span class="status-progress">In Progress</span></span><small>Tasks assigned to me: 1</small></div>
 <div class="summary-cell"><span class="summary-main"><span class="summary-number">0</span><span style="color:#008fd4">Testing</span></span><small>Tasks assigned to me: 0</small></div>
 <div class="summary-cell"><span class="summary-main"><span class="summary-number">0</span><span class="status-finish">Awaiting Feedback</span></span><small>Tasks assigned to me: 0</small></div>
 <div class="summary-cell"><span class="summary-main"><span class="summary-number">0</span><span style="color:#00b945">Complete</span></span><small>Tasks assigned to me: 0</small></div></div>
 <div class="table-tools"><select class="select-sm"><option>25</option></select><button class="btn btn-light btn-sm">Export</button><button class="btn btn-light btn-sm">Bulk Actions</button><button class="btn btn-light btn-sm">↻</button><div class="table-search"><div class="search-group"><span>⌕</span><input class="input-sm" placeholder="Search..." value="${esc(state.taskQuery)}" oninput="state.taskQuery=this.value;render()"></div></div></div>
 <div class="table-wrap"><table class="data-table"><thead><tr><th>□</th><th>#</th><th>Name</th><th>Status</th><th>Start Date</th><th>Due Date</th><th>Assigned to</th><th>Tags</th><th>Priority</th></tr></thead>
 <tbody>${visible?`<tr><td>□</td><td>1</td><td><a onclick="navigate('taskDetails')">${task.name}</a></td><td><span class="pill progress">${task.status}</span></td><td>${task.start}</td><td>${task.due}</td><td>${task.assigned}</td><td>${task.tags}</td><td><span class="pill medium">${task.priority}</span></td></tr>`:`<tr><td colspan="9" class="empty">No entries found</td></tr>`}</tbody></table></div></div>`, "tasks");
}

function tasksOverview(){
 const monthName=new Date(Number(state.overviewYear),Number(state.overviewMonth)-1,1).toLocaleDateString("en-US",{month:"long"});
 return crmFrame(`<div class="overview-filters"><button class="btn btn-light" onclick="navigate('tasks')">Back to tasks list</button>
 <select class="form-control" onchange="state.overviewMonth=this.value"><option value="8" ${state.overviewMonth==="8"?"selected":""}>August</option><option value="7" ${state.overviewMonth==="7"?"selected":""}>July</option><option value="9" ${state.overviewMonth==="9"?"selected":""}>September</option></select>
 <select class="form-control" onchange="state.overviewStatus=this.value"><option>All</option><option>In Progress</option><option>Complete</option><option>Awaiting Feedback</option></select>
 <select class="form-control" onchange="state.overviewYear=this.value"><option>2026</option><option>2025</option></select>
 <button class="btn btn-primary" onclick="applyOverviewFilter()">Filter</button></div>
 <div class="card" id="overviewResult"><div class="overview-placeholder"><span>Choose the filters above and click <b>Filter</b>.</span></div></div>`, "tasks");
}
function applyOverviewFilter(){
 const box=document.getElementById("overviewResult"); if(!box)return;
 const matching=state.overviewYear==="2026"&&state.overviewMonth==="8"&&(state.overviewStatus==="All"||state.overviewStatus==="In Progress");
 const name=new Date(Number(state.overviewYear),Number(state.overviewMonth)-1,1).toLocaleDateString("en-US",{month:"long",year:"numeric"});
 box.innerHTML=`<div class="card-head">${name} • Tasks Overview</div><div class="overview-result">${matching?`<div class="overview-task"><div><b>Design Training Task</b><span class="pill progress">In Progress</span></div><small>Assigned to: Training Employee</small><small>Start: 2026-08-10 &nbsp; • &nbsp; Due: 2026-08-15</small></div>`:`<div class="empty-state">No matching tasks found.</div>`}</div>`;
}

function taskDetails(){
 const comments=state.comments.map(c=>`<div class="comment"><b>${esc(c.text)}</b><br><a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.url)}</a><div class="muted">${esc(c.time)}</div></div>`).join("")||`<div class="muted">No comments yet.</div>`;
 const sheets=state.timesheets.map((x,i)=>`<tr><td>${i+1}</td><td>${esc(x.date)}</td><td>${esc(x.start)}</td><td>${esc(x.end)}</td><td>${secondsToHMS(x.duration)}</td><td>${esc(x.notes)}</td></tr>`).join("")||`<tr><td colspan="6">No timesheets yet.</td></tr>`;
 const total=secondsToHMS(totalLoggedSeconds()+currentElapsed());
 return crmFrame(`<button class="btn btn-light back-link" onclick="navigate('tasks')">Back to tasks list</button>
 <div class="task-details-grid"><div class="task-main"><div class="task-title-bar"><h2>${task.name}</h2><span class="pill progress">${task.status}</span></div>
 <div class="task-section"><h3>Task Information</h3><div class="task-info-grid"><div class="info-box"><div class="info-label">Status</div><div class="info-value">${task.status}</div></div><div class="info-box"><div class="info-label">Priority</div><div class="info-value">${task.priority}</div></div><div class="info-box"><div class="info-label">Start Date</div><div class="info-value">${task.start}</div></div><div class="info-box"><div class="info-label">Due Date</div><div class="info-value">${task.due}</div></div><div class="info-box"><div class="info-label">Your logged time</div><div class="info-value" id="yourLogged">${total}</div></div><div class="info-box"><div class="info-label">Total logged time</div><div class="info-value" id="totalLogged">${total}</div></div></div></div>
 <div class="task-section"><h3>Comments</h3><p class="muted">Write what was completed and add the link only.</p><div class="comment-form"><input id="commentText" class="form-control" placeholder="What was completed?"><input id="commentUrl" class="form-control" placeholder="https://..."><button class="btn btn-primary" onclick="addComment()">Add Comment</button></div><div class="comments-list">${comments}</div></div>
 <div class="task-section"><h3>Timesheets</h3><div class="table-wrap"><table class="timesheet-table"><thead><tr><th>#</th><th>Date</th><th>Start</th><th>End</th><th>Duration</th><th>Notes</th></tr></thead><tbody>${sheets}</tbody></table></div></div>
 </div><div class="task-side"><div class="timer-card"><div class="info-label">WORK TIMER</div><div class="timer-display" id="timerDisplay">${secondsToHMS(currentElapsed())}</div>${state.timerRunning?`<button class="btn btn-danger" onclick="stopTimer()">Stop Timer</button>`:`<button class="btn btn-success" onclick="startTimer()">Start Timer</button>`}<p class="muted">Stop the timer during breaks.</p></div>
 <div class="side-block"><b>Assignees</b><div class="people"><span class="person-dot">TE</span>${task.assigned}</div></div><div class="side-block"><b>Followers</b><div class="people"><span class="person-dot">TS</span>${task.followers}</div></div><div class="side-block"><b>Tags</b><p><span class="pill">${task.tags}</span></p></div></div></div>`, "taskDetails");
}

function startTimer(){
 if(state.timerRunning)return;state.timerRunning=true;state.timerStartedAt=Date.now();startTick();render();
}
function startTick(){
 clearInterval(state.timerInterval);
 if(state.timerRunning)state.timerInterval=setInterval(()=>{
  const d=document.getElementById("timerDisplay"),y=document.getElementById("yourLogged"),t=document.getElementById("totalLogged");
  const val=secondsToHMS(currentElapsed());if(d)d.textContent=val;if(y)y.textContent=val;if(t)t.textContent=val;
 },1000);
}
function stopTimer(){if(!state.timerRunning)return;document.getElementById("notesModal").classList.remove("hidden")}
function closeNotesModal(){document.getElementById("notesModal").classList.add("hidden")}
function saveTimerEntry(){
 const notes=document.getElementById("timerNotes").value.trim();
 const end=Date.now(),duration=Math.max(1,Math.floor((end-state.timerStartedAt)/1000));
 const st=new Date(state.timerStartedAt),en=new Date(end);
 state.timesheets.unshift({date:st.toLocaleDateString("en-GB"),start:st.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"}),end:en.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"}),duration,notes});
 localStorage.setItem("smTrainingTimesheets",JSON.stringify(state.timesheets));
 state.timerRunning=false;state.timerStartedAt=null;state.elapsedBefore=0;clearInterval(state.timerInterval);closeNotesModal();render();
}
function addComment(){
 const text=document.getElementById("commentText").value.trim(),url=document.getElementById("commentUrl").value.trim();
 if(!text||!url){alert("Enter what was completed and the link.");return}
 try{const u=new URL(url);if(!["http:","https:"].includes(u.protocol))throw 0}catch(e){alert("Please enter a valid http/https link.");return}
 state.comments.unshift({text,url,time:new Date().toLocaleString()});localStorage.setItem("smTrainingComments",JSON.stringify(state.comments));render();
}

function imagePage(title,files,key){
 return crmFrame(`<div class="media-view"><h2>${title}</h2><div class="image-stack">${files.map(f=>`<div class="image-tile"><img src="assets/${f}" onclick="openLightbox(this.src)" alt="${title}"></div>`).join("")}</div></div>`, "important-"+key);
}
function workspace(){return imagePage("Google Workspace Services",["google-workspace.png"],"workspace")}
function kpis(){return imagePage("KPI's",["kpi-social-developers.png","kpi-design-content.png"],"kpis")}
function policies(){return imagePage("Company Policies",["company-policies-1.png","company-policies-2.png"],"policies")}
function templates(){
 return crmFrame(`<div class="link-info"><h2>Templates</h2><p>Smart Media SM Plan</p></div><div class="link-info"><h3>SM Letterhead</h3><p>Company approved letterhead templates for official documents.</p></div><div class="link-info"><h3>SM Logo &amp; Identity</h3><p>Approved company logo and identity assets.</p></div>`, "templates");
}
function zenhr(){return crmFrame(`<div class="link-info"><h2>ZenHR — Jordan</h2><p>This training page explains the approved HR system. No real login is performed here.</p><button class="btn btn-primary" onclick="alert('Training simulation only')">Open ZenHR Training</button></div>`, "hr")}
function trainingPath(active,steps){
 return `<div class="training-workspace"><div class="training-title"><div><h2>Design Department Training</h2><p>Interactive file organization simulation</p></div><span class="training-badge">TRAINING</span></div><div class="folder-breadcrumb">${steps.map((x,i)=>`<span class="${i===steps.length-1?'current':''}">${x}</span>`).join('<b>›</b>')}</div>${active}</div>`;
}
function fileManagement(){
 const body=`<div class="sim-card"><h3>Project Files</h3><p class="sim-help">Follow the folder structure used for project work (excluding social media).</p><div class="folder-grid"><button class="folder" onclick="document.getElementById('fileStep').innerHTML='✓ All client selected → Next: Training Client'">📁<b>All client</b><small>Main client folder</small></button><button class="folder" onclick="document.getElementById('fileStep').innerHTML='✓ Training Client selected → Next: Training Employee'">📁<b>Training Client</b><small>Client folder</small></button><button class="folder" onclick="document.getElementById('fileStep').innerHTML='✓ Employee folder selected → Save Design Training Task + source file'">📁<b>Training Employee</b><small>Employee folder</small></button></div><div id="fileStep" class="sim-status">Start with <b>All client</b>.</div><div class="file-example"><span>▧</span><div><b>Design Training Task.ai</b><small>Source file</small></div><span class="ok">Ready</span></div><div class="file-example"><span>▧</span><div><b>Design Training Task.pdf</b><small>Export / deliverable</small></div><span class="ok">Ready</span></div></div>`;
 return crmFrame(trainingPath(body,['Drive','All client','Training Client','Training Employee']),'fileManagement');
}
function socialFiles(){
 const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
 const body=`<div class="sim-card"><h3>Social Media Files</h3><p class="sim-help">Organize social media designs by year, then month.</p><div class="folder-grid"><button class="folder" onclick="document.getElementById('socialStep').innerHTML='✓ Year 2025 selected. Now choose the month.'">📁<b>2025</b><small>Year</small></button><button class="folder" onclick="document.getElementById('socialStep').innerHTML='✓ August selected. Save the social media designs here.'">📁<b>August</b><small>Month</small></button></div><div id="socialStep" class="sim-status">Choose <b>2025</b>, then <b>August</b>.</div><div class="month-strip">${months.map(m=>`<span class="${m==='August'?'selected':''}">${m}</span>`).join('')}</div></div>`;
 return crmFrame(trainingPath(body,['Social Media','2025','August']),'socialFiles');
}
function presentations(){
 const body=`<div class="sim-card"><h3>Approved Presentations</h3><div class="presentation-grid"><div class="presentation-card"><div class="presentation-preview">SMART<br>MEDIA</div><b>Jordan Presentation</b><small>Use Jordan logo + Jordan website</small><span class="approved">Approved Template</span></div><div class="presentation-card"><div class="presentation-preview">SMART<br>MEDIA</div><b>Saudi Arabia Presentation</b><small>Use the dedicated Saudi template/link</small><span class="approved">Approved Template</span></div></div><div class="sim-warning">Do not send or use a presentation outside the approved Smart Media templates.</div></div>`;
 return crmFrame(trainingPath(body,['Templates','Presentations']),'presentations');
}
function pendingDesign(){
 const rows=[['Social Media Plan','Training Client','Training Employee','12 Aug 2026','In Progress'],['Campaign Content','Demo Campaign','Designer A','13 Aug 2026','Awaiting Feedback'],['Logo & Visual Identity Update','Demo Brand','Designer B','15 Aug 2026','Not Started'],['Product Advertisement','Demo Product','Training Employee','17 Aug 2026','In Progress']];
 const body=`<div class="sim-card"><div class="pending-head"><div><h3>Pending Design Tasks</h3><p class="sim-help">Daily follow-up table for design deadlines and responsibilities.</p></div><select id="memberFilter" class="select-sm" onchange="filterPending(this.value)"><option>All Members</option><option>Training Employee</option><option>Designer A</option><option>Designer B</option></select></div><div class="table-wrap"><table class="data-table pending-table"><thead><tr><th>Task</th><th>Project</th><th>Assigned Member</th><th>Deadline</th><th>Status</th></tr></thead><tbody id="pendingRows">${rows.map(r=>`<tr data-member="${r[2]}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><span class="pill progress">${r[4]}</span></td></tr>`).join('')}</tbody></table></div></div>`;
 return crmFrame(trainingPath(body,['Design Team','Pending Tasks']),'pendingDesign');
}
function filterPending(member){document.querySelectorAll('#pendingRows tr').forEach(r=>r.style.display=(member==='All Members'||r.dataset.member===member)?'':'none')}
function socialTrainingFrame(title,subtitle,body,crumbs,active){return crmFrame(`<div class="training-workspace"><div class="training-title"><div><h2>${title}</h2><p>${subtitle}</p></div><span class="training-badge social-badge">SOCIAL MEDIA</span></div><div class="folder-breadcrumb">${crumbs.map((x,i)=>`<span class="${i===crumbs.length-1?'current':''}">${x}</span>`).join('<b>›</b>')}</div>${body}</div>`,active)}
function socialDrive(){const body=`<div class="sim-card"><h3>Google Drive Policy Check</h3><div class="policy-choice"><button class="choice-good" onclick="document.getElementById('driveResult').innerHTML='✓ Correct — Share the approved Google Drive link with the client.'">Google Drive Link</button><button class="choice-bad" onclick="document.getElementById('driveResult').innerHTML='✕ Not approved — Do not use My Drive for client work.'">My Drive</button></div><div id="driveResult" class="sim-status">Choose the approved way to share client files.</div></div>`;return socialTrainingFrame('Social Media Department Training','Company Drive policy',body,['Social Media','Drive Policy'],'socialDrive')}
function meetingReports(){const body=`<div class="sim-card"><h3>Meeting Summary Builder</h3><div class="form-grid"><label>Day / Date<input class="form-control" type="date" value="2026-08-11"></label><label>Time<input class="form-control" type="time" value="10:00"></label><label class="wide">Attendees<input class="form-control" value="Client, Account Manager, Social Media Specialist"></label><label class="wide">Discussion & Agreements<textarea class="form-control" rows="4">Monthly content plan, publishing schedule and next actions.</textarea></label></div><button class="btn btn-primary" onclick="document.getElementById('meetingDone').innerHTML='✓ Meeting summary is ready to be sent to the client by email.'">Prepare Summary</button><div id="meetingDone" class="sim-status">Complete the required meeting information.</div></div>`;return socialTrainingFrame('Meeting Summary','Practice documenting a client meeting',body,['Social Media','Meetings','Summary'],'meetingReports')}
function monthlyPlan(){const slides=['Smart Media Logo','Agreements & Monthly Plan','Client Profile + Cover','Posts Link','Reels Link','Post # / Platforms / Date / Caption'];const body=`<div class="sim-card"><div class="plan-head"><div><h3>Monthly Plan Checklist</h3><p class="sim-help">Poppins • Size 12 • Approved regional template</p></div><span class="approved">Template Ready</span></div><div class="slide-list">${slides.map((x,i)=>`<button onclick="this.classList.toggle('done')"><b>Slide ${i+1}</b><span>${x}</span><small>✓</small></button>`).join('')}</div></div>`;return socialTrainingFrame('Monthly Social Media Plan','Interactive plan checklist',body,['Social Media','Monthly Plan'],'monthlyPlan')}
function monthlyReports(){const body=`<div class="sim-card"><h3>Monthly Reporting & Publishing Tracker</h3><div class="tracker-grid"><div><b>Monthly Report</b><span>August 2026</span><button class="btn btn-light btn-sm" onclick="this.textContent='Sent ✓'">Send to Client</button></div><div><b>Publishing Calendar</b><span>Daily tracking required</span><button class="btn btn-light btn-sm" onclick="this.textContent='Checked ✓'">Check Today</button></div><div><b>Motion Request</b><span>Use approved details template</span><button class="btn btn-light btn-sm" onclick="this.textContent='Template Open ✓'">Open Template</button></div></div></div>`;return socialTrainingFrame('Monthly Reports','Reporting, publishing and motion workflow',body,['Social Media','Reports & Publishing'],'monthlyReports')}
function clientFolders(){const body=`<div class="sim-card"><h3>Client Folder Structure</h3><div class="folder-tree"><div>📁 Training Client</div><div class="level1">└─ 📁 2026</div><div class="level2">├─ 📁 Social Media Plans <small>Training Client + August + 2026</small></div><div class="level2">├─ 📁 Reports <small>Training Client + August + 2026</small></div><div class="level2">└─ 📁 Meeting Summaries <small>Training Client + August + 2026</small></div></div><div class="sim-status">Each folder should contain only its matching file type.</div></div>`;return socialTrainingFrame('Client File Organization','Practice the approved folder structure',body,['Drive','Training Client','2026'],'clientFolders')}
function paymentCards(){const body=`<div class="sim-card"><h3>Payment Card Scenario</h3><p class="sim-help">The client asks you to add a payment card to their account. What should you do?</p><div class="scenario-actions"><button onclick="document.getElementById('cardResult').innerHTML='✕ Incorrect — Never request or view the client card details.'">Ask for card details</button><button class="correct" onclick="document.getElementById('cardResult').innerHTML='✓ Correct — The client adds the card. Provide the approved tutorial or assistance without requesting card data.'">Client adds the card</button></div><div id="cardResult" class="sim-status">Choose an action.</div></div>`;return socialTrainingFrame('Payment Cards','Client payment data policy',body,['Social Media','Payment Cards'],'paymentCards')}
function pendingVideo(){const rows=[['Video Edit — Training Reel','Training Client','Video Trainee','12 Aug 2026','In Progress'],['Product Shoot Cut','Demo Product','Video Editor A','14 Aug 2026','Awaiting Feedback'],['Campaign Reel','Demo Campaign','Video Editor B','16 Aug 2026','Not Started']];const body=`<div class="sim-card"><div class="pending-head"><div><h3>Pending Video Production Tasks</h3><p class="sim-help">Daily follow-up for deadlines and responsibilities.</p></div></div><div class="table-wrap pending-video-scroll" role="region" aria-label="Pending Video Production Tasks table" tabindex="0"><table class="data-table pending-video-table"><thead><tr><th>Task</th><th>Project</th><th>Assigned Member</th><th>Deadline</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr>${r.map((x,i)=>`<td>${i===4?`<span class="pill progress">${x}</span>`:x}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="scroll-hint">↔ Scroll horizontally to view all columns</div></div>`;return crmFrame(`<div class="training-workspace"><div class="training-title"><div><h2>Video Production Department Training</h2><p>CRM workflow is shared; this page covers the department pending-task table.</p></div><span class="training-badge">VIDEO</span></div>${body}</div>`,'pendingVideo')}
function support(){return genericTable("Tickets Summary",["Open","In Progress","Answered","On Hold","Closed"],["#","Subject","Tags","Department","Service","Contact","Status","Priority","Last Reply","Created"],"support")}
function leads(){return genericTable("Leads Summary",["Lead","Web Lead","Customer","Lost Leads"],["#","Name","Company","Email","Phone","Status"],"leads")}
function utilities(){return crmFrame(`<div class="link-info"><h2>Utilities</h2><p>Media</p><p>Calendar</p></div>`, "utilities")}
function genericTable(title,statuses,cols,active){
 return crmFrame(`<div class="toolbar"><button class="btn btn-primary">+ New Ticket</button><button class="filter-btn">▼</button></div><div class="card"><div class="card-head">▱ ${title}</div><div class="summary-row">${statuses.slice(0,5).map((s,i)=>`<div class="summary-cell"><span class="summary-number">0</span>${s}</div>`).join("")}</div><div class="table-tools"><select class="select-sm"><option>25</option></select><button class="btn btn-light btn-sm">Export</button><button class="btn btn-light btn-sm">Bulk Actions</button><div class="table-search"><div class="search-group"><span>⌕</span><input class="input-sm" placeholder="Search..."></div></div></div><table class="data-table"><thead><tr>${cols.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody><tr><td colspan="${cols.length}" class="empty">No entries found</td></tr></tbody></table></div>`,active);
}
function showExternal(name){alert(name+"\\n\\nTraining simulation: this link is not opened from the training copy.")}

function openLightbox(src){document.getElementById("lightboxImage").src=src;document.getElementById("lightbox").classList.remove("hidden")}
function closeLightbox(){document.getElementById("lightbox").classList.add("hidden")}
function resetTraining(){if(confirm("Reset timer entries and comments for the training task?")){localStorage.removeItem("smTrainingTimesheets");localStorage.removeItem("smTrainingComments");state.timesheets=[];state.comments=[];state.timerRunning=false;state.timerStartedAt=null;clearInterval(state.timerInterval);render()}}


function enablePendingVideoDrag(){
 const el=document.querySelector(".pending-video-scroll");
 if(!el || el.dataset.dragReady==="1") return;
 el.dataset.dragReady="1";
 let down=false,startX=0,startLeft=0;
 el.addEventListener("mousedown",e=>{
   if(e.button!==0)return;
   down=true;startX=e.pageX;startLeft=el.scrollLeft;
 });
 window.addEventListener("mouseup",()=>down=false);
 el.addEventListener("mouseleave",()=>down=false);
 el.addEventListener("mousemove",e=>{
   if(!down)return;
   e.preventDefault();
   el.scrollLeft=startLeft-(e.pageX-startX);
 });
 el.addEventListener("wheel",e=>{
   if(Math.abs(e.deltaY)>Math.abs(e.deltaX) && (e.shiftKey || e.altKey)){
     el.scrollLeft+=e.deltaY;
     e.preventDefault();
   }
 },{passive:false});
}

function navigate(page){state.page=page;state.projectFilterOpen=false;state.taskFilterOpen=false;if(page!=="login"&&page!=="forgot")state.loggedIn=true;render()}
function render(){
 const app=document.getElementById("app");
 const page=state.page;
 let crm,key;
 if(page==="login"||page==="forgot"){app.innerHTML=loginView(page==="forgot");return}
 switch(page){
  case "dashboard":crm=dashboard();key="dashboard";break;
  case "projects":crm=projects();key="projects";break;
  case "projectDetails":crm=projectDetails();key="projectDetails";break;
  case "tasks":crm=tasks();key="tasks";break;
  case "tasksOverview":crm=tasksOverview();key="overview";break;
  case "taskDetails":crm=taskDetails();key="taskDetails";break;
  case "workspace":crm=workspace();key="workspace";break;
  case "kpis":crm=kpis();key="kpis";break;
  case "policies":crm=policies();key="policies";break;
  case "templates":crm=templates();key="templates";break;
  case "zenhr":crm=zenhr();key="zenhr";break;
  case "fileManagement":crm=fileManagement();key="fileManagement";break;
  case "socialFiles":crm=socialFiles();key="socialFiles";break;
  case "presentations":crm=presentations();key="presentations";break;
  case "pendingDesign":crm=pendingDesign();key="pendingDesign";break;
  case "socialDrive":crm=socialDrive();key="socialDrive";break;
  case "meetingReports":crm=meetingReports();key="meetingReports";break;
  case "monthlyPlan":crm=monthlyPlan();key="monthlyPlan";break;
  case "monthlyReports":crm=monthlyReports();key="monthlyReports";break;
  case "clientFolders":crm=clientFolders();key="clientFolders";break;
  case "paymentCards":crm=paymentCards();key="paymentCards";break;
  case "pendingVideo":crm=pendingVideo();key="pendingVideo";break;
  case "support":crm=support();key="support";break;
  case "leads":crm=leads();key="leads";break;
  case "utilities":crm=utilities();key="utilities";break;
  default:crm=dashboard();key="dashboard";
 }
 app.innerHTML=shell(crm,key);
 if(state.timerRunning)startTick();
 if(page==="pendingVideo") requestAnimationFrame(enablePendingVideoDrag);
}
render();
