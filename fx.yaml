# ==========================================================
# Clash Meta (Mihomo) 覆写模板 - 完整修正版
# ==========================================================

# 1. 基础全局配置
mixed-port: 7890
allow-lan: true
ipv6: false
unified-delay: true
tcp-concurrent: true
log-level: warning
global-client-fingerprint: chrome

profile:
  store-selected: true
  store-fake-ip: true

# 2. 节点获取 (Proxy Provider)
proxy-providers:
  MyAirport:  # 这里的名字可以自定义
    type: http
    url: "你的订阅链接" # <--- ！！！请替换成你的真实订阅链接
    interval: 3600
    path: ./proxies/airport.yaml
    health-check:
      enable: true
      interval: 600
      url: http://www.gstatic.com/generate_204

# 3. DNS 配置
dns:
  enable: true
  listen: 0.0.0.0:1053
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  respect-rules: true # 重要：优先匹配规则
  nameserver:
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query
  proxy-server-nameserver:
    - https://doh.pub/dns-query
  fallback:
    - https://1.1.1.1/dns-query
    - https://8.8.8.8/dns-query
    - https://dns.google/dns-query

# 4. 规则集锚点 (修正了 MRS 格式错误)
rule-anchor:
  ip: &ip {type: http, interval: 86400, behavior: ipcidr, format: mrs}
  domain: &domain {type: http, interval: 86400, behavior: domain, format: mrs}
  class: &class {type: http, interval: 86400, behavior: classical, format: mrs}

# 5. 策略组配置
proxy-groups:
  - name: 🚀 默认代理
    type: select
    proxies: [🔯 香港故转, 🔯 台湾故转, 🔯 日本故转, 🔯 韩国故转, 🔯 美国故转, 🔯 新加坡故, 🔯 节点故转, 🌐 全部节点, DIRECT]

  - name: 🐟 漏网之鱼
    type: select
    proxies: [🚀 默认代理, DIRECT, 🌐 全部节点]

  - name: 🔯 香港故转
    type: url-test
    include-all: true
    use: [MyAirport] # 关联 provider
    filter: "(?=.*(港|HK|(?i)Hong))^((?!(台|日|韩|新|深|美)).)*$"
    url: http://www.gstatic.com/generate_204
    interval: 300

  - name: 🔯 台湾故转
    type: url-test
    include-all: true
    use: [MyAirport]
    filter: "(?=.*(台|TW|(?i)Taiwan))^((?!(港|日|韩|新|深|美)).)*$"
    url: http://www.gstatic.com/generate_204
    interval: 300

  - name: 🔯 日本故转
    type: url-test
    include-all: true
    use: [MyAirport]
    filter: "(?=.*(日|JP|(?i)Japan))^((?!(港|台|韩|新|深|美)).)*$"
    url: http://www.gstatic.com/generate_204
    interval: 300

  - name: 🔯 韩国故转
    type: url-test
    include-all: true
    use: [MyAirport]
    filter: "(?=.*(韩|KR|(?i)Korea))^((?!(港|台|日|新|深|美)).)*$"
    url: http://www.gstatic.com/generate_204
    interval: 300

  - name: 🔯 美国故转
    type: url-test
    include-all: true
    use: [MyAirport]
    filter: "(?=.*(美|US|(?i)States|America))^((?!(港|台|日|韩|新|深)).)*$"
    url: http://www.gstatic.com/generate_204
    interval: 300

  - name: 🔯 新加坡故
    type: url-test
    include-all: true
    use: [MyAirport]
    filter: "(?=.*(新|SG|(?i)Singapore))^((?!(港|台|日|韩|深|美)).)*$"
    url: http://www.gstatic.com/generate_204
    interval: 300

  - name: 🔯 节点故转
    type: url-test
    include-all: true
    use: [MyAirport]
    filter: "^((?!(港|台|日|韩|新|美)).)*$"
    url: http://www.gstatic.com/generate_204
    interval: 300

  - name: 🌐 全部节点
    type: select
    include-all: true
    use: [MyAirport]

# 6. 规则集下载 (保持原有的 MRS 逻辑)
rule-providers:
  proxylite: { <<: *class, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/proxy.mrs"}
  ai_domain: { <<: *class, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/ai.mrs"}
  youtube_domain: { <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs"}
  google_domain: { <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.mrs"}
  telegram_domain: { <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.mrs"}
  netflix_domain: { <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/netflix.mrs"}
  github_domain: { <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs"}
  microsoft_domain: { <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft.mrs"}
  apple_domain: { <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple.mrs"}
  cn_domain: { <<: *domain, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs"}
  cn_ip: { <<: *ip, url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.mrs"}

# 7. 分流规则
rules:
  - RULE-SET,ai_domain,🚀 默认代理
  - RULE-SET,youtube_domain,🚀 默认代理
  - RULE-SET,google_domain,🚀 默认代理
  - RULE-SET,github_domain,🚀 默认代理
  - RULE-SET,telegram_domain,🚀 默认代理
  - RULE-SET,netflix_domain,🚀 默认代理
  - RULE-SET,proxylite,🚀 默认代理
  - RULE-SET,apple_domain,DIRECT
  - RULE-SET,microsoft_domain,DIRECT
  - RULE-SET,cn_domain,DIRECT
  - RULE-SET,cn_ip,DIRECT
  - GEOIP,lan,DIRECT,no-resolve
  - MATCH,🐟 漏网之鱼
