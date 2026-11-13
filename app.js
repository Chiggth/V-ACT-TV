(() => {
  const app = document.getElementById('app');
  const toast = document.getElementById('toast');
  const views = {home:'TỔNG QUAN',lessons:'LỘ TRÌNH',review:'ÔN TẬP',practice:'BÀI TẬP AI'};
  const readDone = () => { try { return JSON.parse(localStorage.getItem('vact-done') || '[]'); } catch { return []; } };
  let done = readDone();
  let currentView = 'home';
  let currentLesson = 0;
  let activeFilter = 'Tất cả';
  let toastTimer;

  function notify(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); }
  function save() { localStorage.setItem('vact-done', JSON.stringify(done)); }
  function progress() {
    const pct = Math.round(done.length / LESSONS.length * 100);
    document.getElementById('side-progress-text').textContent = `${done.length} / ${LESSONS.length} chặng`;
    document.getElementById('side-progress-percent').textContent = `${pct}%`;
    document.getElementById('side-progress-bar').style.width = `${pct}%`;
  }
  function setView(view) {
    currentView = view;
    document.querySelectorAll('.nav-link').forEach(el => el.classList.toggle('active', el.dataset.view === view));
    document.getElementById('crumb').textContent = views[view] || 'BÀI HỌC';
    document.getElementById('sidebar').classList.remove('open');
    if (view === 'home') renderHome();
    if (view === 'lessons') renderLessons();
    if (view === 'review') renderReview();
    if (view === 'practice') renderPractice();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function renderHome() {
    const next = LESSONS.findIndex(x => !done.includes(x.id));
    const nextIndex = next < 0 ? 0 : next;
    const lesson = LESSONS[nextIndex];
    app.innerHTML = `
      <section class="hero"><div><div class="eyebrow">LỘ TRÌNH TỰ HỌC · 8 CHẶNG</div><h1>Tiếng Việt, <em>từng bước</em> vững vàng.</h1><p class="hero-copy">Một không gian học tập được chia nhỏ từ 8 tập tài liệu V-ACT: nắm lý thuyết, xem ví dụ, tự kiểm tra và quay lại ôn đúng phần cần nhớ.</p><div class="hero-actions"><button class="btn btn-primary" data-open="${lesson.id}">${done.length===8?'HỌC LẠI TỪ ĐẦU':'TIẾP TỤC HỌC'} <span>→</span></button><button class="btn btn-secondary" data-go="review">ÔN KIẾN THỨC</button></div></div><aside class="hero-note"><div class="quote-mark">“</div><p>Hiểu từ ngữ để đọc sâu hơn. Đọc sâu hơn để thấy nhiều điều.</p><small>GHI CHÚ CHO HÀNH TRÌNH HỌC</small></aside></section>
      <div class="section-head"><div><div class="eyebrow">BẮT ĐẦU TỪ ĐÂY</div><h2>Chặng tiếp theo của bạn</h2></div><p>${done.length} / 8 chặng đã hoàn thành</p></div>
      <section class="overview-grid"><article class="card featured-card"><span class="lesson-num">${lesson.number}</span><div><h3>${lesson.title}</h3><p>${lesson.subtitle}</p><button class="continue-link" data-open="${lesson.id}">VÀO BÀI HỌC <span>→</span></button></div><div class="featured-icon">${lesson.icon}</div></article><article class="card stats-card"><div><div class="eyebrow">TIẾN ĐỘ HỌC</div><div class="stat-number serif">${done.length}<span style="font-size:24px;color:#a7a69e"> / 8</span></div><p>Chặng đã đánh dấu hoàn thành</p></div><div class="featured-icon">${done.length===8?'✓':'↗'}</div><div class="tiny-rule"></div><div class="stat-foot"><span>Còn lại</span><strong>${8-done.length} CHẶNG</strong></div></article></section>
      <div class="section-head"><div><div class="eyebrow">8 CHẶNG · HỌC THEO NHỊP CỦA BẠN</div><h2>Thư viện kiến thức</h2></div><button class="btn btn-ghost" data-go="lessons">XEM LỘ TRÌNH ĐẦY ĐỦ →</button></div>
      <section class="lesson-grid">${LESSONS.map(lessonCard).join('')}</section>
      <div class="source-strip"><strong>NGUỒN NỘI DUNG</strong><span>Tóm lược lý thuyết từ các tập PDF được cung cấp; ví dụ và câu tự kiểm tra trong trang được biên soạn mới để luyện vận dụng.</span></div>`;
    bindCommon();
  }
  function lessonCard(l) { return `<article class="card lesson-card ${done.includes(l.id)?'done':''}" data-open="${l.id}" tabindex="0" role="button"><div class="lesson-icon">${l.icon}</div><div><div class="lesson-num">CHẶNG ${l.number}</div><h3>${l.title}</h3><p>${l.subtitle}</p><div class="lesson-meta">${l.time.toUpperCase()} · ${l.sections.length} MỤC</div></div><span class="lesson-arrow">↗</span></article>`; }
  function renderLessons() {
    app.innerHTML = `<header class="view-title"><div class="eyebrow">LỘ TRÌNH TỰ HỌC · ĐI TỪ NỀN TẢNG ĐẾN VẬN DỤNG</div><h1>Thư viện kiến thức</h1><p>Tám chặng độc lập để bạn học theo thời gian của mình. Mỗi bài có phần tóm lược, ví dụ và một câu hỏi tự kiểm tra.</p></header><section class="lesson-grid">${LESSONS.map(lessonCard).join('')}</section><div class="source-strip"><strong>PHẠM VI TÀI LIỆU</strong><span>Tập 1 hệ thống các chuyên đề nền tảng; các tập 2–8 cung cấp câu hỏi và ngữ liệu đọc hiểu để mở rộng phần vận dụng. Nguồn được ghi ở đầu từng chặng.</span></div>`;
    bindCommon();
  }
  function renderLesson(index) {
    currentLesson = index;
    const l = LESSONS[index];
    currentView = 'lesson';
    document.querySelectorAll('.nav-link').forEach(el => el.classList.toggle('active', el.dataset.view === 'lessons'));
    document.getElementById('crumb').textContent = `CHẶNG ${l.number} · ${l.title.toLocaleUpperCase('vi')}`;
    app.innerHTML = `<div class="lesson-layout"><nav class="card lesson-toc"><div class="toc-title">TRONG BÀI NÀY</div>${l.sections.map((s,i)=>`<button class="toc-link ${i===0?'active':''}" data-scroll="section-${i}">${s.title}</button>`).join('')}<button class="toc-link" data-scroll="self-check">Tự kiểm tra</button></nav><article class="card lesson-article"><header class="lesson-header"><div class="eyebrow">CHẶNG ${l.number} · ${l.time.toUpperCase()}</div><h1>${l.title}</h1><p>${l.subtitle}</p><span class="source-tag">NGUỒN: ${l.source}</span></header>${l.sections.map((s,i)=>`<section class="theory-section" id="section-${i}"><h2>${s.title}</h2><p>${s.text}</p><div class="example-grid">${s.examples.map(e=>`<div class="example"><b>${e[0]}</b><p>${e[1]}</p></div>`).join('')}</div></section>`).join('')}<section class="knowledge-check" id="self-check"><div class="eyebrow">DỪNG LẠI MỘT CHÚT</div><h3>Tự kiểm tra</h3><p class="question">${l.quiz.q}</p><div class="answer-options">${l.quiz.options.map((o,i)=>`<button class="answer-option" data-answer="${i}"><span>${String.fromCharCode(65+i)}.</span> ${o}</button>`).join('')}</div><p class="answer-result" aria-live="polite"></p></section><div class="lesson-bottom"><button class="btn btn-secondary" data-navback>← DANH SÁCH CHẶNG</button><button class="btn btn-primary" data-complete="${l.id}">${done.includes(l.id)?'ĐÃ HOÀN THÀNH ✓':'ĐÁNH DẤU HOÀN THÀNH'}</button></div></article></div>`;
    app.querySelectorAll('[data-scroll]').forEach(btn=>btn.addEventListener('click',()=>{document.getElementById(btn.dataset.scroll).scrollIntoView({behavior:'smooth',block:'start'});app.querySelectorAll('.toc-link').forEach(b=>b.classList.remove('active'));btn.classList.add('active');}));
    app.querySelectorAll('[data-answer]').forEach(btn=>btn.addEventListener('click',()=>{
      const selected=Number(btn.dataset.answer);const correct=selected===l.quiz.answer;
      app.querySelectorAll('.answer-option').forEach((b,i)=>{b.disabled=true;if(i===l.quiz.answer)b.classList.add('selected-correct');else if(i===selected)b.classList.add('selected-wrong');});
      const result=app.querySelector('.answer-result');result.textContent=`${correct?'Chính xác.':'Chưa đúng.'} ${l.quiz.explain}`;if(!correct)result.classList.add('wrong');
    }));
    app.querySelector('[data-navback]').addEventListener('click',()=>setView('lessons'));
    app.querySelector('[data-complete]').addEventListener('click',e=>{const id=e.currentTarget.dataset.complete;if(!done.includes(id)){done.push(id);save();progress();notify('Đã lưu tiến độ học của bạn.');}else notify('Chặng này đã nằm trong danh sách hoàn thành.');renderLesson(index);});
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function renderReview() {
    const rows=LESSONS.flatMap(l=>l.sections.map(s=>({lesson:l,section:s})));
    app.innerHTML=`<header class="view-title"><div class="eyebrow">GỢI NHỚ NHANH · QUAY LẠI ĐÚNG CHỖ</div><h1>Ôn lại kiến thức</h1><p>Mở từng thẻ để tự nhắc lại ý chính trước khi xem phần gợi nhớ. Lọc theo chặng hoặc chọn ôn tất cả.</p></header><div class="filter-row"><button class="filter-chip active" data-filter="Tất cả">Tất cả</button>${LESSONS.map(l=>`<button class="filter-chip" data-filter="${l.id}">${l.number} · ${l.title}</button>`).join('')}</div><section class="review-list">${rows.map(({lesson,section},i)=>`<article class="card review-item" data-review-lesson="${lesson.id}"><div class="lesson-num">CHẶNG ${lesson.number} · ${section.examples.length} VÍ DỤ</div><h3>${section.title}</h3><p>${section.text.slice(0,155)}${section.text.length>155?'…':''}</p><button class="reveal">HIỆN GỢI NHỚ <span>＋</span></button><div class="reveal-content"><b>${lesson.title}.</b> ${section.text}<br><br><b>Thử nhớ:</b> ${section.examples[0][1]}</div></article>`).join('')}</section>`;
    app.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{activeFilter=btn.dataset.filter;app.querySelectorAll('.filter-chip').forEach(b=>b.classList.toggle('active',b===btn));app.querySelectorAll('.review-item').forEach(card=>card.classList.toggle('hide',activeFilter!=='Tất cả'&&card.dataset.reviewLesson!==activeFilter));}));
    app.querySelectorAll('.reveal').forEach(btn=>btn.addEventListener('click',()=>{const card=btn.closest('.review-item');card.classList.toggle('open');btn.innerHTML=card.classList.contains('open')?'ẨN GỢI NHỚ <span>−</span>':'HIỆN GỢI NHỚ <span>＋</span>';}));
  }
  function renderPractice() {
    app.innerHTML=`<header class="view-title"><div class="eyebrow">PHÒNG LUYỆN TẬP</div><h1>Bài tập AI</h1><p>Tạo bài tập theo chủ đề và mức độ sẽ được bổ sung trong phiên bản sau.</p></header><section class="ai-panel"><div><div class="eyebrow">TÍNH NĂNG ĐANG ĐƯỢC CHUẨN BỊ</div><h2>Luyện đúng phần bạn cần.</h2><p>Khi được triển khai, bạn sẽ có thể chọn chặng, chọn dạng câu hỏi và nhận một bộ bài luyện tập theo yêu cầu. Khu vực hiện tại là bản giới thiệu giao diện, chưa kết nối AI và chưa tạo câu hỏi.</p><button class="btn btn-primary" disabled>TẠO BÀI TẬP <span>✳</span></button><p class="ai-note">Chưa thực hiện · Không gửi dữ liệu tới dịch vụ bên ngoài.</p></div><div class="ai-stamp">✳</div></section><div class="section-head"><div><div class="eyebrow">TRONG THỜI GIAN CHỜ</div><h2>Ôn bằng câu hỏi có sẵn</h2></div></div><article class="card featured-card"><div class="featured-icon">↻</div><div><h3>Thẻ gợi nhớ theo từng chặng</h3><p>Ôn các khái niệm, ví dụ và điểm dễ nhầm trong thư viện kiến thức.</p><button class="continue-link" data-go="review">MỞ ÔN TẬP <span>→</span></button></div></article>`;
    bindCommon();
  }
  function bindCommon() {
    app.querySelectorAll('[data-open]').forEach(el=>{el.addEventListener('click',()=>{const i=LESSONS.findIndex(l=>l.id===el.dataset.open);renderLesson(i);});el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();const i=LESSONS.findIndex(l=>l.id===el.dataset.open);renderLesson(i);}});});
    app.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',()=>setView(el.dataset.go)));
  }
  document.querySelectorAll('.nav-link').forEach(el=>el.addEventListener('click',()=>el.dataset.view==='practice'?setView('practice'):setView(el.dataset.view)));
  document.getElementById('menu-toggle').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));
  progress();renderHome();
})();
