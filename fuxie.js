/**
 * Mihomo Party 完整复刻版脚本
 * 包含：所有策略组(GitHub/OneDrive/Microsoft等)、所有故转/自动/手动分层逻辑
 * 修改记录：已开启 IPv6
 */

function main(config) {
  // 1. 获取订阅中的所有节点
  const proxies = config.proxies || [];
  
  // 2. 定义筛选函数 (严格复刻 YAML 的正则逻辑)
  const filter = (inc, exc = []) => {
    return proxies.filter(p => {
      const name = p.name;
      // 包含关键字 (不区分大小写)
      const hasInc = new RegExp(inc, 'i').test(name);
      // 排除关键字 (不区分大小写)
      const noExc = exc.length === 0 || !new RegExp(exc.join('|'), 'i').test(name);
      return hasInc && noExc;
    }).map(p => p.name);
  };

  // 3. 筛选节点列表
  const hk = filter("港|HK|Hong", ["台","日","韩","新","深","美"]);
  const jp = filter("日|JP|Japan", ["港","台","韩","新","美"]);
  const sg = filter("新加坡|坡|狮城|SG|Singapore", ["台","日","韩","深","美"]);
  const us = filter("美|US|States|America", ["港","台","韩","新","日"]);
  const all = proxies.map(p => p.name);

  // 防止空分组报错 (如果没有对应节点，塞入 DIRECT)
  if(hk.length === 0) hk.push("DIRECT");
  if(jp.length === 0) jp.push("DIRECT");
  if(sg.length === 0) sg.push("DIRECT");
  if(us.length === 0) us.push("DIRECT");

  // 4. 定义基础功能组名称 (为了后面引用方便)
  const G_HK_Select = "🇭🇰 香港节点";
  const G_JP_Select = "🇯🇵 日本节点";
  const G_SG_Select = "🇸🇬 狮城节点";
  const G_US_Select = "🇺🇲 美国节点";
  
  const G_HK_Fall = "🔯 香港故转";
  const G_JP_Fall = "🔯 日本故转";
  const G_SG_Fall = "🔯 狮城故转";
  const G_US_Fall = "🔯 美国故转";
  
  const G_HK_Auto = "♻️ 香港自动";
  const G_JP_Auto = "♻️ 日本自动";
  const G_SG_Auto = "♻️ 狮城自动";
  const G_US_Auto = "♻️ 美国自动";
  
  const G_Global_Auto = "♻️ 自动选择";
  const G_All = "🌐 全部节点";

  // 5. 定义【引用列表】，严格按照你 YAML 的优先级排序
  // 顺序：故转 -> 自动 -> 手动 -> 全部 -> 直连
  const list_general = [G_HK_Fall, G_JP_Fall, G_SG_Fall, G_US_Fall, G_HK_Auto, G_JP_Auto, G_SG_Auto, G_US_Auto, G_Global_Auto, G_HK_Select, G_JP_Select, G_SG_Select, G_US_Select, G_All, "DIRECT"];
  
  // YouTube/Google 优先顺序 (美->港->日->狮)
  const list_video = [G_US_Fall, G_HK_Fall, G_JP_Fall, G_SG_Fall, G_US_Auto, G_HK_Auto, G_JP_Auto, G_SG_Auto, G_Global_Auto, G_HK_Select, G_JP_Select, G_SG_Select, G_US_Select, G_All, "DIRECT"];
  
  // AI 优先顺序 (美->日->狮 -> 排除香港)
  const list_ai = [G_US_Fall, G_JP_Fall, G_SG_Fall, G_HK_Auto, G_JP_Auto, G_SG_Auto, G_US_Auto, G_Global_Auto, G_HK_Select, G_JP_Select, G_SG_Select, G_US_Select, G_All, "DIRECT"];
  
  // 微软/OneDrive 优先顺序 (日->狮->美 -> 港在后)
  const list_ms = [G_JP_Fall, G_SG_Fall, G_US_Fall, G_HK_Auto, G_JP_Auto, G_SG_Auto, G_US_Auto, G_Global_Auto, G_HK_Select, G_JP_Select, G_SG_Select, G_US_Select, G_All, "DIRECT"];

  // 6. 构建所有策略组
  const groups = [
    // --- 主要策略组 ---
    { name: "🚀 默认代理", type: "select", proxies: list_general },
    { name: "📹 YouTube", type: "select", proxies: list_video },
    { name: "🍀 Google", type: "select", proxies: [G_HK_Fall, G_JP_Fall, G_SG_Fall, G_US_Fall, G_HK_Auto, G_JP_Auto, G_SG_Auto, G_US_Auto, G_Global_Auto, G_HK_Select, G_JP_Select, G_SG_Select, G_US_Select, G_All, "DIRECT"] },
    { name: "🤖 AI", type: "select", proxies: list_ai },
    { name: "👨🏿‍💻 GitHub", type: "select", proxies: list_general },
    { name: "🐬 OneDrive", type: "select", proxies: list_ms },
    { name: "🪟 Microsoft", type: "select", proxies: list_ms },
    { name: "🎵 TikTok", type: "select", proxies: list_ms },
    { name: "📲 Telegram", type: "select", proxies: list_general },
    { name: "🎥 NETFLIX", type: "select", proxies: [G_SG_Fall, G_HK_Fall, G_JP_Fall, G_US_Fall, G_HK_Auto, G_JP_Auto, G_SG_Auto, G_US_Auto, G_Global_Auto, G_HK_Select, G_JP_Select, G_SG_Select, G_US_Select, G_All, "DIRECT"] },
    { name: "🎵 Spotify", type: "select", proxies: [G_US_Fall, G_SG_Fall, G_HK_Fall, G_JP_Fall, G_Global_Auto, G_All] },
    { name: "🎬 Emby", type: "select", proxies: ["DIRECT", "🚀 默认代理", G_HK_Fall, G_SG_Fall, G_All] },
    { name: "🐟 漏网之鱼", type: "select", proxies: ["🚀 默认代理", ...list_general] },

    // --- 地区选择组 (Manual) ---
    { name: G_HK_Select, type: "select", proxies: hk },
    { name: G_JP_Select, type: "select", proxies: jp },
    { name: G_SG_Select, type: "select", proxies: sg },
    { name: G_US_Select, type: "select", proxies: us },

    // --- 地区故转组 (Fallback) ---
    { name: G_HK_Fall, type: "fallback", url: "http://www.gstatic.com/generate_204", interval: 300, proxies: hk },
    { name: G_JP_Fall, type: "fallback", url: "http://www.gstatic.com/generate_204", interval: 300, proxies: jp },
    { name: G_SG_Fall, type: "fallback", url: "http://www.gstatic.com/generate_204", interval: 300, proxies: sg },
    { name: G_US_Fall, type: "fallback", url: "http://www.gstatic.com/generate_204", interval: 300, proxies: us },

    // --- 地区自动组 (URL-Test) ---
    { name: G_HK_Auto, type: "url-test", url: "http://www.gstatic.com/generate_204", interval: 300, tolerance: 20, proxies: hk },
    { name: G_JP_Auto, type: "url-test", url: "http://www.gstatic.com/generate_204", interval: 300, tolerance: 20, proxies: jp },
    { name: G_SG_Auto, type: "url-test", url: "http://www.gstatic.com/generate_204", interval: 300, tolerance: 20, proxies: sg },
    { name: G_US_Auto, type: "url-test", url: "http://www.gstatic.com/generate_204", interval: 300, tolerance: 20, proxies: us },
    
    // --- 全局自动/全部 ---
    { name: G_Global_Auto, type: "url-test", url: "http://www.gstatic.com/generate_204", interval: 300, tolerance: 20, proxies: all },
    { name: G_All, type: "select", proxies: all }
  ];

  config['proxy-groups'] = groups;

  // 7. 强制覆盖 DNS 配置
  config.dns = {
    enable: true,
    ipv6: true, // <--- 已添加：开启 DNS IPv6 解析
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "28.0.0.1/8",
    "fake-ip-filter-mode": "blacklist",
    "fake-ip-filter": ["rule-set:fakeipfilter_domain"],
    "default-nameserver": ["https://223.5.5.5/dns-query"],
    nameserver: ["https://dns.alidns.com/dns-query", "https://doh.pub/dns-query"],
    "proxy-server-nameserver": ["https://dns.alidns.com/dns-query", "https://doh.pub/dns-query"]
  };
  
  // 8. 规则集引用 (rule-providers)
  config['rule-providers'] = {
    "fakeipfilter_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/wwqgtxx/clash-rules/release/fakeip-filter.mrs"},
    "proxylite": { type: "http", interval: 86400, behavior: "classical", format: "text", url: "https://raw.githubusercontent.com/qichiyuhub/rule/refs/heads/main/proxy.list"},
    "ai": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-!cn.mrs" },
    "youtube_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs"},
    "google_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.mrs"},
    "github_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs"},
    "telegram_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.mrs"},
    "netflix_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/netflix.mrs"},
    "spotify_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/spotify.mrs" },
    "emby_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/emby.mrs" },
    "onedrive_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/onedrive.mrs"},
    "microsoft_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "
