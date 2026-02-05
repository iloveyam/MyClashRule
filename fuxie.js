/**
 * Mihomo Party 完整复刻版脚本 (优化版)
 * 修复：proxylite URL 拼写错误
 * 优化：DNS 策略 (nameserver-policy)、Fake-IP 网段标准、IPv6 自动优选
 */

function main(config) {
  // 1. 获取订阅中的所有节点
  const proxies = config.proxies || [];

  // 2. 定义筛选函数 (优化正则性能)
  const filter = (inc, exc = []) => {
    // 预编译正则，提高效率
    const incReg = new RegExp(inc, 'i');
    const excReg = exc.length > 0 ? new RegExp(exc.join('|'), 'i') : null;
    
    return proxies.filter(p => {
      const name = p.name;
      const hasInc = incReg.test(name);
      const noExc = excReg ? !excReg.test(name) : true;
      return hasInc && noExc;
    }).map(p => p.name);
  };

  // 3. 筛选节点列表
  const hk = filter("港|HK|Hong", ["台","日","韩","新","深","美"]);
  const jp = filter("日|JP|Japan", ["港","台","韩","新","美"]);
  const sg = filter("新加坡|坡|狮城|SG|Singapore", ["台","日","韩","深","美"]);
  const us = filter("美|US|States|America", ["港","台","韩","新","日"]);
  // 这里的 all 用于漏网之鱼和全部节点
  const all = proxies.map(p => p.name);

  // 防止空分组报错
  if(hk.length === 0) hk.push("DIRECT");
  if(jp.length === 0) jp.push("DIRECT");
  if(sg.length === 0) sg.push("DIRECT");
  if(us.length === 0) us.push("DIRECT");

  // 4. 定义组名称
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
  const G_IPv6_Test = "🧪 IPv6 测试"; 

  // 5. 定义引用列表
  const list_general = [G_HK_Fall, G_JP_Fall, G_SG_Fall, G_US_Fall, G_HK_Auto, G_JP_Auto, G_SG_Auto, G_US_Auto, G_Global_Auto, G_HK_Select, G_JP_Select, G_SG_Select, G_US_Select, G_All, "DIRECT"];
  const list_video = [G_US_Fall, G_HK_Fall, G_JP_Fall, G_SG_Fall, G_US_Auto, G_HK_Auto, G_JP_Auto, G_SG_Auto, G_Global_Auto, G_HK_Select, G_JP_Select, G_SG_Select, G_US_Select, G_All, "DIRECT"];
  const list_ai = [G_US_Fall, G_JP_Fall, G_SG_Fall, G_HK_Auto, G_JP_Auto, G_SG_Auto, G_US_Auto, G_Global_Auto, G_HK_Select, G_JP_Select, G_SG_Select, G_US_Select, G_All, "DIRECT"];
  const list_ms = [G_JP_Fall, G_SG_Fall, G_US_Fall, G_HK_Auto, G_JP_Auto, G_SG_Auto, G_US_Auto, G_Global_Auto, G_HK_Select, G_JP_Select, G_SG_Select, G_US_Select, G_All, "DIRECT"];

  // 6. 构建策略组
  const groups = [
    // --- IPv6 测试组 (优化：改为 url-test 自动挑选能用 IPv6 的节点) ---
    // 如果你依然想手动测，就把 type 改回 "select"
    { 
      name: G_IPv6_Test, 
      type: "url-test", 
      url: "http://ipv6.google.com/generate_204", 
      interval: 300, 
      tolerance: 50,
      proxies: all 
    },

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
    { name: "🎬 Emby", type: "select", proxies: ["DIRECT", "🚀 默认代理", G_HK_Fall, G_SG_Fall, G_All] }, // 很多 Emby 是直连的，把 DIRECT 放在第一位或可选
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
    { name: G_HK_Auto, type: "url-test", url: "http://www.gstatic.com/generate_204", interval: 1800, tolerance: 20, proxies: hk },
    { name: G_JP_Auto, type: "url-test", url: "http://www.gstatic.com/generate_204", interval: 1800, tolerance: 20, proxies: jp },
    { name: G_SG_Auto, type: "url-test", url: "http://www.gstatic.com/generate_204", interval: 1800, tolerance: 20, proxies: sg },
    { name: G_US_Auto, type: "url-test", url: "http://www.gstatic.com/generate_204", interval: 1800, tolerance: 20, proxies: us },
    
    // --- 全局自动/全部 ---
    { name: G_Global_Auto, type: "url-test", url: "http://www.gstatic.com/generate_204", interval: 1800, tolerance: 20, proxies: all },
    { name: G_All, type: "select", proxies: all }
  ];

  config['proxy-groups'] = groups;

  // 7. 强制开启 DNS IPv6 (优化版)
  config.dns = {
    enable: true,
    ipv6: true,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16", // 【修正】使用标准 Fake-IP 段
    "fake-ip-filter-mode": "blacklist",
    "fake-ip-filter": ["rule-set:fakeipfilter_domain", "+.lan", "+.local"],
    "default-nameserver": ["https://223.5.5.5/dns-query", "https://1.12.12.12/dns-query"],
    
    // 【优化】国内域名走国内 DNS
    nameserver: [
      "https://dns.alidns.com/dns-query", 
      "https://doh.pub/dns-query"
    ],
    // 【优化】国外域名走代理 DNS (防止 DNS 污染)
    "proxy-server-nameserver": [
      "https://8.8.8.8/dns-query", 
      "https://1.1.1.1/dns-query"
    ],
    // 【新增】DNS 策略：精准分流
    "nameserver-policy": {
      "geosite:cn,private": ["https://dns.alidns.com/dns-query", "https://doh.pub/dns-query"],
      "geosite:geolocation-!cn": ["https://8.8.8.8/dns-query", "https://1.1.1.1/dns-query"]
    }
  };
  
  // 8. 规则集引用
  config['rule-providers'] = {
    "fakeipfilter_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/wwqgtxx/clash-rules/release/fakeip-filter.mrs"},
    // 【修复】修正了 hthttps 拼写错误
    "proxylite": { type: "http", interval: 86400, behavior: "classical", format: "text", url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Proxy/Proxy.list"},
    "ai": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-!cn.mrs" },
    "youtube_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs"},
    "google_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.mrs"},
    "github_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs"},
    "telegram_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.mrs"},
    "netflix_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/netflix.mrs"},
    "spotify_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/spotify.mrs" },
    "emby_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/emby.mrs" },
    "onedrive_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/onedrive.mrs"},
    "microsoft_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft.mrs"},
    "apple_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple.mrs"},
    "tiktok_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/tiktok.mrs"},
    "geolocation-!cn": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/geolocation-!cn.mrs"},
    "cn_domain": { type: "http", interval: 86400, behavior: "domain", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs"},
    "private_ip": { type: "http", interval: 86400, behavior: "ipcidr", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/private.mrs"},
    "cn_ip": { type: "http", interval: 86400, behavior: "ipcidr", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.mrs"},
    "google_ip": { type: "http", interval: 86400, behavior: "ipcidr", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/google.mrs"},
    "telegram_ip": { type: "http", interval: 86400, behavior: "ipcidr", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/telegram.mrs"},
    "netflix_ip": { type: "http", interval: 86400, behavior: "ipcidr", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/netflix.mrs"},
    "apple_ip": { type: "http", interval: 86400, behavior: "ipcidr", format: "mrs", url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo-lite/geoip/apple.mrs"}
  };

  // 9. 写入规则
  config.rules = [
    "DOMAIN-SUFFIX,xxttq.com,DIRECT",
    "RULE-SET,private_ip,DIRECT,no-resolve",
    "RULE-SET,proxylite,🚀 默认代理",
    "RULE-SET,ai,🤖 AI",
    "RULE-SET,github_domain,👨🏿‍💻 GitHub",
    "RULE-SET,youtube_domain,📹 YouTube",
    "RULE-SET,google_domain,🍀 Google",
    "RULE-SET,onedrive_domain,🐬 OneDrive",
    "RULE-SET,microsoft_domain,🪟 Microsoft",
    "RULE-SET,apple_domain,DIRECT",
    "RULE-SET,tiktok_domain,🎵 TikTok",
    "RULE-SET,telegram_domain,📲 Telegram",
    "RULE-SET,netflix_domain,🎥 NETFLIX",
    "RULE-SET,spotify_domain,🎵 Spotify",
    "RULE-SET,emby_domain,🎬 Emby",
    "RULE-SET,apple_ip,DIRECT",
    "RULE-SET,google_ip,🍀 Google",
    "RULE-SET,netflix_ip,🎥 NETFLIX",
    "RULE-SET,telegram_ip,📲 Telegram",
    "RULE-SET,geolocation-!cn,🚀 默认代理",
    "RULE-SET,cn_domain,DIRECT",
    "RULE-SET,cn_ip,DIRECT",
    "MATCH,🐟 漏网之鱼"
  ];

  // 10. 杂项设置
  config.ipv6 = true; 
  config['mixed-port'] = 7890;
  config['allow-lan'] = true;
  config['unified-delay'] = true;
  config['tcp-concurrent'] = true;
  
  // 开启 Tun 模式 (如果需要，可选)
  // config.tun = { enable: true, stack: "mixed", "auto-route": true, "auto-detect-interface": true, "dns-hijack": ["any:53"] };

  return config;
}
