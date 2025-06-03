// buyersClub.js

// ========== 通用模态弹窗 ========== //
function showModal(html) {
  let root = document.getElementById('buyers-modal-root');
  root.innerHTML = `
    <div class="buyers-modal-mask fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onclick="closeBuyersModal(event)">
      <div class="buyers-modal-content bg-white rounded-xl shadow-lg p-6 max-w-lg w-full relative animate-fadeIn" onclick="event.stopPropagation()">
        <button class="absolute top-3 right-3 text-gray-400 hover:text-primary text-xl" onclick="closeBuyersModal(event)"><i class="fa fa-times"></i></button>
        ${html}
      </div>
    </div>
  `;
}
function closeBuyersModal(e) {
  document.getElementById('buyers-modal-root').innerHTML = '';
}

// ========== 采购对接 ========== //
const DEMO_DEMANDS = [
  { company: '南宁鲜果电商', product: '沃柑', quantity: '20吨', contact: '138****8888', remark: '需冷链运输', time: '2024-06-01 10:00' },
  { company: '广西果业集团', product: '沃柑', quantity: '50吨', contact: '139****6666', remark: '要求糖度≥13°', time: '2024-06-02 09:30' }
];
function openDockingModal() {
  let demands = JSON.parse(localStorage.getItem('buyersDemands') || '[]');
  let all = [...demands, ...DEMO_DEMANDS];
  let listHtml = all.length === 0 ? '<div class="text-gray-400 text-center">暂无采购需求</div>' :
    all.map(d => `
      <div class="border-l-4 border-primary bg-blue-50 rounded-lg p-4 mb-2">
        <div class="font-bold text-lg text-blue-700">${d.product} <span class="text-sm text-gray-500 font-normal">${d.quantity}</span></div>
        <div class="text-sm text-gray-600 mb-1">采购商：${d.company}</div>
        <div class="text-xs text-gray-500 mb-1">${d.remark ? '备注：' + d.remark : ''}</div>
        <div class="text-xs text-gray-400 text-right">联系方式：${d.contact} | ${d.time}</div>
      </div>
    `).join('');
  showModal(`
    <h2 class="text-xl font-bold mb-4 flex items-center"><i class="fa fa-link mr-2 text-primary"></i>采购需求发布</h2>
    <form id="buyersDemandForm" class="space-y-3 mb-4">
      <input type="text" name="company" required placeholder="采购商名称/公司" class="w-full px-4 py-2 border rounded">
      <input type="text" name="product" required placeholder="采购产品（如：沃柑）" class="w-full px-4 py-2 border rounded">
      <input type="text" name="quantity" required placeholder="采购数量（如：20吨）" class="w-full px-4 py-2 border rounded">
      <input type="text" name="contact" required placeholder="联系方式（手机/微信）" class="w-full px-4 py-2 border rounded">
      <textarea name="remark" rows="2" placeholder="补充说明（可选）" class="w-full px-4 py-2 border rounded"></textarea>
      <button type="submit" class="w-full bg-primary text-white py-2 rounded">发布采购需求</button>
    </form>
    <h3 class="font-semibold mb-2 mt-6">最新采购需求</h3>
    <div style="max-height:200px;overflow:auto;">${listHtml}</div>
  `);
  document.getElementById('buyersDemandForm').onsubmit = function(e) {
    e.preventDefault();
    const fd = new FormData(this);
    const demand = {
      company: fd.get('company'),
      product: fd.get('product'),
      quantity: fd.get('quantity'),
      contact: fd.get('contact'),
      remark: fd.get('remark'),
      time: new Date().toLocaleString()
    };
    let demands = JSON.parse(localStorage.getItem('buyersDemands') || '[]');
    demands.unshift(demand);
    localStorage.setItem('buyersDemands', JSON.stringify(demands));
    closeBuyersModal();
    setTimeout(openDockingModal, 100);
  };
}

// ========== 专属活动报名 ========== //
const DEMO_ACTIVITIES = [
  { name: '2024采购商大会', date: '2024-07-10', place: '南宁', desc: '线下品鉴会+基地参观', joined: false },
  { name: '采购圈线上沙龙', date: '2024-06-20', place: '线上', desc: '采购经验分享', joined: false }
];
function openActivityModal() {
  let acts = JSON.parse(localStorage.getItem('buyersActivities') || '[]');
  let all = DEMO_ACTIVITIES.map(a => {
    let joined = acts.find(x => x.name === a.name) ? true : a.joined;
    return { ...a, joined };
  });
  let listHtml = all.map((a, i) => `
    <div class="border-l-4 border-green-500 bg-green-50 rounded-lg p-4 mb-2 flex justify-between items-center">
      <div>
        <div class="font-bold text-lg text-green-700">${a.name}</div>
        <div class="text-xs text-gray-500 mb-1">${a.date} | ${a.place}</div>
        <div class="text-sm text-gray-600 mb-1">${a.desc}</div>
      </div>
      <button class="${a.joined ? 'bg-gray-300 text-gray-500' : 'bg-green-500 text-white hover:bg-green-600'} px-3 py-1 rounded" ${a.joined ? 'disabled' : ''} onclick="joinActivity(${i})">${a.joined ? '已报名' : '报名'}</button>
    </div>
  `).join('');
  showModal(`
    <h2 class="text-xl font-bold mb-4 flex items-center"><i class="fa fa-calendar-check mr-2 text-green-500"></i>专属活动报名</h2>
    <div>${listHtml}</div>
    <h3 class="font-semibold mt-6 mb-2">历史活动</h3>
    <div class="text-xs text-gray-500">2023采购商年会、2022基地考察...</div>
  `);
}
window.joinActivity = function(idx) {
  let acts = JSON.parse(localStorage.getItem('buyersActivities') || '[]');
  let act = { ...DEMO_ACTIVITIES[idx], joined: true };
  acts = acts.filter(a => a.name !== act.name);
  acts.push(act);
  localStorage.setItem('buyersActivities', JSON.stringify(acts));
  closeBuyersModal();
  setTimeout(openActivityModal, 100);
};

// ========== 采购评级申请 ========== //
function openRatingModal() {
  showModal(`
    <h2 class="text-xl font-bold mb-4 flex items-center"><i class="fa fa-award mr-2 text-yellow-500"></i>采购评级申请</h2>
    <form id="buyersRatingForm" class="space-y-3 mb-4">
      <input type="text" name="company" required placeholder="采购商名称/公司" class="w-full px-4 py-2 border rounded">
      <input type="number" name="annual" required min="1" placeholder="年采购量（吨）" class="w-full px-4 py-2 border rounded">
      <input type="text" name="contact" required placeholder="联系方式" class="w-full px-4 py-2 border rounded">
      <button type="submit" class="w-full bg-yellow-500 text-white py-2 rounded">提交申请</button>
    </form>
    <div class="bg-yellow-50 rounded-lg p-4">
      <h4 class="font-semibold mb-2">评级标准与权益</h4>
      <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
        <li><span class="text-yellow-600 font-bold">AAA级</span>：年采购量≥100吨，优先供货权、专属客服、价格优惠10%</li>
        <li><span class="text-orange-500 font-bold">AA级</span>：年采购量50-100吨，优先供货权、价格优惠5%</li>
        <li><span class="text-green-500 font-bold">A级</span>：年采购量20-50吨，价格优惠3%</li>
      </ul>
    </div>
  `);
  document.getElementById('buyersRatingForm').onsubmit = function(e) {
    e.preventDefault();
    alert('评级申请已提交，工作人员将与您联系！');
    closeBuyersModal();
  };
}

// ========== 采购圈交流 ========== //
const DEMO_POSTS = [
  { user: '沃柑优选商贸', content: '今年沃柑行情不错，大家都采购了吗？', time: '2024-06-01 09:00', likes: 2, comments: [ { user: '南宁鲜果电商', text: '已下单20吨！' } ] },
  { user: '广西果业集团', content: '欢迎新采购商加入俱乐部！', time: '2024-06-02 11:30', likes: 1, comments: [] }
];
function openCommunityModal() {
  let posts = JSON.parse(localStorage.getItem('buyersPosts') || '[]');
  let all = [...posts, ...DEMO_POSTS];
  let listHtml = all.map((p, idx) => `
    <div class="border rounded-lg p-3 mb-2 bg-purple-50">
      <div class="flex items-center mb-1"><span class="font-bold text-purple-700 mr-2">${p.user}</span><span class="text-xs text-gray-400">${p.time}</span></div>
      <div class="text-gray-700 text-sm mb-1">${p.content}</div>
      <div class="flex items-center text-xs text-gray-500">
        <button onclick="likePost(${idx})" class="mr-2 ${p.liked ? 'text-pink-500' : ''}"><i class="fa fa-heart"></i> ${p.likes||0}</button>
        <button onclick="toggleCommentBox(${idx})" class="mr-2"><i class="fa fa-comment"></i> 评论</button>
      </div>
      <div id="buyers-post-comments-${idx}" class="ml-4 mt-1">
        ${(p.comments||[]).map(c => `<div class='text-xs text-gray-600 mb-1'><b>${c.user}：</b>${c.text}</div>`).join('')}
      </div>
      <div id="buyers-post-commentbox-${idx}" style="display:none;">
        <form onsubmit="submitComment(event,${idx})" class="flex mt-1"><input type="text" name="comment" required class="flex-1 border rounded px-2 py-1 text-xs" placeholder="写评论..."><button class="ml-2 px-2 py-1 bg-primary text-white rounded text-xs">发送</button></form>
      </div>
    </div>
  `).join('');
  showModal(`
    <h2 class="text-xl font-bold mb-4 flex items-center"><i class="fa fa-comments mr-2 text-purple-500"></i>采购圈交流</h2>
    <form id="buyersPostForm" class="flex mb-3"><input type="text" name="content" required class="flex-1 border rounded px-2 py-1 mr-2" placeholder="发布新动态..."><button class="bg-purple-500 text-white px-3 py-1 rounded">发布</button></form>
    <div style="max-height:250px;overflow:auto;">${listHtml}</div>
  `);
  document.getElementById('buyersPostForm').onsubmit = function(e) {
    e.preventDefault();
    let posts = JSON.parse(localStorage.getItem('buyersPosts') || '[]');
    posts.unshift({ user: '我', content: this.content.value, time: new Date().toLocaleString(), likes: 0, comments: [] });
    localStorage.setItem('buyersPosts', JSON.stringify(posts));
    closeBuyersModal();
    setTimeout(openCommunityModal, 100);
  };
}
window.likePost = function(idx) {
  let posts = JSON.parse(localStorage.getItem('buyersPosts') || '[]');
  if (idx < posts.length) {
    posts[idx].likes = (posts[idx].likes||0) + 1;
    posts[idx].liked = true;
    localStorage.setItem('buyersPosts', JSON.stringify(posts));
    closeBuyersModal();
    setTimeout(openCommunityModal, 100);
  }
};
window.toggleCommentBox = function(idx) {
  let box = document.getElementById('buyers-post-commentbox-' + idx);
  if (box) box.style.display = box.style.display === 'none' ? '' : 'none';
};
window.submitComment = function(e, idx) {
  e.preventDefault();
  let posts = JSON.parse(localStorage.getItem('buyersPosts') || '[]');
  let val = e.target.comment.value;
  if (idx < posts.length) {
    posts[idx].comments = posts[idx].comments || [];
    posts[idx].comments.push({ user: '我', text: val });
    localStorage.setItem('buyersPosts', JSON.stringify(posts));
    closeBuyersModal();
    setTimeout(openCommunityModal, 100);
  }
};

// ========== 采购金融服务 ========== //
function openFinanceModal() {
  showModal(`
    <h2 class="text-xl font-bold mb-4 flex items-center"><i class="fa fa-money-bill-wave mr-2 text-pink-500"></i>采购金融服务</h2>
    <div class="space-y-3">
      <div class="bg-pink-50 rounded-lg p-4">
        <h4 class="font-semibold mb-1">采购分期</h4>
        <p class="text-sm text-gray-700">支持大额采购分期付款，减轻资金压力</p>
      </div>
      <div class="bg-pink-50 rounded-lg p-4">
        <h4 class="font-semibold mb-1">采购授信</h4>
        <p class="text-sm text-gray-700">优质采购商可申请授信额度，灵活采购</p>
      </div>
      <div class="bg-pink-50 rounded-lg p-4">
        <h4 class="font-semibold mb-1">金融产品推荐</h4>
        <p class="text-sm text-gray-700">合作银行、保险公司专属金融产品推荐</p>
      </div>
    </div>
  `);
}

// ========== 数据统计区动态渲染 ========== //
function renderBuyersStats() {
  // 统计数据
  let buyersCount = 128;
  let annualPurchase = 3200;
  let activityCount = 12;
  let levelDist = 'AAA: 8%, AA: 22%, A: 40%, 其他: 30%';
  let statTotalPurchase = 12800;
  let statMembers = 128;
  let statActive = 56;
  let statEvents = 12;
  // 可根据本地存储动态调整
  document.getElementById('buyersCount').textContent = buyersCount;
  document.getElementById('annualPurchase').textContent = annualPurchase + ' 吨';
  document.getElementById('activityCount').textContent = activityCount;
  document.getElementById('levelDist').textContent = levelDist;
  document.getElementById('statTotalPurchase').textContent = statTotalPurchase;
  document.getElementById('statMembers').textContent = statMembers;
  document.getElementById('statActive').textContent = statActive;
  document.getElementById('statEvents').textContent = statEvents;
}

// ========== 导航按钮高亮 ========== //
document.addEventListener('DOMContentLoaded', function() {
  renderBuyersStats();
  let navs = document.querySelectorAll('.buyers-nav-btn');
  navs.forEach(btn => {
    btn.onclick = function() {
      navs.forEach(b => b.classList.remove('bg-primary','text-white'));
      navs.forEach(b => b.classList.add('bg-white','text-gray-600'));
      this.classList.add('bg-primary','text-white');
      this.classList.remove('bg-white','text-gray-600');
      // 可扩展：切换不同服务区块
    };
  });
});

// ========== 供全局调用的弹窗函数 ========== //
window.openDockingModal = openDockingModal;
window.openActivityModal = openActivityModal;
window.openRatingModal = openRatingModal;
window.openCommunityModal = openCommunityModal;
window.openFinanceModal = openFinanceModal;
window.closeBuyersModal = closeBuyersModal; 