// Mihomo Party 脚本：严格对齐原配置顺序与分流逻辑
function main(config) {
  // 1. 基础设置强制覆盖
  config["mixed-port"] = 7890;
  config["redir-port"] = 7892;
  config["tproxy-port"] = 7893;
  config["allow-lan"] = true;
  config["mode"] = "Rule";
  config["ipv6"] = true;
  config["tun"] = { "enable": true, "stack": "system", "device": "utun", "auto-route": false, "auto-detect-interface": false };
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "HTTP": { "ports": [80, "8080-8880"], "override-destination": true },
      "TLS": { "ports": [443, 8443], "override-destination": true },
      "QUIC": { "ports": [443, 8443], "override-destination": true }
    }
  };

  // 2. DNS 严格配置
  config["dns"] = {
    "enable": true,
    "listen": ":1053",
    "use-hosts": true,
    "ipv6": true,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "default-nameserver": ["223.5.5.5", "119.29.29.29"],
    "nameserver": ["https://dns.alidns.com/dns-query", "https://doh.pub/dns-query", "https://8.8.8.8/dns-query"],
    "nameserver-policy": { "geosite:cn": ["223.5.5.5", "119.29.29.29"] }
  };

  // 3. 定义代理组 (严格按照你的原始 YAML 顺序)
  const groups = [
    { "name": "🧪 IPv6 测试", "type": "select", "use": ["MyAirport"], "url": "http://ipv6.google.com/generate_204", "interval": 300 },
    { "name": "🚀 默认代理", "type": "select", "proxies": ["🔯 香港故转", "🔯 日本故转", "🔯 狮城故转", "🔯 美国故转", "♻️ 香港自动", "♻️ 日本自动", "♻️ 狮城自动", "♻️ 美国自动", "♻️ 自动选择", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇲 美国节点", "🌐 全部节点", "DIRECT"] },
    { "name": "🤖 AI", "type": "select", "proxies": ["🔯 美国故转", "🔯 日本故转", "🔯 狮城故转", "♻️ 香港自动", "♻️ 日本自动", "♻️ 狮城自动", "♻️ 美国自动", "♻️ 自动选择", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇲 美国节点", "🌐 全部节点", "DIRECT"] },
    { "name": "🍀 Google", "type": "select", "proxies": ["🔯 香港故转", "🔯 日本故转", "🔯 狮城故转", "🔯 美国故转", "♻️ 香港自动", "♻️ 日本自动", "♻️ 狮城自动", "♻️ 美国自动", "♻️ 自动选择", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇲 美国节点", "🌐 全部节点", "DIRECT"] },
    { "name": "📹 YouTube", "type": "select", "proxies": ["🔯 香港故转", "🔯 美国故转", "🔯 日本故转", "🔯 狮城故转", "♻️ 美国自动", "♻️ 香港自动", "♻️ 日本自动", "♻️ 狮城自动", "♻️ 自动选择", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇲 美国节点", "🌐 全部节点", "DIRECT"] },
    { "name": "🎥 NETFLIX", "type": "select", "proxies": ["🔯 狮城故转", "🔯 香港故转", "🔯 日本故转", "🔯 美国故转", "♻️ 香港自动", "♻️ 日本自动", "♻️ 狮城自动", "♻️ 美国自动", "♻️ 自动选择", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇲 美国节点", "🌐 全部节点", "DIRECT"] },
    { "name": "🎬 Emby", "type": "select", "proxies": ["🔯 香港故转", "🔯 美国故转", "🔯 日本故转", "🔯 狮城故转", "♻️ 美国自动", "♻️ 香港自动", "♻️ 日本自动", "♻️ 狮城自动", "♻️ 自动选择", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇲 美国节点", "🌐 全部节点", "DIRECT"] },
    { "name": "🎵 TikTok", "type": "select", "proxies": ["🔯 日本故转", "🔯 狮城故转", "🔯 美国故转", "♻️ 香港自动", "♻️ 日本自动", "♻️ 狮城自动", "♻️ 美国自动", "♻️ 自动选择", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇲 美国节点", "🌐 全部节点", "DIRECT"] },
    { "name": "🎵 Spotify", "type": "select", "proxies": ["🔯 美国故转", "🔯 香港故转", "🔯 狮城故转", "🔯 日本故转", "♻️ 自动选择", "🌐 全部节点", "DIRECT"] },
    { "name": "👨🏿‍💻 GitHub", "type": "select", "proxies": ["🔯 香港故转", "🔯 日本故转", "🔯 狮城故转", "🔯 美国故转", "♻️ 香港自动", "♻️ 日本自动", "♻️ 狮城自动", "♻️ 美国自动", "♻️ 自动选择", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇲 美国节点", "🌐 全部节点", "DIRECT"] },
    { "name": "📲 Telegram", "type": "select", "proxies": ["🔯 香港故转", "🔯 日本故转", "🔯 狮城故转", "🔯 美国故转", "♻️ 香港自动", "♻️ 日本自动", "♻️ 狮城自动", "♻️ 美国自动", "♻️ 自动选择", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇲 美国节点", "🌐 全部节点", "DIRECT"] },
    { "name": "🐬 OneDrive", "type": "select", "proxies": ["DIRECT", "🔯 日本故转", "🔯 狮城故转", "🔯 美国故转", "♻️ 香港自动", "♻️ 日本自动", "♻️ 狮城自动", "♻️ 美国自动", "♻️ 自动选择", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇲 美国节点", "🌐 全部节点"] },
    { "name": "🪟 Microsoft", "type": "select", "proxies": ["DIRECT", "🔯 日本故转", "🔯 狮城故转", "🔯 美国故转", "♻️ 香港自动", "♻️ 日本自动", "♻️ 狮城自动", "♻️ 美国自动", "♻️ 自动选择", "🇭🇰 香港节点", "🇯🇵 日本节点", "🇸🇬 狮城节点", "🇺🇲 美国节点", "🌐 全部节点"] },
    { "name": "🐟 漏网之鱼", "type": "select", "proxies": ["🚀 默认代理", "DIRECT"] },
    // 底层正则筛选组
    { "name": "🇭🇰 香港节点", "type": "select", "use": ["MyAirport"], "filter": "(?=.*(港|HK|(?i)Hong))^((?!(台|日|韩|新|深|美)).)*$" },
    { "name": "🇯🇵 日本节点", "type": "select", "use": ["MyAirport"], "filter": "(?=.*(日|JP|(?i)Japan))^((?!(港|台|韩|新|美)).)*$" },
    { "name": "🇸🇬 狮城节点", "type": "select", "use": ["MyAirport"], "filter": "(?=.*(新加坡|坡|狮城|SG|Singapore))^((?!(台|日|韩|深|美)).)*$" },
    { "name": "🇺🇲 美国节点", "type": "select", "use": ["MyAirport"], "filter": "(?=.*(美|US|(?i)States|America))^((?!(港|台|韩|新|日)).)*$" },
    // 自动切换与故障转移组
    { "name": "🔯 香港故转", "type": "fallback", "use": ["MyAirport"], "interval": 300, "url": "http://www.gstatic.com/generate_204", "filter": "(?=.*(港|HK|(?i)Hong))^((?!(台|日|韩|新|深|美)).)*$" },
    { "name": "🔯 日本故转", "type": "fallback", "use": ["MyAirport"], "interval": 300, "url": "http://www.gstatic.com/generate_204", "filter": "(?=.*(日|JP|(?i)Japan))^((?!(港|台|韩|新|美)).)*$" },
    { "name": "🔯 狮城故转", "type": "fallback", "use": ["MyAirport"], "interval": 300, "url": "http://www.gstatic.com/generate_204", "filter": "(?=.*(新加坡|坡|狮城|SG|Singapore))^((?!(台|日|韩|深|美)).)*$" },
    { "name": "🔯 美国故转", "type": "fallback", "use": ["MyAirport"], "interval": 300, "url": "http://www.gstatic.com/generate_204", "filter": "(?=.*(美|US|(?i)States|America))^((?!(港|台|韩|新|日)).)*$" },
    { "name": "♻️ 香港自动", "type": "url-test", "use": ["MyAirport"], "tolerance": 20, "interval": 1800, "url": "http://www.gstatic.com/generate_204", "filter": "(?=.*(港|HK|(?i)Hong))^((?!(台|日|韩|新|深|美)).)*$" },
    { "name": "♻️ 日本自动", "type": "url-test", "use": ["MyAirport"], "tolerance": 20, "interval": 1800, "url": "http://www.gstatic.com/generate_204", "filter": "(?=.*(日|JP|(?i)Japan))^((?!(港|台|韩|新|美)).)*$" },
    { "name": "♻️ 狮城自动", "type": "url-test", "use": ["MyAirport"], "tolerance": 20, "interval": 1800, "url": "http://www.gstatic.com/generate_204", "filter": "(?=.*(新加坡|坡|狮城|SG|Singapore))^((?!(港|台|韩|日|美)).)*$" },
    { "name": "♻️ 美国自动", "type": "url-test", "use": ["MyAirport"], "tolerance": 20, "interval": 1800, "url": "http://www.gstatic.com/generate_204", "filter": "(?=.*(美|US|(?i)States|America))^((?!(港|台|日|韩|新)).)*$" },
    { "name": "♻️ 自动选择", "type": "url-test", "use": ["MyAirport"], "tolerance": 20, "interval": 1800, "url": "http://www.gstatic.com/generate_204" },
    { "name": "🌐 全部节点", "type": "select", "use": ["MyAirport"] }
  ];

  config["proxy-groups"] = groups;

  // 4. 分流规则强制覆盖
  config["rules"] = [
    "DOMAIN-SUFFIX,xxttq.com,DIRECT",
    "DOMAIN-SUFFIX,beupisp.com,DIRECT",
    "GEOSITE,private,DIRECT",
    "GEOIP,private,DIRECT,no-resolve",
    "GEOSITE,category-ai-!cn,🤖 AI",
    "GEOSITE,github,👨🏿‍💻 GitHub",
    "GEOSITE,youtube,📹 YouTube",
    "GEOSITE,google,🍀 Google",
    "GEOSITE,onedrive,🐬 OneDrive",
    "GEOSITE,microsoft,🪟 Microsoft",
    "GEOSITE,tiktok,🎵 TikTok",
    "GEOSITE,telegram,📲 Telegram",
    "GEOSITE,spotify,🎵 Spotify",
    "GEOSITE,netflix,🎥 NETFLIX",
    "GEOSITE,apple,DIRECT",
    "GEOSITE,cn,DIRECT",
    "GEOIP,cn,DIRECT,no-resolve",
    "MATCH,🐟 漏网之鱼"
  ];

  return config;
}
